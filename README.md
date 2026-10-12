# VIRGO Podcast Studio

Next.js website deployed to Vercel from the connected GitHub repository.

## Booking

All booking calls to action open an email draft to ezraberke@virgopodcast.com. Availability and package details are confirmed by email; payment is made on site on the day of the session. The former checkout API returns HTTP 410 and cannot create a payment. Historical success/cancel URLs redirect to the email booking page.

The signed Stripe webhook remains only to settle any payment already initiated before checkout was retired. No website flow creates a new Stripe session. Existing booking records and calendar integrations are preserved.

## Development

Install with `npm ci`, run `npm run dev`, and verify a production build with `npm run build`.

## October 2026 refresh

Updated studio photographs supplied by the owner, cleaner homepage and shared navigation, and a location feature about the building’s appearance as Dunder Mifflin’s corporate exterior in The Office. The exterior image is the owner-supplied photograph; it is not presented as a television still. Location reference: https://sites.google.com/site/theofficefilmlocations/home/season-5
