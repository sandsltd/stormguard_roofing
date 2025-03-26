'use client';

import Image from 'next/image';
import Layout from '@/components/Layout';
import { getContent } from '@/utils/content';

// Static site generation with revalidation
export const revalidate = 3600; // Revalidate every hour

export default function About() {
  const content = getContent();
  const { business, about, socials } = content;

  return (
    <Layout business={business} socials={socials}>
      {/* Hero Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-6 text-center">{about.title}</h1>
          <div className="max-w-3xl mx-auto">
            {about.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-gray-700 mb-4 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Mission and Vision Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-blue-50 p-8 rounded-lg">
              <h2 className="text-2xl font-bold mb-4 text-blue-600">Our Mission</h2>
              <p className="text-gray-700">{about.mission}</p>
            </div>
            <div className="bg-green-50 p-8 rounded-lg">
              <h2 className="text-2xl font-bold mb-4 text-green-600">Our Vision</h2>
              <p className="text-gray-700">{about.vision}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {about.team.map((member, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row gap-6">
                <div className="relative w-full md:w-32 h-40 md:h-40 rounded-lg overflow-hidden">
                  <Image 
                    src={member.image} 
                    alt={member.name} 
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-blue-600 mb-3">{member.position}</p>
                  <p className="text-gray-700">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 border border-gray-200 rounded-lg hover:border-blue-500 transition-colors">
              <div className="bg-blue-100 text-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Materials</h3>
              <p className="text-gray-600">We use only the highest quality materials to ensure durability and longevity.</p>
            </div>
            <div className="text-center p-6 border border-gray-200 rounded-lg hover:border-blue-500 transition-colors">
              <div className="bg-blue-100 text-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">On-Time Completion</h3>
              <p className="text-gray-600">We value your time and complete projects within the agreed timeframe.</p>
            </div>
            <div className="text-center p-6 border border-gray-200 rounded-lg hover:border-blue-500 transition-colors">
              <div className="bg-blue-100 text-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Team</h3>
              <p className="text-gray-600">Our professionals are highly trained and experienced in all aspects of roofing.</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
} 