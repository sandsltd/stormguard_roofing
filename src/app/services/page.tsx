import Image from 'next/image';
import { getContent } from '@/utils/server-content';
import { FaTools } from 'react-icons/fa';
import ServiceHeroAnimations from '@/components/services/ServiceHeroAnimations';
import ContactSection from '@/components/home/ContactSection';
import SeoHead from '@/components/SeoHead';

// Static site generation with revalidation
export const revalidate = 3600; // Revalidate every hour

// Remove static metadata as we're now using dynamic SEO settings
// export const metadata = {
//   title: 'Our Services',
//   description: 'Explore our comprehensive range of services designed to meet your needs',
// };

export default async function Services() {
  const content = await getContent();

  return (
    <div className="min-h-screen">
      {/* SEO Head */}
      <SeoHead 
        content={content} 
        pageKey="services"
      />

      {/* Hero Section with Background Image */}
      <div className="relative h-[70vh] sm:h-[75vh] md:h-[85vh] overflow-hidden pt-28 sm:pt-44 md:pt-56 lg:pt-64 pb-16 sm:pb-24 md:pb-36">
        <div className="absolute inset-0">
          <Image 
            src={content.services.hero?.backgroundImage || "/images/roofers/roofer_installing_roofing_tiles.png"} 
            alt="Our Services"
            fill
            className="object-cover object-center"
            priority
            quality={90}
            sizes="100vw"
          />
          {/* Gradient Overlay - Stronger gradient for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/70 md:from-black/90 md:via-black/60 md:to-black/70"></div>
          
          {/* Pattern Overlay with different opacity */}
          <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-10"></div>
          
          {/* Different animated highlights positioning */}
          <div className="absolute top-[20%] right-[10%] w-1/2 h-1/2 rounded-full blur-3xl animate-pulse-slow" 
            style={{ backgroundColor: `${content.theme?.primaryColor || '#3b82f6'}15` }}></div>
          <div className="absolute -bottom-[10%] left-[5%] w-2/3 h-2/3 rounded-full blur-3xl animate-pulse-slow animation-delay-2000" 
            style={{ backgroundColor: `${content.theme?.primaryColor || '#3b82f6'}10` }}></div>
        </div>
        
        {/* Content Container - Clean layout with no background container */}
        <div className="relative z-10 h-full flex items-center justify-center px-4 sm:px-6 md:px-12">
          <div className="max-w-7xl mx-auto w-full">
            <div className="max-w-3xl mx-auto text-center">
              {/* Badge - Clean style with border accent */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 sm:py-2 mb-6 sm:mb-8 animate-fade-in-up border-b-2"
                  style={{ borderColor: content.theme?.primaryColor || '#3b82f6' }}>
                  <FaTools className="text-white text-xs sm:text-sm" />
                  <span className="text-white font-medium text-xs sm:text-sm tracking-wider">{content.services.hero?.badge || "EXPERT SOLUTIONS"}</span>
              </div>
              
              {/* Main Heading - No background container */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-white leading-tight animate-fade-in-up animation-delay-300" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.7)' }}>
                <span className="text-white">{content.services.hero?.title || "Our Services"}</span>
                <span className="block mt-2" style={{ color: content.theme?.primaryColor || '#3b82f6' }}>{content.services.hero?.subtitle2 || "Solutions"}</span>
              </h1>
              
              {/* Subtitle with divider line */}
              <div className="mb-6 sm:mb-8 md:mb-10 animate-fade-in-up animation-delay-600">
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white leading-relaxed mx-auto" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.7)' }}>
                  {content.services.hero?.subtitle || "Professional Roofing Solutions for Every Need"}
                </p>
                <div className="w-16 md:w-20 h-1 mx-auto mt-4 sm:mt-6" style={{ backgroundColor: content.theme?.primaryColor || '#3b82f6' }}></div>
              </div>
              
              {/* CTA Buttons - Clean styling */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center animate-fade-in-up animation-delay-900">
                <a
                  href={content.services.hero?.ctaPrimary?.link || "/contact"}
                  className="bg-white text-gray-900 hover:bg-gray-100 px-6 sm:px-8 py-3 rounded-md text-sm sm:text-base md:text-lg font-medium transition-all duration-300 flex items-center justify-center"
                >
                  <span className="flex items-center">
                    {content.services.hero?.ctaPrimary?.text || "Get a Quote"}
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </a>
                <a
                  href={content.services.hero?.ctaSecondary?.link || "#services"}
                  className="text-white border-2 border-white hover:bg-white/10 px-6 sm:px-8 py-3 rounded-md text-sm sm:text-base md:text-lg font-medium transition-all duration-300 flex items-center justify-center"
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
            {content.homepage.services.map((service: { 
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

      {/* All Services Section */}
      <div className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Complete Roofing Service Directory</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Browse our full range of professional roofing services available throughout Cannock and surrounding areas
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {/* Pitched Roofing Services */}
            <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
              <h3 className="text-xl font-bold mb-4 pb-2 border-b" style={{ borderColor: content.theme?.primaryColor || '#3b82f6' }}>
                Pitched Roofing
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Slate Roof Installation</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Tiled Roofing Installation</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Ridged Tiles Installation</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Dry Verge Installation</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Dry Ridge Installation</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Moss Removal</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Complete Roof Replacement</span>
                </li>
              </ul>
            </div>
            
            {/* Flat Roofing Services */}
            <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
              <h3 className="text-xl font-bold mb-4 pb-2 border-b" style={{ borderColor: content.theme?.primaryColor || '#3b82f6' }}>
                Flat Roofing
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>EPDM Rubber Roofing</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Felt Roofing Installation</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Fibre Glass (GRP) Roofing</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Sealoflex Roofing</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Liquid Plastic Roofing</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Single Ply Membrane Roofs</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Hot Melt Roofing</span>
                </li>
              </ul>
            </div>
            
            {/* Windows & Dormers */}
            <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
              <h3 className="text-xl font-bold mb-4 pb-2 border-b" style={{ borderColor: content.theme?.primaryColor || '#3b82f6' }}>
                Dormers & Roof Windows
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Dormer Installation</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Roof Windows Installation</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Roof Lights Installation</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Polycarbonate Roofing</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Skylight Installation</span>
                </li>
              </ul>
            </div>
            
            {/* Chimney & Leadwork */}
            <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
              <h3 className="text-xl font-bold mb-4 pb-2 border-b" style={{ borderColor: content.theme?.primaryColor || '#3b82f6' }}>
                Chimney & Leadwork
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Chimney Installation</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Chimney Repair</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Chimney Cowlings Installation</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Leadworks Installation</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Flashing Repairs</span>
                </li>
              </ul>
            </div>
            
            {/* Emergency & Repair Services */}
            <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
              <h3 className="text-xl font-bold mb-4 pb-2 border-b" style={{ borderColor: content.theme?.primaryColor || '#3b82f6' }}>
                Emergency & Repair Services
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Emergency Roofing Service</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Roofing Repairs</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Leak Detection & Repair</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Roof Inspection Reports</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Roof Replacement</span>
                </li>
              </ul>
            </div>
            
            {/* Commercial Roofing */}
            <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
              <h3 className="text-xl font-bold mb-4 pb-2 border-b" style={{ borderColor: content.theme?.primaryColor || '#3b82f6' }}>
                Commercial & Specialist Roofing
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Warm Roof Construction</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Asphalt Roofing Installation</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Commercial Flat Roofing</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Industrial Roofing</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Warehouse Roofing Solutions</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <a
              href="/contact"
              className="inline-block text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-all duration-200"
              style={{ backgroundColor: content.theme?.primaryColor || '#3b82f6' }}
            >
              Request a Free Quote
            </a>
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