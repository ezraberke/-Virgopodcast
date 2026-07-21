import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.virgopodcast.com"),
  title: "VIRGO Podcast Studio | Midtown NYC Podcast & Video Production",
  description: "Professional podcast and video recording, editing and social content in Midtown Manhattan—with less than 24-hour delivery for videos recorded in studio.",
  icons: { icon: "/assets/virgo-logo.png", shortcut: "/assets/virgo-logo.png" },
  openGraph: {
    title: "VIRGO Podcast Studio",
    description: "Record today. Receive your polished video in less than 24 hours.",
    url: "https://www.virgopodcast.com",
    siteName: "VIRGO Podcast Studio",
    images: [{ url: "/og.png", width: 1672, height: 941, alt: "VIRGO Podcast Studio with less than 24-hour delivery" }],
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "VIRGO Podcast Studio", description: "Professional podcast and video production in Midtown Manhattan.", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
