-- Apply only to an isolated test database. The existing bookings table is untouched.
CREATE TABLE IF NOT EXISTS test_bookings (
  id uuid PRIMARY KEY,
  request_id uuid NOT NULL UNIQUE,
  request_hash text NOT NULL,
  package_id text NOT NULL,
  package_name text NOT NULL,
  start_time timestamptz NOT NULL,
  end_time timestamptz NOT NULL CHECK (end_time > start_time),
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text NOT NULL DEFAULT '',
  notes text NOT NULL DEFAULT '',
  amount_cents integer NOT NULL CHECK (amount_cents > 0),
  status text NOT NULL DEFAULT 'held' CHECK (status IN ('held', 'confirmed', 'expired', 'needs_review')),
  expires_at timestamptz NOT NULL,
  stripe_session_id text UNIQUE,
  stripe_payment_intent_id text,
  google_calendar_event_id text UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS test_bookings_time_idx ON test_bookings (start_time, end_time) WHERE status <> 'expired';
-- Time alone NEVER releases a hold: Stripe must confirm expiration first.
