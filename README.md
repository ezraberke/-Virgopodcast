# VIRGO Podcast Studio website

This folder is ready to upload to a GitHub repository and deploy through Vercel.

## Upload

1. Add every file and folder here to the root of your GitHub repository.
2. Commit the changes to the branch connected to Vercel.
3. Vercel will detect the Next.js project and deploy it automatically.

No environment variables or database setup are required.

## Included

- Redesigned VIRGO Podcast Studio homepage
- “Our Work” portfolio page
- 2025 NBA Redraft, Lessons in Bible #3, and the Ace Bailey social edit
- Less-than-24-hour delivery messaging
- Free consultation phone links for (214) 903-6838
- Responsive desktop and mobile layouts
# VIRGO Podcast Studio

## Booking system setup

The `/book` flow uses Stripe Checkout, Neon Postgres and Google Calendar. It is safe to deploy as a preview before credentials are configured; checkout remains unavailable until the required server-side variables exist.

1. Create a Neon Postgres database and run `db/schema.sql` in its SQL editor.
2. Copy the values from `.env.example` into Vercel → Project Settings → Environment Variables.
3. Create a separate Google Calendar named `Virgo Podcast Bookings`.
4. Create a Google Cloud service account, enable the Google Calendar API and share the booking calendar with the service account email using “Make changes to events.”
5. Create a Stripe webhook at `https://virgopodcast.com/api/stripe/webhook` for `checkout.session.completed` and `checkout.session.expired`.
6. Use Stripe test keys for the preview deployment. Replace them with live keys only after a full test booking.

Normal hours, buffers and all packages/prices are centralized in `lib/booking-config.ts`.
