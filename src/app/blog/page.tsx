import React from 'react';
import { getContent } from '@/utils/server-content';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from "next";
import SeoHead from '@/components/SeoHead';

export const revalidate = 3600; // Revalidate every hour

// Generate metadata for the blog page
export async function generateMetadata(): Promise<Metadata> {
  const content = await getContent();
  
  // Default blog metadata if not specified in content
  return {
    title: "Expert Roofing Tips & Advice | Roofer in Cannock Blog",
    description: "Professional roofing advice, tips and guides from Cannock's trusted roofers. Learn about roof repairs, maintenance and more from our experienced team.",
    keywords: "roofer cannock blog, roofing advice cannock, roof repairs cannock, cannock roofer tips",
    openGraph: {
      title: "Expert Roofing Tips & Advice | Roofer in Cannock Blog",
      description: "Professional roofing advice, tips and guides from Cannock's trusted roofers. Learn about roof repairs, maintenance and more from our experienced team.",
      type: 'website',
    },
  };
}

export default async function BlogPage() {
  const content = await getContent();
  
  // Blog posts data
  const blogPosts = [
    {
      id: 1,
      title: "The Most Common Roofing Problems in Cannock Homes (And How to Fix Them)",
      slug: "common-roofing-problems-cannock",
      excerpt: "Discover the most common roofing issues faced by Cannock homeowners and learn how a professional roofer in Cannock can help solve these problems efficiently.",
      date: "April 2, 2025",
      image: "/images/client-images/roofer_removing_damaged_tiles.jpg",
      categories: ["Roof Repairs", "Maintenance"]
    },
    {
      id: 2,
      title: "Pitched vs. Flat Roofs: A Cannock Homeowner's Guide",
      slug: "pitched-vs-flat-roofs-cannock-guide",
      excerpt: "Confused about which roofing style is best for your Cannock property? Our expert roofers in Cannock compare pitched and flat roof options to help you decide.",
      date: "March 19, 2025",
      image: "/images/client-images/roofer_installing_roofing_tiles.jpg",
      categories: ["Roof Types", "Installation"]
    },
    {
      id: 3,
      title: "Emergency Roof Repairs in Cannock: What Constitutes an Emergency?",
      slug: "emergency-roof-repairs-cannock",
      excerpt: "Learn when to call an emergency roofer in Cannock and what situations require immediate professional attention to protect your home from further damage.",
      date: "March 26, 2025",
      image: "/images/client-images/roofer_repairing_roof_with_harness.jpg",
      categories: ["Emergency Repairs", "Safety"]
    }
  ];

  return (
    <main className="min-h-screen">
      {/* SEO Head */}
      <SeoHead 
        content={content} 
        title="Expert Roofing Tips & Advice | Roofer in Cannock Blog"
        description="Professional roofing advice from trusted Cannock roofers. Learn about roof repairs, maintenance, and more from our experienced roofing team."
        keywords="roofer cannock blog, roofing advice cannock, roof repairs cannock, cannock roofer tips"
      />

      {/* Hero Section */}
      <div className="relative pt-40 pb-20 bg-gray-800 text-white mt-16 md:mt-20 lg:mt-24">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Expert Roofing Tips & Advice from Cannock's Trusted Roofers
            </h1>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto mb-8">
              Professional roofing insights and guidance from our experienced team of roofers in Cannock
            </p>
          </div>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <div 
                key={post.id} 
                className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative h-60">
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
                  <h2 className="text-xl font-bold mb-3 line-clamp-2">
                    <Link 
                      href={`/blog/${post.slug}`} 
                      className="hover:text-red-600 transition"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-gray-600 mb-4 text-base line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{post.date}</span>
                    <Link 
                      href={`/blog/${post.slug}`}
                      className="text-red-600 font-medium hover:text-red-700 transition flex items-center"
                    >
                      Read More
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SEO Content */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <h2 className="text-3xl font-bold text-center mb-6">Roofing Expertise from Cannock's Premier Roofers</h2>
            <p>
              Welcome to the StormGuard Roofing blog, your source for professional advice and insights from the most trusted <strong>roofer in Cannock</strong>. With over 18 years of experience serving the Cannock area, our team of expert roofers shares valuable information to help you maintain your roof and make informed decisions about your roofing needs.
            </p>
            <p>
              As the leading <strong>roofing company in Cannock</strong>, we understand the unique challenges that local homeowners face. From the heavy rainfall common in the West Midlands to the specific architectural styles prevalent in Cannock properties, our blog addresses issues that are directly relevant to our local community.
            </p>
            <p>
              Our articles cover a wide range of topics including preventative maintenance, emergency roof repairs, roof replacement options, and the latest innovations in roofing materials. Whether you're looking for DIY maintenance tips or seeking to understand when it's time to call a professional <strong>Cannock roofer</strong>, our blog provides clear, practical advice you can trust.
            </p>
            <p>
              Browse our collection of articles and benefit from the knowledge and expertise that has made us the most reliable <strong>roofer in Cannock</strong>. And remember, if you need professional roofing services, our team is always ready to help with a free, no-obligation quote.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Need Professional Roofing Help in Cannock?</h2>
            <p className="text-lg text-gray-300 mb-8">
              Our team of expert roofers is ready to assist with all your roofing needs throughout Cannock
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact"
                className="px-8 py-4 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition"
              >
                Contact Us Today
              </Link>
              <Link 
                href="/services"
                className="px-8 py-4 bg-white text-gray-900 font-bold rounded-lg hover:bg-gray-100 transition"
              >
                Our Services
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 