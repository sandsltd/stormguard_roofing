'use client';

import { useState, useEffect } from 'react';
import { fetchContent } from '@/utils/client-content';
import type { Content } from '@/utils/content';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

// Dynamically import the SeoHead component with no SSR since this is a client component
const SeoHead = dynamic(() => import('@/components/SeoHead'), { ssr: false });

// This needs to be a client component for the form to work,
// but we can still fetch the content on the server
export default function Contact() {
  const [content, setContent] = useState<Content | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  useEffect(() => {
    const loadContent = async () => {
      try {
        const data = await fetchContent();
        setContent(data);
      } catch (error) {
        console.error('Error loading content:', error);
      }
    };
    loadContent();
  }, []);

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const { business, contact, socials, services } = content;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, you would send the form data to a server or API
    // For now, we'll just simulate a successful submission
    setTimeout(() => {
      setFormStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: '',
      });
      
      // Reset form status after 5 seconds
      setTimeout(() => {
        setFormStatus('idle');
      }, 5000);
    }, 1000);
  };

  return (
    <>
      {/* SEO Head - Client-side only */}
      {content && <SeoHead content={content} pageKey="contact" />}

      {/* Hero Section */}
      <section className="relative text-white py-20 sm:py-24 md:py-32 overflow-hidden mt-16 sm:mt-20 md:mt-24">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url("${content.contact.heroImage || '/images/client-images/WhatsApp Image 2025-03-27 at 13.57.21 (1).jpeg'}")` 
          }}
        />
        <div className="absolute inset-0 bg-black/70 sm:bg-black/60" />
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:40px_40px] sm:bg-[size:60px_60px]" />
        <div className="container mx-auto px-4 relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-100">
              {content.contact.formTitle || 'Get in Touch'}
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-100 leading-relaxed">
              {content.contact.formDescription || 'Have a question or need a quote? We\'re here to help. Contact us today and we\'ll get back to you as soon as possible.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white p-10 rounded-2xl shadow-xl border border-gray-100"
            >
              <h2 className="text-3xl font-bold mb-8 text-gray-800">Send Us a Message</h2>
              
              {formStatus === 'success' && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-xl"
                >
                  <p className="flex items-center">
                    <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Thank you for your message! We'll get back to you soon.
                  </p>
                </motion.div>
              )}
              
              {formStatus === 'error' && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl"
                >
                  <p className="flex items-center">
                    <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    There was an error sending your message. Please try again.
                  </p>
                </motion.div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-5 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                    required
                    placeholder="Your name"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-5 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                    required
                    placeholder="your@email.com"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-5 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                    placeholder="Your phone number"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="service" className="block text-sm font-medium text-gray-700">Service Interested In</label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-5 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                  >
                    <option value="">Select a service</option>
                    {services.services.map((service, index) => (
                      <option key={index} value={service.title}>
                        {service.title}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-5 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white resize-none"
                    required
                    placeholder="Your message..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full text-white px-8 py-4 rounded-xl font-medium transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 hover:opacity-90"
                  style={{ backgroundColor: content.theme?.primaryColor || '#3b82f6' }}
                >
                  <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Send Message
                </button>
              </form>
            </motion.div>
            
            {/* Contact Information */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white p-10 rounded-2xl shadow-xl border border-gray-100"
            >
              <h2 className="text-3xl font-bold mb-10 text-gray-800">Contact Information</h2>
              
              <div className="space-y-10">
                <div className="group">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center group-hover:text-blue-600 transition-colors">
                    <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: content.theme?.primaryColor || '#3b82f6' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Address
                  </h3>
                  <p className="text-gray-600 text-lg">{contact.address}</p>
                </div>
                
                <div className="group">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center group-hover:text-blue-600 transition-colors">
                    <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: content.theme?.primaryColor || '#3b82f6' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Phone
                  </h3>
                  <p className="text-gray-600 text-lg">
                    <a href={`tel:${contact.phone}`} className="hover:text-blue-600 transition-colors">
                      {contact.phone}
                    </a>
                  </p>
                </div>
                
                <div className="group">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center group-hover:text-blue-600 transition-colors">
                    <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: content.theme?.primaryColor || '#3b82f6' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Email
                  </h3>
                  <p className="text-gray-600 text-lg">
                    <a href={`mailto:${contact.email}`} className="hover:text-blue-600 transition-colors">
                      {contact.email}
                    </a>
                  </p>
                </div>
                
                <div className="group">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center group-hover:text-blue-600 transition-colors">
                    <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: content.theme?.primaryColor || '#3b82f6' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Business Hours
                  </h3>
                  <p className="text-gray-600 text-lg whitespace-pre-line">{contact.hours}</p>
                </div>
                
                {/* Only show social media section if there are any URLs */}
                {Object.values(socials).some(url => url && url.trim() !== '') && (
                  <div className="group">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center group-hover:text-blue-600 transition-colors">
                      <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: content.theme?.primaryColor || '#3b82f6' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                      Connect With Us
                    </h3>
                    <div className="flex space-x-6">
                      {Object.entries(socials)
                        .filter(([_, url]) => url && url.trim() !== '')
                        .map(([platform, url]) => {
                          const displayName = platform.charAt(0).toUpperCase() + platform.slice(1);
                          return (
                            <a
                              key={platform}
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-600 hover:text-blue-600 transition-colors text-lg font-medium hover:scale-110 transform duration-200"
                              style={{ 
                                '--tw-text-opacity': 1, 
                                '--tw-hover-text-opacity': 1,
                                color: 'var(--tw-text-gray-600)',
                                '&:hover': {
                                  color: content.theme?.primaryColor || '#3b82f6'
                                }
                              } as React.CSSProperties}
                            >
                              {displayName}
                            </a>
                          );
                        })}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Google Maps Section */}
      {content.contact.mapUrl && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl overflow-hidden shadow-xl border border-gray-100"
            >
              <iframe
                src={content.contact.mapUrl}
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps"
              ></iframe>
            </motion.div>
          </div>
        </section>
      )}
    </>
  );
} 