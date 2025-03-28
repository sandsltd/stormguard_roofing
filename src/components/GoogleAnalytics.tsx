'use client';

import Script from 'next/script';
import { Content } from '@/utils/content';

interface GoogleAnalyticsProps {
  content: Content;
}

export default function GoogleAnalytics({ content }: GoogleAnalyticsProps) {
  const gaId = content.seo?.global?.googleAnalyticsId;

  if (!gaId) {
    return null;
  }

  // Check if it's a GA4 ID (starts with G-) or Universal Analytics ID (starts with UA-)
  const isGA4 = gaId.startsWith('G-');

  if (isGA4) {
    return (
      <>
        <Script
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
    );
  } else {
    // Universal Analytics
    return (
      <>
        <Script
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
    );
  }
} 