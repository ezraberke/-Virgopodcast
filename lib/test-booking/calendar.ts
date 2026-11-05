import { google } from "googleapis";
import { getTestConfig } from "./config";

function client() {
  const config = getTestConfig();
  const auth = new google.auth.JWT({ email: config.clientEmail, key: config.privateKey, scopes: ["https://www.googleapis.com/auth/calendar"] });
  return { config, calendar: google.calendar({ version: "v3", auth }) };
}

export async function calendarBusy(start: Date, end: Date) {
  const { config, calendar } = client();
  const ids = [...new Set([...config.busyCalendarIds, config.calendarId])];
  const { data } = await calendar.freebusy.query({ requestBody: {
    timeMin: start.toISOString(), timeMax: end.toISOString(), items: ids.map(id => ({ id })),
  } }, { timeout: 10000 });
  return ids.flatMap(id => {
    const result = data.calendars?.[id];
    if (!result || result.errors?.length || !Array.isArray(result.busy)) throw new Error("Calendar availability unavailable");
    for (const busy of result.busy) {
      if (!busy.start || !busy.end || !Number.isFinite(Date.parse(busy.start)) || !Number.isFinite(Date.parse(busy.end)) || Date.parse(busy.end) <= Date.parse(busy.start)) throw new Error("Invalid calendar availability");
    }
    return result.busy;
  });
}

export function calendarEventId(bookingId: string) { return `virgotest${bookingId.replaceAll("-", "")}`; }

export async function existingCalendarBooking(id: string) {
  const { config, calendar } = client();
  try {
    const { data } = await calendar.events.get({ calendarId: config.calendarId, eventId: calendarEventId(id) }, { timeout: 10000 });
    if (data.status === "cancelled" || data.extendedProperties?.private?.bookingId !== id) throw new Error("Test calendar event requires review");
    return data.id!;
  } catch (error) {
    if ((error as { code?: number }).code === 404) return null;
    throw error;
  }
}

export async function insertCalendarBooking(booking: { id: string; package_name: string; start_time: Date; end_time: Date }) {
  const { config, calendar } = client();
  try {
    const { data } = await calendar.events.insert({ calendarId: config.calendarId, sendUpdates: "none", requestBody: {
      id: calendarEventId(booking.id),
      summary: `[TEST — no real reservation] ${booking.package_name}`,
      description: `Stripe sandbox booking ${booking.id}. This is not a customer reservation.`,
      start: { dateTime: new Date(booking.start_time).toISOString(), timeZone: "America/New_York" },
      end: { dateTime: new Date(booking.end_time).toISOString(), timeZone: "America/New_York" },
      transparency: "opaque",
      extendedProperties: { private: { bookingId: booking.id } },
      // Sandbox events deliberately have no attendees and send no customer messages.
    } }, { timeout: 10000 });
    if (!data.id) throw new Error("Calendar event was not created");
    return data.id;
  } catch (error) {
    if ((error as { code?: number }).code === 409) {
      const id = await existingCalendarBooking(booking.id);
      if (id) return id;
    }
    throw error;
  }
}
