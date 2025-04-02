import { getContent } from '@/utils/content';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Geist, Geist_Mono } from "next/font/google";
import type { Metadata } from "next";
import './globals.css';
import GoogleAnalytics from '@/components/GoogleAnalytics';

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

  return (
    <html lang="en" data-theme="light">
      <head>
        <GoogleAnalytics />
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
