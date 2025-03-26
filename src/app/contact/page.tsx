'use client';

import { useState } from 'react';
import Layout from '@/components/Layout';
import { getContent } from '@/utils/content';

// This needs to be a client component for the form to work,
// but we can still fetch the content on the server
export default function Contact() {
  // This will execute on the server during static generation,
  // and will be serialized and sent to the client
  const content = getContent();
  const { business, contact, socials, services } = content;
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
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
    <Layout business={business} socials={socials}>
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">{contact.title}</h1>
          <p className="text-xl max-w-3xl mx-auto">
            {contact.subtitle}
          </p>
        </div>
      </section>

      {/* Contact Form and Info Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-gray-50 p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              
              {formStatus === 'success' && (
                <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                  <p>Thank you for your message! We'll get back to you soon.</p>
                </div>
              )}
              
              {formStatus === 'error' && (
                <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                  <p>There was an error sending your message. Please try again.</p>
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="phone" className="block text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="service" className="block text-gray-700 mb-2">Service Interested In</label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select a service</option>
                    {services.map(service => (
                      <option key={service.id} value={service.id}>
                        {service.title}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-gray-700 mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors w-full"
                >
                  Send Message
                </button>
              </form>
            </div>
            
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-2">Address</h3>
                <p className="text-gray-700">{business.address}</p>
              </div>
              
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-2">Phone</h3>
                <p className="text-gray-700">
                  <a href={`tel:${business.phone}`} className="hover:text-blue-600 transition-colors">
                    {business.phone}
                  </a>
                </p>
              </div>
              
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-2">Email</h3>
                <p className="text-gray-700">
                  <a href={`mailto:${business.email}`} className="hover:text-blue-600 transition-colors">
                    {business.email}
                  </a>
                </p>
              </div>
              
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-2">Business Hours</h3>
                <ul className="text-gray-700 space-y-1">
                  <li>Monday - Friday: 8:00 AM - 5:00 PM</li>
                  <li>Saturday: 9:00 AM - 2:00 PM</li>
                  <li>Sunday: Closed</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Connect With Us</h3>
                <div className="flex space-x-4">
                  {socials.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-700 hover:text-blue-600 transition-colors"
                      aria-label={social.platform}
                    >
                      {social.platform}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-center">Our Location</h2>
          <div className="h-96 bg-gray-300 rounded-lg shadow-md">
            {/* In a real implementation, you would embed a Google Map or other map service here */}
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-gray-600">Map Placeholder - Embed Google Maps here</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
} 