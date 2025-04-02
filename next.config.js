/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost'
      },
      {
        protocol: 'https',
        hostname: 'www.localroofernearme.co.uk'
      },
      {
        protocol: 'https',
        hostname: '**.localroofernearme.co.uk'
      }
    ]
  },
  experimental: {
    optimizeCss: {
      // Enable CSS optimization with critters
      critters: {
        // Inline critical CSS
        preload: 'media',
        // Don't inline fonts
        inlineFonts: false,
        // Reduce size
        pruneSource: true,
        // Reduce CSS size
        minimize: true
      }
    },
    scrollRestoration: true
  },
  // Add rewrites to handle sitemap and robots correctly
  async rewrites() {
    return [
      {
        source: '/sitemap',
        destination: '/sitemap.xml',
      }
    ]
  }
}

module.exports = nextConfig 