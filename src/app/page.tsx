import { getContent } from '@/utils/server-content';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import ServicesSection from '@/components/home/ServicesSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import IntroductionSection from '@/components/home/IntroductionSection';
import ContactSection from '@/components/home/ContactSection';
import ServingAreasSectionWrapper from '@/components/home/ServingAreasSectionWrapper';
import FAQSectionWrapper from '@/components/home/FAQSectionWrapper';
import GallerySectionWrapper from '@/components/home/GallerySectionWrapper';

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
      <ServicesSection content={content} />

      {/* Serving Areas Section */}
      <ServingAreasSectionWrapper content={content} />

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
