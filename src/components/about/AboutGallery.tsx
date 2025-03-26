'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Content } from '@/types/content';
import { FaSearch } from 'react-icons/fa';

interface AboutGalleryProps {
  content: Content;
  images: string[];
}

export default function AboutGallery({ content, images }: AboutGalleryProps) {
  const [activeImage, setActiveImage] = useState<string | null>(null);
  
  // Use primary color from theme or default to a blue color
  const primaryColor = content.theme?.primaryColor || '#1e3a8a';

  const handleImageClick = (imagePath: string) => {
    setActiveImage(imagePath);
  };

  const closeModal = () => {
    setActiveImage(null);
  };

  // If no images, don't render the section
  if (!images || images.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Work</h2>
          <div className="w-20 h-1 mx-auto mb-6" style={{ backgroundColor: primaryColor }}></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Browse through our gallery of completed projects showcasing our craftsmanship and attention to detail.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <div 
              key={index} 
              className="group relative aspect-square cursor-pointer overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
              onClick={() => handleImageClick(image)}
            >
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300 z-10"></div>
              <div className="relative w-full h-full transform transition-transform duration-500 group-hover:scale-110">
                <Image
                  src={image}
                  alt={`Gallery image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white bg-opacity-75">
                  <FaSearch className="text-xl" style={{ color: primaryColor }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
          onClick={closeModal}
        >
          <div className="relative max-w-5xl max-h-[90vh] p-2">
            <button 
              className="absolute top-4 right-4 z-10 text-white bg-gray-800 bg-opacity-60 rounded-full p-2 hover:bg-opacity-80"
              onClick={(e) => {
                e.stopPropagation();
                closeModal();
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="relative w-full h-full">
              <Image
                src={activeImage}
                alt="Enlarged gallery image"
                width={1200}
                height={800}
                className="mx-auto object-contain max-h-[85vh]"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
} 