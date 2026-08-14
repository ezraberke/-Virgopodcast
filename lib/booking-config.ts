export const STUDIO_TIME_ZONE = "America/New_York";

export type BookingPackage = {
  id: string;
  family: string;
  title: string;
  durationLabel: string;
  durationMinutes: number;
  priceCents: number;
  description: string;
  featured?: boolean;
};

const variants = [
  { id: "1-hour", label: "1 hour", minutes: 60 },
  { id: "2-hours", label: "2 hours", minutes: 120 },
  { id: "half-day", label: "Half day", minutes: 240 },
  { id: "full-day", label: "Full day", minutes: 480 },
];

const families = [
  {
    id: "studio-session",
    family: "Record",
    title: "Studio session",
    description: "Professional recording with an on-site producer. You leave with the raw footage.",
    prices: [7500, 12500, 20000, 35000],
  },
  {
    id: "ready-to-publish",
    family: "Most popular",
    title: "Ready to publish",
    description: "Studio session plus a professionally edited, upload-ready episode delivered in less than 24 hours.",
    prices: [12500, 17500, 25000, 39500],
    featured: true,
  },
  {
    id: "episode-social",
    family: "For podcasters",
    title: "Podcast Starter Kit",
    description: "A polished full episode plus vertical social edits that turn one recording into a repeatable content pipeline.",
    prices: [16000, 25000, 35000, 55000],
  },
  {
    id: "creator-starter-kit",
    family: "For creators",
    title: "Creator Starter Kit",
    description: "Studio recording, finished social content and a VIRGO-managed distribution plan designed to reach real viewers.",
    prices: [16000, 25000, 35000, 55000],
  },
];

export const PODCAST_WEEK_PACKAGE_ID = "podcast-week-2026";
export const PODCAST_WEEK_START = "2026-08-14";
export const PODCAST_WEEK_END = "2026-08-20";

export const BOOKING_PACKAGES: BookingPackage[] = [
  {
    id: PODCAST_WEEK_PACKAGE_ID,
    family: "August 14–20 only",
    title: "$10 Start Your Own Podcast Week",
    durationLabel: "1 hour",
    durationMinutes: 60,
    priceCents: 1000,
    description: "A one-hour professional studio recording session for new clients, including our three-camera setup, broadcast microphones, lighting and on-site support.",
    featured: true,
  },
  ...families.flatMap((family) =>
    variants.map((variant, index) => ({
    id: `${family.id}-${variant.id}`,
    family: family.family,
    title: family.title,
    durationLabel: variant.label,
    durationMinutes: variant.minutes,
    priceCents: family.prices[index],
    description: family.description,
    featured: family.featured,
    })),
  ),
];

export const isPodcastWeekDate = (date: string) => date >= PODCAST_WEEK_START && date <= PODCAST_WEEK_END;

export const getBookingPackage = (id: string) =>
  BOOKING_PACKAGES.find((item) => item.id === id);

export const formatPrice = (priceCents: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(
    priceCents / 100,
  );

// This is the single place to change normal studio hours.
// 0 = Sunday. Longer packages only appear when they fit before closing.
export const BUSINESS_HOURS: Record<number, { open: string; close: string } | null> = {
  0: null,
  1: { open: "09:00", close: "18:00" },
  2: { open: "09:00", close: "18:00" },
  3: { open: "09:00", close: "18:00" },
  4: { open: "09:00", close: "18:00" },
  5: { open: "09:00", close: "18:00" },
  6: null,
};

export const SLOT_INTERVAL_MINUTES = 30;
export const BOOKING_BUFFER_MINUTES = 30;
export const HOLD_MINUTES = 30;
