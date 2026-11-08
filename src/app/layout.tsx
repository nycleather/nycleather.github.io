import type { Metadata } from "next";
import { Barlow, Barlow_Condensed, Libre_Baskerville } from "next/font/google";
import "./globals.css";

const card = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-card",
  display: "swap",
});

const sign = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-sign-face",
  display: "swap",
});

const shopFont = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-shop",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NYC Leather Repair | Website Preview",
  description:
    "Website preview for NYC Leather Repair, 205 West 57th Street, New York, NY. Draft for review. Call 212-265-2108.",
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${card.variable} ${sign.variable} ${shopFont.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
