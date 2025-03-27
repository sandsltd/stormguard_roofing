'use client';

import React, { useState } from 'react';
import { Content } from '@/utils/content';

interface ContactSectionProps {
  content: Content;
}

export default function ContactSection({ content }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    submitting: false,
    success: false,
    error: ''
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus({ submitting: true, success: false, error: '' });
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit form');
      }
      
      // Reset form on success
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      });
      
      setFormStatus({
        submitting: false,
        success: true,
        error: ''
      });
      
      // Scroll to the top of the form to ensure the user sees the success message
      const formElement = document.getElementById('contact-form');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } catch (error: any) {
      console.error('Form submission error:', error);
      setFormStatus({
        submitting: false,
        success: false,
        error: error.message || 'Something went wrong. Please try again or contact us directly via phone.'
      });
    }
  };
  
  // Get form field configuration or use defaults
  const formFields = content.contact.formFields || {
    name: { enabled: true, required: true, label: 'Full Name' },
    email: { enabled: true, required: true, label: 'Email Address' },
    phone: { enabled: true, required: false, label: 'Phone Number' },
    service: { enabled: true, required: false, label: 'Service Required' },
    message: { enabled: true, required: true, label: 'Your Message' },
    submitButtonText: 'Send Message'
  };
  
  const primaryColor = content.theme?.primaryColor || 'rgb(37, 99, 235)';
  const buttonBgColor = primaryColor;
  const iconBgColor = primaryColor;
  
  return (
    <section id="contact" className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-opacity-30 rounded-full opacity-30 transform translate-x-1/2 translate-y-1/3" 
             style={{ backgroundColor: `${primaryColor}10` }}></div>
        <div className="absolute top-20 -left-20 w-80 h-80 bg-opacity-30 rounded-full opacity-30" 
             style={{ backgroundColor: `${primaryColor}10` }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span style={{ color: primaryColor }}>
              {content.contact.formTitle || "Get In Touch"}
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {content.contact.formDescription || "Have questions or ready to start your project? Contact us today for a free, no-obligation quote."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          <div className="lg:col-span-3 bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold mb-2 text-gray-800">Send Us a Message</h3>
            <p className="text-gray-600 mb-6">Need a quicker response? Call us directly for an immediate quote at <a href={`tel:${content.contact.phone || content.business.phone}`} className="font-semibold hover:underline" style={{ color: primaryColor }}>{content.contact.phone || content.business.phone}</a></p>
            
            {formStatus.success && (
              <div className="mb-6 p-5 bg-green-50 border border-green-200 text-green-700 rounded-lg">
                <div className="flex items-center mb-2">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <h4 className="text-lg font-semibold">Thank you for your message!</h4>
                </div>
                <p>Your enquiry has been received. We'll get back to you as soon as possible.</p>
                <p className="mt-2 text-sm font-medium">
                  For immediate assistance or a faster quote, please call us directly at{' '}
                  <a href={`tel:${content.contact.phone || content.business.phone}`} className="font-bold underline">
                    {content.contact.phone || content.business.phone}
                  </a>.
                </p>
              </div>
            )}
            
            {formStatus.error && (
              <div className="mb-6 p-5 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                <div className="flex items-center mb-2">
                  <svg className="w-5 h-5 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h4 className="text-lg font-semibold">There was a problem sending your message</h4>
                </div>
                <p>{formStatus.error}</p>
                <p className="mt-2 text-sm font-medium">
                  Please try again or get a quick quote by calling us directly at{' '}
                  <a href={`tel:${content.contact.phone || content.business.phone}`} className="font-bold underline">
                    {content.contact.phone || content.business.phone}
                  </a>.
                </p>
              </div>
            )}
            
            <form id="contact-form" className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {formFields.name.enabled && (
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      {formFields.name.label}
                      {formFields.name.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required={formFields.name.required}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-colors"
                      style={{ 
                        "--tw-ring-color": `${primaryColor}40`,
                        outlineColor: primaryColor
                      } as React.CSSProperties}
                      placeholder="Your name"
                    />
                  </div>
                )}
                
                {formFields.email.enabled && (
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      {formFields.email.label}
                      {formFields.email.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required={formFields.email.required}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-colors"
                      style={{ 
                        "--tw-ring-color": `${primaryColor}40`,
                        outlineColor: primaryColor
                      } as React.CSSProperties}
                      placeholder="your.email@example.com"
                    />
                  </div>
                )}
              </div>
              
              {formFields.phone.enabled && (
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    {formFields.phone.label}
                    {formFields.phone.required && <span className="text-red-500 ml-1">*</span>}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required={formFields.phone.required}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-colors"
                    style={{ 
                      "--tw-ring-color": `${primaryColor}40`, 
                      outlineColor: primaryColor
                    } as React.CSSProperties}
                    placeholder="Your phone number"
                  />
                </div>
              )}
              
              {formFields.service.enabled && (
                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
                    {formFields.service.label}
                    {formFields.service.required && <span className="text-red-500 ml-1">*</span>}
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    required={formFields.service.required}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-colors"
                    style={{ 
                      "--tw-ring-color": `${primaryColor}40`,
                      outlineColor: primaryColor
                    } as React.CSSProperties}
                  >
                    <option value="">Select a service</option>
                    {content.homepage.services?.map((service, index) => (
                      <option key={index} value={service.title}>
                        {service.title}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              
              {formFields.message.enabled && (
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    {formFields.message.label}
                    {formFields.message.required && <span className="text-red-500 ml-1">*</span>}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required={formFields.message.required}
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-colors"
                    style={{ 
                      "--tw-ring-color": `${primaryColor}40`,
                      outlineColor: primaryColor
                    } as React.CSSProperties}
                    placeholder="Tell us about your project or requirements..."
                  />
                </div>
              )}
              
              <div>
                <button
                  type="submit"
                  disabled={formStatus.submitting}
                  className="w-full flex justify-center items-center py-4 px-6 border border-transparent rounded-lg shadow-md text-base font-medium text-white hover:opacity-90 transition-colors"
                  style={{ backgroundColor: buttonBgColor }}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {formStatus.submitting ? 'Sending...' : formFields.submitButtonText}
                </button>
              </div>
            </form>
          </div>

          <div className="lg:col-span-2 text-white rounded-xl shadow-lg p-8" style={{ backgroundColor: primaryColor }}>
            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
            <div className="space-y-6">
              <a href={`tel:${content.contact.phone || content.business.phone}`} className="flex items-start hover:opacity-80 transition-opacity">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white flex items-center justify-center mr-4">
                  <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-1">Phone - Call for Fast Quote</h4>
                  <p className="text-white text-opacity-90">{content.contact.phone || content.business.phone}</p>
                  <p className="text-white text-opacity-80 text-sm mt-1 italic">Quickest way to get a quote!</p>
                </div>
              </a>
              <a href={`mailto:${content.contact.email || content.business.email}`} className="flex items-start hover:opacity-80 transition-opacity">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white flex items-center justify-center mr-4">
                  <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-1">Email</h4>
                  <p className="text-white text-opacity-90">{content.contact.email || content.business.email}</p>
                </div>
              </a>
              <a href={`https://maps.google.com/?q=${encodeURIComponent(content.contact.address || content.business.address)}`} target="_blank" rel="noopener noreferrer" className="flex items-start hover:opacity-80 transition-opacity">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white flex items-center justify-center mr-4">
                  <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-1">Address</h4>
                  <p className="text-white text-opacity-90">{content.contact.address || content.business.address}</p>
                </div>
              </a>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white flex items-center justify-center mr-4">
                  <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-1">Business Hours</h4>
                  <p className="text-white text-opacity-90">{content.contact.hours || content.header?.businessHours}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 