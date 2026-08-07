CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  package_id text NOT NULL,
  start_time timestamptz NOT NULL,
  end_time timestamptz NOT NULL,
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text,
  notes text,
  status text NOT NULL CHECK (status IN ('held', 'paid', 'cancelled', 'refunded')),
  hold_expires_at timestamptz,
  stripe_session_id text UNIQUE,
  stripe_payment_intent_id text,
  google_calendar_event_id text,
  amount_paid integer,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS bookings_time_idx ON bookings (start_time, end_time);
CREATE INDEX IF NOT EXISTS bookings_status_idx ON bookings (status, hold_expires_at);
