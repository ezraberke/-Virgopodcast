import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.virgopodcast.com"),
  title: "VIRGO Podcast Studio | Record, Publish & Grow in Midtown",
  description: "A producer-supported podcast and video studio in Midtown Manhattan. Book by email and pay on site on the day of your session.",
  icons: { icon: "/assets/virgo-logo.png", shortcut: "/assets/virgo-logo.png" },
  openGraph: {
    title: "VIRGO Podcast Studio | Record, Publish & Grow",
    description: "Professional podcast recording, editing, social clips and audience-growth support in Midtown Manhattan.",
    url: "https://www.virgopodcast.com",
    siteName: "VIRGO Podcast Studio",
    images: [{ url: "/assets/studio-lounge-october-2026.webp", width: 1448, height: 1086, alt: "The current VIRGO Podcast Studio lounge set in Midtown Manhattan" }],
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "VIRGO Podcast Studio", description: "Professional podcast and video production in Midtown Manhattan.", images: ["/assets/studio-lounge-october-2026.webp"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
