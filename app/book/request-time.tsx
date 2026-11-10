"use client";

import { useState, type FormEvent } from "react";
import { PUBLIC_BOOKING_URL, newYorkDateTime, isPastRequest } from "../../lib/booking-request";
import { STUDIO_EMAIL } from "../../lib/contact";

export default function RequestTime() {
  const [draft, setDraft] = useState("");
  const [requestText, setRequestText] = useState("");
  const [requestCopied, setRequestCopied] = useState(false);
  const [requestCopyError, setRequestCopyError] = useState(false);
  const [dateError, setDateError] = useState("");
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);

  function prepareRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const date = String(data.get("date"));
    const time = String(data.get("time"));
    if (isPastRequest(date, time)) {
      setDraft("");
      setDateError("Choose a date and time in the future (New York time).");
      return;
    }
    setDateError("");
    const body = `Hi Ezra,\n\nI'd like to request a studio session.\n\nPreferred date: ${data.get("date")}\nStart time: ${data.get("time")} (New York time)\nSession length: ${data.get("duration")}\nPackage: ${data.get("package")}\n\nPlease confirm availability and the price for this session. I understand this request is not a confirmed reservation and payment is made on site on the day.\n\nThanks!`;
    setRequestText(body);
    setRequestCopied(false);
    setRequestCopyError(false);
    setDraft(`mailto:${STUDIO_EMAIL}?subject=${encodeURIComponent("VIRGO studio time request")}&body=${encodeURIComponent(body)}`);
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(PUBLIC_BOOKING_URL);
      setCopied(true);
      setCopyError(false);
    } catch {
      setCopyError(true);
    }
  }

  async function copyRequest() {
    try {
      await navigator.clipboard.writeText(requestText);
      setRequestCopied(true);
      setRequestCopyError(false);
    } catch {
      setRequestCopyError(true);
    }
  }

  return (
    <section className="time-request" aria-labelledby="request-title">
      <div className="time-request-heading">
        <div><p className="eyebrow">Plan your recording</p><h2 id="request-title">Request a time.</h2></div>
        <button className="button" type="button" onClick={copyLink}>{copied ? "Link copied" : "Copy booking link"}</button>
      </div>
      <p id="request-help">You can request any time of day, seven days a week. This form does not show live availability. Ezra will confirm whether your requested time is available before your reservation is booked.</p>
      <form onSubmit={prepareRequest} onChange={() => { setDraft(""); setDateError(""); }} aria-describedby="request-help">
        <div className="time-request-grid">
          <label>Preferred date<input name="date" type="date" required onFocus={(event) => { event.currentTarget.min = newYorkDateTime().slice(0, 10); }} /></label>
          <label>Start time <span>(New York time)</span><input name="time" type="time" required step="900" /></label>
          <label>Session length<select name="duration" required defaultValue="1 hour"><option>1 hour</option><option>90 minutes</option><option>2 hours</option><option>3 hours</option><option>Half day</option><option>Full day</option><option>Other — let’s discuss</option></select></label>
          <label>Package<select name="package" required defaultValue="Studio Session"><option>Studio Session</option><option>Ready to Publish</option><option>Podcast Starter Kit</option><option>Creator Starter Kit</option><option>Podcast Therapy</option><option>Help me choose</option></select></label>
        </div>
        <button className="button button-primary" type="submit">Prepare email request ↗</button>
        <p className="request-note">No reservation or payment is made here. You will review and send the request from your email app.</p>
      </form>
      <div aria-live="polite">
        {dateError && <p role="alert">{dateError}</p>}
        {draft && <div className="request-ready"><p>Your request is ready. <a href={draft}>Open your email draft ↗</a> and send it to Ezra.</p><p>No email app? Copy the request below and send it from your usual email service to <a href={`mailto:${STUDIO_EMAIL}`}>{STUDIO_EMAIL}</a>.</p><button type="button" className="button" onClick={copyRequest}>{requestCopied ? "Request copied" : "Copy request text"}</button><label>Request text<textarea readOnly rows={12} value={requestText} onFocus={(event) => event.currentTarget.select()} /></label>{requestCopyError && <p>Automatic copying was unavailable. Select and copy the request text above.</p>}</div>}
        {copyError && <p>Copy this link to share: <a href={PUBLIC_BOOKING_URL}>{PUBLIC_BOOKING_URL}</a></p>}
      </div>
    </section>
  );
}
