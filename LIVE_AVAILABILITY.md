# Live availability

Disabled unless `LIVE_AVAILABILITY_ENABLED=true`. Verify every source and reconcile known off-calendar unavailability before enabling.

Server-only environment:
- Existing GOOGLE_CLIENT_EMAIL and GOOGLE_PRIVATE_KEY.
- LIVE_AVAILABILITY_SOURCES JSON: [{id,mode:"events",rule:{ignore:[],buffer:[],forceBusy:[]}},{id,mode:"freebusy"}]. At least two required. Exact event/series identifiers only; include all relevant reservation calendars.
- LIVE_AVAILABILITY_BLOCKS JSON [{start,end}] for verified extra unavailability, with ISO timestamps. Private provenance remains outside this repo.
- LIVE_AVAILABILITY_REVIEWED_THROUGH ISO date: requests beyond this reviewed configuration horizon fail closed. Display is capped at six months or the review horizon, whichever comes first.

Google expands changed recurrences; exempt events are removed before other blockers are merged, so overlapping trips remain blocked. Buffer identifiers receive 30 minutes before/after actual occurrences. Other busy events block actual time. An optional personal-source rule bufferUnknownTimed:true applies a conservative 30 minutes before/after every other timed opaque event too, without reading event details. This may overblock online meetings or reminders; no claim of physical attendance is made. All-day events get no default buffer. Other sources remain free/busy actual-time blockers. Transparent events are ignored unless explicitly forced busy. Do not classify by title or infer all online events are available.

Only read-only Google scopes. Public JSON contains only time ranges, zone, and freshness timestamps; no event identifiers, calendar identifiers or details. Errors do not leak provider data. Missing credentials, denied/missing calendar, malformed interval and provider failure all produce503 without openings. API no-store; client refreshes every minute and suppresses expired data. Slots only prepare email requests; no automatic reservation or payment.

Before publishing: verify runtime access for ALL configured calendars; inspect known online-class/trip overlaps, recurring changed times, buffers, bookings and extra blocks; test desktop/mobile navigation and request form integration. Source calendars must stay accurate. Review config horizon and new obligations as needed.

Local tests: node tests/live-availability.test.mjs; npx tsc --noEmit; npm run build.

Optional awayEvening exact event/series identifiers block from 30 minutes before the actual current start through the following New York midnight, or event end plus30 minutes if later. Canceled events remain ignored; moved occurrences follow their current timing. This does not classify by title/location and does not affect home events. Explicit away identifiers also override transparent/free status.
