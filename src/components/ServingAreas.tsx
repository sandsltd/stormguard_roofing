'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SafeImage from '@/components/ui/SafeImage';

interface Area {
  name: string;
  description: string;
  image: string;
  tags: string[];
  ctaText: string;
  ctaLink: string;
}

interface ServingAreasProps {
  title: string;
  description: string;
  areas: Area[];
}

export default function ServingAreas({ title, description, areas }: ServingAreasProps) {
  // Ensure we have areas to display
  if (!areas || areas.length === 0) {
    return null;
  }

  // Process areas to ensure they all have valid images
  const processedAreas = areas.map(area => ({
    ...area,
    image: area.image && area.image.trim() !== '' ? area.image : '/images/areas/residential1.jpg'
  }));

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">{description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {processedAreas.map((area, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-2"
            >
              <div className="relative h-48">
                <SafeImage
                  src={area.image}
                  alt={`${area.name} area`}
                  fill
                  className="object-cover"
                  fallbackSrc="/images/areas/residential1.jpg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
                  <h3 className="text-xl font-bold text-white p-4">{area.name}</h3>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-gray-600 mb-4">{area.description}</p>
                
                {area.tags && area.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {area.tags.map((tag, idx) => (
                      <span 
                        key={idx} 
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                
                <Link 
                  href={area.ctaLink || '/contact'}
                  className="inline-block px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
                >
                  {area.ctaText || 'Learn More'}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 