import { testBookingEnabled } from "./test-booking/config";

export function bookingCopy() {
  const test = testBookingEnabled();
  return {
    short: test ? "Test checkout · no real charges" : "Confirm with the studio · pay on site",
    payment: test ? "Try the complete booking flow in test mode. No real charge or reservation is made." : "The studio confirms your date and full session length before you pay on site.",
    heading: test ? "Choose your package, time and test checkout." : "Arrange your recording session with the studio.",
    instructions: test ? "Choose a package and session length, pick an available time, and complete Stripe test checkout. The result confirms only after payment and calendar verification. Use test card details only." : "Choose “Book a session” to contact the studio with your package, preferred date and full recording time. Your request is not a reservation until the studio confirms it. Payment is on site on the day of your session.",
  };
}
