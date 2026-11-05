"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { BOOKING_PACKAGES, formatPrice } from "../../../lib/booking-config";
import Link from "next/link";
import { CANCELLATION_POLICY } from "../../../lib/booking-policy";

const families = [...new Set(BOOKING_PACKAGES.map(p => p.title))];
const timeLabel = (time: string) => new Date(time).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZone: "America/New_York" });

export function TestBookingForm({ today, lastDate }: { today: string; lastDate: string }) {
  const [packageId, setPackageId] = useState(BOOKING_PACKAGES[0].id);
  const [date, setDate] = useState(today);
  const [slot, setSlot] = useState("");
  const [availability, setAvailability] = useState<{ key: string; slots: string[]; error?: string }>();
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [reload, setReload] = useState(0);
  const attempt = useRef<{ fingerprint: string; id: string } | null>(null);
  const selected = BOOKING_PACKAGES.find(p => p.id === packageId)!;
  const key = `${date}/${packageId}/${reload}`;
  const loading = availability?.key !== key;
  const slots = loading ? [] : availability.slots;

  useEffect(() => {
    const controller = new AbortController();
    fetch(`/api/test-booking/availability?date=${encodeURIComponent(date)}&packageId=${encodeURIComponent(packageId)}`, { cache: "no-store", signal: controller.signal })
      .then(async response => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.error ?? "Unable to check availability.");
        if (!controller.signal.aborted) setAvailability({ key, slots: data.slots });
      })
      .catch(error => { if (!controller.signal.aborted) setAvailability({ key, slots: [], error: error.message }); });
    return () => controller.abort();
  }, [date, packageId, key]);

  function choosePackage(id: string) { setPackageId(id); setSlot(""); setMessage(""); }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!slot || loading || !slots.includes(slot) || submitting) return;
    setSubmitting(true); setMessage("");
    const form = new FormData(event.currentTarget);
    const body = { packageId, start: slot, customerName: form.get("name"), customerEmail: form.get("email"), customerPhone: form.get("phone"), notes: form.get("notes") };
    const fingerprint = JSON.stringify(body);
    if (attempt.current?.fingerprint !== fingerprint) attempt.current = { fingerprint, id: crypto.randomUUID() };
    try {
      const response = await fetch("/api/test-booking/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...body, requestId: attempt.current.id }) });
      const data = await response.json();
      if (!response.ok) {
        if (response.status === 409) { setSlot(""); setReload(n => n + 1); }
        throw new Error(data.error ?? "Unable to open checkout.");
      }
      const url = new URL(data.url);
      if (url.protocol !== "https:" || url.hostname !== "checkout.stripe.com") throw new Error("Invalid checkout destination.");
      window.location.assign(url.href);
    } catch (error) { setMessage(error instanceof Error ? error.message : "Connection interrupted. Retry with the same details."); setSubmitting(false); }
  }

  return <section className="section booking-section"><div className="container booking-shell"><div className="booking-main">
    <div className="booking-step"><span>01</span><div><p className="eyebrow">Choose a package</p><h2>What are you making?</h2></div></div>
    <div className="booking-family-grid">{families.map(title => {
      const item = BOOKING_PACKAGES.find(p => p.title === title)!;
      return <button disabled={submitting} aria-pressed={selected.title === title} className={`booking-family ${selected.title === title ? "active" : ""}`} type="button" key={title} onClick={() => choosePackage(BOOKING_PACKAGES.find(p => p.title === title && p.durationMinutes === selected.durationMinutes)!.id)}><span>{item.family}</span><strong>{title}</strong><small>{item.description}</small></button>;
    })}</div>
    <div className="duration-grid" aria-label="Session length">{BOOKING_PACKAGES.filter(p => p.title === selected.title).map(item => <button disabled={submitting} aria-pressed={packageId === item.id} className={`duration-option ${packageId === item.id ? "active" : ""}`} key={item.id} onClick={() => choosePackage(item.id)} type="button"><span>{item.durationLabel}{item.durationMinutes >= 240 ? ` (${item.durationMinutes / 60} hours)` : ""}</span><strong>{formatPrice(item.priceCents)}</strong></button>)}</div>
    <p className="calendar-help">Custom sets, advanced graphics and additional deliverables are quoted separately. They are not included in this checkout.</p>
    <div className="booking-step booking-step-spaced"><span>02</span><div><p className="eyebrow">Choose a time</p><h2>Make room to record.</h2></div></div>
    <div className="field-grid"><label><span>Recording date · New York time</span><input disabled={submitting} aria-label="Recording date" type="date" value={date} min={today} max={lastDate} onChange={e => { setDate(e.target.value); setSlot(""); }} /></label></div>
    <p className="calendar-help">Monday–Sunday, 9 a.m.–6 p.m. · Two-hour notice · 30 minutes between sessions.</p>
    <div className="time-grid" aria-live="polite">{loading ? <p className="slot-status">Checking the studio calendar…</p> : availability?.error ? <p className="slot-status" role="alert">{availability.error} <button type="button" onClick={() => setReload(n => n + 1)}>Retry</button></p> : slots.length ? slots.map(time => <button disabled={submitting} aria-pressed={slot === time} className={`time-option ${slot === time ? "active" : ""}`} type="button" key={time} onClick={() => setSlot(time)}>{timeLabel(time)}</button>) : <p className="slot-status">No times fit this session. Choose another date or duration.</p>}</div>
    <form className="booking-details" onSubmit={submit}>
      <div className="booking-step booking-step-spaced"><span>03</span><div><p className="eyebrow">Test your checkout</p><h2>Your details.</h2></div></div>
      <div className="field-grid">
        <label><span>Name</span><input name="name" required maxLength={120} autoComplete="name" disabled={submitting} /></label>
        <label><span>Email</span><input name="email" type="email" required maxLength={254} autoComplete="email" disabled={submitting} /></label>
        <label className="field-wide"><span>Phone (optional)</span><input name="phone" type="tel" maxLength={40} autoComplete="tel" disabled={submitting} /></label>
        <label className="field-wide"><span>Session format or notes (optional)</span><textarea name="notes" maxLength={2000} rows={4} placeholder="Podcast Therapy, number of guests, or special requests. Quoted extras are not charged here." disabled={submitting} /></label>
      </div>
      {message && <p className="booking-message" role="alert">{message}</p>}
      <p className="calendar-help">{CANCELLATION_POLICY} <Link href="/booking-policy">Read the booking policy</Link>.</p>
      <button className="button button-primary booking-submit" type="submit" disabled={!slot || loading || !slots.includes(slot) || submitting}>{submitting ? "Opening Stripe test checkout…" : `Test checkout · ${formatPrice(selected.priceCents)}`}</button>
      <p className="checkout-note">No real charges or customer reservations. Use Stripe test payment details only.</p>
    </form>
  </div><aside className="booking-summary"><p className="eyebrow light">Your test session</p><h3>{selected.title}</h3><dl>
    <div><dt>Duration</dt><dd>{selected.durationLabel}{selected.durationMinutes >= 240 ? ` · ${selected.durationMinutes / 60} hours` : ""}</dd></div><div><dt>Date</dt><dd>{date}</dd></div><div><dt>New York time</dt><dd>{slot ? timeLabel(slot) : "Choose a time"}</dd></div><div><dt>Total</dt><dd>{formatPrice(selected.priceCents)}</dd></div>
  </dl><p>Payment and calendar confirmation are checked before a test booking is marked complete.</p></aside></div></section>;
}
