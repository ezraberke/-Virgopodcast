import type { Metadata } from "next";
import "./globals.css";
import { RevealObserver } from "./reveal-observer";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.virgopodcast.com"),
  title: "$10 Start Your Own Podcast Week | VIRGO Podcast Studio",
  description: "Book a $10 professional podcast studio session at VIRGO in Midtown Manhattan, August 19–25, 2026. Limited availability for new clients.",
  icons: { icon: "/assets/virgo-logo.png", shortcut: "/assets/virgo-logo.png" },
  openGraph: {
    title: "$10 Start Your Own Podcast Week | VIRGO",
    description: "Create content, build your brand and share your passion in a professional Midtown podcast studio—August 19–25, 2026.",
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
      <body>
        <RevealObserver />
        {children}
      </body>
    </html>
  );
}
