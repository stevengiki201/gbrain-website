import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://gbrain.tech";
const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "GBrain Technologies";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0f1a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "GBrain Technologies — Practical Software, Powered by On-Device AI",
    template: "%s | GBrain Technologies",
  },
  description:
    "GBrain Technologies builds practical software powered by on-device AI. Products: GBrain Media Player, GBrain SMS + AudioLink, PhoneLink, GBrain Neural System. Built in Tanzania, for Africa and the world.",
  keywords: [
    "GBrain Technologies",
    "on-device AI",
    "local-first software",
    "privacy-first",
    "Tanzania tech",
    "mobile apps",
    "AI platform",
    "software solutions",
  ],
  authors: [{ name: "GBrain Technologies Company Limited" }],
  creator: siteName,
  publisher: "GBrain Technologies Company Limited",
  alternates: {
    canonical: "/",
    languages: {
      en: "/en",
      sw: "/sw",
      "x-default": "/",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName,
    title: "GBrain Technologies — Practical Software, Powered by On-Device AI",
    description:
      "Building practical software powered by on-device AI. Local-first, privacy-first, works offline.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "GBrain Technologies",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GBrain Technologies",
    description:
      "Practical software, powered by on-device AI — built in Tanzania, for Africa and the world.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
