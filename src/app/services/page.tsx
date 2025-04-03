import Image from 'next/image';
import { getContent } from '@/utils/server-content';
import { FaTools } from 'react-icons/fa';
import ServiceHeroAnimations from '@/components/services/ServiceHeroAnimations';
import ContactSection from '@/components/home/ContactSection';
import SeoHead from '@/components/SeoHead';
import type { Metadata } from "next";

// Static site generation with revalidation
export const revalidate = 3600; // Revalidate every hour

// Generate metadata for the services page
export async function generateMetadata(): Promise<Metadata> {
  const content = await getContent();
  
  if (!content || !content.seo?.pages?.services) {
    return {};
  }
  
  const pageMetadata = content.seo.pages.services;
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
      <div className="relative min-h-[100dvh] overflow-hidden pt-20 sm:pt-24 md:pt-28 lg:pt-32">
        {/* Main Background Image */}
        <div className="absolute inset-0">
          <div className="relative h-full w-full">
            <Image
              src="/images/roofers/tile_roof2.png"
              alt="Professional roofing services in Cannock"
              fill
              className="object-cover"
              priority
            />
            
            {/* Gradient Overlay - Adjusted for better image visibility */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/40" />
            
            {/* Pattern Overlay for Texture */}
            <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-20" />
            
            {/* Animated Highlights - Adjusted opacity */}
            <div className="absolute -top-[20%] -left-[10%] w-full h-full rounded-full blur-3xl animate-pulse-slow opacity-30" 
              style={{ backgroundColor: 'rgba(220, 38, 38, 0.15)' }} />
            <div className="absolute -bottom-[20%] -right-[10%] w-full h-full rounded-full blur-3xl animate-pulse-slow animation-delay-2000 opacity-30" 
              style={{ backgroundColor: `${content.theme?.primaryColor || '#3b82f6'}15` }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 rounded-full blur-3xl animate-pulse-slow animation-delay-1000 opacity-30" 
              style={{ backgroundColor: 'rgba(220, 38, 38, 0.2)' }} />
          </div>
        </div>
        
        {/* Content Container */}
        <div className="relative z-10 min-h-[calc(100vh-5rem)] sm:min-h-[calc(100vh-6rem)] md:min-h-[calc(100vh-7rem)] flex items-center px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="max-w-7xl mx-auto w-full">
            <div className="max-w-3xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-5 md:mb-6 animate-fade-in-up bg-red-500/10 border border-red-500/20">
                <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full animate-pulse bg-red-500"></span>
                <span className="text-white font-medium text-xs sm:text-sm uppercase tracking-wider">{content.services.hero?.badge || "EXPERT SOLUTIONS"}</span>
              </div>
              
              {/* Main Heading with Gradient Text */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-5 md:mb-6 text-white leading-[1.15] animate-fade-in-up animation-delay-300" style={{ textShadow: '0 4px 8px rgba(0,0,0,0.75)' }}>
                <span className="block text-white">{content.services.hero?.title || "Our Services"}</span>
                <span className="text-white block my-1 sm:my-2">Professional</span>
                <span className="block text-red-500">{content.services.hero?.subtitle2 || "Solutions"}</span>
              </h1>
              
              {/* Subtitle with Line Animation */}
              <div className="group relative inline-block mb-6 sm:mb-8 md:mb-10 animate-fade-in-up animation-delay-600">
                <p className="text-lg sm:text-xl md:text-2xl text-white/95 leading-relaxed max-w-2xl font-light" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.75)' }}>
                  {content.services.hero?.subtitle || "Professional Roofing Solutions for Every Need"}
                </p>
                <span className="block w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-red-500 to-transparent transition-all duration-700 ease-out"></span>
              </div>
              
              {/* CTA Buttons with Enhanced Glass Effect */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 animate-fade-in-up animation-delay-900">
                <a
                  href={content.services.hero?.ctaPrimary?.link || "/contact"}
                  className="relative overflow-hidden inline-flex items-center justify-center text-white px-6 sm:px-8 py-4 rounded-lg text-base sm:text-lg font-bold hover:opacity-100 transition-all duration-300 shadow-xl group transform hover:scale-105 hover:-translate-y-1 bg-red-600 hover:bg-red-500"
                >
                  <span className="relative z-10 flex items-center">
                    {content.services.hero?.ctaPrimary?.text || "Get a Quote"}
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                  <div className="absolute right-0 w-12 h-full bg-white/20 transform skew-x-12 translate-x-0 transition-transform group-hover:translate-x-40 ease-out duration-700" />
                </a>
                <a
                  href={content.services.hero?.ctaSecondary?.link || "#services"}
                  className="inline-flex items-center justify-center bg-white/10 backdrop-blur-md text-white border-2 border-white/20 px-6 sm:px-8 py-4 rounded-lg text-base sm:text-lg font-bold hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
                >
                  {content.services.hero?.ctaSecondary?.text || "View All Services"}
                </a>
              </div>
              
              {/* Key Features Pills */}
              <div className="mt-6 sm:mt-8 md:mt-10 flex flex-wrap gap-3 animate-fade-in-up animation-delay-1200">
                {['Roof Repairs', 'New Installations', 'Commercial & Residential', 'Emergency Service'].map((item, index) => (
                  <div key={index} className="flex items-center bg-black/30 backdrop-blur-md px-3 sm:px-4 py-2 rounded-full border border-red-500/20 text-sm sm:text-base">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                    <span className="text-white">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll Down Indicator */}
        <div className="absolute bottom-8 sm:bottom-12 right-4 sm:right-8 z-10 animate-bounce hidden sm:flex">
          <div className="flex flex-col items-center">
            <span className="text-white text-xs sm:text-sm mb-2">Scroll Down</span>
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
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