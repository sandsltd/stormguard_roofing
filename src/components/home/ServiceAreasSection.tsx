'use client';

import React from 'react';
import { Content } from '@/utils/content';
import { FaMapMarkerAlt } from 'react-icons/fa';
import Link from 'next/link';

interface ServiceAreasSectionProps {
  content: Content;
}

export default function ServiceAreasSection({ content }: ServiceAreasSectionProps) {
  // Get section content or use defaults
  const serviceAreasSection = content.homepage.serviceAreasSection || {
    title: "Cannock Roofers Service Areas",
    subtitle: "Roofers in Cannock & Staffordshire",
    description: "StormGuard Roofing proudly serves homeowners and businesses throughout Cannock and Staffordshire. Our expert local roofers provide top-quality roofing services across these areas."
  };

  // Get service areas or use default areas if none exist
  const serviceAreas = content.homepage.serviceAreas || [
    { name: "Cannock", link: "/contact" },
    { name: "Holmes Chapel", link: "/contact" },
    { name: "Wheelock", link: "/contact" },
    { name: "Nantwich", link: "/contact" },
    { name: "Shavington", link: "/contact" },
    { name: "Church Lawton", link: "/contact" },
    { name: "Sandbach", link: "/contact" },
    { name: "Haslington", link: "/contact" },
    { name: "Audlem", link: "/contact" }
  ];

  // Use primary color from theme or default to a blue color
  const primaryColor = content.theme?.primaryColor || '#1e3a8a';

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-block bg-gray-200 text-gray-800 rounded-full px-4 py-2 text-sm font-medium">
            {serviceAreasSection.subtitle}
          </div>
        </div>

        {/* Section header */}
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
          {serviceAreasSection.title}
        </h2>
        
        {/* Divider */}
        <div className="w-24 h-1 mx-auto mb-8" style={{ backgroundColor: primaryColor }}></div>
        
        {/* Section description */}
        <p className="text-lg text-center text-gray-700 max-w-3xl mx-auto mb-12">
          {serviceAreasSection.description}
        </p>

        {/* Service Areas Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-12">
          {serviceAreas.map((area, index) => (
            <Link 
              href={area.link || "/contact"} 
              key={index}
              className="flex items-center bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-xl mr-3" style={{ color: primaryColor }}>
                <FaMapMarkerAlt />
              </div>
              <span className="text-lg font-medium text-gray-900">{area.name}</span>
            </Link>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-12">
          <p className="text-lg text-gray-700 mb-6">
            Don&apos;t see your Staffordshire area listed? Our Cannock roofers may still be able to help!
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white rounded-xl transition-all transform hover:scale-105 hover:shadow-xl"
            style={{ backgroundColor: primaryColor }}
          >
            Contact Cannock Roofers
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
} 