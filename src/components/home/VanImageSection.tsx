import React from 'react';
import Image from 'next/image';
import { Content } from '@/utils/content';

interface VanImageSectionProps {
  content: Content;
}

export default function VanImageSection({ content }: VanImageSectionProps) {
  // Use primary color from theme or default
  const primaryColor = content.theme?.primaryColor || '#000000';
  const primaryColorLight = `${primaryColor}15`; // 15% opacity for backgrounds

  return (
    <section className="py-10 bg-white relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-40" style={{background: `linear-gradient(to bottom, ${primaryColorLight}, transparent)`}}></div>
      
      <div className="max-w-3xl mx-auto px-4 relative">
        <div className="text-center mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Our Service Vehicle</h3>
          <p className="text-gray-600">Serving Cannock and surrounding areas</p>
        </div>
        
        <div className="relative rounded-lg overflow-hidden shadow-lg border border-gray-200 max-w-lg mx-auto">
          <div className="aspect-[4/3] relative">
            <Image
              src="/images/roofers/b00ef808-5c9f-47f5-97e0-00e3fbe9b2dd.png"
              alt="StormGuard Roofing Service Van"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 600px"
              style={{ filter: 'brightness(1.05) contrast(0.95)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white text-center">
            <p className="text-sm font-medium">Ready to help with all your roofing needs in Cannock</p>
          </div>
        </div>
      </div>
    </section>
  );
} 