import { NextResponse } from 'next/server';

export async function GET() {
  const robotsTxt = `# Allow all crawlers
User-agent: *
Allow: /

# Blog pages
Allow: /blog/
Allow: /blog/common-roofing-problems-cannock
Allow: /blog/pitched-vs-flat-roofs-cannock-guide
Allow: /blog/emergency-roof-repairs-cannock

# Important files
Sitemap: https://stormguardroofers.co.uk/sitemap.xml
`;

  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
} 