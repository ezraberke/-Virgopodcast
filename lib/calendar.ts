import { google } from "googleapis";

function getCalendarClient() {
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  if (!clientEmail || !privateKey) return null;

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/calendar"],
  });
  return google.calendar({ version: "v3", auth });
}

export async function getCalendarBusy(start: Date, end: Date) {
  const calendar = getCalendarClient();
  const calendarId = process.env.GOOGLE_CALENDAR_ID;
  if (!calendar || !calendarId) return [];

  const response = await calendar.freebusy.query({
    requestBody: { timeMin: start.toISOString(), timeMax: end.toISOString(), items: [{ id: calendarId }] },
  });
  return response.data.calendars?.[calendarId]?.busy ?? [];
}

export async function createCalendarBooking(input: {
  id: string;
  start: Date;
  end: Date;
  packageName: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  notes?: string;
}) {
  const calendar = getCalendarClient();
  const calendarId = process.env.GOOGLE_CALENDAR_ID;
  if (!calendar || !calendarId) return null;

  const response = await calendar.events.insert({
    calendarId,
    sendUpdates: "all",
    requestBody: {
      summary: `${input.packageName} — ${input.customerName}`,
      description: [
        `Booking ID: ${input.id}`,
        `Customer: ${input.customerName}`,
        `Email: ${input.customerEmail}`,
        input.customerPhone ? `Phone: ${input.customerPhone}` : "",
        input.notes ? `Notes: ${input.notes}` : "",
      ].filter(Boolean).join("\n"),
      location: "1345 Avenue of the Americas, 2nd Floor, New York, NY",
      start: { dateTime: input.start.toISOString(), timeZone: "America/New_York" },
      end: { dateTime: input.end.toISOString(), timeZone: "America/New_York" },
      attendees: [{ email: input.customerEmail }],
    },
  });
  return response.data.id ?? null;
}
