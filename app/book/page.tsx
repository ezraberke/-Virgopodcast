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
            <p className="eyebrow light">Book the studio</p>
            <h1>Reserve your recording session.</h1>
            <p>Choose a package, find a time and complete your reservation securely. All sessions include an on-site producer.</p>
          </div>
        </section>
        <section className="creator-booking-callout" id="creator-kit">
          <div className="container creator-booking-inner">
            <div>
              <p className="eyebrow light">Creator Starter Kit</p>
              <h2>Record once. Launch with a plan.</h2>
            </div>
            <div>
              <p>Select the Creator Starter Kit below. It starts at $160 for one hour and combines studio recording, finished social content, managed distribution and our 100-real-viewer guarantee.</p>
              <a className="text-link text-link-light" href="#booking-calendar">Choose the Creator Starter Kit <span aria-hidden="true">↓</span></a>
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
