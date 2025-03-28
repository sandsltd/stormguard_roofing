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
            Roofers in {content.business.location} & Cheshire
          </div>
        </div>
        
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Serving {content.business.location} & Surrounding Areas
          </h2>
          <p className="text-xl text-gray-600">
            Our roofing solutions are tailored to the specific climate challenges and architectural styles of {content.business.location} and Cheshire. We understand the unique weather patterns and building requirements of the local area.
          </p>
        </div>
        
        {/* Areas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {areasWithValidImages.map((area, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative h-48">
                <Image
                  src={area.image}
                  alt={area.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-white">{area.name}</h3>
                  <p className="text-white/90 mt-2">{area.description}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {area.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2 py-1 bg-white/20 text-white text-sm rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 