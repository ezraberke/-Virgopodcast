import { NextResponse } from "next/server";
import { PUBLIC_BOOKING_URL } from "../../../lib/booking-request";

// Retired slot feed: direct cached clients to the current request-only page.
export function GET() {
  return NextResponse.json({
    error: "This availability feed is retired. Request a time on our booking page; availability requires confirmation.",
    bookingUrl: PUBLIC_BOOKING_URL,
  }, { status: 410, headers: { "Cache-Control": "no-store" } });
}
