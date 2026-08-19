import { DateTime } from "luxon";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { BOOKING_BUFFER_MINUTES, getBookingPackage, HOLD_MINUTES, isPodcastWeekDate, PODCAST_WEEK_PACKAGE_ID, STUDIO_TIME_ZONE } from "../../../lib/booking-config";
import { getPool } from "../../../lib/db";

export const runtime = "nodejs";

type CheckoutBody = {
  packageId?: string;
  start?: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  notes?: string;
};

export async function POST(request: Request) {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (!stripeKey || !process.env.DATABASE_URL || !siteUrl) {
    return NextResponse.json({ error: "Online checkout is being connected. Please call the studio to reserve this time." }, { status: 503 });
  }

  const body = (await request.json()) as CheckoutBody;
  const bookingPackage = getBookingPackage(body.packageId ?? "");
  const start = DateTime.fromISO(body.start ?? "").setZone(STUDIO_TIME_ZONE);
  const email = body.customerEmail?.trim().toLowerCase();
  const name = body.customerName?.trim();
  if (!bookingPackage || !start.isValid || !email || !name || !email.includes("@")) {
    return NextResponse.json({ error: "Please complete all required fields." }, { status: 400 });
  }
  if (bookingPackage.id === PODCAST_WEEK_PACKAGE_ID && !isPodcastWeekDate(start.toISODate() ?? "")) {
    return NextResponse.json({ error: "The $10 promotion is available only for sessions from August 19 through August 25, 2026." }, { status: 400 });
  }
  if (start < DateTime.now().setZone(STUDIO_TIME_ZONE).plus({ hours: 2 })) {
    return NextResponse.json({ error: "That time is no longer available." }, { status: 409 });
  }

  const end = start.plus({ minutes: bookingPackage.durationMinutes });
  const blockedStart = start.minus({ minutes: BOOKING_BUFFER_MINUTES });
  const blockedEnd = end.plus({ minutes: BOOKING_BUFFER_MINUTES });
  const pool = getPool();
  const client = await pool.connect();
  let bookingId = "";
  try {
    await client.query("BEGIN");
    await client.query("SELECT pg_advisory_xact_lock(hashtext($1))", [start.toISODate()]);
    await client.query("DELETE FROM bookings WHERE status = 'held' AND hold_expires_at <= now()");
    const conflict = await client.query(
      `SELECT 1 FROM bookings
       WHERE status IN ('held', 'paid') AND start_time < $2 AND end_time > $1
       LIMIT 1`,
      [blockedStart.toISO(), blockedEnd.toISO()],
    );
    if (conflict.rowCount) {
      await client.query("ROLLBACK");
      return NextResponse.json({ error: "Someone just selected that time. Please choose another." }, { status: 409 });
    }
    const inserted = await client.query(
      `INSERT INTO bookings
       (package_id, start_time, end_time, customer_name, customer_email, customer_phone, notes, status, hold_expires_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,'held',now() + ($8 || ' minutes')::interval)
       RETURNING id`,
      [bookingPackage.id, start.toISO(), end.toISO(), name, email, body.customerPhone?.trim() || null, body.notes?.trim() || null, HOLD_MINUTES],
    );
    bookingId = inserted.rows[0].id;
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    console.error(error);
    return NextResponse.json({ error: "We could not hold that time. Please try again." }, { status: 500 });
  } finally {
    client.release();
  }

  try {
    const stripe = new Stripe(stripeKey);
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: email,
      line_items: [{
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: bookingPackage.priceCents,
          product_data: { name: `${bookingPackage.title} — ${bookingPackage.durationLabel}`, description: start.toFormat("cccc, LLLL d 'at' h:mm a ZZZZ") },
        },
      }],
      metadata: { bookingId },
      success_url: `${siteUrl}/booking/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/booking/cancelled`,
      expires_at: Math.floor(Date.now() / 1000) + HOLD_MINUTES * 60,
    });
    await pool.query("UPDATE bookings SET stripe_session_id = $1 WHERE id = $2", [session.id, bookingId]);
    return NextResponse.json({ url: session.url });
  } catch (error) {
    await pool.query("UPDATE bookings SET status = 'cancelled', updated_at = now() WHERE id = $1", [bookingId]);
    console.error(error);
    return NextResponse.json({ error: "Secure checkout could not be opened. Please try again." }, { status: 500 });
  }
}
