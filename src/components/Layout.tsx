'use client';

import Header from './Header';
import Footer from './Footer';
import { ReactNode } from 'react';
import { BusinessContent, SocialMedia } from '@/utils/content';

interface LayoutProps {
  children: ReactNode;
  business: BusinessContent;
  socials: SocialMedia[];
}

export default function Layout({ children, business, socials }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header business={business} />
      <main className="flex-grow">
        {children}
      </main>
      <Footer business={business} socials={socials} />
    </div>
  );
} 