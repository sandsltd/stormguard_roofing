'use client';

import Image from 'next/image';
import { Content } from '@/utils/content';

interface HeroSectionProps {
  content: Content;
}

export default function HeroSection({ content }: HeroSectionProps) {
  return (
    <>
      {/* Hero Section */}
      <div className="relative min-h-screen overflow-hidden pt-4">
        {/* Main Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/roofers/roofer_fixing_tile_on_roof.png"
            alt="Professional Roofer"
            fill
            className="object-cover object-center"
            priority
            quality={90}
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
          
          {/* Pattern Overlay for Texture */}
          <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-10" />
          
          {/* Animated Highlights */}
          <div className="absolute -top-[30%] -left-[10%] w-3/4 h-3/4 bg-blue-600/10 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute -bottom-[30%] -right-[10%] w-3/4 h-3/4 bg-blue-600/10 rounded-full blur-3xl animate-pulse-slow animation-delay-2000" />
        </div>
        
        {/* Content Container */}
        <div className="relative z-10 h-screen flex items-center px-6 md:px-12">
          <div className="max-w-7xl mx-auto w-full">
            <div className="max-w-3xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-blue-600/20 backdrop-blur-md px-4 py-2 rounded-full mb-6 border border-blue-600/30 animate-fade-in-up">
                <span className="w-2.5 h-2.5 bg-blue-600 rounded-full animate-pulse"></span>
                <span className="text-white font-medium text-sm uppercase tracking-wider">{content.business.tagline}</span>
              </div>
              
              {/* Main Heading with Gradient Text */}
              <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-white leading-tight animate-fade-in-up animation-delay-300">
                <span className="block">Expert</span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-blue-300">
                  Roofing Services
                </span>
                <span className="block">In Dorchester</span>
              </h1>
              
              {/* Subtitle with Line Animation */}
              <div className="group relative inline-block mb-8 animate-fade-in-up animation-delay-600">
                <p className="text-xl md:text-2xl text-blue-100 leading-relaxed max-w-2xl">
                  Professional roofing solutions with superior craftsmanship 
                  and unmatched customer service. We've got you covered.
                </p>
                <span className="block w-0 group-hover:w-full h-0.5 bg-blue-500 transition-all duration-700 ease-out"></span>
              </div>
              
              {/* CTA Buttons with Glass Effect */}
              <div className="flex flex-wrap gap-4 animate-fade-in-up animation-delay-900">
                <a
                  href="/contact"
                  className="relative overflow-hidden inline-flex items-center bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all duration-300 shadow-xl hover:shadow-blue-600/30 group"
                >
                  <span className="relative z-10 flex items-center">
                    Get a Free Quote
                    <svg className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-600 to-blue-700 transform group-hover:scale-102 transition-all duration-500 ease-out" />
                  <div className="absolute right-0 w-12 h-full bg-white/10 transform skew-x-12 translate-x-0 transition-transform group-hover:translate-x-40 ease-out duration-700" />
                </a>
                <a
                  href="/services"
                  className="inline-flex items-center bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/20 transition-all duration-300"
                >
                  Our Services
                </a>
              </div>
              
              {/* Key Features Pills */}
              <div className="mt-12 flex flex-wrap gap-3 animate-fade-in-up animation-delay-1200">
                {["Licensed & Insured", "10+ Years Experience", "Free Inspections", "Emergency Service"].map((item, index) => (
                  <div key={index} className="flex items-center bg-white/5 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                    <svg className="w-4 h-4 text-blue-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                    <span className="text-sm text-white">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll Down Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
          <div className="flex flex-col items-center">
            <span className="text-white text-sm mb-2">Scroll Down</span>
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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