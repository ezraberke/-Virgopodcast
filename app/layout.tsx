import type { Metadata } from "next";
import "./globals.css";
import { RevealObserver } from "./reveal-observer";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.virgopodcast.com"),
  title: "VIRGO Podcast Studio | Record, Publish & Grow in Midtown",
  description: "Book a professional Midtown Manhattan podcast studio with multi-camera recording, editing, social clips, audience-growth support and fast delivery.",
  icons: { icon: "/assets/virgo-logo.png", shortcut: "/assets/virgo-logo.png" },
  openGraph: {
    title: "VIRGO Podcast Studio | Record, Publish & Grow",
    description: "Professional podcast recording, editing, social clips and audience-growth support in Midtown Manhattan.",
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
