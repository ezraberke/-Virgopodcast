"use client";

import { useEffect, useState, type FormEvent } from "react";
import { BOOKING_PACKAGES, formatPrice } from "../../lib/booking-config";

const dateKey = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const initialDates = () => {
  const dates: Date[] = [];
  const cursor = new Date();
  cursor.setHours(12, 0, 0, 0);
  for (let offset = 1; dates.length < 21; offset += 1) {
    const candidate = new Date(cursor);
    candidate.setDate(cursor.getDate() + offset);
    if (candidate.getDay() !== 0 && candidate.getDay() !== 6) dates.push(candidate);
  }
  return dates;
};

export function BookingForm() {
  const [dates] = useState(initialDates);
  const families = [...new Set(BOOKING_PACKAGES.map((item) => item.title))];
  const [family, setFamily] = useState("Studio session");
  const variants = BOOKING_PACKAGES.filter((item) => item.title === family);
  const [packageId, setPackageId] = useState("studio-session-1-hour");
  const [date, setDate] = useState(dateKey(dates[0]));
  const [slots, setSlots] = useState<string[]>([]);
  const [slot, setSlot] = useState("");
  const [loadingSlots, setLoadingSlots] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const selectedPackage = BOOKING_PACKAGES.find((item) => item.id === packageId)!;

  useEffect(() => {
    const controller = new AbortController();
    fetch(`/api/availability?date=${encodeURIComponent(date)}&packageId=${encodeURIComponent(packageId)}`, { signal: controller.signal })
      .then((response) => response.json())
      .then((data) => setSlots(data.slots ?? []))
      .catch((error) => { if (error.name !== "AbortError") setSlots([]); })
      .finally(() => setLoadingSlots(false));
    return () => controller.abort();
  }, [date, packageId]);

  function chooseFamily(title: string) {
    setFamily(title);
    setPackageId(BOOKING_PACKAGES.find((item) => item.title === title)!.id);
    setLoadingSlots(true);
    setSlot("");
  }

  function choosePackage(id: string) {
    setPackageId(id);
    setLoadingSlots(true);
    setSlot("");
  }

  function chooseDate(value: string) {
    setDate(value);
    setLoadingSlots(true);
    setSlot("");
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!slot) return setMessage("Choose an available time first.");
    setSubmitting(true);
    setMessage("");
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        packageId,
        start: slot,
        customerName: form.get("name"),
        customerEmail: form.get("email"),
        customerPhone: form.get("phone"),
        notes: form.get("notes"),
      }),
    });
    const data = await response.json();
    if (response.ok && data.url) window.location.href = data.url;
    else {
      setMessage(data.error ?? "We could not start checkout. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <section className="section booking-section">
      <div className="container booking-shell">
        <div className="booking-main">
          <div className="booking-step">
            <span>01</span><div><p className="eyebrow">Choose a package</p><h2>What do you need?</h2></div>
          </div>
          <div className="booking-family-grid">
            {families.map((title) => {
              const item = BOOKING_PACKAGES.find((pkg) => pkg.title === title)!;
              return (
                <button className={family === title ? "booking-family active" : "booking-family"} key={title} onClick={() => chooseFamily(title)} type="button">
                  <span>{item.family}</span><strong>{title}</strong><small>{item.description}</small>
                </button>
              );
            })}
          </div>
          <div className="duration-grid" aria-label="Session length">
            {variants.map((item) => (
              <button className={packageId === item.id ? "duration-option active" : "duration-option"} key={item.id} onClick={() => choosePackage(item.id)} type="button">
                <span>{item.durationLabel}</span><strong>{formatPrice(item.priceCents)}</strong>
              </button>
            ))}
          </div>

          <div className="booking-step booking-step-spaced">
            <span>02</span><div><p className="eyebrow">Choose a date</p><h2>When works for you?</h2></div>
          </div>
          <div className="date-strip">
            {dates.map((item) => (
              <button className={date === dateKey(item) ? "date-option active" : "date-option"} key={dateKey(item)} onClick={() => chooseDate(dateKey(item))} type="button">
                <small>{item.toLocaleDateString("en-US", { weekday: "short" })}</small>
                <strong>{item.getDate()}</strong>
                <span>{item.toLocaleDateString("en-US", { month: "short" })}</span>
              </button>
            ))}
          </div>
          <div className="time-grid" aria-live="polite">
            {loadingSlots ? <p className="slot-status">Checking the studio calendar…</p> : slots.length ? slots.map((time) => (
              <button className={slot === time ? "time-option active" : "time-option"} key={time} onClick={() => setSlot(time)} type="button">
                {new Date(time).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZone: "America/New_York" })}
              </button>
            )) : <p className="slot-status">No online times are available on this date. Try another date or call us.</p>}
          </div>

          <form className="booking-details" onSubmit={submit}>
            <div className="booking-step booking-step-spaced">
              <span>03</span><div><p className="eyebrow">Your details</p><h2>Complete your booking.</h2></div>
            </div>
            <div className="field-grid">
              <label><span>Name</span><input name="name" required autoComplete="name" /></label>
              <label><span>Email</span><input name="email" type="email" required autoComplete="email" /></label>
              <label className="field-wide"><span>Phone</span><input name="phone" type="tel" autoComplete="tel" /></label>
              <label className="field-wide"><span>Anything we should know?</span><textarea name="notes" rows={4} placeholder="Show topic, number of guests, remote guest or special requests" /></label>
            </div>
            {message && <p className="booking-message" role="alert">{message}</p>}
            <button className="button button-primary booking-submit" disabled={!slot || submitting} type="submit">
              {submitting ? "Opening secure checkout…" : `Continue to payment · ${formatPrice(selectedPackage.priceCents)}`}
            </button>
            <p className="checkout-note">Secure payment powered by Stripe. Rescheduling and refunds are handled directly by the studio.</p>
          </form>
        </div>
        <aside className="booking-summary">
          <p className="eyebrow light">Your session</p>
          <h3>{selectedPackage.title}</h3>
          <dl>
            <div><dt>Length</dt><dd>{selectedPackage.durationLabel}</dd></div>
            <div><dt>Date</dt><dd>{new Date(`${date}T12:00:00`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</dd></div>
            <div><dt>Time</dt><dd>{slot ? new Date(slot).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZone: "America/New_York" }) : "Choose a time"}</dd></div>
            <div><dt>Total</dt><dd>{formatPrice(selectedPackage.priceCents)}</dd></div>
          </dl>
          <ul><li>On-site producer included</li><li>Professional cameras and microphones</li><li>Midtown Manhattan studio</li><li>Email confirmation after payment</li></ul>
          <a href="tel:+12149036838">Need help? Call (214) 903-6838</a>
        </aside>
      </div>
    </section>
  );
}
