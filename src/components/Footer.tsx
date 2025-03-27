'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';
import { Content } from '@/utils/content';

interface FooterProps {
  content: Content;
  theme?: {
    footer?: {
      backgroundColor?: string;
      textColor?: string;
      linkColor?: string;
      linkHoverColor?: string;
      iconColor?: string;
      borderColor?: string;
    };
    primaryColor?: string;
  };
}

export default function Footer({ content, theme }: FooterProps) {
  const { business } = content;
  
  return (
    <footer className="bg-[#111827] text-white">
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-12 pb-16">
          {/* Left Column - Company Info */}
          <div className="lg:col-span-5">
            <h3 className="text-lg font-semibold h-[24px] mb-6 pb-3 border-b border-orange-500/20">{business.name}</h3>
            {business.logo && (
              <Link href="/" className="block">
                <div className="relative w-48 h-20">
                  <Image 
                    src={business.logo} 
                    alt={business.name} 
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </Link>
            )}
            <div className="space-y-6 mt-8">
              <div>
                {business.tagline && (
                  <p className="mt-2 text-gray-400 italic">{business.tagline}</p>
                )}
              </div>
              <div className="space-y-4">
                <div className="flex items-start">
                  <FaMapMarkerAlt className="w-5 h-5 mt-1 text-orange-500 shrink-0" />
                  <span className="ml-3 text-gray-300 hover:text-gray-200 transition-colors">{business.address}</span>
                </div>
                <a href={`tel:${business.phone}`} className="flex items-center group hover:translate-x-1 transition-transform">
                  <FaPhone className="w-5 h-5 text-orange-500 shrink-0" />
                  <span className="ml-3 text-gray-300 group-hover:text-white transition-colors">{business.phone}</span>
                </a>
                <a href={`mailto:${business.email}`} className="flex items-center group hover:translate-x-1 transition-transform">
                  <FaEnvelope className="w-5 h-5 text-orange-500 shrink-0" />
                  <span className="ml-3 text-gray-300 group-hover:text-white transition-colors">{business.email}</span>
                </a>
                {content.contact?.hours && (
                  <div className="flex items-start">
                    <FaClock className="w-5 h-5 mt-1 text-orange-500 shrink-0" />
                    <span className="ml-3 text-gray-300 hover:text-gray-200 transition-colors">{content.contact.hours}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Middle Column - Quick Links */}
          <div className="lg:col-span-3">
            <h3 className="text-lg font-semibold h-[24px] mb-6 pb-3 border-b border-orange-500/20">Quick Links</h3>
            <ul className="space-y-3">
              {(content.header?.menuItems || []).map((item) => (
                <li key={item.text}>
                  <Link 
                    href={item.link}
                    className="text-gray-300 hover:text-white transition-all flex items-center group hover:translate-x-1"
                  >
                    <span className="w-1 h-1 bg-orange-500 rounded-full mr-2 transition-all duration-200 group-hover:w-2" />
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column - Business Info */}
          <div className="lg:col-span-4">
            <h3 className="text-lg font-semibold h-[24px] mb-6 pb-3 border-b border-orange-500/20">Business Information</h3>
            <div className="space-y-6">
              {content.header?.businessHours && (
                <div className="space-y-2">
                  <h4 className="text-white font-medium flex items-center">
                    <span className="w-1 h-1 bg-orange-500 rounded-full mr-2" />
                    Opening Hours
                  </h4>
                  <p className="text-gray-300 pl-3">{content.header.businessHours}</p>
                </div>
              )}
              {content.header?.insuranceText && (
                <div className="space-y-2">
                  <h4 className="text-white font-medium flex items-center">
                    <span className="w-1 h-1 bg-orange-500 rounded-full mr-2" />
                    Insurance
                  </h4>
                  <p className="text-gray-300 pl-3">{content.header.insuranceText}</p>
                </div>
              )}
              {content.header?.experienceText && (
                <div className="space-y-2">
                  <h4 className="text-white font-medium flex items-center">
                    <span className="w-1 h-1 bg-orange-500 rounded-full mr-2" />
                    Experience
                  </h4>
                  <p className="text-gray-300 pl-3">{content.header.experienceText}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Badges Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-10 border-t border-gray-800">
          <a 
            href="https://www.localroofernearme.co.uk"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center p-4 bg-gray-900/50 rounded-lg hover:bg-gray-800/50 transition-all duration-300 group hover:translate-y-[-2px]"
          >
            <div className="h-12 w-12 bg-white/10 rounded-md p-2 flex-shrink-0 group-hover:bg-white/20 transition-colors duration-300">
              <Image 
                src="https://www.localroofernearme.co.uk/Roofer%20Near%20Me-2.png"
                alt="Local Roofer Near Me Directory"
                width={32}
                height={32}
                className="w-full h-full object-contain opacity-90"
              />
            </div>
            <div className="ml-4">
              <div className="font-medium">Verified Member</div>
              <div className="text-sm text-gray-400">Local Roofer Near Me Directory</div>
            </div>
          </a>

          <a 
            href="https://www.saunder-simmons.co.uk"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center p-4 bg-gray-900/50 rounded-lg hover:bg-gray-800/50 transition-all duration-300 group hover:translate-y-[-2px]"
          >
            <div className="h-12 w-12 bg-white/10 rounded-md p-2 flex-shrink-0 group-hover:bg-white/20 transition-colors duration-300">
              <Image 
                src="/images/logo/saunders_simmons_ltd.png"
                alt="Saunders Simmons Ltd"
                width={32}
                height={32}
                className="w-full h-full object-contain opacity-90"
              />
            </div>
            <div className="ml-4">
              <div className="font-medium">Designed & Developed By</div>
              <div className="text-sm text-gray-400">Saunders Simmons Ltd</div>
            </div>
          </a>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">© {new Date().getFullYear()} {business.name}. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link 
                href="/privacy-policy"
                className="text-sm text-gray-400 hover:text-white transition-colors hover:translate-x-1 inline-block"
              >
                Privacy Policy
              </Link>
              <Link 
                href="/terms"
                className="text-sm text-gray-400 hover:text-white transition-colors hover:translate-x-1 inline-block"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 