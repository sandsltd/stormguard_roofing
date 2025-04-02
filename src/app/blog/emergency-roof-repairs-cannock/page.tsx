import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from "next";
import SeoHead from '@/components/SeoHead';
import { getContent } from '@/utils/server-content';

export const revalidate = 3600; // Revalidate every hour

export const metadata: Metadata = {
  title: "Emergency Roof Repairs in Cannock: What Constitutes an Emergency? | Roofer Cannock",
  description: "Learn when to call an emergency roofer in Cannock. Our professional team explains what constitutes a roofing emergency and how to protect your home.",
  keywords: "emergency roofer cannock, roof repairs cannock, emergency roof leak cannock, 24 hour roofer cannock, storm damage roof cannock",
};

export default async function BlogPost() {
  const content = await getContent();
  
  return (
    <main className="min-h-screen">
      {/* SEO Head */}
      <SeoHead 
        content={content} 
        title="Emergency Roof Repairs in Cannock: What Constitutes an Emergency? | Roofer Cannock"
        description="Learn when to call an emergency roofer in Cannock. Our professional team explains what constitutes a roofing emergency and how to protect your home."
        keywords="emergency roofer cannock, roof repairs cannock, emergency roof leak cannock, 24 hour roofer cannock, storm damage roof cannock"
      />

      {/* Hero Section */}
      <div className="relative pt-40 pb-20 bg-gray-800 text-white mt-16 md:mt-20 lg:mt-24">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-wrap gap-2 mb-4">
              <Link 
                href="/blog/category/emergency-repairs"
                className="px-3 py-1 bg-red-600 text-white text-sm rounded-full hover:bg-red-700 transition"
              >
                Emergency Repairs
              </Link>
              <Link 
                href="/blog/category/safety"
                className="px-3 py-1 bg-red-600 text-white text-sm rounded-full hover:bg-red-700 transition"
              >
                Safety
              </Link>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Emergency Roof Repairs in Cannock: What Constitutes an Emergency?</h1>
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 rounded-full bg-gray-300 mr-3 flex items-center justify-center overflow-hidden">
                <Image src="/images/logo.png" alt="StormGuard Roofing" width={40} height={40} className="object-contain" />
              </div>
              <div>
                <p className="font-medium">StormGuard Roofing</p>
                <p className="text-sm text-gray-300">Cannock's Trusted Roofing Experts</p>
              </div>
              <span className="mx-4">|</span>
              <time className="text-gray-300">March 26, 2025</time>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="relative h-80 md:h-96 lg:h-[500px]">
        <Image
          src="/images/roofers/roofer_repairing_roof_with_harness.png"
          alt="Emergency roofer in Cannock repairing roof with safety harness"
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
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Coming Soon!</h2>
            <p className="text-lg mb-8 text-gray-700">This blog post is currently being developed by our expert team.</p>
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
            <h2 className="text-3xl font-bold mb-4 text-white">Need Emergency Roof Repairs in Cannock?</h2>
            <p className="text-lg text-gray-300 mb-8">
              Our team of expert roofers is available 24/7 for emergency roofing services throughout Cannock
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact"
                className="px-8 py-4 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition"
              >
                Contact Us Now
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