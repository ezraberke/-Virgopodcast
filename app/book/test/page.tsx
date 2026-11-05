import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DateTime } from "luxon";
import { Header, Footer } from "../../site-chrome";
import { testBookingEnabled } from "../../../lib/test-booking/config";
import { STUDIO_TIME_ZONE } from "../../../lib/booking-config";
import { TestBookingForm } from "./test-booking-form";
import { bookingEmail } from "../../../lib/contact";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Test booking | VIRGO", robots: { index: false, follow: false } };
export default function TestBookingPage() {
  if (!testBookingEnabled()) notFound();
  const today = DateTime.now().setZone(STUDIO_TIME_ZONE);
  return <><Header /><main id="main-content" className="booking-page">
    <section className="booking-hero"><div className="container booking-hero-inner">
      <p className="eyebrow light">Stripe test mode · No real charges</p>
      <h1>Your session.<br />Your way.</h1>
      <p>Try booking a package and recording time. This preview creates test payments and test calendar events only. To arrange a real session, <a href={bookingEmail()}>contact the studio</a>.</p>
    </div></section>
    <TestBookingForm today={today.toISODate()!} lastDate={today.plus({ days: 60 }).toISODate()!} />
  </main><Footer /></>;
}
