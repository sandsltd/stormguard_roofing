import React from 'react';
import Image from 'next/image';
import { FaHistory, FaBullseye, FaHandshake, FaLeaf, FaStar, FaQuoteLeft, FaPhoneAlt } from 'react-icons/fa';
import { getContent } from '@/utils/content';
import AboutGalleryWrapper from '@/components/about/AboutGalleryWrapper';
import { ExtendedBusinessContent, ValueItem } from '@/components/about/BusinessTypes';
import ContactSection from '@/components/home/ContactSection';
import AboutHeroAnimations from '@/components/about/AboutHeroAnimations';
import SeoHead from '@/components/SeoHead';

export default async function AboutPage() {
  const content = await getContent();
  const business = content.business as ExtendedBusinessContent;

  return (
    <main className="relative min-h-screen">
      {/* SEO Head */}
      <SeoHead 
        content={content} 
        pageKey="about"
      />

      {/* Hero Section with Background Image */}
      <div className="relative h-[75vh] md:h-[85vh] lg:h-[90vh] overflow-hidden pt-56 md:pt-64 pb-36">
        <div className="absolute inset-0">
          <Image 
            src={business.hero || "/images/hero-placeholder.jpg"} 
            alt={`${business.name} Team`}
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
                  <span className="text-white font-medium text-sm tracking-wider">ESTABLISHED {business.establishedYear || '2000'}</span>
              </div>
              
              {/* Main Heading - No background container */}
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white leading-tight animate-fade-in-up animation-delay-300" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.7)' }}>
                <span className="text-white">About</span>
                <span className="block mt-2" style={{ color: content.theme?.primaryColor || '#3b82f6' }}>{business.name}</span>
              </h1>
              
              {/* Subtitle with divider line */}
              <div className="mb-10 animate-fade-in-up animation-delay-600">
                <p className="text-xl md:text-2xl text-white leading-relaxed mx-auto" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.7)' }}>
                  {business.tagline || 'Your trusted local business dedicated to excellent service and exceptional quality'}
                </p>
                <div className="w-20 h-1 mx-auto mt-6" style={{ backgroundColor: content.theme?.primaryColor || '#3b82f6' }}></div>
              </div>
              
              {/* CTA Buttons - Clean styling */}
              <div className="flex flex-wrap gap-4 justify-center animate-fade-in-up animation-delay-900">
                <a
                  href="#contact"
                  className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-3 rounded-md text-lg font-medium transition-all duration-300"
                >
                  <span className="flex items-center">
                    Get a Quote
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </a>
                <a
                  href="#history"
                  className="text-white border-2 border-white hover:bg-white/10 px-8 py-3 rounded-md text-lg font-medium transition-all duration-300"
                >
                  Our History
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animation styles are moved to a client component */}
      <AboutHeroAnimations />

      {/* Main Content Section */}
      <section id="history" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium" 
                   style={{ backgroundColor: `${content.theme?.primaryColor}20` || '#1e3a8a20', color: content.theme?.primaryColor || '#1e3a8a' }}>
                <FaHistory className="mr-2" /> Our Story
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4 mb-6">
                Our History & Mission
              </h2>
              <div className="prose prose-lg max-w-none">
                <p>
                  {business.description || `At ${business.name}, we have been serving our local community since ${business.establishedYear || '2000'}, 
                  building a reputation for quality, reliability, and exceptional customer service.`}
                </p>
                <p>
                  From our humble beginnings, we've grown to become a trusted name in our industry, 
                  all while maintaining our commitment to personalized service and craftsmanship.
                </p>
              </div>
              
              <div className="mt-10">
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
                     style={{ backgroundColor: `${content.theme?.primaryColor}20` || '#1e3a8a20', color: content.theme?.primaryColor || '#1e3a8a' }}>
                  <FaBullseye className="mr-2" /> Our Purpose
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mt-4 mb-4">
                  Our Mission
                </h3>
                <p className="text-gray-700">
                  {business.mission || `Our mission at ${business.name} is to provide the highest quality products and services
                  while maintaining uncompromising standards of integrity, professionalism, and respect for our customers and team members.`}
                </p>
              </div>
            </div>
            
            <div className="relative rounded-xl overflow-hidden shadow-xl">
              <div className="aspect-w-4 aspect-h-3">
                <Image 
                  src={business.about?.image || "/images/about-placeholder.jpg"} 
                  alt={`About ${business.name}`}
                  width={600}
                  height={450}
                  className="object-cover rounded-xl"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                <div className="text-white">
                  <p className="font-medium">Trusted by customers since</p>
                  <p className="text-3xl font-bold">{business.establishedYear || '2000'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
                 style={{ backgroundColor: `${content.theme?.primaryColor}20` || '#1e3a8a20', color: content.theme?.primaryColor || '#1e3a8a' }}>
              <FaHandshake className="mr-2" /> What Drives Us
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4 mb-6">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These principles guide everything we do at {business.name}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(business.coreValues || [
              {
                title: "Integrity",
                description: "We conduct our business with honesty, transparency, and ethical standards that earn your trust."
              },
              {
                title: "Excellence",
                description: "We strive for excellence in every aspect of our work, from customer service to the quality of our products."
              },
              {
                title: "Sustainability",
                description: "We are committed to sustainable practices that minimize our environmental impact and benefit our community."
              }
            ]).map((value: ValueItem, index: number) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="mb-6 text-2xl" style={{ color: content.theme?.primaryColor || '#1e3a8a' }}>
                  {index === 0 && <FaHandshake />}
                  {index === 1 && <FaStar />}
                  {index === 2 && <FaLeaf />}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-700">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
                 style={{ backgroundColor: `${content.theme?.primaryColor}20` || '#1e3a8a20', color: content.theme?.primaryColor || '#1e3a8a' }}>
              <FaQuoteLeft className="mr-2" /> Customer Feedback
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4 mb-6">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it - hear from our satisfied customers
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.homepage.testimonials?.map((testimonial, index: number) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                <div className="mb-4" style={{ color: content.theme?.primaryColor || '#1e3a8a' }}>
                  {Array(5).fill(0).map((_, i) => (
                    <span key={i} className="text-xl">★</span>
                  ))}
                </div>
                <div className="relative mb-8 flex-grow">
                  <div className="text-6xl font-serif text-gray-100 absolute top-0 left-0 leading-none z-0" aria-hidden="true">
                    "
                  </div>
                  <blockquote className="text-lg text-gray-700 relative z-10 pt-3 pl-2">
                    {testimonial.quote}
                  </blockquote>
                </div>
                <div className="mt-auto pt-6 border-t border-gray-100 flex items-center">
                  <div className="mr-4 text-gray-400 text-xl">
                    👤
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{testimonial.author}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Gallery Section - Moved above contact form */}
      <AboutGalleryWrapper content={content} />
      
      {/* Contact Form Section */}
      <section id="contact" className="py-16 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
                 style={{ backgroundColor: `${content.theme?.primaryColor}20` || '#1e3a8a20', color: content.theme?.primaryColor || '#1e3a8a' }}>
              <FaPhoneAlt className="mr-2" /> Get In Touch
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4 mb-6">
              Contact Us Today
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Have a question or ready to start your project? We're here to help.
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
            <ContactSection content={content as any} />
          </div>
        </div>
      </section>
    </main>
  );
} 