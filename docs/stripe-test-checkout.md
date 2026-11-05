# Stripe sandbox checkout review

## Scope

The existing `/book` Google appointment page, pay-on-site copy, and legacy payment settlement endpoint stay unchanged. The new flow is `/book/test`, with APIs under `/api/test-booking` and a separate signed webhook at `/api/stripe/test-webhook`. It is disabled by default and refuses Vercel Production or live Stripe keys. No payout/bank setup is needed.

The same `BOOKING_PACKAGES` catalog supplies the UI and server. Prices remain:

| Package | 1 hour | 2 hours | 4 hours | 8 hours |
| --- | ---: | ---: | ---: | ---: |
| Studio session | $75 | $125 | $200 | $350 |
| Ready to publish | $125 | $175 | $250 | $395 |
| Podcast Starter Kit | $160 | $250 | $350 | $550 |
| Creator Starter Kit | $160 | $250 | $350 | $550 |

There is no fixed-price add-on catalog in this repository. Custom sets, advanced graphics, extra deliverables, and nonstandard durations remain studio quotes. The integration rejects browser-supplied prices and add-ons. Do not multiply the one-hour rate for discounted package durations.

## Configure a protected preview

1. Create an isolated Neon branch/database. Run `db/test-bookings.sql` against it. Do not run this migration against the production database. Set its URL as `TEST_DATABASE_URL`.
2. Create a dedicated Google test calendar. Give the service account write access to that calendar and free/busy access to every calendar checked by the current Google appointment schedule. Set `GOOGLE_TEST_CALENDAR_ID`, `GOOGLE_AVAILABILITY_CALENDAR_IDS`, `GOOGLE_TEST_CLIENT_EMAIL`, and `GOOGLE_TEST_PRIVATE_KEY`. Alternatively, explicitly set `GOOGLE_TEST_USE_EXISTING_SERVICE_ACCOUNT=true` to use the already-saved `GOOGLE_CLIENT_EMAIL`/`GOOGLE_PRIVATE_KEY` pair inside the server; the code never mixes credentials from different pairs or exposes them. Use full calendar IDs, not `primary`. The test calendar must not be one of the live calendars or be included in the public Google schedule's conflict checking.
3. In Stripe Sandbox/Test mode, create a test secret API key (`sk_test_...`). Store it in Vercel as `STRIPE_TEST_SECRET_KEY`. Never put secrets in chat, source control, or a `NEXT_PUBLIC_` variable. Hosted Checkout does not need a publishable key.
4. Set `TEST_CHECKOUT_ENABLED=true` only for the review branch's Preview environment. Keep Vercel deployment protection enabled. Omit `TEST_CHECKOUT_ORIGIN` on Vercel; the exact `VERCEL_URL` is used. On localhost use `http://localhost:3000`.
5. Register a **snapshot** webhook in the same Stripe test account for `checkout.session.completed`, `checkout.session.expired`, `checkout.session.async_payment_succeeded`, and `checkout.session.async_payment_failed`. Endpoint: `https://<preview-host>/api/stripe/test-webhook`. Store that endpoint's signing secret in `STRIPE_TEST_WEBHOOK_SECRET`.
6. Vercel protection must allow Stripe to reach the webhook. Keep deployment protection enabled. Vercel supports a dedicated automation bypass secret in the Stripe endpoint's `x-vercel-protection-bypass` query parameter. This secret grants access to all protected deployments in this project, so obtain the owner's explicit approval before provisioning and transmitting it to Stripe. Store the URL only in Stripe's private sandbox endpoint configuration; never commit or publish it. Revoke it when this review integration is retired. Without that approval, use local testing with `stripe listen --forward-to localhost:3000/api/stripe/test-webhook` and its signing secret instead.
7. Redeploy the Preview, visit its exact generated hostname at `/book/test`, and complete the test cases below. A branch alias is not accepted as a checkout origin unless it exactly matches the validated configuration.

The saved legacy Vercel variables are sensitive and cannot be read back through the integration. Existing production variables must not be replaced to run these tests. The explicit Google reuse option reads the existing credential only at server runtime; it does not export or copy the secret.

## Provisioning observations (November 5, 2026)

- Created the separate free Neon database `virgo-stripe-test`, connected only to Vercel Preview with the `TEST` prefix. Applied the migration and verified 19 columns, five indexes, and zero bookings.
- Created `Virgo Stripe Test Bookings` in New York time and granted the existing studio service account event access with the owner's approval.
- Saved the existing Stripe sandbox API key as a sensitive variable for `codex/stripe-test-checkout` Preview only.
- The public Google appointment URL currently returns **Appointment not found**, and the authenticated calendar shows no existing booking page. The code's documented 09:00–18:00 New York schedule is retained for testing, but the old public Google booking flow needs owner review before a live launch. This branch does not silently replace the public link or create a new public schedule.
- With explicit owner approval, granted the existing service account free/busy-only access to the main Google calendar. Availability checks include both the main and studio calendars, plus the isolated test calendar. Main-calendar event details remain hidden from the service account.
- With explicit owner approval, created a dedicated Vercel automation bypass secret and stored it only in the private Stripe sandbox webhook URL. Deployment protection remains enabled. Original and replayed completion deliveries returned HTTP 200. Revoke this secret when the review integration is retired.

## Availability and payment behavior

- New York time, Monday–Sunday 09:00–18:00, 30-minute start increments, two-hour lead time, 60-day window, full package duration, and 30-minute buffers match the current documented Google booking policy. Existing closure dates still apply.
- Google Calendar free/busy is checked at availability lookup, again during reservation, and again after payment. Missing credentials, per-calendar errors, or malformed responses fail closed.
- Google appointment schedules do not expose their schedule rules through this integration. Future changes to appointment hours/lead time/buffers must also be reflected in the shared booking policy before testing or release. All busy calendars used by the Google schedule must be configured explicitly.
- A database transaction plus a studio-wide advisory lock serializes reservations and fulfillment. Held/confirmed/review bookings all block overlap. A hold expires in Stripe after 35 minutes; it is released only after Stripe confirms expiration. The database timestamp alone never frees an uncertain payment.
- The server persists the quote before calling Stripe. Retries use the same request UUID, booking and Stripe idempotency key. An ambiguous network failure retains the hold instead of risking a duplicate charge or overlapping booking.
- Card-only payment sessions avoid delayed-method reservation windows. Browser totals, quantities, discounts and redirect URLs are not accepted.
- Signed webhooks retrieve current Stripe state and validate test mode, booking ID, session ID, currency and amount. Browser return pages also retrieve Stripe state; merely visiting a success URL never confirms payment.
- The test calendar event uses a deterministic ID. If Calendar succeeds but the database write fails, retries recover that event instead of creating another. Failed writes return non-2xx so Stripe retries.
- A new external calendar conflict after checkout sends the test booking to `needs_review`; it is never shown as confirmed. This intentionally surfaces the race with independently edited Google bookings.
- Test events contain no attendees or contact details and send no invitations. They are explicitly marked as tests. The result page does not expose customer details.
- The existing public Google booking flow does not consult test holds or test events. Test bookings are **not real reservations**.

## Validation

Run `npm ci`, `npm test`, `npm run typecheck`, `npm run lint`, and `npm run build`.

Automated tests use a real embedded PostgreSQL engine (PGlite) for migration, SQL predicates and state transitions; Stripe and Google are test doubles. PGlite has one connection, so the test adapter serializes transactions. The protected preview was additionally tested against real Neon, Stripe sandbox and Google Calendar on November 5, 2026, using application commit `dd98c36cbf101716bf05cdf293d68d08f12ddf2b`:

- The Ready to publish two-hour package produced a USD 175.00 test Checkout Session for November 7, 09:00–11:00 New York time.
- The decline card showed an error. The database remained `held`, with no calendar event.
- Retrying that session with the success card returned a confirmed result. The database stored 17500 cents and one deterministic test event. Google Calendar showed exactly one two-hour event, marked as a test without customer contact details.
- Stripe delivered `checkout.session.completed` to the protected preview with HTTP 200. Manually replaying the same event also returned HTTP 200; the booking and calendar event remained single instances.
- Availability excluded the confirmed interval and its buffer: the next start was 11:30 New York time.
- Two browser tabs submitted the same 11:30 slot simultaneously against Neon. Exactly one reached the USD 75.00 one-hour Checkout; the other displayed “Someone just selected that time. Choose another.” Database verification found only one additional hold.
- Returning from the unpaid Checkout showed “Checkout closed” without claiming payment or releasing its hold. Explicitly expiring that sandbox session in Stripe changed the database row to `expired` through the webhook, created no calendar event, and restored 11:30 availability.

The repository checks passed: 60 tests, type checking, production build and lint (10 pre-existing image warnings). Production dependency audit found no vulnerabilities; eight moderate development-tool findings remain.

The following is the broader regression checklist. The completed provider checks above cover success, decline, duplicate notification, overlapping requests, cancellation/expiration, and the confirmed-booking buffer. Automated tests cover every catalog price, provider failures and post-payment conflicts. Authentication-required cards, deliberate provider outages, post-payment external conflicts, and every catalog combination were not all exercised against the real providers; complete those release rehearsals before any live implementation.

- Try each package at all four durations and compare the Stripe amount with the catalog.
- Verify a busy event, all-day event, weekend, long session, 30-minute buffer and booking boundary against the actual checked calendars.
- Attempt two concurrent overlapping checkouts from separate browsers; only one may hold the slot.
- Use Stripe's standard success test card `4242 4242 4242 4242` and decline test card `4000 0000 0000 0002`, any future expiry and test CVC. Check authentication-required behavior with `4000 0025 0000 3155`.
- Cancel or abandon Checkout. Confirm that returning to the site does not falsely claim payment/cancellation; after Stripe expiration the slot becomes available.
- Replay a signed completion webhook. Expect one test booking and one calendar event.
- Make Calendar temporarily unavailable, then restore it and replay. Expect a retriable error followed by a single confirmed test event.
- Add a conflicting busy event during checkout. Expect `needs_review`, no calendar confirmation, and a clear result message.
- Verify live keys and `VERCEL_ENV=production` refuse all new payment requests and hide `/book/test`.

For a stuck hold, first find its test Checkout Session in Stripe using the booking ID metadata. Redeliver its completion/expiration webhook. If the server failed before a session could be linked, the webhook can still locate the persisted booking by metadata. If Stripe definitively confirms no session/payment exists, an operator may mark that specific test hold expired. Never bulk-delete holds based on elapsed time alone.

## Review before real payments

This implementation cannot be turned live just by replacing the key. A separate reviewed change must choose a single real reservation authority, address the Google appointment page's concurrent booking race (including reservation holds), handle real payment conflicts/refunds and customer notifications, and verify the precise schedule and add-on catalog. Review cancellation/refund policy and operational alerts/reconciliation before any live release. Set up bank details/payouts last, after the test flow is approved.

Reference: [Stripe fulfillment](https://docs.stripe.com/checkout/fulfillment), [Stripe webhooks](https://docs.stripe.com/webhooks), [Google free/busy](https://developers.google.com/workspace/calendar/api/v3/reference/freebusy/query).
