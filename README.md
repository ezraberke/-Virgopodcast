# VIRGO Podcast Studio

Next.js website deployed to Vercel from the connected GitHub repository.

## Booking

Primary booking links lead to `/book`, which embeds the public Google Calendar appointment page configured in `lib/booking-links.ts`. The Google schedule offers one-hour sessions, Monday–Sunday 9am–6pm (including Saturday and Sunday) in America/New_York, with a 30-minute buffer between appointments, a two-hour minimum lead time and a 60-day booking window. Its primary calendar availability check is enabled. The optional session-format field lets customers identify Podcast Therapy sessions. Google manages reservations and customer confirmations; private event details are not embedded in the website.

The Google account currently allows only one appointment schedule. Two-hour, half-day and full-day reservations are clearly offered by email to ezraberke@virgopodcast.com. All sessions are paid on site on the day. No online payment or deposit is collected.

Basketball practices and Ramaz games must be marked Busy on the checked calendar to block appointments. Events marked Free do not block time. Games with unknown times need their all-day status handled before opening those dates. Future schedule changes should be made in Google Calendar, not hardcoded into the website.

The former checkout and availability APIs return HTTP 410 so cached clients cannot create payments or use obsolete availability. Historical success/cancel URLs redirect to `/book`. The signed Stripe webhook and its database/calendar integration remain only for payments already initiated before checkout was retired. No current website flow creates a new Stripe session.

## Development

Install with `npm ci`, run `npm run dev`, and verify a production build with `npm run build`.

## October 2026 refresh

Updated studio photographs supplied by the owner, cleaner homepage and shared navigation, and a location feature about the building’s appearance as Dunder Mifflin’s corporate exterior in The Office. The exterior image is the owner-supplied photograph; it is not presented as a television still. Location reference: https://sites.google.com/site/theofficefilmlocations/home/season-5
