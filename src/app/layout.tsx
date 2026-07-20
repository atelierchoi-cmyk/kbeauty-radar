import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { LanguageProvider } from "@/lib/i18n";
import { APP_NAME, APP_TAGLINE } from "@/lib/config";

// NOTE: next/font/google (Inter, Space Grotesk) requires reaching
// fonts.googleapis.com at build time. That worked from the sandbox this
// project was scaffolded in was network-restricted, so the font stack
// falls back to system sans-serif + Pretendard (loaded via CDN link below)
// defined directly in globals.css. If your deploy environment has open
// network access, swap back to `next/font/google` for self-hosted,
// zero-layout-shift Inter/Space Grotesk — see the commented block in
// globals.css `@theme inline` for where the variables plug in.

export const metadata: Metadata = {
  title: {
    default: `${APP_NAME} — ${APP_TAGLINE}`,
    template: `%s · ${APP_NAME}`,
  },
  description:
    "K-Beauty Radar tracks how the world actually reviews, discusses and discovers Korean beauty brands, brand by brand and market by market, with sourced data and a public methodology.",
  openGraph: {
    title: `${APP_NAME} — ${APP_TAGLINE}`,
    description:
      "Global review signals, market gaps and celebrity-impact tracking for K-Beauty brands.",
    siteName: APP_NAME,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${APP_NAME} — ${APP_TAGLINE}`,
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
        <link
          rel="stylesheet"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.css"
        />
      </head>
      <body className="antialiased">
        <LanguageProvider>
          <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
