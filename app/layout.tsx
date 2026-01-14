import "@styling/globals.css";
import { PreferencesProvider } from "@/contexts/preferencesContext";
import type { Metadata } from "next";

const siteTitle = "Chat Mockup";
const siteDescription = "Create realistic chat mockups easily for presentations and demos.";
const siteUrl = "https://chat-mockup-fcossu.vercel.app";
const ogImageUrl = `${siteUrl}/og-image2.png`;

export const metadata: Metadata = {
  title: siteTitle,

  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: siteTitle,
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: "Chat Mockup preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [ogImageUrl],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <head>
        {/*Favicon*/}
        <link rel="icon" href="/icons/icon.svg" type="image/svg+xml" />

        {/* Fallback favicon */}
        <link
          rel="icon"
          href="/icons/icon-192x192.png"
          type="image/png"
          sizes="192x192"
        />

        {/* PWA properties */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="color-scheme" content="light dark" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Chat mockup" />

        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <PreferencesProvider>
          {children}
      </PreferencesProvider>
    </html>
  );
}
