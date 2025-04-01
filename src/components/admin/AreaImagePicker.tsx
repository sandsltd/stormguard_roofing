'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface AreaImagePickerProps {
  value: string;
  onChange: (value: string) => void;
  areaName?: string;
}

const DEFAULT_IMAGES = [
  {
    name: 'Residential 1',
    src: '/images/areas/residential1.jpg',
    alt: 'Residential area with houses'
  },
  {
    name: 'Residential 2',
    src: '/images/areas/residential2.jpg',
    alt: 'Modern residential neighborhood'
  },
  {
    name: 'Town 1',
    src: '/images/areas/town1.jpg',
    alt: 'Town center with shops'
  },
  {
    name: 'Town 2',
    src: '/images/areas/town2.jpg',
    alt: 'Historic town center'
  },
  {
    name: 'Commercial 1',
    src: '/images/areas/commercial1.jpg',
    alt: 'Commercial building'
  },
  {
    name: 'Commercial 2',
    src: '/images/areas/commercial2.jpg',
    alt: 'Modern office buildings'
  }
] as const;

export default function AreaImagePicker({ value, onChange, areaName }: AreaImagePickerProps): React.ReactElement {
  const [isOpen, setIsOpen] = useState(false);
  const [customUrl, setCustomUrl] = useState(value);

  const hasValidImage = value && value.trim() !== '';

  return (
    <div className="w-full">
      <div 
        onClick={() => setIsOpen(true)}
        className="w-full h-48 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors flex items-center justify-center overflow-hidden relative"
      >
        {hasValidImage ? (
          <>
            <div className="relative w-full h-full">
              <Image 
                src={value}
                alt={`Image for ${areaName || 'location'}`}
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity">
              <div className="bg-white p-2 rounded-full">
                <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center p-4">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="mt-2 text-sm text-gray-500">Click to select an image</p>
          </div>
        )}
      </div>

      {/* Image Picker Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Select an image for {areaName || 'this area'}</h3>
              <button 
                onClick={() => setIsOpen(false)} 
                className="text-gray-400 hover:text-gray-500"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
              {DEFAULT_IMAGES.map((image, index) => (
                <div 
                  key={index}
                  className={`relative border rounded-lg overflow-hidden h-40 cursor-pointer group transition-all duration-200 ${value === image.src ? 'ring-4 ring-blue-500' : ''}`}
                  onClick={() => {
                    onChange(image.src);
                    setCustomUrl(image.src);
                  }}
                >
                  <div className="w-full h-full bg-gray-200">
                    <div className="flex items-center justify-center h-full text-gray-400">
                      {/* Placeholder for real image */}
                      <div className="text-center">
                        <div className="font-medium">{image.name}</div>
                        <div className="text-xs text-gray-500">(Image Preview)</div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-200"></div>
                </div>
              ))}
            </div>
            
            <div className="border-t pt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Or enter a custom image URL:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customUrl}
                  onChange={(e) => setCustomUrl(e.target.value)}
                  placeholder="e.g., /images/my-custom-image.jpg"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <button
                  onClick={() => {
                    onChange(customUrl);
                    setIsOpen(false);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 whitespace-nowrap"
                >
                  Apply
                </button>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                You can use any image path from your project or an external URL
              </p>
            </div>
            
            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
              >
                Cancel
              </button>
              {value && (
                <button
                  onClick={() => {
                    onChange('');
                    setCustomUrl('');
                    setIsOpen(false);
                  }}
                  className="px-4 py-2 bg-red-50 text-red-600 rounded hover:bg-red-100"
                >
                  Remove Image
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="mt-1 flex">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Image path or URL"
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
        />
      </div>
    </div>
  );
} 