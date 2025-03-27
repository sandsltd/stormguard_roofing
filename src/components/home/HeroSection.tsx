'use client';

import Image from 'next/image';
import { Content } from '@/utils/content';

interface HeroSectionProps {
  content: Content;
}

export default function HeroSection({ content }: HeroSectionProps) {
  // Make sure we have default values for all nested properties to avoid "Cannot read properties of undefined" errors
  const defaultPremiumHero = {
    backgroundImage: '/images/roofers/roofer_fixing_tile_on_roof.png',
    title: {
      line1: 'Expert',
      line2: 'Roofing Services',
      line3: 'In Dorchester'
    },
    subtitle: 'Professional roofing solutions with superior craftsmanship and unmatched customer service. We\'ve got you covered.',
    ctaPrimary: {
      text: 'Get a Free Quote',
      link: '/contact'
    },
    ctaSecondary: {
      text: 'Our Services',
      link: '/services'
    },
    featureBadges: ['Licensed & Insured', '10+ Years Experience', 'Free Inspections', 'Emergency Service']
  };

  // Use optional chaining and nullish coalescing to safely access nested properties
  const premiumHero = {
    backgroundImage: content.homepage.premiumHero?.backgroundImage || defaultPremiumHero.backgroundImage,
    title: {
      line1: content.homepage.premiumHero?.title?.line1 || defaultPremiumHero.title.line1,
      line2: content.homepage.premiumHero?.title?.line2 || defaultPremiumHero.title.line2,
      line3: content.homepage.premiumHero?.title?.line3 || defaultPremiumHero.title.line3,
    },
    subtitle: content.homepage.premiumHero?.subtitle || defaultPremiumHero.subtitle,
    ctaPrimary: {
      text: content.homepage.premiumHero?.ctaPrimary?.text || defaultPremiumHero.ctaPrimary.text,
      link: content.homepage.premiumHero?.ctaPrimary?.link || defaultPremiumHero.ctaPrimary.link,
    },
    ctaSecondary: {
      text: content.homepage.premiumHero?.ctaSecondary?.text || defaultPremiumHero.ctaSecondary.text,
      link: content.homepage.premiumHero?.ctaSecondary?.link || defaultPremiumHero.ctaSecondary.link,
    },
    featureBadges: content.homepage.premiumHero?.featureBadges || defaultPremiumHero.featureBadges,
  };

  return (
    <>
      {/* Hero Section */}
      <div className="relative min-h-[100dvh] overflow-hidden pt-24 sm:pt-28 md:pt-32">
        {/* Main Background Image */}
        <div className="absolute inset-0">
          <Image
            src={premiumHero.backgroundImage}
            alt="Professional Roofer"
            fill
            className="object-cover object-center"
            priority
            quality={90}
            sizes="100vw"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent md:from-black/70 md:via-black/50 md:to-transparent" />
          
          {/* Pattern Overlay for Texture */}
          <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-10" />
          
          {/* Animated Highlights */}
          <div className="absolute -top-[30%] -left-[10%] w-3/4 h-3/4 rounded-full blur-3xl animate-pulse-slow" 
            style={{ backgroundColor: `${content.theme?.primaryColor || '#3b82f6'}10` }} />
          <div className="absolute -bottom-[30%] -right-[10%] w-3/4 h-3/4 rounded-full blur-3xl animate-pulse-slow animation-delay-2000" 
            style={{ backgroundColor: `${content.theme?.primaryColor || '#3b82f6'}10` }} />
        </div>
        
        {/* Content Container */}
        <div className="relative z-10 min-h-[calc(100vh-6rem)] flex items-center px-4 sm:px-6 md:px-12 pt-0 -mt-0 sm:-mt-8 md:-mt-16">
          <div className="max-w-7xl mx-auto w-full">
            <div className="max-w-3xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-6 animate-fade-in-up"
                style={{ 
                  backgroundColor: `${content.theme?.primaryColor || '#3b82f6'}20`,
                  borderColor: `${content.theme?.primaryColor || '#3b82f6'}30`,
                  borderWidth: '1px'
                }}>
                <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full animate-pulse"
                  style={{ backgroundColor: content.theme?.primaryColor || '#3b82f6' }}></span>
                <span className="text-white font-medium text-xs sm:text-sm uppercase tracking-wider">{content.business.tagline}</span>
              </div>
              
              {/* Text container with semi-transparent background */}
              <div className="p-4 sm:p-6 rounded-lg bg-black/40 backdrop-blur-sm">
                {/* Main Heading with Gradient Text */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold mb-4 sm:mb-6 text-white leading-tight animate-fade-in-up animation-delay-300" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                  <span className="block">{premiumHero.title.line1}</span>
                  <span className="text-white">{premiumHero.title.line2}</span>
                  <span className="block">{premiumHero.title.line3}</span>
                </h1>
                
                {/* Subtitle with Line Animation */}
                <div className="group relative inline-block mb-6 sm:mb-8 animate-fade-in-up animation-delay-600">
                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white leading-relaxed max-w-2xl" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                    {premiumHero.subtitle}
                  </p>
                  <span className="block w-0 group-hover:w-full h-0.5 bg-white transition-all duration-700 ease-out"></span>
                </div>
                
                {/* CTA Buttons with Glass Effect */}
                <div className="flex flex-wrap gap-3 sm:gap-4 animate-fade-in-up animation-delay-900">
                  <a
                    href={premiumHero.ctaPrimary.link}
                    className="relative overflow-hidden inline-flex items-center text-white px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-lg text-sm sm:text-base md:text-lg font-semibold hover:opacity-90 transition-all duration-300 shadow-xl group w-full sm:w-auto justify-center sm:justify-start"
                    style={{ backgroundColor: content.theme?.primaryColor || '#3b82f6', boxShadow: `0 10px 15px -3px ${content.theme?.primaryColor || '#3b82f6'}30` }}
                  >
                    <span className="relative z-10 flex items-center">
                      {premiumHero.ctaPrimary.text}
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                    <div className="absolute inset-0 h-full w-full transform group-hover:scale-102 transition-all duration-500 ease-out" 
                      style={{ backgroundColor: content.theme?.primaryColor || '#3b82f6' }} />
                    <div className="absolute right-0 w-12 h-full bg-white/10 transform skew-x-12 translate-x-0 transition-transform group-hover:translate-x-40 ease-out duration-700" />
                  </a>
                  <a
                    href={premiumHero.ctaSecondary.link}
                    className="inline-flex items-center bg-white/10 backdrop-blur-md text-white border border-white/20 px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-lg text-sm sm:text-base md:text-lg font-semibold hover:bg-white/20 transition-all duration-300 w-full sm:w-auto justify-center"
                  >
                    {premiumHero.ctaSecondary.text}
                  </a>
                </div>
              </div>
              
              {/* Key Features Pills */}
              <div className="mt-6 sm:mt-8 md:mt-12 flex flex-wrap gap-2 sm:gap-3 animate-fade-in-up animation-delay-1200">
                {premiumHero.featureBadges.map((item, index) => (
                  <div key={index} className="flex items-center bg-white/5 backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/10 text-xs sm:text-sm">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" fill="currentColor" viewBox="0 0 20 20" style={{ color: content.theme?.primaryColor || '#3b82f6' }}>
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
        <div className="absolute bottom-12 sm:bottom-16 md:bottom-20 right-4 sm:right-16 md:right-32 lg:right-48 z-10 animate-bounce hidden sm:flex">
          <div className="flex flex-col items-center">
            <span className="text-white text-xs sm:text-sm mb-2">Scroll Down</span>
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>

      {/* Custom animations */}
      <style jsx global>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.7; }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .animation-delay-300 {
          animation-delay: 300ms;
        }
        
        .animation-delay-600 {
          animation-delay: 600ms;
        }
        
        .animation-delay-900 {
          animation-delay: 900ms;
        }
        
        .animation-delay-1200 {
          animation-delay: 1200ms;
        }
        
        .animation-delay-2000 {
          animation-delay: 2000ms;
        }
      `}</style>
    </>
  );
} 