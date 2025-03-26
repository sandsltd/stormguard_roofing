import React from 'react';
import fs from 'fs';
import path from 'path';
import AboutGallery from './AboutGallery';
import { Content } from '@/utils/content';

interface AboutGalleryWrapperProps {
  content: Content;
}

// This function runs on the server and reads the client-images directory
async function getGalleryImages() {
  const imageDirectory = path.join(process.cwd(), 'public/images/client-images');
  
  try {
    // Check if directory exists
    if (!fs.existsSync(imageDirectory)) {
      return [];
    }
    
    const fileNames = await fs.promises.readdir(imageDirectory);
    
    // Filter to only include image files
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
    const imageFiles = fileNames.filter(file => {
      const extension = path.extname(file).toLowerCase();
      return imageExtensions.includes(extension);
    });
    
    // Convert file names to URLs
    const imageUrls = imageFiles.map(file => `/images/client-images/${file}`);
    
    return imageUrls;
  } catch (error) {
    console.error('Error reading gallery images:', error);
    return [];
  }
}

export default async function AboutGalleryWrapper({ content }: AboutGalleryWrapperProps) {
  const images = await getGalleryImages();
  
  // Only render the gallery if there are images
  if (!images || images.length === 0) {
    return null;
  }
  
  return <AboutGallery content={content} images={images} />;
} 