import React from 'react';
import Image from 'next/image';
import { FaHistory, FaBullseye, FaHandshake, FaLeaf, FaStar, FaQuoteLeft, FaPhoneAlt } from 'react-icons/fa';
import { getContent } from '@/utils/content';
import AboutGalleryWrapper from '@/components/about/AboutGalleryWrapper';
import { ExtendedBusinessContent, ValueItem } from '@/components/about/BusinessTypes';
import ContactSection from '@/components/home/ContactSection';

export const metadata = {
  title: 'About Us',
  description: 'Learn more about our company, our history, values and team',
};

export default async function AboutPage() {
  const content = await getContent();
  const business = content.business as ExtendedBusinessContent;

  return (
    <main className="relative min-h-screen">
      {/* Hero Section with Background Image */}
      <div className="relative h-[40vh] md:h-[50vh] lg:h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image 
            src={business.hero || "/images/hero-placeholder.jpg"} 
            alt={`${business.name} Team`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div className="max-w-4xl px-4">
            <div className="inline-block bg-white bg-opacity-10 backdrop-blur-sm px-4 py-1 rounded-full text-white text-sm font-medium mb-4">
              Established {business.establishedYear || '2000'}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              About {business.name}
            </h1>
            <p className="text-lg md:text-xl text-white max-w-3xl mx-auto">
              {business.tagline || 'Your trusted local business dedicated to excellent service'}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium" 
                   style={{ backgroundColor: `${content.theme?.primaryColor}20` || '#1e3a8a20', color: content.theme?.primaryColor || '#1e3a8a' }}>
                <FaHistory className="mr-2" /> Our Story
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4 mb-6">
                Our History & Mission
              </h2>
              <div className="prose prose-lg max-w-none">
                <p>
                  {business.description || `At ${business.name}, we have been serving our local community since ${business.establishedYear || '2000'}, 
                  building a reputation for quality, reliability, and exceptional customer service.`}
                </p>
                <p>
                  From our humble beginnings, we've grown to become a trusted name in our industry, 
                  all while maintaining our commitment to personalized service and craftsmanship.
                </p>
              </div>
              
              <div className="mt-10">
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
                     style={{ backgroundColor: `${content.theme?.primaryColor}20` || '#1e3a8a20', color: content.theme?.primaryColor || '#1e3a8a' }}>
                  <FaBullseye className="mr-2" /> Our Purpose
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mt-4 mb-4">
                  Our Mission
                </h3>
                <p className="text-gray-700">
                  {business.mission || `Our mission at ${business.name} is to provide the highest quality products and services
                  while maintaining uncompromising standards of integrity, professionalism, and respect for our customers and team members.`}
                </p>
              </div>
            </div>
            
            <div className="relative rounded-xl overflow-hidden shadow-xl">
              <div className="aspect-w-4 aspect-h-3">
                <Image 
                  src={business.about?.image || "/images/about-placeholder.jpg"} 
                  alt={`About ${business.name}`}
                  width={600}
                  height={450}
                  className="object-cover rounded-xl"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                <div className="text-white">
                  <p className="font-medium">Trusted by customers since</p>
                  <p className="text-3xl font-bold">{business.establishedYear || '2000'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
                 style={{ backgroundColor: `${content.theme?.primaryColor}20` || '#1e3a8a20', color: content.theme?.primaryColor || '#1e3a8a' }}>
              <FaHandshake className="mr-2" /> What Drives Us
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4 mb-6">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These principles guide everything we do at {business.name}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(business.coreValues || [
              {
                title: "Integrity",
                description: "We conduct our business with honesty, transparency, and ethical standards that earn your trust."
              },
              {
                title: "Excellence",
                description: "We strive for excellence in every aspect of our work, from customer service to the quality of our products."
              },
              {
                title: "Sustainability",
                description: "We are committed to sustainable practices that minimize our environmental impact and benefit our community."
              }
            ]).map((value: ValueItem, index: number) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="mb-6 text-2xl" style={{ color: content.theme?.primaryColor || '#1e3a8a' }}>
                  {index === 0 && <FaHandshake />}
                  {index === 1 && <FaStar />}
                  {index === 2 && <FaLeaf />}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-700">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
                 style={{ backgroundColor: `${content.theme?.primaryColor}20` || '#1e3a8a20', color: content.theme?.primaryColor || '#1e3a8a' }}>
              <FaQuoteLeft className="mr-2" /> Customer Feedback
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4 mb-6">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it - hear from our satisfied customers
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.homepage.testimonials?.map((testimonial, index: number) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                <div className="mb-4" style={{ color: content.theme?.primaryColor || '#1e3a8a' }}>
                  {Array(5).fill(0).map((_, i) => (
                    <span key={i} className="text-xl">★</span>
                  ))}
                </div>
                <div className="relative mb-8 flex-grow">
                  <FaQuoteLeft className="absolute -top-4 -left-2 text-4xl opacity-10" style={{ color: content.theme?.primaryColor || '#1e3a8a' }} />
                  <blockquote className="text-lg text-gray-700 relative z-10">
                    "{testimonial.quote}"
                  </blockquote>
                </div>
                <div className="mt-auto pt-6 border-t border-gray-100 flex items-center">
                  <div className="mr-4 text-gray-400 text-xl">
                    👤
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{testimonial.author}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Gallery Section - Moved above contact form */}
      <AboutGalleryWrapper content={content} />
      
      {/* Contact Form Section */}
      <section className="py-16 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
                 style={{ backgroundColor: `${content.theme?.primaryColor}20` || '#1e3a8a20', color: content.theme?.primaryColor || '#1e3a8a' }}>
              <FaPhoneAlt className="mr-2" /> Get In Touch
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4 mb-6">
              Contact Us Today
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Have a question or ready to start your project? We're here to help.
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
            <ContactSection content={content as any} />
          </div>
          
          {/* Contact info cards below the form */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center">
              <div className="text-white p-3 mr-4"
                   style={{ backgroundColor: content.theme?.primaryColor || '#1e3a8a' }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Our Address</h3>
                <p className="text-gray-600">{business.address}</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center">
              <div className="text-white p-3 mr-4"
                   style={{ backgroundColor: content.theme?.primaryColor || '#1e3a8a' }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 3a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H3a1 1 0 01-1-1V3z" />
                  <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Business Hours</h3>
                <p className="text-gray-600">{business.businessHours || "Mon-Fri: 8am-6pm"}</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center">
              <div className="text-white p-3 mr-4"
                   style={{ backgroundColor: content.theme?.primaryColor || '#1e3a8a' }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Contact</h3>
                <p className="text-gray-600">{business.phone}</p>
                <p className="text-gray-600">{business.email}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 