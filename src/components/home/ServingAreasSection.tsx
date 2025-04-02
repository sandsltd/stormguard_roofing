'use client';

import React from 'react';
import Image from 'next/image';
import { Content } from '@/utils/content';

interface ServingAreasSectionProps {
  content: Content;
}

export default function ServingAreasSection({ content }: ServingAreasSectionProps) {
  // Use primary color from theme or default to indigo
  const primaryColor = content.theme?.primaryColor || '#4f46e5';
  const primaryColorLight = `${primaryColor}15`; // 15% opacity for backgrounds
  
  // Default areas if none exist
  const defaultAreas = [
    {
      name: "Cannock",
      description: "As Cannock's trusted roofing contractor, we understand the unique challenges that the Staffordshire weather presents to your roof. From heavy rainfall to strong winds, our roofing solutions are designed to withstand the local climate while complementing Cannock's diverse architectural styles.",
      image: "/images/locations/cannock-town.jpg",
      tags: ["Weather Resistant", "Local Cannock Roofers", "Energy Efficient"],
      ctaText: "Request a Free Quote",
      ctaLink: "/contact"
    },
    {
      name: "West Bromwich",
      description: "Serving West Bromwich with expert roofing solutions. Our specialised materials and installation techniques help protect your home from the varied weather conditions.",
      image: "/images/areas/town1.jpg",
      tags: ["Traditional Style Compatible", "Heritage Building Expertise", "Local Weather Protection"],
      ctaText: "Get Your Free Quote",
      ctaLink: "/contact"
    },
    {
      name: "Dudley",
      description: "Our team of experienced roofers specialises in both traditional and contemporary roofing styles, ensuring your property is well-protected against the local weather.",
      image: "/images/areas/commercial1.jpg",
      tags: ["Experienced Roofers", "Mixed Style Solutions", "Comprehensive Protection"],
      ctaText: "Contact Us for a Quote",
      ctaLink: "/contact"
    }
  ];

  const servingAreas = content.homepage.servingAreas || defaultAreas;

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900 text-white overflow-hidden relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{ backgroundImage: 'url("/images/pattern.png")', backgroundRepeat: 'repeat' }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-white/10 text-white backdrop-blur-sm">
            Roofers in Cannock & Staffordshire
          </div>
        </div>
        
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">
            Roofers in Cannock & Staffordshire
          </h2>
          
          {/* Subheading */}
          <div className="text-lg text-center max-w-3xl mx-auto text-gray-600 mb-12">
            Serving Cannock & Surrounding Areas
          </div>
          
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-10">
            Our roofing solutions are tailored to the specific climate challenges and architectural styles of Cannock and Staffordshire. We understand the unique weather patterns and building requirements of the local area.
          </p>
        </div>
        
        {/* Areas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {servingAreas.map((area, index) => (
            <div 
              key={index} 
              className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm transition-all duration-300 hover:bg-white/10"
            >
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-white">
                  {area.name}
                </h3>
                <p className="text-gray-300 mb-6 line-clamp-3">
                  {area.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {area.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 bg-white/10 text-white text-sm rounded-full transition-all duration-300 group-hover:bg-white/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <a 
                  href={area.ctaLink || '/contact'} 
                  className="inline-flex items-center text-white hover:text-gray-200 transition-colors"
                >
                  <span>{area.ctaText || "Learn more"}</span>
                  <svg 
                    className="w-5 h-5 ml-2 transform transition-transform group-hover:translate-x-1" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M17 8l4 4m0 0l-4 4m4-4H3" 
                    />
                  </svg>
                </a>
              </div>
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-2xl transform rotate-45 opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-24 h-24 bg-gradient-to-tr from-white/10 to-transparent rounded-full blur-2xl transform -rotate-45 opacity-50 group-hover:opacity-75 transition-opacity"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 