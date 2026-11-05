import type { Metadata } from "next";
import Link from "next/link";
import { Footer, Header } from "../site-chrome";
import { bookingEmail, STUDIO_EMAIL } from "../../lib/contact";
import { BOOKING_PACKAGES, formatPrice } from "../../lib/booking-config";
import { CANCELLATION_POLICY } from "../../lib/booking-policy";
import { testBookingEnabled } from "../../lib/test-booking/config";
import TestBookingPage from "./test/page";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Book a Session | VIRGO Podcast Studio",
  description: "Choose your podcast recording package and full session length at VIRGO in Midtown Manhattan.",
};

export default function BookPage() {
  if (testBookingEnabled()) return <TestBookingPage />;
  // Safe public fallback until a separately reviewed live checkout is released.
  // No dead Google iframe, payment session, or implied automatic reservation.
  return <><Header /><main id="main-content" className="email-booking-page">
    <section className="container email-booking-intro">
      <p className="eyebrow">Make time for your next great conversation</p>
      <h1>Let’s plan<br />your session.</h1>
      <p>Send the studio your package, preferred date and recording length. We’ll check the calendar and confirm the full session with you.</p>
      <p className="booking-hours">Monday–Sunday, 9 a.m.–6 p.m. New York time.</p>
      <p className="booking-payment"><strong>A request is not a reservation until the studio confirms it.</strong> Pay on site on the day of your session.</p>
      <div className="email-steps">{[...new Set(BOOKING_PACKAGES.map(p => p.title))].map(title => <article key={title}>
        <h2>{title}</h2>
        {BOOKING_PACKAGES.filter(p => p.title === title).map(p => <p key={p.id}>{p.durationLabel} — {formatPrice(p.priceCents)}</p>)}
        <a className="text-link" href={bookingEmail(title)}>Request this package ↗</a>
      </article>)}</div>
      <p>Custom sets, advanced graphics and additional deliverables are quoted separately.</p>
      <p className="calendar-help">{CANCELLATION_POLICY} <Link href="/booking-policy">Booking policy</Link></p>
      <a className="button button-primary" href={bookingEmail()}>Contact the studio ↗</a>
      <p className="email-fallback">Email <a href={`mailto:${STUDIO_EMAIL}`}>{STUDIO_EMAIL}</a> with any questions.</p>
    </section>
  </main><Footer /></>;
}
