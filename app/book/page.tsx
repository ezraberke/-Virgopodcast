import type { Metadata } from "next";
import { Footer, Header } from "../site-chrome";
import { bookingEmail, STUDIO_EMAIL } from "../../lib/contact";
import { GOOGLE_BOOKING_URL } from "../../lib/booking-links";

export const metadata: Metadata = {
  title: "Book a Session | VIRGO Podcast Studio",
  description: "Choose an available one-hour recording session in Google Calendar. Pay on site on the day of your session. Contact Ezra for longer recordings.",
};

export default function BookPage() {
  return (
    <><Header />
      <main id="main-content" className="email-booking-page">
        <section className="container email-booking-intro">
          <p className="eyebrow">Make time for your next great conversation</p>
          <h1>Choose your time.<br />Pay on site.</h1>
          <p>Reserve a one-hour recording session with Google Calendar. Choose an available time, tell us your package, and receive your booking confirmation by email.</p>
          <p className="booking-payment"><strong>Payment is due on site on the day of your session.</strong> No online payment or deposit is required.</p>
          <div className="calendar-heading" id="calendar"><div><p className="eyebrow">Live studio availability</p><h2>Find your next session.</h2></div><a className="text-link" href={GOOGLE_BOOKING_URL} target="_blank" rel="noreferrer">Open in Google Calendar ↗</a></div>
          <div className="calendar-frame"><iframe src={`${GOOGLE_BOOKING_URL}?gv=true`} title="Book a one-hour VIRGO Podcast Studio session with Google Calendar" width="100%" height="760" /></div>
          <p className="calendar-help">Available times update with our calendar. Google shows the time zone beside the schedule. If the calendar doesn’t load, <a href={GOOGLE_BOOKING_URL} target="_blank" rel="noreferrer">open the booking page directly</a>.</p>
          <div className="email-steps"><article><span>01</span><h2>Pick a time.</h2><p>The calendar shows available one-hour sessions and automatically removes times that conflict with our schedule.</p></article><article><span>02</span><h2>Choose your package.</h2><p>Enter Studio Session ($75), Ready to Publish ($125), Podcast Starter Kit ($160), or Creator Starter Kit ($160) in the booking form.</p></article><article><span>03</span><h2>Come in. Create.</h2><p>Google emails your confirmation. Meet us at 1345 Avenue of the Americas, 2nd Floor, and pay at the studio on the day.</p></article></div>
          <aside className="longer-session"><div><p className="eyebrow">Need more recording time?</p><h2>Two hours. Half day. Full day.</h2><p>Longer sessions need a separate reservation for the full duration. Email Ezra with your preferred date, length and package to arrange yours.</p></div><a className="button button-primary" href={bookingEmail("Longer studio session")}>Arrange a longer session ↗</a></aside>
          <p className="email-fallback">Questions about your setup? Email <a href={`mailto:${STUDIO_EMAIL}`}>{STUDIO_EMAIL}</a>.</p>
        </section>
      </main><Footer />
    </>
  );
}
