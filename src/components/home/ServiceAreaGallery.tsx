'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Content } from '@/utils/content';
import { FaSearch, FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';

interface ServiceAreaGalleryProps {
  content: Content;
  images: string[];
}

export default function ServiceAreaGallery({ content, images }: ServiceAreaGalleryProps) {
  const [activeImage, setActiveImage] = useState<string | null>(null);
  
  // Use primary color from theme or default to a blue color
  const primaryColor = content.theme?.primaryColor || '#1e3a8a';
  const primaryColorLight = `${primaryColor}10`;

  // If no images, don't render the section
  if (!images || images.length === 0) {
    return null;
  }

  // Take only up to 6 images
  const displayImages = images.slice(0, 6);

  const handleImageClick = (imagePath: string) => {
    setActiveImage(imagePath);
  };

  const closeModal = () => {
    setActiveImage(null);
  };

  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-20 right-20 w-60 h-60 rounded-full opacity-10" 
           style={{ backgroundColor: primaryColor, filter: 'blur(60px)' }}></div>
      <div className="absolute bottom-20 left-20 w-40 h-40 rounded-full opacity-10" 
           style={{ backgroundColor: primaryColor, filter: 'blur(40px)' }}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <div className="md:max-w-xl mb-8 md:mb-0">
            <div className="inline-block rounded-full px-4 py-2 text-sm font-medium shadow-sm mb-4" 
                 style={{ backgroundColor: primaryColorLight, color: primaryColor }}>
              Our Work
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              View Our Recent Projects
            </h2>
            <p className="text-lg text-gray-700">
              Explore our recent roofing projects completed across Cheshire. Our gallery showcases our quality craftsmanship and attention to detail.
            </p>
          </div>
          <Link href="/portfolio" className="inline-flex items-center px-6 py-3 rounded-lg border-2 font-medium transition-colors hover:bg-gray-100" 
               style={{ borderColor: primaryColor, color: primaryColor }}>
            View Full Portfolio <FaArrowRight className="ml-2" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayImages.map((image, index) => (
            <div 
              key={index} 
              className="group relative h-72 cursor-pointer overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
              onClick={() => handleImageClick(image)}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 z-10"></div>
              <div className="relative w-full h-full transform transition-transform duration-500 group-hover:scale-105">
                <Image
                  src={image}
                  alt={`Roofing project ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
              
              {/* Hover effect */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                <div className="w-16 h-16 rounded-full flex items-center justify-center" 
                     style={{ backgroundColor: primaryColor }}>
                  <FaSearch className="text-white text-xl" />
                </div>
              </div>
              
              {/* Location tag - you could make this dynamic based on image metadata if available */}
              <div className="absolute bottom-4 left-4 z-20">
                <div className="text-white font-medium text-lg">Cheshire Project</div>
                <div className="text-white text-opacity-80 text-sm">Completed {new Date().getFullYear()}</div>
              </div>
            </div>
          ))}
        </div>
        
        {displayImages.length < images.length && (
          <div className="text-center mt-12">
            <Link href="/portfolio" className="inline-flex items-center px-8 py-4 rounded-lg text-white font-medium transition-all hover:shadow-lg"
                 style={{ backgroundColor: primaryColor }}>
              View All {images.length} Projects <FaArrowRight className="ml-2" />
            </Link>
          </div>
        )}
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
                alt="Enlarged project image"
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