import { NextResponse } from "next/server";
import { BOOKING_PAGE } from "../../../lib/booking-links";

// Retired clients must start again at the current website booking page.
export function GET() {
  return NextResponse.json({
    error: "This availability endpoint is retired. Please use the website booking page.",
    bookingUrl: BOOKING_PAGE,
  }, { status: 410, headers: { "Cache-Control": "no-store" } });
}
