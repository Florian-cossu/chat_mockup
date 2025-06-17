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
        <meta name="theme-color" content="#ffffff" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <link rel="icon" href="/icons/icon-any.svg" />
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
