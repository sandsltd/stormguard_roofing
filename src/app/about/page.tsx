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
      <div className="relative min-h-[100dvh] overflow-hidden pt-20 sm:pt-24 md:pt-28 lg:pt-32">
        <div className="absolute inset-0">
          <Image 
            src="/images/roofers/roofer_installing_new_roof.png"
            alt={`${business.name} Team`}
            fill
            className="object-cover object-center brightness-[0.95]"
            priority
            quality={90}
            sizes="100vw"
          />
          {/* Gradient Overlay - Using the homepage style */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/40" />
          
          {/* Pattern Overlay for Texture */}
          <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-20"></div>
          
          {/* Animated Highlights - Matching homepage style */}
          <div className="absolute -top-[20%] -left-[10%] w-full h-full rounded-full blur-3xl animate-pulse-slow opacity-30" 
            style={{ backgroundColor: 'rgba(220, 38, 38, 0.15)' }} />
          <div className="absolute -bottom-[20%] -right-[10%] w-full h-full rounded-full blur-3xl animate-pulse-slow animation-delay-2000 opacity-30" 
            style={{ backgroundColor: `${content.theme?.primaryColor || '#3b82f6'}15` }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 rounded-full blur-3xl animate-pulse-slow animation-delay-1000 opacity-30" 
            style={{ backgroundColor: 'rgba(220, 38, 38, 0.2)' }} />
        </div>
        
        {/* Content Container */}
        <div className="relative z-10 min-h-[calc(100vh-5rem)] sm:min-h-[calc(100vh-6rem)] md:min-h-[calc(100vh-7rem)] flex items-center px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="max-w-7xl mx-auto w-full">
            <div className="max-w-3xl">
              {/* Badge - Match homepage style */}
              <div className="inline-flex items-center gap-2 backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-5 md:mb-6 animate-fade-in-up bg-red-500/10 border border-red-500/20">
                <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full animate-pulse bg-red-500"></span>
                <span className="text-white font-medium text-xs sm:text-sm uppercase tracking-wider">ESTABLISHED {business.establishedYear || '2000'}</span>
              </div>
              
              {/* Main Heading with Gradient Text - Maintain about content */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-5 md:mb-6 text-white leading-[1.15] animate-fade-in-up animation-delay-300" style={{ textShadow: '0 4px 8px rgba(0,0,0,0.75)' }}>
                <span className="block text-white">About</span>
                <span className="text-white block my-1 sm:my-2">{business.name}</span>
                <span className="block text-red-500">Our Story</span>
              </h1>
              
              {/* Subtitle with Line Animation */}
              <div className="group relative inline-block mb-6 sm:mb-8 md:mb-10 animate-fade-in-up animation-delay-600">
                <p className="text-lg sm:text-xl md:text-2xl text-white/95 leading-relaxed max-w-2xl font-light" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.75)' }}>
                  {business.tagline || 'Your trusted local business dedicated to excellent service and exceptional quality'}
                </p>
                <span className="block w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-red-500 to-transparent transition-all duration-700 ease-out"></span>
              </div>
              
              {/* CTA Buttons with Enhanced Glass Effect */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 animate-fade-in-up animation-delay-900">
                <a
                  href="/contact"
                  className="relative overflow-hidden inline-flex items-center justify-center text-white px-6 sm:px-8 py-4 rounded-lg text-base sm:text-lg font-bold hover:opacity-100 transition-all duration-300 shadow-xl group transform hover:scale-105 hover:-translate-y-1 bg-red-600 hover:bg-red-500"
                >
                  <span className="relative z-10 flex items-center">
                    Get a Quote
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                  <div className="absolute right-0 w-12 h-full bg-white/20 transform skew-x-12 translate-x-0 transition-transform group-hover:translate-x-40 ease-out duration-700" />
                </a>
                <a
                  href="#history"
                  className="inline-flex items-center justify-center bg-white/10 backdrop-blur-md text-white border-2 border-white/20 px-6 sm:px-8 py-4 rounded-lg text-base sm:text-lg font-bold hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
                >
                  Our History
                </a>
              </div>
              
              {/* Key Feature Badges */}
              <div className="mt-6 sm:mt-8 md:mt-10 flex flex-wrap gap-3 animate-fade-in-up animation-delay-1200">
                {['Professional Team', 'Over 15 Years Experience', 'Quality Service', 'Customer Satisfaction'].map((item, index) => (
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
                  all while maintaining our commitment to personalised service and craftsmanship.
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
                  src="/images/client-images/unnamed-12.webp"
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
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
              Have a question or ready to start your project? We're here to help.
            </p>
            <div className="flex justify-center mb-8">
              <a
                href="/contact"
                className="inline-flex items-center justify-center text-white px-6 py-3 rounded-lg font-bold hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-md"
                style={{ backgroundColor: content.theme?.primaryColor || '#1e3a8a' }}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Visit Contact Page
              </a>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
            <ContactSection content={content as any} />
          </div>
        </div>
      </section>
    </main>
  );
} 