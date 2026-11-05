# VIRGO Podcast Studio

Next.js website deployed to Vercel from the connected GitHub repository.

## Booking

All booking buttons lead to `/book`. In the explicitly enabled, protected Preview, this opens the complete Stripe **test** flow for every package and duration. Production refuses that flow and uses a contact-the-studio fallback until a separate live release is reviewed. The broken Google appointment iframe and direct schedule links have been removed from this branch.

The website owns checkout holds and booking records. Google Calendar supplies busy intervals from the owner's primary and studio calendars. Do not run a parallel Google appointment schedule: it cannot see website checkout holds. Keep practices, games and other unavailable periods marked Busy; Free events do not block recording. Website hours are Monday–Sunday, 09:00–18:00 New York time, with a 30-minute buffer, two-hour notice and a 60-day window. Review hours here when availability rules change.

All 16 package/duration prices use the shared catalog. Custom extras and nonstandard durations remain separately quoted. The owner-approved cancellation rule is displayed on the website and Stripe Checkout: cancellations within 24 hours of the scheduled start are non-refundable. Earlier refunds and rescheduling requests go to the studio; no additional entitlement or fee was invented.

A calendar conflict discovered after test payment triggers a full test refund instead of a reservation. The refund decision is committed before Stripe is called; retries recover the same refund. This operational failure refund is separate from customer-initiated cancellation policy. See the runbook for recovery and launch gates.

Retired checkout and availability APIs return HTTP 410 and point to `/book`. Historical success/cancel URLs still redirect there. The legacy signed settlement endpoint remains for previously initiated payments.

## Development

Install with `npm ci`, run `npm run dev`, and verify a production build with `npm run build`.

## Stripe test integration (review only)

The new `/book/test` flow preserves package prices and validates calendar availability before starting server-side Stripe Checkout. It is disabled by default, refuses live keys and Vercel Production, and uses a separate test database and test calendar. `/book` uses the same test flow in the enabled Preview; outside it, the site offers the safe contact fallback. See [the setup, test plan and release boundaries](docs/stripe-test-checkout.md). Run `npm test` for the booking/payment regression suite.

## October 2026 refresh

Updated studio photographs supplied by the owner, cleaner homepage and shared navigation, and a location feature about the building’s appearance as Dunder Mifflin’s corporate exterior in The Office. The exterior image is the owner-supplied photograph; it is not presented as a television still. Location reference: https://sites.google.com/site/theofficefilmlocations/home/season-5
