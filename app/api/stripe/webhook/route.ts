import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createCalendarBooking } from "../../../../lib/calendar";
import { getBookingPackage } from "../../../../lib/booking-config";
import { getPool } from "../../../../lib/db";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripeKey || !webhookSecret || !process.env.DATABASE_URL) return new NextResponse("Webhook not configured", { status: 503 });

  const signature = request.headers.get("stripe-signature");
  if (!signature) return new NextResponse("Missing signature", { status: 400 });
  const stripe = new Stripe(stripeKey);
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(await request.text(), signature, webhookSecret);
  } catch {
    return new NextResponse("Invalid signature", { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const bookingId = session.metadata?.bookingId;
    if (bookingId) {
      const pool = getPool();
      const result = await pool.query(
        `UPDATE bookings SET status = 'paid', stripe_payment_intent_id = $1, amount_paid = $2, hold_expires_at = NULL, updated_at = now()
         WHERE id = $3 AND status = 'held' RETURNING *`,
        [typeof session.payment_intent === "string" ? session.payment_intent : null, session.amount_total, bookingId],
      );
      const booking = result.rows[0];
      if (booking) {
        const bookingPackage = getBookingPackage(booking.package_id);
        const eventId = await createCalendarBooking({
          id: booking.id,
          start: new Date(booking.start_time),
          end: new Date(booking.end_time),
          packageName: bookingPackage ? `${bookingPackage.title} — ${bookingPackage.durationLabel}` : booking.package_id,
          customerName: booking.customer_name,
          customerEmail: booking.customer_email,
          customerPhone: booking.customer_phone,
          notes: booking.notes,
        });
        if (eventId) await pool.query("UPDATE bookings SET google_calendar_event_id = $1 WHERE id = $2", [eventId, bookingId]);
      }
    }
  }

  if (event.type === "checkout.session.expired") {
    await getPool().query("UPDATE bookings SET status = 'cancelled', updated_at = now() WHERE stripe_session_id = $1 AND status = 'held'", [event.data.object.id]);
  }
  return NextResponse.json({ received: true });
}
