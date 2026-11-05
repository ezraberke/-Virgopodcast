import { randomUUID } from "node:crypto";
import { Pool, type PoolClient } from "@neondatabase/serverless";
import { DateTime } from "luxon";
import Stripe from "stripe";
import { BOOKING_BUFFER_MINUTES, getBookingPackage, getStudioClosure, STUDIO_TIME_ZONE } from "../booking-config";
import { slotsForDate, type BusyWindow } from "../availability";
import { BookingError, getTestConfig } from "./config";
import { calendarBusy, existingCalendarBooking, insertCalendarBooking } from "./calendar";
import { parseBooking, UUID } from "./validation";

let pool: Pool | undefined;
export function testPool() { return pool ??= new Pool({ connectionString: getTestConfig().databaseUrl }); }
export function testStripe() { return new Stripe(getTestConfig().key, { timeout: 10000, maxNetworkRetries: 1 }); }

export type Booking = {
  id: string; request_id: string; request_hash: string; package_id: string; package_name: string;
  start_time: Date; end_time: Date; customer_name: string; customer_email: string; customer_phone: string;
  notes: string; amount_cents: number; status: "held" | "confirmed" | "expired" | "needs_review";
  expires_at: Date; stripe_session_id: string | null; google_calendar_event_id: string | null;
};

async function locked<T>(run: (client: PoolClient) => Promise<T>) {
  const client = await testPool().connect();
  try {
    await client.query("BEGIN");
    await client.query("SET LOCAL lock_timeout = '5s'");
    // One studio; serialize ALL writers, including webhook fulfillment and expiration.
    await client.query("SELECT pg_advisory_xact_lock(86746001)");
    const result = await run(client);
    await client.query("COMMIT");
    return result;
  } catch (error) { await client.query("ROLLBACK"); throw error; }
  finally { client.release(); }
}

function bookingDay(date: string) {
  const day = DateTime.fromISO(date, { zone: STUDIO_TIME_ZONE });
  const today = DateTime.now().setZone(STUDIO_TIME_ZONE).startOf("day");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !day.isValid || day < today || day > today.plus({ days: 60 })) throw new BookingError("Choose a date within the next 60 days.");
  return day;
}

export async function availableSlots(date: string, packageId: string) {
  const day = bookingDay(date);
  const pkg = getBookingPackage(packageId);
  if (!pkg) throw new BookingError("Choose a valid package.");
  if (getStudioClosure(date)) return [];
  const from = day.startOf("day").minus({ minutes: BOOKING_BUFFER_MINUTES });
  const to = day.endOf("day").plus({ minutes: BOOKING_BUFFER_MINUTES });
  const [busy, held] = await Promise.all([
    calendarBusy(from.toJSDate(), to.toJSDate()),
    testPool().query("SELECT start_time, end_time FROM test_bookings WHERE status <> 'expired' AND start_time < $2 AND end_time > $1", [from.toISO(), to.toISO()]),
  ]);
  const databaseBusy: BusyWindow[] = held.rows.map(row => ({ start: new Date(row.start_time).toISOString(), end: new Date(row.end_time).toISOString() }));
  return slotsForDate(date, pkg, [...busy, ...databaseBusy]);
}

export async function reserveBooking(input: ReturnType<typeof parseBooking>) {
  return locked(async client => {
    const existing = await client.query<Booking>("SELECT * FROM test_bookings WHERE request_id = $1", [input.requestId]);
    if (existing.rows[0]) {
      const booking = existing.rows[0];
      if (booking.request_hash !== input.hash) throw new BookingError("This checkout attempt already contains different details. Start a new booking.", 409);
      return booking;
    }
    const date = input.startDate.toISODate()!;
    bookingDay(date);
    if (getStudioClosure(date)) throw new BookingError("The studio is closed on this date.", 409);
    const busy = await calendarBusy(input.startDate.minus({ minutes: 30 }).toJSDate(), input.endDate.plus({ minutes: 30 }).toJSDate());
    if (!slotsForDate(date, input.pkg, busy).some(slot => Date.parse(slot) === input.startDate.toMillis())) throw new BookingError("That time is no longer available. Choose another.", 409);
    const conflict = await client.query("SELECT 1 FROM test_bookings WHERE status <> 'expired' AND start_time < $2 AND end_time > $1 LIMIT 1", [input.startDate.minus({ minutes: 30 }).toISO(), input.endDate.plus({ minutes: 30 }).toISO()]);
    if (conflict.rows.length) throw new BookingError("Someone just selected that time. Choose another.", 409);
    // Bound accidental repeated holds, even if the caller changes its request UUID.
    const active = await client.query("SELECT 1 FROM test_bookings WHERE customer_email = $1 AND status = 'held' LIMIT 1", [input.customerEmail]);
    if (active.rows.length) throw new BookingError("You already have an open checkout. Finish it or wait for it to expire.", 409);
    const inserted = await client.query<Booking>(`INSERT INTO test_bookings
      (id, request_id, request_hash, package_id, package_name, start_time, end_time, customer_name, customer_email, customer_phone, notes, amount_cents, expires_at)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING *`,
      [randomUUID(), input.requestId, input.hash, input.pkg.id, `${input.pkg.title} — ${input.pkg.durationLabel}`, input.start, input.endDate.toISO(), input.customerName, input.customerEmail, input.customerPhone, input.notes, input.pkg.priceCents, new Date(Date.now() + 35 * 60000)]);
    return inserted.rows[0];
  });
}

export function checkoutParameters(booking: Booking, origin: string): Stripe.Checkout.SessionCreateParams {
  return {
    mode: "payment", payment_method_types: ["card"], customer_email: booking.customer_email,
    client_reference_id: booking.id, metadata: { bookingId: booking.id, integration: "virgo-test-v1" },
    line_items: [{ quantity: 1, price_data: { currency: "usd", unit_amount: booking.amount_cents,
      product_data: { name: booking.package_name, description: `Sandbox only. ${new Date(booking.start_time).toISOString()}` } } }],
    success_url: `${origin}/book/test/result?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/book/test/result?cancelled=1`,
    expires_at: Math.floor(new Date(booking.expires_at).getTime() / 1000),
    // No browser-supplied prices, quantities, redirects, coupons or delayed payment methods.
  };
}

export async function openCheckout(input: ReturnType<typeof parseBooking>) {
  const config = getTestConfig();
  const booking = await reserveBooking(input);
  if (booking.status !== "held") throw new BookingError("This checkout is already finished. Start a new booking.", 409);
  const stripe = testStripe();
  let session: Stripe.Checkout.Session;
  if (booking.stripe_session_id) session = await stripe.checkout.sessions.retrieve(booking.stripe_session_id);
  else {
    if (new Date(booking.expires_at).getTime() < Date.now() + 30 * 60000) throw new BookingError("This attempt needs review or has expired. Please contact the studio.", 409);
    // A network timeout is ambiguous. Keep the hold, then retry the SAME Stripe key/parameters.
    session = await stripe.checkout.sessions.create(checkoutParameters(booking, config.origin), { idempotencyKey: `virgo-test-${booking.id}` });
    await testPool().query("UPDATE test_bookings SET stripe_session_id = $1, updated_at = now() WHERE id = $2 AND (stripe_session_id IS NULL OR stripe_session_id = $1)", [session.id, booking.id]);
  }
  if (session.livemode || session.status !== "open" || !session.url || new URL(session.url).hostname !== "checkout.stripe.com") throw new BookingError("This checkout is no longer open.", 409);
  return { url: session.url };
}

export function assertSession(session: Stripe.Checkout.Session, booking: Booking) {
  if (session.livemode || session.mode !== "payment" || session.metadata?.integration !== "virgo-test-v1" ||
    session.metadata?.bookingId !== booking.id || session.client_reference_id !== booking.id ||
    (booking.stripe_session_id && booking.stripe_session_id !== session.id) ||
    session.currency !== "usd" || session.amount_total !== booking.amount_cents) throw new Error("Stripe session does not match the booking");
}

export async function settleSession(session: Stripe.Checkout.Session) {
  if (session.livemode) throw new Error("Live payments are forbidden");
  if (session.metadata?.integration !== "virgo-test-v1") return;
  const id = session.metadata.bookingId;
  if (!UUID.test(id ?? "")) throw new Error("Missing booking ID");
  return locked(async client => {
    const result = await client.query<Booking>("SELECT * FROM test_bookings WHERE id = $1 FOR UPDATE", [id]);
    const booking = result.rows[0];
    if (!booking) throw new Error("Booking not found");
    assertSession(session, booking);
    if (booking.status === "confirmed" || booking.status === "needs_review") return booking.status;
    if (session.status === "expired" && session.payment_status === "unpaid") {
      await client.query("UPDATE test_bookings SET status = 'expired', stripe_session_id = $1, updated_at = now() WHERE id = $2 AND status = 'held'", [session.id, id]);
      return "expired";
    }
    if (session.status !== "complete" || session.payment_status !== "paid") return "held";
    let eventId = await existingCalendarBooking(booking.id);
    let status = "confirmed";
    if (!eventId) {
      const start = DateTime.fromJSDate(new Date(booking.start_time));
      const end = DateTime.fromJSDate(new Date(booking.end_time));
      const busy = await calendarBusy(start.minus({ minutes: 30 }).toJSDate(), end.plus({ minutes: 30 }).toJSDate());
      const conflict = busy.some(window => Date.parse(window.start!) < end.plus({ minutes: 30 }).toMillis() && Date.parse(window.end!) > start.minus({ minutes: 30 }).toMillis());
      const overlapping = await client.query("SELECT 1 FROM test_bookings WHERE id <> $3 AND status <> 'expired' AND start_time < $2 AND end_time > $1 LIMIT 1", [start.minus({ minutes: 30 }).toISO(), end.plus({ minutes: 30 }).toISO(), id]);
      if (booking.status === "expired" || conflict || overlapping.rows.length) status = "needs_review";
      else eventId = await insertCalendarBooking(booking);
    }
    await client.query(`UPDATE test_bookings SET status = $1, stripe_session_id = $2, stripe_payment_intent_id = $3,
      google_calendar_event_id = $4, updated_at = now() WHERE id = $5`,
      [status, session.id, typeof session.payment_intent === "string" ? session.payment_intent : null, eventId, id]);
    return status;
  });
}
