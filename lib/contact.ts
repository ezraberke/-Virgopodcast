export const STUDIO_EMAIL = "ezraberke@virgopodcast.com";

export function bookingEmail(packageName = "Studio session") {
  const subject = `VIRGO booking inquiry — ${packageName}`;
  const body = `Hi Ezra,\n\nI'd like to ask about booking a session at VIRGO.\n\nPackage: ${packageName}\nPreferred date and time: \nSession length: \nNumber of guests: \nWhat I'm recording: \n\nPlease confirm availability and the session details. I understand payment is made on site on the day of the session.\n\nThanks!`;
  return `mailto:${STUDIO_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export const BOOKING_EMAIL = bookingEmail();
