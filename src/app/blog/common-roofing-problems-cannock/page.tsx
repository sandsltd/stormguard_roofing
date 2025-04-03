import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from "next";
import SeoHead from '@/components/SeoHead';
import { getContent } from '@/utils/server-content';

export const revalidate = 3600; // Revalidate every hour

export const metadata: Metadata = {
  title: "The Most Common Roofing Problems in Cannock Homes (And How to Fix Them)",
  description: "Discover common roofing problems in Cannock homes and how our professional roofer services can fix them. Expert solutions from Cannock's trusted local roofers.",
  keywords: "roofer cannock, roof repairs cannock, roofing problems cannock, local roofer cannock, cannock roofing services",
  openGraph: {
    title: "The Most Common Roofing Problems in Cannock Homes (And How to Fix Them)",
    description: "Discover common roofing problems in Cannock homes and how our professional roofer services can fix them. Expert solutions from Cannock's trusted local roofers.",
    type: 'article',
    images: [{
      url: '/images/client-images/roofer_removing_damaged_tiles.jpg',
      width: 1200,
      height: 630,
      alt: "Roofer in Cannock repairing damaged tiles"
    }]
  },
};

// JSON-LD for article schema
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "The Most Common Roofing Problems in Cannock Homes (And How to Fix Them)",
  "image": "https://stormguardroofers.co.uk/images/client-images/roofer_removing_damaged_tiles.jpg",
  "author": {
    "@type": "Organization",
    "name": "StormGuard Roofing"
  },
  "publisher": {
    "@type": "Organization",
    "name": "StormGuard Roofing",
    "logo": {
      "@type": "ImageObject",
      "url": "https://stormguardroofers.co.uk/images/logo.png"
    }
  },
  "datePublished": "2025-04-02",
  "dateModified": "2025-04-02",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://stormguardroofers.co.uk/blog/common-roofing-problems-cannock"
  },
  "description": "Discover common roofing problems in Cannock homes and how our professional roofer services can fix them. Expert solutions from Cannock's trusted local roofers."
};

export default async function BlogPost() {
  const content = await getContent();
  
  // Blog post data
  const post = {
    title: "The Most Common Roofing Problems in Cannock Homes (And How to Fix Them)",
    date: "April 2, 2025",
    author: "StormGuard Roofing",
    authorRole: "Cannock's Trusted Roofing Experts",
    image: "/images/client-images/roofer_removing_damaged_tiles.jpg",
    categories: ["Roof Repairs", "Maintenance"],
    metaDescription: "Discover common roofing problems in Cannock homes and how our professional roofer services can fix them. Expert solutions from Cannock's trusted local roofers.",
    keywords: "roofer cannock, roof repairs cannock, roofing problems cannock, local roofer cannock, cannock roofing services"
  };

  return (
    <main className="min-h-screen">
      {/* SEO Head */}
      <SeoHead 
        content={content} 
        title={post.title}
        description={post.metaDescription}
        keywords={post.keywords}
      />

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Hero Section */}
      <div className="relative pt-40 pb-20 bg-gray-800 text-white mt-16 md:mt-20 lg:mt-24">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.categories.map((category, index) => (
                <Link 
                  key={index} 
                  href={`/blog/category/${category.toLowerCase().replace(' ', '-')}`}
                  className="px-3 py-1 bg-red-600 text-white text-sm rounded-full hover:bg-red-700 transition"
                >
                  {category}
                </Link>
              ))}
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 rounded-full bg-gray-300 mr-3 flex items-center justify-center overflow-hidden">
                <Image src="/images/logo.png" alt="StormGuard Roofing" width={40} height={40} className="object-contain" />
              </div>
              <div>
                <p className="font-medium">{post.author}</p>
                <p className="text-sm text-gray-300">{post.authorRole}</p>
              </div>
              <span className="mx-4">|</span>
              <time className="text-gray-300">{post.date}</time>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="relative h-80 md:h-96 lg:h-[500px]">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </div>

      {/* Content Section */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap lg:flex-nowrap gap-12">
            {/* Main Content */}
            <div className="w-full lg:w-2/3">
              <article className="prose prose-lg max-w-none">
                <p className="text-lg leading-relaxed text-gray-800">As the most trusted <strong className="text-red-600">roofer in Cannock</strong> with over 18 years of experience, we've seen firsthand the common roofing issues that local homeowners face. Cannock's unique weather patterns, with heavy rainfall and occasional strong winds, can take a toll on your roof over time.</p>
                
                <h2 className="text-2xl md:text-3xl font-bold mt-10 mb-5 text-gray-800 border-b pb-2">1. Damaged or Missing Tiles: A Common Sight in Cannock</h2>
                <div className="bg-gray-50 p-4 md:p-6 rounded-xl mb-6 shadow-sm">
                  <p className="mb-4 text-gray-800">One of the most frequent issues our <strong className="text-red-600">Cannock roofing team</strong> encounters is damaged or missing roof tiles. The West Midlands weather, particularly during autumn and winter months, can dislodge tiles and create vulnerabilities in your roof.</p>
                  <div className="ml-4 mt-4">
                    <p className="font-semibold text-gray-800 mb-2">Signs to look for:</p>
                    <ul className="list-disc ml-5 space-y-2 text-gray-700">
                      <li>Tiles in your garden or driveway after strong winds</li>
                      <li>Visible gaps in your roof's tiling pattern</li>
                      <li>Cracked or broken tiles visible from ground level</li>
                    </ul>
                  </div>
                  <p className="mt-4 text-gray-800">As professional <strong className="text-red-600">roofers in Cannock</strong>, we recommend inspecting your roof after severe weather events. Early detection can prevent more extensive damage and costly repairs.</p>
                </div>
                
                <h2 className="text-2xl md:text-3xl font-bold mt-10 mb-5 text-gray-800 border-b pb-2">2. Leaking Roofs: Cannock's Rainy Challenge</h2>
                <div className="bg-gray-50 p-4 md:p-6 rounded-xl mb-6 shadow-sm">
                  <p className="mb-4 text-gray-800">With Cannock receiving higher than average rainfall for the UK, roof leaks are a common problem for local homeowners. Our <strong className="text-red-600">roof repair service in Cannock</strong> regularly addresses leaks caused by various factors:</p>
                  <div className="ml-4 mt-4">
                    <ul className="list-disc ml-5 space-y-2 text-gray-700">
                      <li>Damaged flashing around chimneys and vents</li>
                      <li>Deteriorated seals and weatherproofing</li>
                      <li>Blocked gutters causing water backup</li>
                    </ul>
                  </div>
                  <p className="mt-4 text-gray-800">If you notice damp patches, water stains on ceilings, or mold growth, it's time to call a <strong className="text-red-600">professional roofer in Cannock</strong> to identify and fix the source of the leak.</p>
                </div>
                
                <h2 className="text-2xl md:text-3xl font-bold mt-10 mb-5 text-gray-800 border-b pb-2">3. Gutter Problems: A Cannock Specialty</h2>
                <div className="bg-gray-50 p-4 md:p-6 rounded-xl mb-6 shadow-sm">
                  <p className="mb-4 text-gray-800">Cannock's abundant tree coverage, particularly in areas like Heath Hayes and Hednesford, means gutters frequently become clogged with leaves and debris. Our <strong className="text-red-600">Cannock roofing specialists</strong> often find that:</p>
                  <div className="ml-4 mt-4">
                    <ul className="list-disc ml-5 space-y-2 text-gray-700">
                      <li>Blocked gutters cause water to overflow and damage fascias</li>
                      <li>Excess weight from debris can pull gutters away from the roofline</li>
                      <li>Improperly pitched gutters fail to direct water to downspouts</li>
                    </ul>
                  </div>
                  <p className="mt-4 text-gray-800">Regular gutter cleaning is essential in Cannock properties, especially those surrounded by trees.</p>
                </div>
                
                <h2 className="text-2xl md:text-3xl font-bold mt-10 mb-5 text-gray-800 border-b pb-2">4. Chimney Issues: Common in Cannock's Older Properties</h2>
                <div className="bg-gray-50 p-4 md:p-6 rounded-xl mb-6 shadow-sm">
                  <p className="mb-4 text-gray-800">Many homes in Cannock, particularly in the town center and older neighborhoods, feature chimneys that require special attention. As experienced <strong className="text-red-600">Cannock roofers</strong>, we regularly repair:</p>
                  <div className="ml-4 mt-4">
                    <ul className="list-disc ml-5 space-y-2 text-gray-700">
                      <li>Deteriorated chimney mortar joints</li>
                      <li>Damaged flashing around chimney bases</li>
                      <li>Cracked chimney crowns letting water penetrate</li>
                    </ul>
                  </div>
                  <p className="mt-4 text-gray-800">These issues require professional attention from a <strong className="text-red-600">qualified roofer in Cannock</strong> who understands the unique challenges of local properties.</p>
                </div>
                
                <h2 className="text-2xl md:text-3xl font-bold mt-10 mb-5 text-gray-800 border-b pb-2">How a Professional Roofer in Cannock Can Help</h2>
                <div className="bg-blue-50 p-4 md:p-6 rounded-xl mb-8 border-l-4 border-blue-500 shadow-sm">
                  <p className="mb-4 text-gray-800">When facing these common roofing problems, hiring a professional <strong className="text-red-600">Cannock roofing contractor</strong> offers several advantages:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h4 className="font-bold text-blue-700 mb-2">Local Knowledge</h4>
                      <p className="text-gray-700">Understanding of Cannock's specific weather patterns and building styles</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h4 className="font-bold text-blue-700 mb-2">Quality Materials</h4>
                      <p className="text-gray-700">Access to high-grade roofing materials suited to local conditions</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h4 className="font-bold text-blue-700 mb-2">Proper Safety Equipment</h4>
                      <p className="text-gray-700">Professional roof access without risking personal injury</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h4 className="font-bold text-blue-700 mb-2">Comprehensive Inspections</h4>
                      <p className="text-gray-700">Ability to spot less obvious issues before they become major problems</p>
                    </div>
                  </div>
                </div>
                
                <h2 className="text-2xl md:text-3xl font-bold mt-10 mb-5 text-gray-800 border-b pb-2">Preventative Maintenance Tips from Cannock's Leading Roofers</h2>
                <div className="bg-green-50 p-4 md:p-6 rounded-xl mb-6 shadow-sm">
                  <p className="mb-4 text-gray-800">As <strong className="text-red-600">experienced roofers serving Cannock</strong> for nearly two decades, we recommend these preventative measures:</p>
                  <div className="ml-4 mt-4">
                    <ol className="list-decimal ml-5 space-y-3 text-gray-700">
                      <li className="pl-2">
                        <span className="font-medium text-green-800">Schedule bi-annual roof inspections</span> 
                        <p className="text-gray-600 mt-1">Aim for spring and autumn to prepare for seasonal changes</p>
                      </li>
                      <li className="pl-2">
                        <span className="font-medium text-green-800">Clean gutters quarterly</span>
                        <p className="text-gray-600 mt-1">More often if your property is surrounded by trees</p>
                      </li>
                      <li className="pl-2">
                        <span className="font-medium text-green-800">Trim overhanging branches</span>
                        <p className="text-gray-600 mt-1">Prevents physical damage during storms and reduces debris</p>
                      </li>
                      <li className="pl-2">
                        <span className="font-medium text-green-800">Address minor repairs promptly</span>
                        <p className="text-gray-600 mt-1">Small issues can quickly escalate into costly damages</p>
                      </li>
                    </ol>
                  </div>
                </div>
                
                <h2 className="text-2xl md:text-3xl font-bold mt-10 mb-5 text-gray-800 border-b pb-2">When to Call a Roofer in Cannock</h2>
                <div className="bg-red-50 p-4 md:p-6 rounded-xl mb-6 border-l-4 border-red-500 shadow-sm">
                  <p className="mb-4 text-gray-800">While some minor issues can be monitored, these situations warrant calling a <strong className="text-red-600">professional Cannock roofer</strong> immediately:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                    <div className="flex items-start">
                      <div className="bg-red-100 p-2 rounded-full mr-3">
                        <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </div>
                      <span className="text-gray-800">Water stains appearing on your ceiling or walls</span>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-red-100 p-2 rounded-full mr-3">
                        <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </div>
                      <span className="text-gray-800">Multiple missing or damaged tiles</span>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-red-100 p-2 rounded-full mr-3">
                        <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </div>
                      <span className="text-gray-800">Sagging areas on your roof</span>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-red-100 p-2 rounded-full mr-3">
                        <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </div>
                      <span className="text-gray-800">Daylight visible through your roof boards</span>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-red-100 p-2 rounded-full mr-3">
                        <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </div>
                      <span className="text-gray-800">Granules from tiles collecting in gutters</span>
                    </div>
                  </div>
                </div>
                
                <h2 className="text-2xl md:text-3xl font-bold mt-10 mb-5 text-gray-800 border-b pb-2">Conclusion: Trust Your Local Cannock Roofing Experts</h2>
                <div className="bg-gray-50 p-5 rounded-xl mb-6 shadow-sm border border-gray-200">
                  <p className="mb-4 text-gray-800">Maintaining your roof in Cannock's variable climate requires vigilance and professional care. As the area's most trusted <strong className="text-red-600">roofing company in Cannock</strong>, we provide comprehensive services to address all these common issues and more.</p>
                  <p className="text-gray-800">Whether you need an emergency repair or want to schedule a preventative maintenance inspection, our team of <strong className="text-red-600">experienced Cannock roofers</strong> is ready to help protect your most valuable asset - your home.</p>
                </div>
                
                <div className="mt-8 bg-gray-50 p-6 rounded-lg border border-gray-200 shadow-md">
                  <h3 className="text-xl font-bold mb-4 text-center bg-gray-700 text-white py-3 rounded-lg">Frequently Asked Questions About Roofing in Cannock</h3>
                  
                  <div className="mb-6 bg-white p-5 rounded-lg shadow-sm">
                    <h4 className="font-bold mb-2 text-red-600">How often should Cannock homeowners have their roof inspected?</h4>
                    <p className="text-gray-800">We recommend Cannock residents have their roofs professionally inspected twice a year – ideally in spring and autumn. This schedule allows for repairs before summer heat and winter rainfall, addressing Cannock's seasonal weather challenges.</p>
                  </div>
                  
                  <div className="mb-6 bg-white p-5 rounded-lg shadow-sm">
                    <h4 className="font-bold mb-2 text-red-600">What is the average cost of roof repairs in Cannock?</h4>
                    <p className="text-gray-800">Minor roof repairs in Cannock typically range from £150-£500, while more extensive work can cost £1,000-£3,000. For an accurate assessment, contact our team of <strong className="text-red-600">Cannock roofers</strong> for a free, no-obligation quote.</p>
                  </div>
                  
                  <div className="bg-white p-5 rounded-lg shadow-sm">
                    <h4 className="font-bold mb-2 text-red-600">How long do roofs typically last in Cannock's climate?</h4>
                    <p className="text-gray-800">With proper maintenance, tile roofs in Cannock can last 50+ years, while slate roofs can exceed 100 years. Flat roofs typically last 15-20 years. Regular maintenance from a <strong className="text-red-600">professional roofer in Cannock</strong> can maximize your roof's lifespan.</p>
                  </div>
                </div>
              </article>
              
              {/* Author Bio */}
              <div className="mt-12 p-6 bg-white rounded-lg border border-gray-200 shadow-md">
                <div className="flex items-start sm:items-center flex-col sm:flex-row">
                  <div className="w-16 h-16 rounded-full overflow-hidden mr-5 flex-shrink-0 mb-4 sm:mb-0">
                    <Image 
                      src="/images/logo.png" 
                      alt="StormGuard Roofing" 
                      width={64} 
                      height={64} 
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-gray-800">StormGuard Roofing</h3>
                    <p className="text-red-600 font-medium mb-3">Cannock's Trusted Roofing Experts</p>
                    <p className="text-gray-700">
                      With over 18 years of experience as professional roofers in Cannock, 
                      StormGuard Roofing provides unmatched expertise in all aspects of roofing. 
                      We specialize in emergency repairs and traditional roofing techniques.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Share Buttons */}
              <div className="mt-10 bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h4 className="text-lg font-bold mb-4 flex items-center text-gray-800">
                  <svg className="w-5 h-5 mr-2 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                  </svg>
                  Share this article
                </h4>
                <div className="flex gap-3">
                  <a 
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://stormguardroofers.co.uk/blog/common-roofing-problems-cannock')}`} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition flex items-center justify-center w-10 h-10"
                    aria-label="Share on Facebook"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                  <a 
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent('The Most Common Roofing Problems in Cannock Homes (And How to Fix Them)')}&url=${encodeURIComponent('https://stormguardroofers.co.uk/blog/common-roofing-problems-cannock')}`} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-blue-400 text-white rounded-full hover:bg-blue-500 transition flex items-center justify-center w-10 h-10"
                    aria-label="Share on Twitter"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.017 10.017 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482 13.98 13.98 0 01-10.15-5.145 4.921 4.921 0 001.524 6.574 4.904 4.904 0 01-2.23-.616v.061a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </a>
                  <a 
                    href={`mailto:?subject=${encodeURIComponent('The Most Common Roofing Problems in Cannock Homes')}&body=${encodeURIComponent('I thought you might find this article interesting: https://stormguardroofers.co.uk/blog/common-roofing-problems-cannock')}`} 
                    className="p-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition flex items-center justify-center w-10 h-10"
                    aria-label="Share via Email"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z" />
                    </svg>
                  </a>
                  <a 
                    href={`https://wa.me/?text=${encodeURIComponent('Check out this roofing article: https://stormguardroofers.co.uk/blog/common-roofing-problems-cannock')}`} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition flex items-center justify-center w-10 h-10"
                    aria-label="Share on WhatsApp"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 6.628 5.373 12 12 12s12-5.373 12-12c0-6.628-5.373-12-12-12zm0 22c-5.514 0-10-4.486-10-10S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="w-full lg:w-1/3">
              {/* Related Posts */}
              <div className="mb-10 bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
                <h3 className="text-xl font-bold p-4 border-b bg-gray-50 text-gray-800">Related Articles</h3>
                <div className="divide-y divide-gray-100">
                  <div className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex gap-3">
                      <div className="w-20 h-20 relative flex-shrink-0 rounded-md overflow-hidden">
                        <Image 
                          src="/images/client-images/roofer_repairing_roof_with_harness.jpg"
                          alt="Emergency Roof Repairs in Cannock"
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium mb-1 line-clamp-2 hover:text-red-600 transition-colors text-gray-800">
                          <Link href="/blog/emergency-roof-repairs-cannock">
                            Emergency Roof Repairs in Cannock: What Constitutes an Emergency?
                          </Link>
                        </h4>
                        <span className="text-sm text-gray-500">March 26, 2025</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex gap-3">
                      <div className="w-20 h-20 relative flex-shrink-0 rounded-md overflow-hidden">
                        <Image 
                          src="/images/client-images/roofer_installing_roofing_tiles.jpg"
                          alt="Pitched vs. Flat Roofs: A Cannock Homeowner's Guide"
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium mb-1 line-clamp-2 hover:text-red-600 transition-colors text-gray-800">
                          <Link href="/blog/pitched-vs-flat-roofs-cannock-guide">
                            Pitched vs. Flat Roofs: A Cannock Homeowner's Guide
                          </Link>
                        </h4>
                        <span className="text-sm text-gray-500">March 19, 2025</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Categories */}
              <div className="mb-10 bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
                <h3 className="text-xl font-bold p-4 border-b bg-gray-50 text-gray-800">Categories</h3>
                <ul className="divide-y divide-gray-100">
                  <li className="hover:bg-gray-50 transition-colors">
                    <Link href="/blog/category/roof-repairs" className="flex justify-between p-4 text-gray-800">
                      <span>Roof Repairs</span>
                      <span className="bg-red-100 text-red-700 px-2.5 py-0.5 rounded-full text-sm font-medium">12</span>
                    </Link>
                  </li>
                  <li className="hover:bg-gray-50 transition-colors">
                    <Link href="/blog/category/installation" className="flex justify-between p-4 text-gray-800">
                      <span>Installation</span>
                      <span className="bg-blue-100 text-blue-700 px-2.5 py-0.5 rounded-full text-sm font-medium">8</span>
                    </Link>
                  </li>
                  <li className="hover:bg-gray-50 transition-colors">
                    <Link href="/blog/category/maintenance" className="flex justify-between p-4 text-gray-800">
                      <span>Maintenance</span>
                      <span className="bg-green-100 text-green-700 px-2.5 py-0.5 rounded-full text-sm font-medium">15</span>
                    </Link>
                  </li>
                  <li className="hover:bg-gray-50 transition-colors">
                    <Link href="/blog/category/emergency" className="flex justify-between p-4 text-gray-800">
                      <span>Emergency Repairs</span>
                      <span className="bg-amber-100 text-amber-700 px-2.5 py-0.5 rounded-full text-sm font-medium">5</span>
                    </Link>
                  </li>
                </ul>
              </div>
              
              {/* CTA Box */}
              <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-lg p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-3 text-white">Need a Professional Roofer in Cannock?</h3>
                <p className="mb-6 text-white opacity-90">
                  Our team of experienced roofers is ready to help with any roofing issues you may have.
                </p>
                <Link 
                  href="/contact" 
                  className="block w-full py-3 bg-white text-red-600 text-center font-medium rounded-lg hover:bg-gray-100 transition shadow-md"
                >
                  Get a Free Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-black/20 backdrop-blur-sm p-8 rounded-2xl relative overflow-hidden shadow-xl">
              {/* Background pattern */}
              <div className="absolute top-0 left-0 w-full h-full opacity-10">
                <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-red-500"></div>
                <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-red-500"></div>
              </div>
              
              <div className="relative z-10 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Ready to Fix Your Roof in Cannock?</h2>
                <div className="w-24 h-1 bg-red-500 mx-auto mb-6"></div>
                <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                  Our team of expert roofers is ready to help with repairs, replacements, and emergency services throughout Cannock. Contact us today for a free no-obligation quote.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link 
                    href="/contact"
                    className="px-8 py-4 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center group"
                  >
                    Contact Us Today
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                  <Link 
                    href="/services"
                    className="px-8 py-4 bg-white text-gray-900 font-bold rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center group"
                  >
                    Our Services
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
                
                <div className="mt-10 flex items-center justify-center space-x-8">
                  <div className="flex flex-col items-center">
                    <span className="text-3xl font-bold text-red-500">18+</span>
                    <span className="text-sm text-gray-300">Years Experience</span>
                  </div>
                  <div className="h-12 w-px bg-gray-700"></div>
                  <div className="flex flex-col items-center">
                    <span className="text-3xl font-bold text-red-500">24/7</span>
                    <span className="text-sm text-gray-300">Emergency Service</span>
                  </div>
                  <div className="h-12 w-px bg-gray-700"></div>
                  <div className="flex flex-col items-center">
                    <span className="text-3xl font-bold text-red-500">5★</span>
                    <span className="text-sm text-gray-300">Customer Rating</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 