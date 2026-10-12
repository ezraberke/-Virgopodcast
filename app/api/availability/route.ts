import { NextResponse } from "next/server";
import { GOOGLE_BOOKING_URL } from "../../../lib/booking-links";

// Calendar is the single source of live availability; retire the old slot feed.
export function GET() {
  return NextResponse.json({
    error: "Availability and booking have moved to Google Calendar.",
    bookingUrl: GOOGLE_BOOKING_URL,
  }, { status: 410, headers: { "Cache-Control": "no-store" } });
}
