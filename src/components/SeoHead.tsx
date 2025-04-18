'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Content } from '@/utils/content';

interface SeoHeadProps {
  content: Content;
  pageKey?: 'home' | 'about' | 'services' | 'contact';
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
}

const SeoHead: React.FC<SeoHeadProps> = ({ 
  content, 
  pageKey = 'home', 
  title,
  description,
  keywords,
  ogImage 
}) => {
  const pathname = usePathname();
  const isRoot = pathname === '/';
  
  // If no pageKey specified, determine from pathname
  if (!pageKey) {
    if (pathname === '/about') pageKey = 'about';
    else if (pathname === '/services') pageKey = 'services';
    else if (pathname === '/contact') pageKey = 'contact';
    else pageKey = 'home';
  }
  
  // Get global SEO settings
  const globalSeo = content.seo?.global || {
    siteTitle: content.business.name,
    siteDescription: content.business.tagline || '',
    siteTitleTemplate: '%s | ' + content.business.name,
    keywords: '',
  };
  
  // Get page-specific SEO settings or use provided override values
  const pageSeo = content.seo?.pages?.[pageKey] || {};
  
  // Use the provided values or fall back to the values from content
  const finalTitle = title || (pageSeo as any).title || (isRoot ? globalSeo.siteTitle : pageKey.charAt(0).toUpperCase() + pageKey.slice(1));
  const finalDescription = description || (pageSeo as any).description || globalSeo.siteDescription;
  const finalKeywords = keywords || (pageSeo as any).keywords || globalSeo.keywords;
  const finalOgImage = ogImage || (pageSeo as any).ogImage || globalSeo.defaultOgImage || '';
  
  // Format the title according to the template (if not the homepage)
  const formattedTitle = isRoot 
    ? finalTitle 
    : (globalSeo.siteTitleTemplate 
        ? globalSeo.siteTitleTemplate.replace('%s', finalTitle) 
        : `${finalTitle} | ${globalSeo.siteTitle}`);
  
  // Construct the canonical URL
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://stormguardroofing.co.uk';
  const canonicalUrl = `${baseUrl}${pathname}`;
  
  // Use useEffect to set metadata because this is a client component
  useEffect(() => {
    // Set the document title
    document.title = formattedTitle;
    
    // Update meta tags
    updateMetaTag('description', finalDescription);
    if (finalKeywords) updateMetaTag('keywords', finalKeywords);
    
    // Update Open Graph tags
    updateMetaTag('og:title', formattedTitle, 'property');
    updateMetaTag('og:description', finalDescription, 'property');
    updateMetaTag('og:type', isRoot ? 'website' : 'article', 'property');
    updateMetaTag('og:url', canonicalUrl, 'property');
    
    if (finalOgImage) {
      const fullOgImageUrl = finalOgImage.startsWith('http') ? finalOgImage : `${baseUrl}${finalOgImage}`;
      updateMetaTag('og:image', fullOgImageUrl, 'property');
    }
    
    // Update Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', formattedTitle);
    updateMetaTag('twitter:description', finalDescription);
    
    if (finalOgImage) {
      const fullOgImageUrl = finalOgImage.startsWith('http') ? finalOgImage : `${baseUrl}${finalOgImage}`;
      updateMetaTag('twitter:image', fullOgImageUrl);
    }
    
    // Update canonical URL
    let canonicalElement = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalElement) {
      canonicalElement = document.createElement('link');
      canonicalElement.rel = 'canonical';
      document.head.appendChild(canonicalElement);
    }
    canonicalElement.href = canonicalUrl;
    
    // Update favicon tags
    updateFaviconTags();
    
    // Cleanup function
    return () => {
      // No cleanup needed as we're modifying the document directly
    };
  }, [formattedTitle, finalDescription, finalKeywords, finalOgImage, canonicalUrl, isRoot, baseUrl]);
  
  // Helper function to update meta tags
  const updateMetaTag = (name: string, content: string, nameAttr = 'name') => {
    let metaTag = document.querySelector(`meta[${nameAttr}="${name}"]`) as HTMLMetaElement;
    if (!metaTag) {
      metaTag = document.createElement('meta');
      metaTag.setAttribute(nameAttr, name);
      document.head.appendChild(metaTag);
    }
    metaTag.content = content;
  };
  
  // Helper function to update favicon tags
  const updateFaviconTags = () => {
    // Standard favicon
    updateLinkTag('icon', '/favicon_io-29/favicon-32x32.png', 'image/png', '32x32');
    updateLinkTag('icon', '/favicon_io-29/favicon-16x16.png', 'image/png', '16x16');
    
    // Apple Touch Icon
    updateLinkTag('apple-touch-icon', '/favicon_io-29/apple-touch-icon.png');
    
    // Android Chrome
    updateLinkTag('icon', '/favicon_io-29/android-chrome-192x192.png', 'image/png', '192x192');
    updateLinkTag('icon', '/favicon_io-29/android-chrome-512x512.png', 'image/png', '512x512');
    
    // Web Manifest
    updateLinkTag('manifest', '/favicon_io-29/site.webmanifest');
  };
  
  // Helper function to update link tags
  const updateLinkTag = (rel: string, href: string, type?: string, sizes?: string) => {
    let selector = `link[rel="${rel}"]`;
    if (sizes) selector += `[sizes="${sizes}"]`;
    
    let linkTag = document.querySelector(selector) as HTMLLinkElement;
    if (!linkTag) {
      linkTag = document.createElement('link');
      linkTag.rel = rel;
      if (type) linkTag.type = type;
      if (sizes) linkTag.setAttribute('sizes', sizes);
      document.head.appendChild(linkTag);
    }
    linkTag.href = href;
  };
  
  // This component doesn't render anything visible
  return null;
};

export default SeoHead; 