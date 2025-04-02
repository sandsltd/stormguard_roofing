import { NextResponse } from 'next/server';

// Function to get the current date in the format YYYY-MM-DD
function getCurrentDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export async function GET() {
  const baseUrl = 'https://stormguardroofers.co.uk';
  const currentDate = getCurrentDate();

  // Define the featured blog posts with their slugs
  const blogPosts = [
    {
      slug: 'common-roofing-problems-cannock',
      lastModified: '2025-04-05',
      priority: '0.8'
    },
    {
      slug: 'pitched-vs-flat-roofs-cannock-guide',
      lastModified: '2025-04-12',
      priority: '0.8'
    },
    {
      slug: 'emergency-roof-repairs-cannock',
      lastModified: '2025-04-19',
      priority: '0.8'
    }
  ];

  // Main pages in the site
  const mainPages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      priority: '1.0'
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      priority: '0.9'
    },
    {
      url: `${baseUrl}/services`,
      lastModified: currentDate,
      priority: '0.9'
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      priority: '0.9'
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      priority: '0.9'
    }
  ];

  // Generate XML for the main pages
  const mainPagesXml = mainPages
    .map(
      (page) => `
      <url>
          <loc>${page.url}</loc>
          <lastmod>${page.lastModified}</lastmod>
          <priority>${page.priority}</priority>
      </url>
    `
    )
    .join('');

  // Generate XML for the blog posts
  const blogXml = blogPosts
    .map(
      (post) => `
      <url>
          <loc>${baseUrl}/blog/${post.slug}</loc>
          <lastmod>${post.lastModified}</lastmod>
          <priority>${post.priority}</priority>
      </url>
    `
    )
    .join('');

  // Combine both sets of URLs
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${mainPagesXml}
      ${blogXml}
  </urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
} 