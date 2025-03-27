import { getContent } from '@/utils/server-content';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import ServicesSection from '@/components/home/ServicesSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import IntroductionSection from '@/components/home/IntroductionSection';
import ContactSection from '@/components/home/ContactSection';
import ServingAreasSectionWrapper from '@/components/home/ServingAreasSectionWrapper';
import ServiceAreasSectionWrapper from '@/components/home/ServiceAreasSectionWrapper';
import FAQSectionWrapper from '@/components/home/FAQSectionWrapper';
import GallerySectionWrapper from '@/components/home/GallerySectionWrapper';
import ServicesGrid from '@/components/ServicesGrid';

export const revalidate = 3600; // Revalidate every hour

export default async function Home() {
  const content = await getContent();

  if (!content) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {/* Hero Section - Using Client Component */}
      <HeroSection content={content} />

      {/* Introduction Section */}
      <IntroductionSection content={content} />

      {/* Features Section */}
      <FeaturesSection content={content} />

      {/* Services Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: content.theme.text }}>
              {content.homepage.servicesSection?.title || "Our Services"}
            </h2>
            <p className="text-lg text-gray-600" style={{ color: `${content.theme.text}99` }}>
              {content.homepage.servicesSection?.description || "Comprehensive roofing solutions tailored to your needs"}
            </p>
          </div>
          
          <ServicesGrid 
            services={content.homepage.services.map((service: { 
              title: string; 
              description: string; 
              buttonLink?: string;
            }) => ({
              title: service.title,
              description: service.description,
              link: service.buttonLink || "/contact"
            }))}
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
