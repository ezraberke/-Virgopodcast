import { NextResponse } from "next/server";
import { STUDIO_EMAIL } from "../../../lib/contact";
import { BOOKING_PAGE } from "../../../lib/booking-links";

// Retire the old endpoint as well as the UI: cached clients must not create payments.
export function POST() {
  return NextResponse.json({
    error: "Online checkout is no longer available. Book with Google Calendar and pay on site on the day of your session.",
    email: STUDIO_EMAIL,
    bookingUrl: BOOKING_PAGE,
  }, { status: 410, headers: { "Cache-Control": "no-store" } });
}
