'use client';

import Image from 'next/image';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { getContent } from '@/utils/content';

// Static site generation with revalidation
export const revalidate = 3600; // Revalidate every hour

export default function Services() {
  const content = getContent();
  const { business, services, socials } = content;

  return (
    <Layout business={business} socials={socials}>
      {/* Hero Section */}
      <section className="bg-gray-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-6">Our Roofing Services</h1>
          <p className="text-xl max-w-3xl mx-auto">
            We offer comprehensive roofing solutions for both residential and commercial properties.
            Our experienced team ensures quality workmanship and exceptional results.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-16">
            {services.map((service, index) => (
              <div 
                key={service.id}
                className={`flex flex-col ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } gap-8 items-center`}
              >
                <div className="w-full md:w-1/2">
                  <div className="relative h-64 md:h-80 w-full rounded-lg overflow-hidden">
                    <Image 
                      src={service.image} 
                      alt={service.title} 
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="w-full md:w-1/2">
                  <h2 className="text-3xl font-bold mb-4 text-gray-800">{service.title}</h2>
                  <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">What We Offer:</h3>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-gray-700">
                        <svg className="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Process</h2>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-blue-100 text-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">1</div>
              <h3 className="text-xl font-semibold mb-2">Consultation</h3>
              <p className="text-gray-600">We assess your needs and provide expert advice on the best solutions for your roof.</p>
            </div>
            <div className="flex-1 bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-blue-100 text-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">2</div>
              <h3 className="text-xl font-semibold mb-2">Proposal</h3>
              <p className="text-gray-600">We provide a detailed proposal with transparent pricing and timeline.</p>
            </div>
            <div className="flex-1 bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-blue-100 text-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">3</div>
              <h3 className="text-xl font-semibold mb-2">Installation</h3>
              <p className="text-gray-600">Our skilled team completes the work with minimal disruption to your property.</p>
            </div>
            <div className="flex-1 bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-blue-100 text-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">4</div>
              <h3 className="text-xl font-semibold mb-2">Follow-up</h3>
              <p className="text-gray-600">We ensure your complete satisfaction and provide warranty information.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Need a Roofing Solution?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Contact us today for a free consultation and estimate
          </p>
          <Link
            href="/contact"
            className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-md text-lg font-medium transition-colors"
          >
            Get a Free Estimate
          </Link>
        </div>
      </section>
    </Layout>
  );
} 