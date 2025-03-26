'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { BusinessContent } from '@/utils/content';

interface HeaderProps {
  business: BusinessContent;
}

export default function Header({ business }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md">
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
          <span className="text-xl font-bold text-gray-800">{business.name}</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          <Link href="/" className="text-gray-600 hover:text-blue-600 font-medium">
            Home
          </Link>
          <Link href="/about" className="text-gray-600 hover:text-blue-600 font-medium">
            About
          </Link>
          <Link href="/services" className="text-gray-600 hover:text-blue-600 font-medium">
            Services
          </Link>
          <Link href="/contact" className="text-gray-600 hover:text-blue-600 font-medium">
            Contact
          </Link>
        </nav>

        {/* Contact Info */}
        <div className="hidden md:block">
          <a href={`tel:${business.phone}`} className="text-gray-700 font-medium">
            {business.phone}
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-500 focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
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
        <div className="md:hidden bg-white py-2 px-4 shadow-inner">
          <nav className="flex flex-col space-y-3">
            <Link 
              href="/" 
              className="text-gray-600 hover:text-blue-600 font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/about" 
              className="text-gray-600 hover:text-blue-600 font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              href="/services" 
              className="text-gray-600 hover:text-blue-600 font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Services
            </Link>
            <Link 
              href="/contact" 
              className="text-gray-600 hover:text-blue-600 font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </nav>
          <div className="mt-4 py-2 border-t border-gray-200">
            <a href={`tel:${business.phone}`} className="text-gray-700 font-medium block py-2">
              {business.phone}
            </a>
            <a href={`mailto:${business.email}`} className="text-gray-700 font-medium block py-2">
              {business.email}
            </a>
          </div>
        </div>
      )}
    </header>
  );
} 