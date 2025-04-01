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
      <div className="relative min-h-[100dvh] overflow-hidden pt-16 sm:pt-20 md:pt-24 lg:pt-28">
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
          
          {/* Gradient Overlay - Stronger gradient for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/50" />
          
          {/* Pattern Overlay for Texture */}
          <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-20" />
          
          {/* Animated Highlights */}
          <div className="absolute -top-[20%] -left-[10%] w-full h-full rounded-full blur-3xl animate-pulse-slow" 
            style={{ backgroundColor: 'rgba(220, 38, 38, 0.15)' }} />
          <div className="absolute -bottom-[20%] -right-[10%] w-full h-full rounded-full blur-3xl animate-pulse-slow animation-delay-2000" 
            style={{ backgroundColor: `${content.theme?.primaryColor || '#3b82f6'}15` }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 rounded-full blur-3xl animate-pulse-slow animation-delay-1000" 
            style={{ backgroundColor: 'rgba(220, 38, 38, 0.2)' }} />
        </div>
        
        {/* Content Container */}
        <div className="relative z-10 min-h-[calc(100vh-4rem)] sm:min-h-[calc(100vh-5rem)] md:min-h-[calc(100vh-6rem)] flex items-center px-4 sm:px-6 md:px-8 lg:px-12 pt-0">
          <div className="max-w-7xl mx-auto w-full">
            <div className="max-w-3xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-3 sm:mb-4 md:mb-6 animate-fade-in-up"
                style={{ 
                  backgroundColor: `${content.theme?.primaryColor || '#3b82f6'}20`,
                  borderColor: `${content.theme?.primaryColor || '#3b82f6'}30`,
                  borderWidth: '1px'
                }}>
                <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full animate-pulse"
                  style={{ backgroundColor: content.theme?.primaryColor || '#3b82f6' }}></span>
                <span className="text-white font-medium text-xs sm:text-sm uppercase tracking-wider">{content.business.tagline}</span>
              </div>
              
              {/* Main Heading with Gradient Text */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold mb-4 sm:mb-6 md:mb-8 text-white leading-tight animate-fade-in-up animation-delay-300" style={{ textShadow: '0 4px 8px rgba(0,0,0,0.5)' }}>
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">{premiumHero.title.line1}</span>
                <span className="text-white block my-1 sm:my-2">{premiumHero.title.line2}</span>
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-600/80">{premiumHero.title.line3}</span>
              </h1>
              
              {/* Subtitle with Line Animation */}
              <div className="group relative inline-block mb-6 sm:mb-8 md:mb-10 animate-fade-in-up animation-delay-600">
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed max-w-2xl font-light" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                  {premiumHero.subtitle}
                </p>
                <span className="block w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-red-500 to-transparent transition-all duration-700 ease-out"></span>
              </div>
              
              {/* CTA Buttons with Enhanced Glass Effect */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 animate-fade-in-up animation-delay-900">
                <a
                  href={premiumHero.ctaPrimary.link}
                  className="relative overflow-hidden inline-flex items-center justify-center text-white px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-lg text-sm sm:text-base md:text-lg font-bold hover:opacity-100 transition-all duration-300 shadow-xl group transform hover:scale-105 hover:-translate-y-1"
                  style={{ 
                    backgroundColor: 'rgb(239, 68, 68)',
                    boxShadow: '0 10px 25px -3px rgba(239, 68, 68, 0.5), 0 0 15px -3px rgba(239, 68, 68, 0.7)'
                  }}
                >
                  <span className="relative z-10 flex items-center">
                    {premiumHero.ctaPrimary.text}
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 h-full w-full transform group-hover:scale-102 transition-all duration-500 ease-out bg-gradient-to-r from-red-600 to-red-500" />
                  <div className="absolute right-0 w-12 h-full bg-white/20 transform skew-x-12 translate-x-0 transition-transform group-hover:translate-x-40 ease-out duration-700" />
                </a>
                <a
                  href={premiumHero.ctaSecondary.link}
                  className="inline-flex items-center justify-center bg-white/15 backdrop-blur-md text-white border-2 border-white/30 px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-lg text-sm sm:text-base md:text-lg font-bold hover:bg-white/25 transition-all duration-300 transform hover:scale-105"
                >
                  {premiumHero.ctaSecondary.text}
                </a>
              </div>
              
              {/* Key Features Pills */}
              <div className="mt-4 sm:mt-6 md:mt-8 flex flex-wrap gap-2 sm:gap-3 animate-fade-in-up animation-delay-1200">
                {premiumHero.featureBadges.map((item, index) => (
                  <div key={index} className="flex items-center bg-white/5 backdrop-blur-md px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 rounded-full border border-red-500/20 text-xs sm:text-sm">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-1.5" fill="currentColor" viewBox="0 0 20 20" style={{ color: 'rgb(239, 68, 68)' }}>
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
        <div className="absolute bottom-8 sm:bottom-12 md:bottom-16 right-4 sm:right-8 md:right-12 lg:right-16 z-10 animate-bounce hidden sm:flex">
          <div className="flex flex-col items-center">
            <span className="text-white text-xs sm:text-sm mb-2">Scroll Down</span>
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>

      {/* Custom animations */}
      <style jsx global>{`
        @keyframes pulse-slow {
          0%, 100% { 
            opacity: 0.3;
            transform: scale(1);
          }
          50% { 
            opacity: 0.7;
            transform: scale(1.1);
          }
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