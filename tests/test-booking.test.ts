import { readFileSync } from "node:fs";
import { randomUUID } from "node:crypto";
import { PGlite } from "@electric-sql/pglite";
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { DateTime } from "luxon";
import Stripe from "stripe";

const mocks = vi.hoisted(() => ({ query: vi.fn(), connect: vi.fn(), busy: vi.fn(), existing: vi.fn(), insert: vi.fn(), create: vi.fn(), retrieve: vi.fn() }));
vi.mock("@neondatabase/serverless", () => ({ Pool: class { query = mocks.query; connect = mocks.connect; } }));
vi.mock("../lib/test-booking/calendar", () => ({ calendarBusy: mocks.busy, existingCalendarBooking: mocks.existing, insertCalendarBooking: mocks.insert }));
vi.mock("stripe", async importOriginal => {
  const { default: RealStripe } = await importOriginal<typeof import("stripe")>();
  return { default: class extends RealStripe {
    constructor(key: string) { super(key); this.checkout.sessions.create = mocks.create; this.checkout.sessions.retrieve = mocks.retrieve; }
  } };
});

import { BOOKING_PACKAGES } from "../lib/booking-config";
import { slotsForDate } from "../lib/availability";
import { getTestConfig, assertSameOrigin } from "../lib/test-booking/config";
import { parseBooking } from "../lib/test-booking/validation";
import { availableSlots, reserveBooking, openCheckout, settleSession, assertSession, checkoutParameters, type Booking } from "../lib/test-booking/service";
import { POST as checkout } from "../app/api/test-booking/checkout/route";
import { POST as webhook } from "../app/api/stripe/test-webhook/route";

let db: PGlite;
const config = { TEST_CHECKOUT_ENABLED: "true", STRIPE_TEST_SECRET_KEY: "sk_test_fake", STRIPE_TEST_WEBHOOK_SECRET: "whsec_test", TEST_DATABASE_URL: "postgres://test", GOOGLE_TEST_CALENDAR_ID: "test@calendar", GOOGLE_AVAILABILITY_CALENDAR_IDS: "studio@calendar", GOOGLE_TEST_CLIENT_EMAIL: "test@example.com", GOOGLE_TEST_PRIVATE_KEY: "fake", TEST_CHECKOUT_ORIGIN: "http://localhost:3000", VERCEL_ENV: "development" };
const input = (overrides = {}) => ({ requestId: randomUUID(), packageId: "studio-session-1-hour", start: "2026-11-07T10:00:00-05:00", customerName: "Test Person", customerEmail: "test@example.com", ...overrides });
const paid = (b: Booking, overrides = {}) => ({ id: "cs_test_12345678901234567890", livemode: false, mode: "payment", metadata: { bookingId: b.id, integration: "virgo-test-v1" }, client_reference_id: b.id, amount_total: b.amount_cents, currency: "usd", status: "complete", payment_status: "paid", payment_intent: "pi_test", ...overrides }) as unknown as Stripe.Checkout.Session;
const row = async () => (await db.query<Booking>("SELECT * FROM test_bookings LIMIT 1")).rows[0];

beforeAll(async () => { db = new PGlite(); await db.exec(readFileSync("db/test-bookings.sql", "utf8")); });
afterAll(async () => { vi.useRealTimers(); vi.unstubAllEnvs(); await db.close(); });
beforeEach(async () => {
  vi.resetAllMocks();
  for (const [key, value] of Object.entries(config)) vi.stubEnv(key, value);
  vi.stubEnv("DATABASE_URL", "postgres://production");
  vi.useFakeTimers({ toFake: ["Date"] }); vi.setSystemTime(new Date("2026-11-05T12:00:00Z"));
  await db.exec("DELETE FROM test_bookings");
  mocks.query.mockImplementation((sql, args) => db.query(sql, args));
  // PGlite is single-connection. Serialize transactions as the production advisory lock does.
  let queue = Promise.resolve();
  mocks.connect.mockImplementation(async () => {
    const prior = queue;
    let release!: () => void;
    queue = new Promise<void>(resolve => { release = resolve; });
    await prior;
    return { query: mocks.query, release };
  });
  mocks.busy.mockResolvedValue([]); mocks.existing.mockResolvedValue(null); mocks.insert.mockResolvedValue("calendar-test-event");
});

describe("catalog and input integrity", () => {
  it("preserves every published price and duration", () => {
    expect(BOOKING_PACKAGES.map(p => p.priceCents)).toEqual([7500,12500,20000,35000,12500,17500,25000,39500,16000,25000,35000,55000,16000,25000,35000,55000]);
    expect(BOOKING_PACKAGES.map(p => p.durationMinutes)).toEqual(Array(4).fill([60,120,240,480]).flat());
  });
  it.each([{ amount: 1 }, { priceCents: 1 }, { addOns: ["free-edit"] }, { success_url: "https://attacker.test" }, { quantity: 0 }, { packageId: "unknown" }, { customerName: [] }, { customerEmail: "invalid" }, { start: "2026-11-07T10:00:00" }, { start: "2026-11-07T10:00:01-05:00" }])("rejects untrusted fields %j", override => { expect(() => parseBooking(input(override))).toThrow(); });
  it("normalizes contact details before calculating a retry fingerprint", () => { expect(parseBooking(input({ customerEmail: " TEST@EXAMPLE.COM " })).customerEmail).toBe("test@example.com"); });
});

describe("test mode barriers", () => {
  it("reuses the complete existing Google credential pair only with explicit opt-in", () => {
    const env: NodeJS.ProcessEnv = { ...config, NODE_ENV: "test", GOOGLE_TEST_CLIENT_EMAIL: undefined, GOOGLE_TEST_PRIVATE_KEY: undefined, GOOGLE_CLIENT_EMAIL: "existing@example.com", GOOGLE_PRIVATE_KEY: "existing\\nkey" };
    expect(() => getTestConfig(env)).toThrow();
    const configured = getTestConfig({ ...env, GOOGLE_TEST_USE_EXISTING_SERVICE_ACCOUNT: "true" });
    expect(configured.clientEmail).toBe("existing@example.com");
    expect(configured.privateKey).toBe("existing\nkey");
    expect(() => getTestConfig({ ...env, GOOGLE_TEST_USE_EXISTING_SERVICE_ACCOUNT: "true", GOOGLE_PRIVATE_KEY: undefined, GOOGLE_TEST_PRIVATE_KEY: "other-key" })).toThrow();
    expect(() => getTestConfig({ ...env, GOOGLE_TEST_USE_EXISTING_SERVICE_ACCOUNT: "true", GOOGLE_TEST_CALENDAR_ID: "studio@calendar" })).toThrow();
  });
  it.each([{ VERCEL_ENV: "production" }, { STRIPE_TEST_SECRET_KEY: "sk_live_secret" }, { TEST_CHECKOUT_ENABLED: "false" }, { GOOGLE_TEST_CALENDAR_ID: "studio@calendar" }, { GOOGLE_AVAILABILITY_CALENDAR_IDS: "" }, { TEST_DATABASE_URL: "postgres://production" }, { TEST_CHECKOUT_ORIGIN: "https://virgopodcast.com" }])("refuses unsafe config %j", override => { expect(() => getTestConfig({ ...process.env, ...override })).toThrow(); });
  it("only accepts the configured origin", () => { expect(() => assertSameOrigin(new Request("http://localhost", { headers: { origin: "https://attacker.test" } }), config.TEST_CHECKOUT_ORIGIN)).toThrow(); });
  it("accepts its exact Vercel preview origin", () => { expect(getTestConfig({ ...process.env, VERCEL_ENV: "preview", VERCEL_URL: "virgo-preview.vercel.app", TEST_CHECKOUT_ORIGIN: "https://virgo-preview.vercel.app" }).origin).toBe("https://virgo-preview.vercel.app"); });
});

describe("calendar and reservation rules", () => {
  it("includes weekend slots and fits the full eight-hour session within closing", async () => { expect(await availableSlots("2026-11-07", "studio-session-full-day")).toEqual(["2026-11-07T09:00:00.000-05:00", "2026-11-07T09:30:00.000-05:00", "2026-11-07T10:00:00.000-05:00"]); });
  it("enforces two-hour lead time and a 30-minute conflict buffer", () => {
    const pkg = BOOKING_PACKAGES[0];
    const slots = slotsForDate("2026-11-05", pkg, [{ start: "2026-11-05T11:00:00-05:00", end: "2026-11-05T12:00:00-05:00" }]);
    expect(slots).not.toContain("2026-11-05T09:00:00.000-05:00");
    expect(slots).toContain("2026-11-05T09:30:00.000-05:00");
    expect(slots).not.toContain("2026-11-05T10:00:00.000-05:00");
    expect(slots).toContain("2026-11-05T12:30:00.000-05:00");
  });
  it("honors all-day busy events", async () => { mocks.busy.mockResolvedValue([{ start: "2026-11-07T00:00:00-05:00", end: "2026-11-08T00:00:00-05:00" }]); expect(await availableSlots("2026-11-07", "studio-session-1-hour")).toEqual([]); });
  it.each(["2026-11-07T08:00:00-05:00", "2026-11-07T10:15:00-05:00", "2026-11-07T17:30:00-05:00", "2026-11-05T09:00:00-05:00", "2027-02-01T10:00:00-05:00"])("rejects forged/unavailable start %s", async start => { await expect(reserveBooking(parseBooking(input({ start })))).rejects.toThrow(); });
  it("fails closed on calendar errors before Stripe or database insertion", async () => { mocks.busy.mockRejectedValue(new Error("Calendar down")); await expect(openCheckout(parseBooking(input()))).rejects.toThrow(); expect(await row()).toBeUndefined(); expect(mocks.create).not.toHaveBeenCalled(); });
  it("rechecks calendar conflicts during checkout", async () => { mocks.busy.mockResolvedValue([{ start: "2026-11-07T10:30:00-05:00", end: "2026-11-07T11:30:00-05:00" }]); await expect(reserveBooking(parseBooking(input()))).rejects.toThrow("no longer available"); });
  it("persists the correct discounted full-day price", async () => { const booking = await reserveBooking(parseBooking(input({ packageId: "ready-to-publish-full-day" }))); expect(booking.amount_cents).toBe(39500); expect(new Date(booking.end_time).getTime() - new Date(booking.start_time).getTime()).toBe(8 * 3600000); });
  it("returns the same booking for retries, rejects changed details", async () => { const request = input(); const b = await reserveBooking(parseBooking(request)); expect((await reserveBooking(parseBooking(request))).id).toBe(b.id); await expect(reserveBooking(parseBooking({ ...request, customerName: "Changed" }))).rejects.toThrow("different details"); });
  it("only admits one of two overlapping reservations", async () => { const results = await Promise.allSettled([reserveBooking(parseBooking(input())), reserveBooking(parseBooking(input({ customerEmail: "second@example.com" })))]); expect(results.filter(r => r.status === "fulfilled")).toHaveLength(1); expect((await db.query("SELECT * FROM test_bookings")).rows).toHaveLength(1); });
  it("retains an overdue hold until Stripe proves expiration", async () => { const b = await reserveBooking(parseBooking(input())); await db.query("UPDATE test_bookings SET expires_at = $1", [new Date(0)]); await expect(reserveBooking(parseBooking(input({ customerEmail: "second@example.com" })))).rejects.toThrow(); await settleSession(paid(b, { status: "expired", payment_status: "unpaid" })); expect((await reserveBooking(parseBooking(input()))).status).toBe("held"); });
  it("uses the correct daylight saving offset", () => { const pkg = BOOKING_PACKAGES[0]; const slots = slotsForDate("2027-03-14", pkg, []); expect(DateTime.fromISO(slots[0], { setZone: true }).offset).toBe(-240); });
});

describe("Stripe creation and fulfillment", () => {
  it("uses a stored quote and fixed URLs without flexible quantities", async () => { const b = await reserveBooking(parseBooking(input())); const p = checkoutParameters(b, config.TEST_CHECKOUT_ORIGIN); expect(p.line_items?.[0].price_data?.unit_amount).toBe(7500); expect(p.payment_method_types).toEqual(["card"]); expect(p.success_url).toBe("http://localhost:3000/book/test/result?session_id={CHECKOUT_SESSION_ID}"); });
  it("keeps the hold after an ambiguous timeout and retries with the same key", async () => {
    const request = parseBooking(input()); mocks.create.mockRejectedValueOnce(new Error("Timeout")).mockResolvedValueOnce({ id: "cs_test_same", status: "open", livemode: false, url: "https://checkout.stripe.com/c/pay/cs_test_same" });
    await expect(openCheckout(request)).rejects.toThrow("Timeout"); expect((await row()).status).toBe("held");
    await openCheckout(request); expect(mocks.create.mock.calls[0]).toEqual(mocks.create.mock.calls[1]);
  });
  it.each([{ amount_total: 1 }, { currency: "eur" }, { livemode: true }, { client_reference_id: "wrong" }, { metadata: { integration: "virgo-test-v1", bookingId: "wrong" } }])("rejects a mismatched payment %j", async override => { const b = await reserveBooking(parseBooking(input())); expect(() => assertSession(paid(b, override), b)).toThrow(); });
  it("does not confirm unpaid sessions", async () => { const b = await reserveBooking(parseBooking(input())); await settleSession(paid(b, { payment_status: "unpaid" })); expect((await row()).status).toBe("held"); expect(mocks.insert).not.toHaveBeenCalled(); });
  it("retries calendar failures and confirms exactly once", async () => {
    const b = await reserveBooking(parseBooking(input())); const s = paid(b); mocks.insert.mockRejectedValueOnce(new Error("Calendar down")).mockResolvedValueOnce("event");
    await expect(settleSession(s)).rejects.toThrow(); expect((await row()).status).toBe("held");
    await settleSession(s); await settleSession(s); expect((await row()).status).toBe("confirmed"); expect(mocks.insert).toHaveBeenCalledTimes(2);
  });
  it("recovers a calendar event created before a database failure", async () => {
    const b = await reserveBooking(parseBooking(input()));
    mocks.insert.mockImplementation(async () => { mocks.existing.mockResolvedValue("existing-event"); return "existing-event"; });
    let failUpdate = true;
    mocks.query.mockImplementation((sql, args) => { if (failUpdate && sql.includes("stripe_payment_intent_id =")) { failUpdate = false; throw new Error("DB interrupted"); } return db.query(sql, args); });
    await expect(settleSession(paid(b))).rejects.toThrow("DB interrupted");
    await settleSession(paid(b)); expect(mocks.insert).toHaveBeenCalledTimes(1); expect((await row()).google_calendar_event_id).toBe("existing-event");
  });
  it("marks newly conflicting paid bookings for review", async () => { const b = await reserveBooking(parseBooking(input())); mocks.busy.mockResolvedValue([{ start: b.start_time.toISOString(), end: b.end_time.toISOString() }]); expect(await settleSession(paid(b))).toBe("needs_review"); expect(mocks.insert).not.toHaveBeenCalled(); });
  it("does not release a confirmed booking for a delayed expiration notification", async () => { const b = await reserveBooking(parseBooking(input())); await settleSession(paid(b)); await settleSession(paid(b, { status: "expired", payment_status: "unpaid" })); expect((await row()).status).toBe("confirmed"); });
});

describe("HTTP boundaries", () => {
  it("refuses checkout on Vercel Production even when enabled", async () => {
    vi.stubEnv("VERCEL_ENV", "production");
    const response = await checkout(new Request("http://localhost:3000/api/test-booking/checkout", { method: "POST", headers: { origin: config.TEST_CHECKOUT_ORIGIN }, body: JSON.stringify(input()) }));
    expect(response.status).toBe(503); expect(mocks.create).not.toHaveBeenCalled();
  });
  it("rejects malformed JSON and oversized bodies", async () => {
    for (const [body, status] of [["{", 400], ["x".repeat(17000), 413]] as const) {
      const result = await checkout(new Request("http://localhost:3000/api/test-booking/checkout", { method: "POST", headers: { origin: config.TEST_CHECKOUT_ORIGIN }, body })); expect(result.status).toBe(status);
    }
  });
  it("rejects missing and invalid webhook signatures", async () => {
    for (const signature of ["", "invalid"]) { const response = await webhook(new Request("http://localhost/api/stripe/test-webhook", { method: "POST", headers: { "stripe-signature": signature }, body: "{}" })); expect(response.status).toBe(400); }
    expect(mocks.retrieve).not.toHaveBeenCalled();
  });
  it("verifies a signed event and retrieves current Stripe state", async () => {
    const b = await reserveBooking(parseBooking(input())); const session = paid(b); mocks.retrieve.mockResolvedValue(session);
    const payload = JSON.stringify({ id: "evt_test", type: "checkout.session.completed", livemode: false, data: { object: session } });
    const stripe = new Stripe("sk_test_fake");
    const signature = stripe.webhooks.generateTestHeaderString({ payload, secret: config.STRIPE_TEST_WEBHOOK_SECRET });
    const response = await webhook(new Request("http://localhost/api/stripe/test-webhook", { method: "POST", headers: { "stripe-signature": signature }, body: payload }));
    expect(response.status).toBe(200); expect(mocks.retrieve).toHaveBeenCalledWith(session.id); expect((await row()).status).toBe("confirmed");
  });
});
