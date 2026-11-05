import { createHash } from "node:crypto";
import { DateTime } from "luxon";
import { getBookingPackage, STUDIO_TIME_ZONE } from "../booking-config";
import { BookingError } from "./config";

export const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function field(body: Record<string, unknown>, name: string, max: number, required = false) {
  const value = body[name];
  if (value === undefined && !required) return "";
  if (typeof value !== "string" || value.length > max || (required && !value.trim())) throw new BookingError(`Please check ${name}.`);
  return value.trim();
}

export function parseBooking(body: unknown) {
  if (!body || typeof body !== "object" || Array.isArray(body)) throw new BookingError("Invalid booking request.");
  const data = body as Record<string, unknown>;
  const allowed = ["requestId", "packageId", "start", "customerName", "customerEmail", "customerPhone", "notes"];
  if (Object.keys(data).some(k => !allowed.includes(k))) throw new BookingError("Custom prices and add-ons must be quoted by the studio.");
  const requestId = field(data, "requestId", 36, true);
  if (!UUID.test(requestId)) throw new BookingError("Invalid checkout request. Please reload the page.");
  const pkg = getBookingPackage(field(data, "packageId", 80, true));
  const rawStart = field(data, "start", 40, true);
  const start = DateTime.fromISO(rawStart, { setZone: true }).setZone(STUDIO_TIME_ZONE);
  if (!pkg || !/(Z|[+-]\d{2}:\d{2})$/.test(rawStart) || !start.isValid || start.second || start.millisecond) throw new BookingError("Choose a valid package and time.");
  const customerName = field(data, "customerName", 120, true);
  const customerEmail = field(data, "customerEmail", 254, true).toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)) throw new BookingError("Please enter a valid email address.");
  const customerPhone = field(data, "customerPhone", 40);
  const notes = field(data, "notes", 2000);
  const input = { packageId: pkg.id, start: start.toISO()!, customerName, customerEmail, customerPhone, notes };
  return { ...input, requestId, pkg, startDate: start, endDate: start.plus({ minutes: pkg.durationMinutes }), hash: createHash("sha256").update(JSON.stringify(input)).digest("hex") };
}
