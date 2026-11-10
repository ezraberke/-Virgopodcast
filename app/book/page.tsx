import type { Metadata } from "next";
import { Footer, Header } from "../site-chrome";
import { bookingEmail, STUDIO_EMAIL } from "../../lib/contact";
import RequestTime from "./request-time";

export const metadata: Metadata = {
  title: "Book a Session | VIRGO Podcast Studio",
  description: "Request a recording time at VIRGO, any day of the week. Ezra confirms availability and session details. Pay on site on the day of your session.",
};

export default function BookPage() {
  return (
    <><Header />
      <main id="main-content" className="email-booking-page">
        <section className="container email-booking-intro">
          <p className="eyebrow">Make time for your next great conversation</p>
          <h1>Request your time.<br />Pay on site.</h1>
          <p>Tell us when you’d like to record and which package you have in mind. Ezra will confirm availability and session details by email.</p>
          <p className="booking-hours">Request a time Monday–Sunday, including evenings and weekends. All requested times are in New York time and subject to confirmation.</p>
          <p className="booking-payment"><strong>Payment is due on site on the day of your session.</strong> No online payment or deposit is required.</p>
          <RequestTime />
          <div className="email-steps"><article><span>01</span><h2>Request a time.</h2><p>Choose your preferred date, start time and session length. We’ll check the studio and producer’s availability.</p></article><article><span>02</span><h2>Choose your package.</h2><p>Choose Studio Session ($75), Ready to Publish ($125), Podcast Starter Kit ($160), or Creator Starter Kit ($160) for a one-hour session. Select Podcast Therapy if that is your preferred session format; ask Ezra to confirm its details.</p></article><article><span>03</span><h2>Come in. Create.</h2><p>Once Ezra confirms your reservation by email, you’re ready to record. Meet us at 1345 Avenue of the Americas, 2nd Floor, and pay at the studio on the day.</p></article></div>
          <aside className="longer-session"><div><p className="eyebrow">Need more recording time?</p><h2>Two hours. Half day. Full day.</h2><p>Longer sessions need a separate reservation for the full duration. Email Ezra with your preferred date, length and package to arrange yours.</p></div><a className="button button-primary" href={bookingEmail("Longer studio session")}>Arrange a longer session</a></aside>
          <p className="email-fallback">Questions about your setup? Email <a href={`mailto:${STUDIO_EMAIL}`}>{STUDIO_EMAIL}</a>.</p>
        </section>
      </main><Footer />
    </>
  );
}
