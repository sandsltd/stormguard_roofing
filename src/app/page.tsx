import { getContent } from '@/utils/server-content';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import ServicesSection from '@/components/home/ServicesSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import IntroductionSection from '@/components/home/IntroductionSection';
import VanImageSection from '@/components/home/VanImageSection';
import ContactSection from '@/components/home/ContactSection';
import ServingAreasSectionWrapper from '@/components/home/ServingAreasSectionWrapper';
import ServiceAreasSectionWrapper from '@/components/home/ServiceAreasSectionWrapper';
import FAQSectionWrapper from '@/components/home/FAQSectionWrapper';
import GallerySectionWrapper from '@/components/home/GallerySectionWrapper';
import ServicesGrid from '@/components/ServicesGrid';
import SeoHead from '@/components/SeoHead';
import { ServiceItem } from '@/utils/types';
import Script from 'next/script';
import type { Metadata } from "next";
import FeaturedBlogSection from '@/components/home/FeaturedBlogSection';

export const revalidate = 3600; // Revalidate every hour

// Generate metadata for the homepage
export async function generateMetadata(): Promise<Metadata> {
  const content = await getContent();
  
  if (!content || !content.seo?.pages?.home) {
    return {};
  }
  
  const pageMetadata = content.seo.pages.home;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://roofercannock.co.uk';
  
  return {
    title: pageMetadata.title,
    description: pageMetadata.description,
    keywords: pageMetadata.keywords,
    openGraph: {
      title: pageMetadata.title,
      description: pageMetadata.description,
      type: pageMetadata.ogType || 'website',
      images: pageMetadata.ogImage ? [{
        url: baseUrl + pageMetadata.ogImage,
        width: 1200,
        height: 630,
        alt: pageMetadata.title
      }] : undefined
    },
  };
}

// JSON-LD for rich snippets and SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://stormguardroofers.co.uk/#website",
      "url": "https://stormguardroofers.co.uk/",
      "name": "StormGuard Roofing | Expert Roofers in Cannock",
      "description": "Professional roofing services in Cannock and surrounding areas. Experts in repairs, replacements, and installations with over 18 years experience.",
      "potentialAction": [
        {
          "@type": "SearchAction",
          "target": "https://stormguardroofers.co.uk/search?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      ],
      "inLanguage": "en-GB"
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://stormguardroofers.co.uk/#organization",
      "name": "StormGuard Roofing",
      "url": "https://stormguardroofers.co.uk/",
      "logo": {
        "@type": "ImageObject",
        "inLanguage": "en-GB",
        "url": "https://stormguardroofers.co.uk/images/logo.png",
        "width": 280,
        "height": 60,
        "caption": "StormGuard Roofing Logo"
      },
      "image": "https://stormguardroofers.co.uk/images/logo.png",
      "description": "Professional roofing services in Cannock and surrounding areas. Experts in repairs, replacements, and installations with over 18 years experience.",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "123 Roof Street",
        "addressLocality": "Cannock",
        "postalCode": "WS11 1AB",
        "addressCountry": "UK"
      },
      "telephone": "+441543123456",
      "priceRange": "££",
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday"
          ],
          "opens": "08:00",
          "closes": "18:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Saturday"
          ],
          "opens": "09:00",
          "closes": "16:00"
        }
      ],
      "sameAs": [
        "https://www.facebook.com/stormguardroofers",
        "https://twitter.com/stormguardroof",
        "https://www.instagram.com/stormguardroofers/"
      ]
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://stormguardroofers.co.uk/#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home"
        }
      ]
    },
    {
      "@type": "BlogPosting",
      "headline": "The Most Common Roofing Problems in Cannock Homes (And How to Fix Them)",
      "description": "Discover common roofing problems in Cannock homes and how professional roofer services can fix them effectively.",
      "author": {
        "@type": "Organization", 
        "name": "StormGuard Roofing"
      },
      "image": "https://stormguardroofers.co.uk/images/client-images/roofer_removing_damaged_tiles.jpg",
      "datePublished": "2025-04-02",
      "url": "https://stormguardroofers.co.uk/blog/common-roofing-problems-cannock"
    },
    {
      "@type": "BlogPosting",
      "headline": "Pitched vs. Flat Roofs: A Cannock Homeowner's Guide",
      "description": "Compare pitched and flat roof options for your Cannock property with advice from local roofing experts.",
      "author": {
        "@type": "Organization", 
        "name": "StormGuard Roofing"
      },
      "image": "https://stormguardroofers.co.uk/images/client-images/roofer_installing_roofing_tiles.jpg",
      "datePublished": "2025-03-19",
      "url": "https://stormguardroofers.co.uk/blog/pitched-vs-flat-roofs-cannock-guide"
    },
    {
      "@type": "BlogPosting",
      "headline": "Emergency Roof Repairs in Cannock: What Constitutes an Emergency?",
      "description": "Learn when to call for emergency roof repairs and how our Cannock roofers can protect your home from further damage.",
      "author": {
        "@type": "Organization", 
        "name": "StormGuard Roofing"
      },
      "image": "https://stormguardroofers.co.uk/images/client-images/roofer_repairing_roof_with_harness.jpg",
      "datePublished": "2025-03-26",
      "url": "https://stormguardroofers.co.uk/blog/emergency-roof-repairs-cannock"
    }
  ]
};

export default async function Home() {
  const content = await getContent();

  if (!content) {
    return <div>Loading...</div>;
  }

  // Create homepage services adapted from the services structure
  const homepageServices = content.services.services.map((service: ServiceItem) => ({
    title: service.title,
    description: service.description.split('.')[0] + '.',  // Just use first sentence for brevity
    link: "/contact"  // Changed from "/services" to "/contact" for "Get a Free Quote" buttons
  }));

  // Create schema markup for services offered
  const servicesOffered = content.services.services.map((service: any, index: number) => ({
    "@type": "Service",
    "serviceType": service.title,
    "description": service.description.split('.')[0] + '.',
    "provider": {
      "@type": "LocalBusiness",
      "name": content.business.name
    },
    "areaServed": {
      "@type": "City",
      "name": "Cannock"
    }
  }));

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": servicesOffered.map((service: any, index: number) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": service
    }))
  };

  // Create schema markup for FAQs
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": content.homepage.faqs.map((faq: any) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <main className="min-h-screen">
      <Script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* SEO Head */}
      <SeoHead 
        content={content} 
        pageKey="home"
      />

      {/* SEO H1 Heading - Visually hidden but available to search engines */}
      <h1 className="sr-only">Professional Roofer in Cannock - StormGuard Roofing Services</h1>

      {/* Schema markup */}
      <Script
        id="services-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema)
        }}
      />
      
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema)
        }}
      />

      {/* Hero Section - Using Client Component */}
      <HeroSection content={content} />

      {/* Introduction Section */}
      <IntroductionSection content={content} />
      
      {/* Features Section */}
      <FeaturesSection content={content} />
      
      {/* Van Image Section */}
      <VanImageSection content={content} />

      {/* Services Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: content.theme?.text }}>
              {content.homepage.servicesSection?.title || "Our Services"}
            </h2>
            <p className="text-lg text-gray-600" style={{ color: `${content.theme?.text}99` }}>
              {content.homepage.servicesSection?.description || "Comprehensive roofing solutions tailored to your needs"}
            </p>
          </div>
          
          <ServicesGrid 
            services={homepageServices}
            theme={content.theme}
          />
        </div>
      </section>

      {/* Serving Areas Section */}
      <ServingAreasSectionWrapper content={content} />

      {/* Service Areas Section - New Simple Grid */}
      <ServiceAreasSectionWrapper content={content} />

      {/* FAQ Section */}
      <FAQSectionWrapper content={content} />
      
      {/* Gallery Section - Only displays if images exist */}
      <GallerySectionWrapper content={content} />

      {/* Testimonials Section */}
      <TestimonialsSection content={content} />

      {/* FeaturedBlogSection */}
      <FeaturedBlogSection content={content} />

      {/* Contact Section */}
      <ContactSection content={content} />
    </main>
  );
}
