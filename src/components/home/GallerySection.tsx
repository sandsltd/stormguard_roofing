'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Content } from '@/utils/content';

interface GallerySectionProps {
  content: Content;
  images: string[];
}

export default function GallerySection({ content, images }: GallerySectionProps) {
  const [activeImage, setActiveImage] = useState<string | null>(null);
  
  // If no images, don't render the section
  if (!images || images.length === 0) {
    return null;
  }

  // Initialize gallerySection with default values if it doesn't exist
  const gallerySection = content.homepage.gallerySection || {
    title: "Our Portfolio",
    description: "Browse through our gallery of completed projects showcasing our craftsmanship and attention to detail."
  };

  const handleImageClick = (imagePath: string) => {
    setActiveImage(imagePath);
  };

  const closeModal = () => {
    setActiveImage(null);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{gallerySection.title}</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">{gallerySection.description}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div 
              key={index} 
              className="relative group h-60 cursor-pointer overflow-hidden rounded-lg"
              onClick={() => handleImageClick(image)}
            >
              <div className="relative w-full h-full transform transition-transform duration-300 group-hover:scale-105">
                <Image
                  src={image}
                  alt={`Gallery image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
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
          <div className="relative max-w-4xl max-h-[90vh] p-2">
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