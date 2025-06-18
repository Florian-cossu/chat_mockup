import "@styling/globals.css";
import { getRandomTheme } from "@/data/themes";
import { PreferencesProvider } from "@/contexts/preferencesContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = getRandomTheme();

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
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Chat mockup" />
        <meta
          name="description"
          content="Use this tool to generate custom chat screenshots to share and publish."
        />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <PreferencesProvider initialTheme={theme}>
          {children}
      </PreferencesProvider>
    </html>
  );
}
