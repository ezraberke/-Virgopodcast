import { beforeEach, expect, it, vi } from "vitest";

const mock = vi.hoisted(() => ({ query: vi.fn(), get: vi.fn(), insert: vi.fn() }));
vi.mock("googleapis", () => ({ google: { auth: { JWT: class {} }, calendar: () => ({ freebusy: { query: mock.query }, events: { get: mock.get, insert: mock.insert } }) } }));
import { calendarBusy, calendarEventId, existingCalendarBooking, insertCalendarBooking } from "../lib/test-booking/calendar";

beforeEach(() => {
  vi.resetAllMocks();
  const config = { TEST_CHECKOUT_ENABLED: "true", STRIPE_TEST_SECRET_KEY: "sk_test_fake", STRIPE_TEST_WEBHOOK_SECRET: "whsec_test", TEST_DATABASE_URL: "postgres://test", GOOGLE_TEST_CALENDAR_ID: "test@calendar", GOOGLE_AVAILABILITY_CALENDAR_IDS: "studio@calendar", GOOGLE_TEST_CLIENT_EMAIL: "test@example.com", GOOGLE_TEST_PRIVATE_KEY: "fake", TEST_CHECKOUT_ORIGIN: "http://localhost:3000", VERCEL_ENV: "development" };
  for (const [key, value] of Object.entries(config)) vi.stubEnv(key, value);
});

it.each([{}, { calendars: {} }, { calendars: { "studio@calendar": { errors: [{ reason: "notFound" }] }, "test@calendar": { busy: [] } } }, { calendars: { "studio@calendar": { busy: [{ start: "invalid", end: "invalid" }] }, "test@calendar": { busy: [] } } }])("fails closed on incomplete calendar data %j", async data => {
  mock.query.mockResolvedValue({ data }); await expect(calendarBusy(new Date(), new Date())).rejects.toThrow();
});
it("queries both source and test calendars without exposing event details", async () => {
  mock.query.mockResolvedValue({ data: { calendars: { "studio@calendar": { busy: [] }, "test@calendar": { busy: [] } } } });
  expect(await calendarBusy(new Date(), new Date())).toEqual([]);
  expect(mock.query.mock.calls[0][0].requestBody.items).toEqual([{ id: "studio@calendar" }, { id: "test@calendar" }]);
});
it("creates deterministic test-only events without invitations", async () => {
  const id = "d020d6ad-2110-4c18-b4cc-d214435a7e65";
  mock.insert.mockResolvedValue({ data: { id: calendarEventId(id) } });
  await insertCalendarBooking({ id, package_name: "Studio session", start_time: new Date(), end_time: new Date() });
  const request = mock.insert.mock.calls[0][0];
  expect(request.calendarId).toBe("test@calendar"); expect(request.sendUpdates).toBe("none");
  expect(request.requestBody.attendees).toBeUndefined(); expect(request.requestBody.id).toMatch(/^[a-v0-9]+$/);
});
it("does not mistake permission errors or deleted events for successful synchronization", async () => {
  mock.get.mockRejectedValue({ code: 403 }); await expect(existingCalendarBooking("id")).rejects.toEqual({ code: 403 });
  mock.get.mockResolvedValue({ data: { status: "cancelled" } }); await expect(existingCalendarBooking("id")).rejects.toThrow();
});
