import { getContent } from '@/utils/server-content';
import type { Metadata } from 'next';

// Generate metadata for the contact page
export async function generateMetadata(): Promise<Metadata> {
  const content = await getContent();
  
  if (!content || !content.seo?.pages?.contact) {
    return {};
  }
  
  const pageMetadata = content.seo.pages.contact;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://roofercannock.co.uk';
  
  return {
    title: pageMetadata.title,
    description: pageMetadata.description,
    keywords: pageMetadata.keywords,
    openGraph: {
      title: pageMetadata.title,
      description: pageMetadata.description,
      type: 'website',
      images: pageMetadata.ogImage ? [{
        url: baseUrl + pageMetadata.ogImage,
        width: 1200,
        height: 630,
        alt: pageMetadata.title
      }] : undefined
    },
  };
}

// Export default metadata but it will be overridden by the generateMetadata function
export default {
  title: 'Contact Your Local Cannock Roofer | Free Quotes & Estimates',
  description: 'Need a professional roofer in Cannock? Contact StormGuard Roofing for free quotes, emergency repairs and expert roofing advice. Call 01543 229963 for same-day service.'
} satisfies Metadata; 