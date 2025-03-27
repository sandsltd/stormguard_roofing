/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
    // Allow unoptimized images for placeholder images
    unoptimized: process.env.NODE_ENV === 'development',
    // Increase the device sizes for better responsive behavior
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // Support more image formats
    formats: ['image/webp', 'image/avif'],
    // Placeholder fallback
    dangerouslyAllowSVG: true,
  },
  // Handle static image imports more efficiently
  experimental: {
    optimizeCss: true, 
    scrollRestoration: true,
  },
};

export default nextConfig; 