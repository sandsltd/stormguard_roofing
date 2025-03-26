import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface ImagePickerProps {
  value: string;
  onChange: (value: string) => void;
  category: string;
  location?: string;
}

export default function ImagePicker({ value, onChange, category, location }: ImagePickerProps) {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showPicker, setShowPicker] = useState(false);

  // Default images for different locations
  const defaultLocationImages = {
    'crewe': [
      '/images/areas/options/crewe-residential.jpg',
      '/images/areas/options/crewe-commercial.jpg',
      '/images/areas/options/crewe-historic.jpg',
    ],
    'nantwich': [
      '/images/areas/options/nantwich-canal.jpg',
      '/images/areas/options/nantwich-town.jpg',
      '/images/areas/options/nantwich-historic.jpg',
    ],
    'sandbach': [
      '/images/areas/options/sandbach-town.jpg',
      '/images/areas/options/sandbach-residential.jpg',
      '/images/areas/options/sandbach-cobbles.jpg',
    ],
    'default': [
      '/images/areas/default1.jpg',
      '/images/areas/default2.jpg',
      '/images/areas/default3.jpg',
    ]
  };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        
        // For now, we'll use the default images
        // In a real implementation, you could fetch this from the server
        const locationKey = location?.toLowerCase() || 'default';
        const availableImages = defaultLocationImages[locationKey as keyof typeof defaultLocationImages] 
          || defaultLocationImages.default;
        
        setImages(availableImages);
        setLoading(false);
      } catch (err) {
        setError('Failed to load images');
        setLoading(false);
      }
    };

    fetchImages();
  }, [category, location]);

  return (
    <div className="relative">
      <div 
        className="relative w-full h-40 bg-gray-100 rounded-md overflow-hidden cursor-pointer border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors"
        onClick={() => setShowPicker(true)}
      >
        {value ? (
          <Image 
            src={value} 
            alt="Selected image" 
            fill 
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 300px"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="mt-1 text-sm text-gray-500">Click to select an image</p>
            </div>
          </div>
        )}
      </div>
      
      {showPicker && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Select an image</h3>
              <button 
                onClick={() => setShowPicker(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {loading && <p className="text-center py-4">Loading images...</p>}
            {error && <p className="text-center text-red-500 py-4">{error}</p>}
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {images.map((img, index) => (
                <div 
                  key={index}
                  className={`relative h-40 rounded-md overflow-hidden cursor-pointer transition-all duration-200 ${value === img ? 'ring-4 ring-blue-500' : 'hover:opacity-80'}`}
                  onClick={() => {
                    onChange(img);
                    setShowPicker(false);
                  }}
                >
                  <Image 
                    src={img} 
                    alt={`Option ${index + 1}`} 
                    fill 
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 200px"
                  />
                </div>
              ))}
            </div>
            
            <div className="mt-4 pt-4 border-t">
              <h4 className="font-medium mb-2">Custom image URL</h4>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  placeholder="Enter image URL"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <button
                  onClick={() => setShowPicker(false)}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <p className="mt-1 text-xs text-gray-500">
        {value ? value.split('/').pop() : 'No image selected'}
      </p>
    </div>
  );
} 