/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true
  },
  images: {
    domains: ['localhost', 'www.localroofernearme.co.uk'],
    remotePatterns: [
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
  }
}

module.exports = nextConfig 