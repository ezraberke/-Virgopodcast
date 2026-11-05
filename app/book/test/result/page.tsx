import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { testBookingEnabled } from "../../../../lib/test-booking/config";
import { Header, Footer } from "../../../site-chrome";
import { Result } from "./result";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Test booking result | VIRGO", robots: { index: false, follow: false }, referrer: "no-referrer" };
export default async function ResultPage({ searchParams }: { searchParams: Promise<{ session_id?: string; cancelled?: string }> }) {
  if (!testBookingEnabled()) notFound();
  const params = await searchParams;
  return <><Header /><main id="main-content" className="booking-result"><div className="container booking-result-card"><Result sessionId={params.session_id} cancelled={params.cancelled === "1"} /></div></main><Footer /></>;
}
