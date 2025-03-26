import React from 'react';
import { Content } from '@/types/content';

interface FeaturesSectionProps {
  content: Content;
}

export default function FeaturesSection({ content }: FeaturesSectionProps) {
  // Initialize featuresSection with default values if it doesn't exist
  const featuresSection = content.homepage.featuresSection || {
    title: "Why Choose Us",
    description: "We combine expertise, quality materials, and exceptional service to deliver outstanding results for every project.",
    ctaText: "View All Our Services",
    ctaLink: "/services"
  };

  // Use primary color from theme or default to blue
  const primaryColor = content.theme?.primaryColor || '#3b82f6';
  const primaryColorLight = `${primaryColor}10`; // 10% opacity version for backgrounds
  
  return (
    <section className="py-24 relative bg-gradient-to-b from-white to-gray-50">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full opacity-30" 
          style={{ backgroundColor: primaryColorLight }}></div>
        <div className="absolute top-24 -left-12 w-64 h-64 rounded-full opacity-30"
          style={{ backgroundColor: primaryColorLight }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span style={{ 
              backgroundImage: `linear-gradient(to right, ${primaryColor}, ${primaryColor}aa)`, 
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              color: 'transparent'
            }}>
              {featuresSection.title}
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {featuresSection.description}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {content.homepage.features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl shadow-lg p-8 transform transition-all duration-300 hover:scale-105 hover:shadow-xl border-t-4"
              style={{ borderColor: primaryColor }}
            >
              <div className="w-16 h-16 mb-6 rounded-full flex items-center justify-center" 
                style={{ backgroundColor: `${primaryColor}20`, color: primaryColor }}>
                {feature.icon === 'team' ? (
                  <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ) : feature.icon === 'materials' ? (
                  <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                ) : (
                  <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                )}
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              <div className="mt-6 pt-6 border-t border-gray-100">
                <a href={feature.learnMoreLink || '#'} className="inline-flex items-center font-medium" style={{ color: primaryColor }}>
                  {feature.learnMoreText || "Learn more"}
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <a 
            href={featuresSection.ctaLink} 
            className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white rounded-lg transition-colors hover:opacity-90"
            style={{ backgroundColor: primaryColor }}
          >
            {featuresSection.ctaText}
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
} 