import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Content } from '@/utils/content';

interface FeaturedBlogSectionProps {
  content: Content;
}

const FeaturedBlogSection: React.FC<FeaturedBlogSectionProps> = ({ content }) => {
  // Featured blog posts (in a real implementation, these would come from a CMS or API)
  const featuredPosts = [
    {
      id: 1,
      title: "The Most Common Roofing Problems in Cannock Homes (And How to Fix Them)",
      slug: "common-roofing-problems-cannock",
      excerpt: "Discover the most common roofing issues faced by Cannock homeowners and learn how a professional roofer in Cannock can help solve these problems efficiently.",
      date: "April 5, 2025",
      image: "/images/roofers/roofer_removing_damaged_tiles.png",
      categories: ["Roof Repairs", "Maintenance"]
    },
    {
      id: 2,
      title: "Pitched vs. Flat Roofs: A Cannock Homeowner's Guide",
      slug: "pitched-vs-flat-roofs-cannock-guide",
      excerpt: "Confused about which roofing style is best for your Cannock property? Our expert roofers in Cannock compare pitched and flat roof options to help you decide.",
      date: "April 12, 2025",
      image: "/images/roofers/roofer_installing_roofing_tiles.png",
      categories: ["Roof Types", "Installation"]
    },
    {
      id: 3,
      title: "Emergency Roof Repairs in Cannock: What Constitutes an Emergency?",
      slug: "emergency-roof-repairs-cannock",
      excerpt: "Learn when to call an emergency roofer in Cannock and what situations require immediate professional attention to protect your home from further damage.",
      date: "April 19, 2025",
      image: "/images/roofers/roofer_repairing_roof_with_harness.png",
      categories: ["Emergency Repairs", "Safety"]
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Expert Roofing Tips from Cannock's Trusted Roofer
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Professional advice and insights from our experienced team of roofers in Cannock
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPosts.map((post) => (
            <div 
              key={post.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative h-48">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.categories.map((category, index) => (
                    <span 
                      key={index} 
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                    >
                      {category}
                    </span>
                  ))}
                </div>
                <h3 className="text-lg font-bold mb-3 line-clamp-2">
                  <Link 
                    href={`/blog/${post.slug}`} 
                    className="hover:text-red-600 transition"
                  >
                    {post.title}
                  </Link>
                </h3>
                <p className="text-gray-600 mb-4 text-sm line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{post.date}</span>
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="text-red-600 font-medium hover:text-red-700 transition flex items-center text-sm"
                  >
                    Read More
                    <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link 
            href="/blog" 
            className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-lg text-base font-medium hover:bg-gray-50 transition"
          >
            View All Roofing Articles
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
      
      {/* Rich text SEO enhancement section (hidden visually but available to search engines) */}
      <div className="container mx-auto px-4 mt-8">
        <div className="max-w-4xl mx-auto prose prose-lg">
          <h3 className="text-2xl font-bold text-center mb-6">Why Choose a Professional Roofer in Cannock?</h3>
          <p>
            When it comes to maintaining and repairing your roof in Cannock, hiring a professional 
            <strong> roofer in Cannock</strong> ensures quality workmanship and reliable service. 
            Our team brings over 18 years of experience to every roofing project, whether it's 
            emergency repairs, complete roof replacements, or specialized installations.
          </p>
          <p>
            As Cannock's most trusted <strong>roofing company</strong>, we understand the unique 
            challenges that local weather conditions present for homeowners. From addressing storm 
            damage to preventing leaks before they start, our <strong>experienced roofers in Cannock</strong> 
            provide comprehensive solutions tailored to your specific needs.
          </p>
          <p>
            Browse our expert roofing articles above to learn more about maintaining your roof, 
            recognizing signs of damage, and understanding when to call a professional 
            <strong> roofer in Cannock</strong> for assistance.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBlogSection; 