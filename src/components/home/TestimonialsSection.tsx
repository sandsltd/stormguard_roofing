import React from 'react';
import { Content } from '@/utils/content';

interface TestimonialsSectionProps {
  content: Content;
}

export default function TestimonialsSection({ content }: TestimonialsSectionProps) {
  // Use primary color from theme or default to blue
  const primaryColor = content.theme?.primaryColor || '#3b82f6';
  const primaryColorLight = `${primaryColor}15`; // 15% opacity version for backgrounds
  
  return (
    <section className="py-20 bg-gray-50 overflow-hidden relative">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-0 w-64 h-64 rounded-full opacity-30 transform -translate-x-1/2" 
          style={{ backgroundColor: primaryColorLight }}></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 rounded-full opacity-30"
          style={{ backgroundColor: primaryColorLight }}></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Verified Reviews From Our Customers
          </h2>
          <p className="text-lg text-gray-600">
            Read genuine feedback from our satisfied clients who have experienced our professional roofing services.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {content.homepage.testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-xl shadow-lg transform transition-all duration-300 hover:shadow-xl flex flex-col h-[32rem]"
            >
              {/* Card Header with Quote Icon */}
              <div className="h-10 mb-6">
                <svg className="w-10 h-10 flex-shrink-0" style={{ color: primaryColor }} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              
              {/* Quote Container with Fixed Height */}
              <div className="flex-1 overflow-hidden mb-6">
                <div className="h-[12rem] overflow-hidden relative">
                  <p className="text-gray-700 text-lg leading-relaxed italic">
                    "{testimonial.quote}"
                  </p>
                  {/* Gradient Fade for Long Text */}
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
                </div>
              </div>
              
              {/* Star Rating - Fixed Height */}
              <div className="h-8 flex items-center mb-6" style={{ color: '#FBBF24' }}>
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              
              {/* Author Info - Fixed Height */}
              <div className="h-20 border-t pt-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0"
                    style={{ backgroundColor: primaryColorLight, color: primaryColor }}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{testimonial.author}</h3>
                    <p className="text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8 text-sm text-gray-500">
          These are verified customer reviews collected from independent review platforms.
        </div>
        
        <div className="mt-16 text-center">
          <a 
            href="/contact" 
            className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white rounded-lg transition-colors hover:opacity-90"
            style={{ backgroundColor: primaryColor }}
          >
            Get Your Free Quote
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
} 