import { getContent } from '@/utils/content';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Geist, Geist_Mono } from "next/font/google";
import type { Metadata } from "next";
import './globals.css';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import Script from 'next/script';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Professional Roofing and home improvement services",
  description: "Professional roofing and home improvement services for residential and commercial properties",
};

export const revalidate = 3600; // Revalidate every hour

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const content = await getContent();

  // Structured data for LocalBusiness
  const localBusinessData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": content.business.name,
    "image": content.business.logo,
    "telephone": content.business.phone,
    "email": content.business.email,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Cannock",
      "addressRegion": "Staffordshire",
      "addressCountry": "UK"
    },
    "description": content.seo?.pages?.home?.description || content.business.description,
    "priceRange": "$$",
    "openingHours": "Mo-Fr 08:00-18:00",
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 52.6906,
        "longitude": -2.0324
      },
      "geoRadius": "20mi"
    },
    "sameAs": [
      content.socials.facebook,
      content.socials.twitter,
      content.socials.instagram,
      content.socials.linkedin
    ].filter(Boolean),
    "url": "https://stormguardroofing.co.uk/"
  };

  return (
    <html lang="en" data-theme="light">
      <head>
        <link rel="icon" href="/favicon_io-29/favicon.ico" />
        <GoogleAnalytics />
        <Script
          id="schema-local-business"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessData)
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="flex flex-col min-h-screen">
          <Header content={content} />
          <main>{children}</main>
          <Footer content={content} theme={content.theme} />
        </div>
      </body>
    </html>
  );
}
