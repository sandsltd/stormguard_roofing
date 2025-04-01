import React from 'react';
import { Content } from '@/utils/content';
import Image from 'next/image';

interface IntroductionSectionProps {
  content: Content;
}

export default function IntroductionSection({ content }: IntroductionSectionProps) {
  const introduction = content.homepage.introduction || {
    title: "Walsall's Most Trusted",
    subtitle: "Roofing Specialists",
    description: "With over a decade of experience serving Dorchester and surrounding areas, we've built a reputation for quality craftsmanship, reliability, and exceptional customer service.",
    image: "/images/roofers/team_of_roofers.jpg",
    yearFounded: "2010",
    projectsCompleted: "500+",
    satisfaction: "98%"
  };

  // Use primary color from theme or default to blue
  const primaryColor = content.theme?.primaryColor || '#3b82f6';
  const primaryColorLight = `${primaryColor}15`; // 15% opacity version for backgrounds
  
  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 inset-x-0 h-40" style={{background: `linear-gradient(to bottom, ${primaryColorLight}, transparent)`}}></div>
      <div className="absolute -right-20 top-1/4 w-80 h-80 rounded-full opacity-50" style={{backgroundColor: primaryColorLight}}></div>
      <div className="absolute -left-40 bottom-10 w-96 h-96 rounded-full opacity-40" style={{backgroundColor: primaryColorLight}}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full opacity-60" style={{backgroundColor: primaryColorLight}}></div>
              <div className="bg-white rounded-xl shadow-xl p-2 relative z-10">
                <div className="relative rounded-lg overflow-hidden aspect-[4/3]">
                  <Image 
                    src={introduction.image} 
                    alt="Professional Roofing Team" 
                    fill
                    className="object-cover object-center transform transition-transform duration-500 hover:scale-105"
                  />
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-xl opacity-20 transform -rotate-6" 
                style={{background: `linear-gradient(to bottom right, ${primaryColor}, ${primaryColor}cc)`}}></div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium" 
                style={{backgroundColor: primaryColorLight, color: primaryColor}}>
                <span className="w-2 h-2 rounded-full mr-2" style={{backgroundColor: primaryColor}}></span>
                Roofing Excellence Since {introduction.yearFounded}
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                {introduction.title} <br />
                <span style={{ 
                  backgroundImage: `linear-gradient(to right, ${primaryColor}, ${primaryColor}aa)`, 
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  color: 'transparent'
                }}>
                  {introduction.subtitle}
                </span>
              </h2>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                {introduction.description}
              </p>
              
              <div className="pt-4">
                <div className="flex flex-wrap items-center gap-8">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4" 
                      style={{backgroundColor: primaryColorLight, color: primaryColor}}>
                      <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{introduction.projectsCompleted}</h4>
                      <p className="text-sm text-gray-600">Projects Completed</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4"
                      style={{backgroundColor: primaryColorLight, color: primaryColor}}>
                      <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905a3.61 3.61 0 01-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{introduction.satisfaction}</h4>
                      <p className="text-sm text-gray-600">Customer Satisfaction</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 