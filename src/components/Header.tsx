'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { BusinessContent } from '@/utils/content';
import { FaPhone } from 'react-icons/fa';

interface HeaderProps {
  business: BusinessContent;
  theme?: {
    header?: {
      backgroundColor?: string;
      textColor?: string;
      linkColor?: string;
      linkHoverColor?: string;
      iconColor?: string;
    };
  };
}

export default function Header({ business, theme }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const headerStyle = {
    backgroundColor: theme?.header?.backgroundColor || '#ffffff',
    color: theme?.header?.textColor || '#000000',
  };

  const linkStyle = {
    color: theme?.header?.linkColor || '#4B5563',
  };

  const linkHoverStyle = {
    color: theme?.header?.linkHoverColor || '#1F2937',
  };

  const iconStyle = {
    color: theme?.header?.iconColor || '#4B5563',
  };

  return (
    <header style={headerStyle} className="shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          {business.logo && (
            <Image 
              src={business.logo} 
              alt={business.name} 
              width={50} 
              height={50} 
              className="h-10 w-auto"
            />
          )}
          <span className="text-xl font-bold" style={{ color: theme?.header?.textColor || '#000000' }}>
            {business.name}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          {['Home', 'About', 'Services', 'Contact'].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className="font-medium transition-colors duration-200"
              style={linkStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = theme?.header?.linkHoverColor || '#1F2937';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = theme?.header?.linkColor || '#4B5563';
              }}
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* Contact Info */}
        <div className="hidden md:flex items-center space-x-2">
          <FaPhone style={iconStyle} className="text-lg" />
          <a href={`tel:${business.phone}`} className="font-medium" style={linkStyle}>
            {business.phone}
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={linkStyle}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden py-2 px-4 shadow-inner" style={{ backgroundColor: theme?.header?.backgroundColor || '#ffffff' }}>
          <nav className="flex flex-col space-y-3">
            {['Home', 'About', 'Services', 'Contact'].map((item) => (
              <Link 
                key={item}
                href={`/${item.toLowerCase()}`}
                className="font-medium py-2 transition-colors duration-200"
                style={linkStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = theme?.header?.linkHoverColor || '#1F2937';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = theme?.header?.linkColor || '#4B5563';
                }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
          </nav>
          <div className="mt-4 py-2 border-t" style={{ borderColor: theme?.header?.linkColor || '#4B5563' }}>
            <a href={`tel:${business.phone}`} className="font-medium block py-2 flex items-center space-x-2" style={linkStyle}>
              <FaPhone style={iconStyle} className="text-lg" />
              <span>{business.phone}</span>
            </a>
            <a href={`mailto:${business.email}`} className="font-medium block py-2" style={linkStyle}>
              {business.email}
            </a>
          </div>
        </div>
      )}
    </header>
  );
} 