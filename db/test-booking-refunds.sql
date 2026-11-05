-- Additive upgrade for the existing isolated TEST database only.
-- One atomic statement. Existing test bookings remain intact.
DO $$ BEGIN
ALTER TABLE test_bookings ADD COLUMN IF NOT EXISTS stripe_refund_id text;
ALTER TABLE test_bookings DROP CONSTRAINT IF EXISTS test_bookings_status_check;
ALTER TABLE test_bookings ADD CONSTRAINT test_bookings_status_check CHECK (status IN ('held', 'confirmed', 'expired', 'needs_review', 'refunded'));
END $$;
