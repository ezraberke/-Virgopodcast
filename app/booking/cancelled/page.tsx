import { Footer, Header } from "../../site-chrome";

export default function BookingCancelledPage() {
  return (
    <><Header /><main className="booking-result"><div className="container booking-result-card"><p className="eyebrow">Checkout cancelled</p><h1>Your time was not booked.</h1><p>No payment was completed. You can return to the calendar and choose the same time while it remains available.</p><div className="button-row centered-buttons"><a className="button button-primary" href="/book">Return to booking</a></div></div></main><Footer /></>
  );
}
