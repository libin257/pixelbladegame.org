import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";
import Script from "next/script";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Winter Burrow - Complete Survival Guide & Wiki | Cozy Survival Tips",
    template: "%s | Winter Burrow Info"
  },
  description: "Master Winter Burrow with our comprehensive guide featuring beginner survival tips, interactive warmth calculator, crafting recipe finder, full walkthrough, and platform reviews. Your ultimate companion for conquering the frozen wilderness.",
  keywords: [
    "Winter Burrow",
    "Winter Burrow guide",
    "Winter Burrow wiki",
    "survival game guide",
    "warmth calculator",
    "crafting recipes",
    "beginner tips",
    "walkthrough",
    "game guide"
  ],
  authors: [{ name: "Winter Burrow Info Team" }],
  creator: "Winter Burrow Info",
  publisher: "Winter Burrow Info",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://winterburrow.info'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'Winter Burrow - Complete Survival Guide & Wiki',
    description: 'Master Winter Burrow with our comprehensive guide featuring beginner survival tips, interactive warmth calculator, crafting recipes, and full walkthrough.',
    siteName: 'Winter Burrow Info',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Winter Burrow Survival Guide',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Winter Burrow - Complete Survival Guide & Wiki',
    description: 'Master Winter Burrow with beginner tips, warmth calculator, crafting recipes, and full walkthrough.',
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

        <Script
          crossOrigin="anonymous"
          src="//unpkg.com/same-runtime/dist/index.global.js"
        />
      </head>
      <body suppressHydrationWarning className="antialiased">
        <ClientBody>
          <div
            className="relative min-h-screen bg-cover bg-center bg-fixed"
            style={{ backgroundImage: 'url(/images/backgrounds/winter-night.png)' }}
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
        </ClientBody>
      </body>
    </html>
  );
}
