import React from 'react';
import { Content } from '@/utils/content';
import Image from 'next/image';
import Link from 'next/link';

interface IntroductionSectionProps {
  content: Content;
}

// Define interface for the introduction content
interface IntroductionContent {
  title?: string;
  subtitle?: string;
  description?: string;
  image?: string;
  yearFounded?: string;
  projectsCompleted?: string;
  satisfaction?: string;
}

const IntroductionSection: React.FC<IntroductionSectionProps> = ({ content }) => {
  
  // Use the content prop to access the data with proper typing
  const introContent = (content.homepage?.introduction || {}) as IntroductionContent;
  const theme = content.theme || {};
  
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="block">Cannock's Most Trusted</span>
              <span className="block text-red-600">Roofing Professionals</span>
            </h2>
            
            <div className="prose prose-lg max-w-none mb-8">
              <p>
                <strong>Looking for a reliable roofer in Cannock?</strong> StormGuard Roofing provides 
                expert roofing services throughout Cannock and surrounding areas. With over 18 years of 
                experience, our team of professional <strong>Cannock roofers</strong> delivers quality 
                workmanship and exceptional customer service.
              </p>
              <p>
                Whether you need emergency repairs, a complete roof replacement, or regular maintenance, 
                our <strong>experienced roofers in Cannock</strong> have the skills and expertise to handle 
                all your roofing requirements efficiently and professionally.
              </p>
            </div>
            
            <div className="bg-gray-100 p-6 rounded-lg border-l-4 border-red-600 mb-8">
              <h3 className="text-xl font-bold mb-3">Why Choose Our Roofer Services in Cannock?</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-red-600 mt-1 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <span>Local <strong>Cannock roofers</strong> with deep knowledge of the area</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-red-600 mt-1 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <span>18+ years of <strong>roofing experience in Cannock</strong></span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-red-600 mt-1 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <span>Fully insured and certified <strong>roofer services in Cannock</strong></span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-red-600 mt-1 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <span>Emergency <strong>roof repairs in Cannock</strong> available 24/7</span>
                </li>
              </ul>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/contact" 
                className="px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition text-center"
              >
                Get a Free Quote
              </Link>
              <Link 
                href="/services" 
                className="px-6 py-3 border border-gray-300 rounded-lg font-bold hover:bg-gray-50 transition text-center"
              >
                Our Services
              </Link>
            </div>
          </div>
          
          <div className="order-1 md:order-2">
            <div className="relative rounded-lg overflow-hidden shadow-xl">
              <div className="aspect-w-4 aspect-h-3">
                <Image 
                  className="h-full w-full object-cover rounded-lg shadow-lg"
                  width={600}
                  height={400}
                  src={introContent.image || "/images/client-images/roofer_installing_roofing_tiles.jpg"}
                  alt="Professional roofer in Cannock"
                />
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                <div className="flex items-center mb-2">
                  <svg className="text-yellow-400 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path>
                  </svg>
                  <svg className="text-yellow-400 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path>
                  </svg>
                  <svg className="text-yellow-400 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path>
                  </svg>
                  <svg className="text-yellow-400 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path>
                  </svg>
                  <svg className="text-yellow-400 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path>
                  </svg>
                  <span className="ml-2 text-white font-bold">5-Star Rated Roofer in Cannock</span>
                </div>
                <p className="text-white text-sm">
                  "The best roofer in Cannock! Professional, reliable, and excellent workmanship."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroductionSection; 