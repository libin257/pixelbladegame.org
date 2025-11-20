import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Pixel Blade Guides, Codes & Tier List | Master the Pixel Realm Fast",
    template: "%s | Pixel Blade Info"
  },
  description: "Pixel Blade fan-hub: grab the latest working codes, see the weapon tier list & legendary drop map, and level up faster with data-driven tools.",
  keywords: [
    "Pixel Blade codes",
    "Pixel Blade tier list",
    "Roblox Pixel Blade",
    "legendary weapons",
    "Pixel Blade wiki",
    "Pixel Blade rings codes",
    "Pixel Blade guide",
    "Pixel Blade weapons"
  ],
  authors: [{ name: "Pixel Blade Info Team" }],
  creator: "Pixel Blade Info",
  publisher: "Pixel Blade Info",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://pixelbladegame.org'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'Pixel Blade Guides, Codes & Tier List | Master the Pixel Realm Fast',
    description: 'Pixel Blade fan-hub: grab the latest working codes, see the weapon tier list & legendary drop map, and level up faster with data-driven tools.',
    siteName: 'Pixel Blade Info',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Pixel Blade Guide',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pixel Blade Guides, Codes & Tier List | Master the Pixel Realm Fast',
    description: 'Pixel Blade fan-hub: grab the latest working codes, see the weapon tier list & legendary drop map, and level up faster with data-driven tools.',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID
  const ahrefsKey = process.env.NEXT_PUBLIC_AHREFS_KEY

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} dark`}>
      <head>
        {/* Google Analytics */}
        {gaId && (
          <>
            <Script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}

        {/* Microsoft Clarity */}
        {clarityId && (
          <Script id="microsoft-clarity" strategy="afterInteractive">
            {`
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${clarityId}");
            `}
          </Script>
        )}

        {/* Ahrefs Analytics */}
        {ahrefsKey && (
          <Script
            src="https://analytics.ahrefs.com/analytics.js"
            data-key={ahrefsKey}
            async
            strategy="afterInteractive"
          />
        )}

        <Script
          crossOrigin="anonymous"
          src="//unpkg.com/same-runtime/dist/index.global.js"
        />
      </head>
      <body suppressHydrationWarning className="antialiased">
        <div
          className="relative min-h-screen bg-cover bg-center bg-fixed"
          style={{ backgroundImage: 'url(/images/backgrounds/backend.png)' }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
          <div className="relative z-10 flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
