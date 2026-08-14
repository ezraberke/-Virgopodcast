import { DateTime } from "luxon";
import { NextRequest, NextResponse } from "next/server";
import { getCalendarBusy } from "../../../lib/calendar";
import { getBookingPackage, isPodcastWeekDate, PODCAST_WEEK_PACKAGE_ID, STUDIO_TIME_ZONE } from "../../../lib/booking-config";
import { getPool } from "../../../lib/db";
import { slotsForDate, type BusyWindow } from "../../../lib/availability";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const date = request.nextUrl.searchParams.get("date") ?? "";
  const packageId = request.nextUrl.searchParams.get("packageId") ?? "";
  const bookingPackage = getBookingPackage(packageId);
  const day = DateTime.fromISO(date, { zone: STUDIO_TIME_ZONE });
  if (!bookingPackage || !day.isValid) return NextResponse.json({ error: "Invalid booking request" }, { status: 400 });
  if (packageId === PODCAST_WEEK_PACKAGE_ID && !isPodcastWeekDate(date)) return NextResponse.json({ slots: [] });

  const dayStart = day.startOf("day");
  const dayEnd = day.endOf("day");
  const busy: BusyWindow[] = await getCalendarBusy(dayStart.toJSDate(), dayEnd.toJSDate());

  if (process.env.DATABASE_URL) {
    const result = await getPool().query(
      `SELECT start_time AS start, end_time AS end
       FROM bookings
       WHERE start_time < $2 AND end_time > $1
         AND (status = 'paid' OR (status = 'held' AND hold_expires_at > now()))`,
      [dayStart.toISO(), dayEnd.toISO()],
    );
    busy.push(...result.rows);
  }

  return NextResponse.json({ slots: slotsForDate(date, bookingPackage, busy) });
}
