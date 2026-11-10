# VIRGO Podcast Studio

Next.js website deployed to Vercel from the connected GitHub repository.

## Booking

Primary booking links lead to `/book`. This interim page collects a preferred date, time (America/New_York), length and package, then prepares an email request to the existing studio inbox. It does not submit a reservation, collect payments, or claim live availability. Clients must send the email and receive confirmation from Ezra. Any time of day may be requested; this does not promise that the studio is open or staffed at every hour.

The former Google appointment link was reported broken. Keep it out of the customer flow until a replacement schedule has been verified with the correct conflict calendars, online-class exceptions and travel buffers. Private event details must never appear in public availability responses. All sessions remain paid on site on the day, with no online payment or deposit collected by this flow.

The former checkout and availability APIs return HTTP 410 so cached clients cannot create payments or use obsolete availability. Historical success/cancel URLs redirect to `/book`. The signed Stripe webhook and its database/calendar integration remain only for payments already initiated before checkout was retired. No current website flow creates a new Stripe session.

## Development

Install with `npm ci`, run `npm run dev`, and verify a production build with `npm run build`.

## October 2026 refresh

Updated studio photographs supplied by the owner, cleaner homepage and shared navigation, and a location feature about the building’s appearance as Dunder Mifflin’s corporate exterior in The Office. The exterior image is the owner-supplied photograph; it is not presented as a television still. Location reference: https://sites.google.com/site/theofficefilmlocations/home/season-5
