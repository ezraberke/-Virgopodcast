import { NextResponse } from "next/server";
import { BOOKING_EMAIL, STUDIO_EMAIL } from "../../../lib/contact";

// Retire the old endpoint as well as the UI: cached clients must not create payments.
export function POST() {
  return NextResponse.json({
    error: "Online checkout is no longer available. Book by email and pay on site on the day of your session.",
    email: STUDIO_EMAIL,
    bookingUrl: BOOKING_EMAIL,
  }, { status: 410, headers: { "Cache-Control": "no-store" } });
}
