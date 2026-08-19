import type { Metadata } from "next";
import { Footer, Header } from "../site-chrome";
import { BookingForm } from "./booking-form";

export const metadata: Metadata = {
  title: "Book the Studio | VIRGO Podcast Studio",
  description: "Choose a podcast production package and reserve a recording time at VIRGO Podcast Studio in Midtown Manhattan.",
};

export default function BookPage() {
  return (
    <>
      <Header />
      <main className="booking-page">
        <section className="booking-hero">
          <div className="container booking-hero-inner">
            <p className="eyebrow light">August 19–25, 2026 · New clients only</p>
            <h1>$10 Start Your Own Podcast Week</h1>
            <p>Choose an available promotional time and reserve your one-hour professional studio recording session securely.</p>
          </div>
        </section>
        <section className="creator-booking-callout" id="podcast-starter-kit">
          <div className="container creator-booking-inner">
            <div>
              <p className="eyebrow light">Podcast Starter Kit</p>
              <h2>Record once. Launch your podcast.</h2>
            </div>
            <div>
              <p>Select the Podcast Starter Kit below. It starts at $160 for one hour and combines studio recording, a polished episode, finished social content, managed distribution and our 100-real-viewer guarantee.</p>
              <a className="text-link text-link-light" href="#booking-calendar">Choose the Podcast Starter Kit <span aria-hidden="true">↓</span></a>
            </div>
          </div>
        </section>
        <div id="booking-calendar">
        <BookingForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
