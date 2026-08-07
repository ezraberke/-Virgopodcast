import { DateTime, Interval } from "luxon";
import {
  BOOKING_BUFFER_MINUTES,
  BUSINESS_HOURS,
  SLOT_INTERVAL_MINUTES,
  STUDIO_TIME_ZONE,
  type BookingPackage,
} from "./booking-config";

export type BusyWindow = { start?: string | null; end?: string | null };

export function slotsForDate(date: string, bookingPackage: BookingPackage, busy: BusyWindow[]) {
  const day = DateTime.fromISO(date, { zone: STUDIO_TIME_ZONE });
  const hours = BUSINESS_HOURS[day.weekday % 7];
  if (!day.isValid || !hours) return [];

  const open = DateTime.fromISO(`${date}T${hours.open}`, { zone: STUDIO_TIME_ZONE });
  const close = DateTime.fromISO(`${date}T${hours.close}`, { zone: STUDIO_TIME_ZONE });
  const now = DateTime.now().setZone(STUDIO_TIME_ZONE).plus({ hours: 2 });
  const blocked = busy.flatMap((window) => {
    if (!window.start || !window.end) return [];
    const start = DateTime.fromISO(window.start).minus({ minutes: BOOKING_BUFFER_MINUTES });
    const end = DateTime.fromISO(window.end).plus({ minutes: BOOKING_BUFFER_MINUTES });
    return start.isValid && end.isValid ? [Interval.fromDateTimes(start, end)] : [];
  });

  const slots: string[] = [];
  for (let cursor = open; cursor.plus({ minutes: bookingPackage.durationMinutes }) <= close; cursor = cursor.plus({ minutes: SLOT_INTERVAL_MINUTES })) {
    const end = cursor.plus({ minutes: bookingPackage.durationMinutes });
    const candidate = Interval.fromDateTimes(cursor, end);
    if (cursor > now && !blocked.some((window) => window.overlaps(candidate))) slots.push(cursor.toISO()!);
  }
  return slots;
}
