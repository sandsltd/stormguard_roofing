'use client';

import React from 'react';
import Image from 'next/image';
import { Content } from '@/utils/content';
import { FaArrowRight } from 'react-icons/fa';
import SafeImage from '@/components/ui/SafeImage';

interface ServingAreasSectionProps {
  content: Content;
}

export default function ServingAreasSection({ content }: ServingAreasSectionProps) {
  // Initialize servingAreasSection with default values if it doesn't exist
  const servingAreasSection = content.homepage.servingAreasSection || {
    title: "Serving Crewe & Surrounding Areas",
    description: "Our roofing solutions are tailored to the specific climate challenges and architectural styles of Crewe and Cheshire. We understand the unique weather patterns and building requirements of the local area."
  };

  // Use primary color from theme or default to indigo
  const primaryColor = content.theme?.primaryColor || '#4f46e5';
  const primaryColorLight = `${primaryColor}15`; // 15% opacity for backgrounds
  
  // Default areas if none exist
  const defaultAreas = [
    {
      name: "Crewe",
      description: "As Crewe's trusted roofing contractor, we understand the unique challenges that Cheshire weather presents to your roof. From heavy rainfall to strong winds, our roofing solutions are designed to withstand the local climate while complementing Crewe's diverse architectural styles.",
      image: "/images/areas/residential1.jpg",
      tags: ["Weather Resistant", "Local Crewe Roofers", "Energy Efficient"],
      ctaText: "Request a Free Quote",
      ctaLink: "/contact"
    },
    {
      name: "Nantwich",
      description: "Nantwich homeowners trust our Crewe roofers for traditional and modern roofing solutions. Our specialised materials and installation techniques help protect your home from the varied weather conditions of Cheshire.",
      image: "/images/areas/town1.jpg",
      tags: ["Traditional Style Compatible", "Heritage Building Expertise", "Local Weather Protection"],
      ctaText: "Get Your Free Quote",
      ctaLink: "/contact"
    },
    {
      name: "Sandbach",
      description: "Serving Sandbach with expert roofing solutions from our base in Crewe. Our team of experienced roofers specialises in both traditional and contemporary roofing styles, ensuring your property is well-protected against Cheshire's weather.",
      image: "/images/areas/commercial1.jpg",
      tags: ["Experienced Crewe Roofers", "Mixed Style Solutions", "Comprehensive Protection"],
      ctaText: "Contact Us for a Quote",
      ctaLink: "/contact"
    }
  ];

  const servingAreas = content.homepage.servingAreas || defaultAreas;

  // Ensure all areas have valid images and use a fallback path
  const areasWithValidImages = servingAreas.map(area => ({
    ...area,
    // Use a fallback image path if none is provided or it's empty
    image: area.image && area.image.trim() !== '' 
      ? area.image 
      : `/images/areas/residential1.jpg`
  }));

  return (
    <section className="py-20 bg-white overflow-hidden relative">
      {/* Top decorative element */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-gray-50 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium"
            style={{ 
              backgroundColor: primaryColorLight,
              color: primaryColor
            }}>
            Roofers in Crewe & Cheshire
          </div>
        </div>
        
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">{servingAreasSection.title}</h2>
          <div className="w-20 h-1 mx-auto mb-8" style={{ backgroundColor: primaryColor }}></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {servingAreasSection.description}
          </p>
        </div>
        
        {/* Areas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {areasWithValidImages.map((area, index) => (
            <div key={index} className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              {/* Area Image */}
              <div className="relative h-60 overflow-hidden">
                <div className="absolute inset-0 z-10" 
                  style={{ backgroundColor: `${primaryColor}20` }}></div>
                <div className="relative w-full h-full">
                  <SafeImage 
                    src={area.image} 
                    alt={`Roofer in ${area.name}`} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    fallbackSrc="/images/areas/residential1.jpg"
                  />
                </div>
                {/* Location Badge */}
                <div className="absolute top-4 left-4 z-20">
                  <div className="text-white px-4 py-2 rounded-lg font-semibold"
                    style={{ backgroundColor: primaryColor }}>
                    {area.name}
                  </div>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Roofers in {area.name}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-4">
                  {area.description}
                </p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {area.tags && area.tags.map((tag, i) => (
                    <span key={i} className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
                
                {/* CTA Button */}
                <a 
                  href={area.ctaLink || "/contact"} 
                  className="inline-flex items-center font-semibold transition-colors"
                  style={{ 
                    color: primaryColor
                  }}
                >
                  {area.ctaText || "Request a Free Quote"} 
                  <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 