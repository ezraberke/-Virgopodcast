export class BookingError extends Error {
  constructor(message: string, public status = 400) { super(message); }
}

export function testBookingEnabled(env = process.env) {
  return env.TEST_CHECKOUT_ENABLED === "true" && env.VERCEL_ENV !== "production";
}

export function getTestConfig(env = process.env) {
  if (!testBookingEnabled(env)) throw new BookingError("Test checkout is disabled.", 503);
  const key = env.STRIPE_TEST_SECRET_KEY ?? "";
  const webhookSecret = env.STRIPE_TEST_WEBHOOK_SECRET ?? "";
  const databaseUrl = env.TEST_DATABASE_URL;
  const calendarId = env.GOOGLE_TEST_CALENDAR_ID;
  const busyCalendarIds = (env.GOOGLE_AVAILABILITY_CALENDAR_IDS ?? "").split(",").map(s => s.trim()).filter(Boolean);
  const clientEmail = env.GOOGLE_TEST_CLIENT_EMAIL;
  const privateKey = env.GOOGLE_TEST_PRIVATE_KEY?.replace(/\\n/g, "\n");
  let origin: URL;
  try { origin = new URL(env.TEST_CHECKOUT_ORIGIN ?? (env.VERCEL_ENV === "preview" && env.VERCEL_URL ? `https://${env.VERCEL_URL}` : "")); }
  catch { throw new BookingError("Test checkout is not configured.", 503); }
  const local = ["localhost", "127.0.0.1"].includes(origin.hostname);
  if (!key.startsWith("sk_test_") || !webhookSecret.startsWith("whsec_") || !databaseUrl || databaseUrl === env.DATABASE_URL ||
    !calendarId || !busyCalendarIds.length || busyCalendarIds.includes(calendarId) ||
    busyCalendarIds.includes("primary") || calendarId === "primary" ||
    !clientEmail || !privateKey || origin.username || origin.password ||
    origin.pathname !== "/" || origin.search || origin.hash ||
    (!local && (origin.protocol !== "https:" || env.VERCEL_ENV !== "preview" || origin.hostname !== env.VERCEL_URL)) ||
    (local && !["http:", "https:"].includes(origin.protocol))) {
    throw new BookingError("Test checkout is not configured safely.", 503);
  }
  return { key, webhookSecret, databaseUrl, calendarId, busyCalendarIds, clientEmail, privateKey, origin: origin.origin };
}

export function assertSameOrigin(request: Request, origin: string) {
  if (request.headers.get("origin") !== origin) throw new BookingError("Please start checkout from the test booking page.", 403);
}
