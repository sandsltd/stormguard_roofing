import { Content } from '@/utils/content';
import GallerySection from './GallerySection';
import fs from 'fs';
import path from 'path';

interface GallerySectionWrapperProps {
  content: Content;
}

// This function runs on the server and reads the client-images directory
async function getGalleryImages(): Promise<string[]> {
  try {
    const imagesDirectory = path.join(process.cwd(), 'public/images/client-images');
    // Check if directory exists
    if (!fs.existsSync(imagesDirectory)) {
      return [];
    }

    const fileNames = fs.readdirSync(imagesDirectory);
    
    // Filter for image files only
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
    const imageFiles = fileNames.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return imageExtensions.includes(ext);
    });
    
    // Convert filenames to URLs
    const imagePaths = imageFiles.map(file => `/images/client-images/${file}`);
    
    return imagePaths;
  } catch (error) {
    console.error('Error reading gallery images:', error);
    return [];
  }
}

export default async function GallerySectionWrapper({ content }: GallerySectionWrapperProps) {
  const images = await getGalleryImages();
  
  // Only render if we have images
  if (images.length === 0) {
    return null;
  }
  
  return <GallerySection content={content} images={images} />;
} 