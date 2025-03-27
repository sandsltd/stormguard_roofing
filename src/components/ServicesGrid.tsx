import React from 'react';
import { FaHome, FaTools, FaSearch, FaWrench, FaCloud, FaBolt, FaBuilding, FaSync } from 'react-icons/fa';
import Link from 'next/link';

interface Service {
  title: string;
  description: string;
  link: string;
}

interface ServicesGridProps {
  services: Service[];
  theme: {
    primaryColor?: string;
    secondaryColor?: string;
    text?: string;
    background?: string;
  };
}

const getServiceIcon = (index: number) => {
  const icons = [
    FaHome,      // Roof Installation
    FaTools,     // Roof Repairs
    FaSearch,    // Roof Inspections
    FaWrench,    // Roof Maintenance
    FaCloud,     // Gutter Services
    FaBolt,      // Emergency Roofing
    FaBuilding,  // Commercial Roofing
    FaSync       // Roof Replacement
  ];
  const Icon = icons[index] || FaHome;
  return Icon;
};

export default function ServicesGrid({ services, theme }: ServicesGridProps) {
  // Use theme colors or fallback to defaults
  const primaryColor = theme.primaryColor || '#3b82f6';
  const textColor = theme.text || '#111827';

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {services.map((service, index) => {
        // Create unique gradient angles for each card
        const gradientAngle = ((index % 4) * 45) + 45;
        
        return (
          <div 
            key={index}
            className="group flex flex-col bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 relative z-10"
            style={{
              backgroundImage: `linear-gradient(${gradientAngle}deg, white 50%, ${primaryColor}08 100%)`,
            }}
          >
            {/* Card Top Design */}
            <div className="relative w-full h-20 overflow-hidden">
              <div 
                className="absolute top-0 right-0 w-full h-full"
                style={{
                  background: `linear-gradient(135deg, transparent 30%, ${primaryColor}15 100%)`,
                }}
              ></div>
              <div 
                className="absolute top-0 left-0 w-32 h-32 -translate-x-16 -translate-y-16 rounded-full opacity-20"
                style={{ background: primaryColor }}
              ></div>
            </div>
            
            {/* Icon Section */}
            <div className="px-8 -mt-10 mb-6 relative z-10">
              <div 
                className="w-20 h-20 rounded-xl flex items-center justify-center shadow-lg group-hover:-translate-y-1 transition-all duration-500"
                style={{ 
                  background: `linear-gradient(135deg, ${primaryColor} 0%, ${primaryColor}dd 100%)`,
                }}
              >
                {React.createElement(getServiceIcon(index), {
                  className: "w-10 h-10 text-white transform group-hover:scale-110 transition-transform duration-500",
                })}
              </div>
            </div>

            {/* Content Section */}
            <div className="px-8 pb-8">
              <h3 
                className="text-2xl font-bold mb-3 group-hover:translate-x-1 transition-transform duration-300"
                style={{ color: primaryColor }}
              >
                {service.title}
              </h3>

              <p 
                className="text-base mb-6 leading-relaxed line-clamp-3 max-w-sm"
                style={{ 
                  color: textColor,
                  opacity: 0.75
                }}
              >
                {service.description}
              </p>

              {/* Get A Free Quote Link */}
              <div className="relative">
                <Link
                  href={service.link || "/contact"}
                  className="inline-flex items-center text-base font-bold group-hover:translate-x-1 transition-all duration-300 relative"
                  style={{ color: primaryColor }}
                >
                  <span className="relative">
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-500" 
                      style={{ background: `linear-gradient(to right, ${primaryColor}99, ${primaryColor})` }}>
                    </span>
                    Get A Free Quote
                  </span>
                  <svg 
                    className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform duration-500" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    style={{ stroke: primaryColor }}
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M5 12h14m0 0l-6-6m6 6l-6 6"
                    />
                  </svg>
                </Link>
                
                {/* Decorative element near CTA */}
                <div 
                  className="absolute w-12 h-0.5 rounded-full right-0 bottom-3 opacity-0 group-hover:opacity-30 group-hover:w-24 transition-all duration-500"
                  style={{ background: primaryColor }}
                ></div>
              </div>
            </div>
            
            {/* Bottom corner accent */}
            <div 
              className="absolute bottom-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
              style={{ 
                background: primaryColor,
                clipPath: 'polygon(100% 0%, 0% 100%, 100% 100%)'
              }}
            ></div>
          </div>
        );
      })}
    </div>
  );
} 