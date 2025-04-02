import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from "next";
import SeoHead from '@/components/SeoHead';
import { getContent } from '@/utils/server-content';

export const revalidate = 3600; // Revalidate every hour

export const metadata: Metadata = {
  title: "Pitched vs. Flat Roofs: A Cannock Homeowner's Guide | Expert Roofer Cannock",
  description: "Compare pitched and flat roof options for your Cannock property. Our expert roofers in Cannock explain the pros, cons, and costs to help you decide.",
  keywords: "roofer cannock, pitched roofs cannock, flat roofs cannock, cannock roofing types, roof installation cannock",
};

export default async function BlogPost() {
  const content = await getContent();
  
  return (
    <main className="min-h-screen">
      {/* SEO Head */}
      <SeoHead 
        content={content} 
        title="Pitched vs. Flat Roofs: A Cannock Homeowner's Guide | Expert Roofer Cannock"
        description="Compare pitched and flat roof options for your Cannock property. Our expert roofers in Cannock explain the pros, cons, and costs to help you decide."
        keywords="roofer cannock, pitched roofs cannock, flat roofs cannock, cannock roofing types, roof installation cannock"
      />

      {/* Hero Section */}
      <div className="relative pt-40 pb-20 bg-gray-800 text-white mt-16 md:mt-20 lg:mt-24">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-wrap gap-2 mb-4">
              <Link 
                href="/blog/category/roof-types"
                className="px-3 py-1 bg-red-600 text-white text-sm rounded-full hover:bg-red-700 transition"
              >
                Roof Types
              </Link>
              <Link 
                href="/blog/category/installation"
                className="px-3 py-1 bg-red-600 text-white text-sm rounded-full hover:bg-red-700 transition"
              >
                Installation
              </Link>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Pitched vs. Flat Roofs: A Cannock Homeowner's Guide</h1>
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 rounded-full bg-gray-300 mr-3 flex items-center justify-center">
                J
              </div>
              <div>
                <p className="font-medium">James Saunders</p>
                <p className="text-sm text-gray-300">Lead Roofer in Cannock</p>
              </div>
              <span className="mx-4">|</span>
              <time className="text-gray-300">April 12, 2025</time>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="relative h-80 md:h-96 lg:h-[500px]">
        <Image
          src="/images/roofers/roofer_installing_roofing_tiles.png"
          alt="Roofer in Cannock installing roofing tiles"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </div>

      {/* Content Section */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold mb-6">Coming Soon!</h2>
            <p className="text-lg mb-8">This blog post is currently being developed by our expert team.</p>
            <Link 
              href="/blog"
              className="px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition"
            >
              View Other Blog Posts
            </Link>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Improve Your Roof in Cannock?</h2>
            <p className="text-lg text-gray-300 mb-8">
              Our team of expert roofers is ready to help with repairs, replacements, and installations throughout Cannock
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