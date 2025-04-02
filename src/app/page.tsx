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

export const revalidate = 3600; // Revalidate every hour

export default async function Home() {
  const content = await getContent();

  if (!content) {
    return <div>Loading...</div>;
  }

  // Create homepage services adapted from the services structure
  const homepageServices = content.homepage.services.map((service: ServiceItem) => ({
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
    <>
      {/* SEO Head */}
      <SeoHead 
        content={content} 
        pageKey="home"
      />

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

      {/* Contact Section */}
      <ContactSection content={content} />
    </>
  );
}
