# Live availability

Disabled unless `LIVE_AVAILABILITY_ENABLED=true`. Verify every source and reconcile known off-calendar unavailability before enabling.

Server-only environment:
- Existing GOOGLE_CLIENT_EMAIL and GOOGLE_PRIVATE_KEY.
- LIVE_AVAILABILITY_SOURCES JSON: [{id,mode:"events",rule:{ignore:[],buffer:[],forceBusy:[]}},{id,mode:"freebusy"}]. At least two required. Exact event/series identifiers only; include all relevant reservation calendars.
- LIVE_AVAILABILITY_BLOCKS JSON [{start,end}] for verified extra unavailability, with ISO timestamps. Private provenance remains outside this repo.
- LIVE_AVAILABILITY_REVIEWED_THROUGH ISO date: requests beyond this reviewed configuration horizon fail closed. Display is capped at six months or the review horizon, whichever comes first.

Google expands changed recurrences; exempt events are removed before other blockers are merged, so overlapping trips remain blocked. Buffer identifiers receive 30 minutes before/after actual occurrences. Other busy events block actual time. New timed events with clear physical evidence receive 30-minute buffers: explicit EXPOS class or Junior Seminar attendance, basketball practice/game or Ramaz match naming, or a street address. Reminder/deadline titles and explicitly online locations do not trigger classification; known ID buffers remain authoritative. Ambiguous events block actual time only. Explicit Flight to / numbered Flight titles also block when transparent and get 30-minute departure/arrival buffers; separate flights do not imply a continuous trip. Transparent events are ignored unless explicitly forced busy. Only exact authorized online identifiers are excluded; an online label never makes a busy event free. Classification reads summary/location only server-side, without logging, persisting or returning those fields.

Only read-only Google scopes. Public JSON contains only time ranges, zone, and freshness timestamps; no event identifiers, calendar identifiers or details. Errors do not leak provider data. Missing credentials, denied/missing calendar, malformed interval and provider failure all produce503 without openings. API no-store; client refreshes every minute and suppresses expired data. Slots only prepare email requests; no automatic reservation or payment.

Before publishing: verify runtime access for ALL configured calendars; inspect known online-class/trip overlaps, recurring changed times, buffers, bookings and extra blocks; test desktop/mobile navigation and request form integration. Source calendars must stay accurate. Review config horizon and new obligations as needed.

Local tests: node tests/live-availability.test.mjs; npx tsc --noEmit; npm run build.
