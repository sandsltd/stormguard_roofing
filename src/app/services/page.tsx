import Image from 'next/image';
import { getContent } from '@/utils/server-content';
import { FaTools } from 'react-icons/fa';
import ServiceHeroAnimations from '@/components/services/ServiceHeroAnimations';
import ContactSection from '@/components/home/ContactSection';

// Static site generation with revalidation
export const revalidate = 3600; // Revalidate every hour

export const metadata = {
  title: 'Our Services',
  description: 'Explore our comprehensive range of services designed to meet your needs',
};

export default async function Services() {
  const content = await getContent();

  return (
    <div className="min-h-screen">
      {/* Hero Section with Background Image */}
      <div className="relative h-[75vh] md:h-[85vh] overflow-hidden pt-56 md:pt-64 pb-36">
        <div className="absolute inset-0">
          <Image 
            src={content.services.hero?.backgroundImage || "/images/roofers/roofer_installing_roofing_tiles.png"} 
            alt="Our Services"
            fill
            className="object-cover object-center"
            priority
            quality={90}
          />
          {/* Gradient Overlay - Stronger gradient for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/60 to-black/70"></div>
          
          {/* Pattern Overlay with different opacity */}
          <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-10"></div>
          
          {/* Different animated highlights positioning */}
          <div className="absolute top-[20%] right-[10%] w-1/2 h-1/2 rounded-full blur-3xl animate-pulse-slow" 
            style={{ backgroundColor: `${content.theme?.primaryColor || '#3b82f6'}15` }}></div>
          <div className="absolute -bottom-[10%] left-[5%] w-2/3 h-2/3 rounded-full blur-3xl animate-pulse-slow animation-delay-2000" 
            style={{ backgroundColor: `${content.theme?.primaryColor || '#3b82f6'}10` }}></div>
        </div>
        
        {/* Content Container - Clean layout with no background container */}
        <div className="relative z-10 h-full flex items-center justify-center px-6 md:px-12">
          <div className="max-w-7xl mx-auto w-full">
            <div className="max-w-3xl mx-auto text-center">
              {/* Badge - Clean style with border accent */}
              <div className="inline-flex items-center gap-2 px-5 py-2 mb-8 animate-fade-in-up border-b-2"
                  style={{ borderColor: content.theme?.primaryColor || '#3b82f6' }}>
                  <FaTools className="text-white" />
                  <span className="text-white font-medium text-sm tracking-wider">{content.services.hero?.badge || "EXPERT SOLUTIONS"}</span>
              </div>
              
              {/* Main Heading - No background container */}
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white leading-tight animate-fade-in-up animation-delay-300" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.7)' }}>
                <span className="text-white">{content.services.hero?.title || "Our Services"}</span>
                <span className="block mt-2" style={{ color: content.theme?.primaryColor || '#3b82f6' }}>{content.services.hero?.subtitle2 || "Solutions"}</span>
              </h1>
              
              {/* Subtitle with divider line */}
              <div className="mb-10 animate-fade-in-up animation-delay-600">
                <p className="text-xl md:text-2xl text-white leading-relaxed mx-auto" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.7)' }}>
                  {content.services.hero?.subtitle || "Professional Roofing Solutions for Every Need"}
                </p>
                <div className="w-20 h-1 mx-auto mt-6" style={{ backgroundColor: content.theme?.primaryColor || '#3b82f6' }}></div>
              </div>
              
              {/* CTA Buttons - Clean styling */}
              <div className="flex flex-wrap gap-4 justify-center animate-fade-in-up animation-delay-900">
                <a
                  href={content.services.hero?.ctaPrimary?.link || "/contact"}
                  className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-3 rounded-md text-lg font-medium transition-all duration-300"
                >
                  <span className="flex items-center">
                    {content.services.hero?.ctaPrimary?.text || "Get a Quote"}
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </a>
                <a
                  href={content.services.hero?.ctaSecondary?.link || "#services"}
                  className="text-white border-2 border-white hover:bg-white/10 px-8 py-3 rounded-md text-lg font-medium transition-all duration-300"
                >
                  {content.services.hero?.ctaSecondary?.text || "View All Services"}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animation styles are moved to a client component */}
      <ServiceHeroAnimations />

      {/* Services Section */}
      <div id="services" className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 gap-16">
            {content.services.services.map((service: { 
              title: string; 
              description: string; 
              image: string;
              features: string[];
            }, index: number) => (
              <div 
                key={index} 
                className={`flex flex-col ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } gap-8 md:gap-12`}
              >
                <div className="flex-1">
                  <div className="relative h-64 md:h-full rounded-lg overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <h2 className="text-3xl font-bold mb-4">{service.title}</h2>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <ul className="space-y-3">
                    {service.features.map((feature: string, featureIndex: number) => (
                      <li key={featureIndex} className="flex items-start">
                        <svg
                          className="h-6 w-6 text-green-500 mr-2 flex-shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <a
                      href="/contact"
                      className="inline-block text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-all duration-200"
                      style={{ backgroundColor: content.theme?.primaryColor || '#3b82f6' }}
                    >
                      Get a Quote
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">{content.services.cta.title}</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            {content.services.cta.description}
          </p>
          <a
            href={content.services.cta.buttonLink}
            className="inline-block text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-all duration-200"
            style={{ backgroundColor: content.theme?.primaryColor || '#3b82f6' }}
          >
            {content.services.cta.buttonText}
          </a>
        </div>
      </div>

      {/* Contact Form Section */}
      <ContactSection content={content} />
    </div>
  );
} 