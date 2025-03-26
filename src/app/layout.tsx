import { getContent } from '@/utils/content';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Geist, Geist_Mono } from "next/font/google";
import type { Metadata } from "next";
import './globals.css';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Roofing Business Template",
  description: "Professional roofing services for residential and commercial properties",
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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Header 
          business={content.business} 
          theme={content.theme}
          header={content.header}
        />
        <main>{children}</main>
        <Footer business={content.business} socials={content.socials} theme={content.theme} />
      </body>
    </html>
  );
}
