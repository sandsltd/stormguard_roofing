'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { BusinessContent } from '@/utils/content';
import { FaPhone, FaClock, FaShieldAlt, FaStar } from 'react-icons/fa';

interface MenuItem {
  text: string;
  link: string;
}

interface HeaderProps {
  business: BusinessContent;
  theme?: {
    primaryColor?: string;
    secondaryColor?: string;
    header?: {
      backgroundColor?: string;
      textColor?: string;
      linkColor?: string;
      linkHoverColor?: string;
      iconColor?: string;
    };
  };
  header?: {
    businessHours?: string;
    insuranceText?: string;
    experienceText?: string;
    showTopBar?: boolean;
    menuItems?: MenuItem[];
    ctaButton?: {
      text?: string;
      link?: string;
      show?: boolean;
    };
  };
}

export default function Header({ business, theme, header }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState('up');
  const [lastScrollY, setLastScrollY] = useState(0);

  const defaultMenuItems: MenuItem[] = [
    { text: 'Home', link: '/' },
    { text: 'About', link: '/about' },
    { text: 'Services', link: '/services' },
    { text: 'Areas', link: '/areas' },
    { text: 'Blog', link: '/blog' },
    { text: 'FAQ', link: '/faq' },
    { text: 'Contact', link: '/contact' }
  ];

  const menuItems = header?.menuItems || defaultMenuItems;
  const showTopBar = header?.showTopBar !== false;
  const showCTA = header?.ctaButton?.show !== false;
  const ctaText = header?.ctaButton?.text || 'Get a Free Quote';
  const ctaLink = header?.ctaButton?.link || '/quote';

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determine scroll direction
      if (currentScrollY > lastScrollY) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }
      
      setLastScrollY(currentScrollY);
      setIsScrolled(currentScrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const topBarStyle = {
    backgroundColor: theme?.header?.backgroundColor || '#1e2756',
    color: theme?.header?.textColor || '#ffffff',
    transform: scrollDirection === 'down' && isScrolled ? 'translateY(-100%)' : 'translateY(0)',
    transition: 'all 0.3s ease-in-out',
  };

  const headerStyle = {
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #e5e7eb',
    boxShadow: isScrolled ? '0 2px 4px rgba(0,0,0,0.1)' : 'none',
    transition: 'all 0.3s ease-in-out',
    top: scrollDirection === 'down' && isScrolled && showTopBar ? '0' : (showTopBar ? '40px' : '0'),
  };

  const linkStyle = {
    color: theme?.header?.linkColor || '#1e2756',
    transition: 'all 0.2s ease-in-out',
  };

  const topBarLinkStyle = {
    color: theme?.header?.textColor || '#ffffff',
    transition: 'all 0.2s ease-in-out',
  };

  const iconStyle = {
    color: theme?.header?.iconColor || '#4B5563',
  };

  const topBarIconStyle = {
    color: theme?.header?.textColor || '#ffffff',
  };

  return (
    <div className="fixed w-full top-0 z-50">
      {/* Top Bar */}
      {showTopBar && (
        <div style={topBarStyle} className="hidden md:block h-10 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center h-10">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <FaClock style={topBarIconStyle} className="text-sm" />
                  <span className="text-sm">{header?.businessHours || "Mon-Fri: 8am-6pm"}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaShieldAlt style={topBarIconStyle} className="text-sm" />
                  <span className="text-sm">{header?.insuranceText || "Fully Insured"}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaStar style={topBarIconStyle} className="text-sm" />
                  <span className="text-sm">{header?.experienceText || "5+ Years Experience"}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <FaPhone style={topBarIconStyle} className="text-sm" />
                <a 
                  href={`tel:${business.phone}`}
                  className="text-sm hover:opacity-80 transition-opacity"
                  style={topBarLinkStyle}
                >
                  {business.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Header */}
      <header style={headerStyle} className="w-full bg-white absolute transition-all duration-300">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-24">
            {/* Logo and Business Name */}
            <Link href="/" className="flex items-center space-x-3 group">
              {business.logo && (
                <div className="relative w-16 h-16 overflow-hidden">
                  <Image 
                    src={business.logo} 
                    alt={business.name} 
                    fill
                    className="object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              )}
              <div className="flex flex-col">
                <span 
                  className="text-2xl font-bold tracking-tight"
                  style={linkStyle}
                >
                  {business.name}
                </span>
                {business.tagline && (
                  <span 
                    className="text-sm text-gray-600"
                    style={{ color: theme?.header?.linkColor || '#4B5563' }}
                  >
                    {business.tagline}
                  </span>
                )}
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <nav className="flex items-center space-x-6">
                {menuItems.map((item) => (
                  <Link
                    key={item.text}
                    href={item.link}
                    className="relative font-medium text-sm tracking-wide py-2"
                    style={linkStyle}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = theme?.header?.linkHoverColor || '#3b82f6';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = theme?.header?.linkColor || '#1e2756';
                    }}
                  >
                    {item.text}
                    <span 
                      className="absolute bottom-0 left-0 w-full h-0.5 transition-all duration-300 transform scale-x-0 group-hover:scale-x-100"
                      style={{ backgroundColor: theme?.header?.linkHoverColor || '#3b82f6' }}
                    />
                  </Link>
                ))}
              </nav>
              {showCTA && (
                <Link
                  href={ctaLink}
                  className="inline-flex items-center px-6 py-3 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:opacity-90"
                  style={{ backgroundColor: theme?.primaryColor || theme?.header?.backgroundColor || '#1e2756' }}
                >
                  {ctaText}
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden focus:outline-none p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
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
        </div>

        {/* Mobile Menu */}
        <div 
          className={`md:hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          } overflow-hidden bg-white`}
        >
          <div className="px-4 py-4 space-y-4 border-t">
            <nav className="flex flex-col space-y-3">
              {menuItems.map((item) => (
                <Link 
                  key={item.text}
                  href={item.link}
                  className="font-medium text-sm py-2"
                  style={linkStyle}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = theme?.header?.linkHoverColor || '#3b82f6';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = theme?.header?.linkColor || '#1e2756';
                  }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.text}
                </Link>
              ))}
            </nav>
            <div className="pt-4 border-t border-gray-200">
              <div className="flex flex-col space-y-3">
                <div className="flex items-center space-x-2">
                  <FaClock style={iconStyle} className="text-sm" />
                  <span className="text-sm">{header?.businessHours || "Mon-Fri: 8am-6pm"}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaPhone style={iconStyle} className="text-sm" />
                  <a 
                    href={`tel:${business.phone}`}
                    className="text-sm"
                    style={linkStyle}
                  >
                    {business.phone}
                  </a>
                </div>
                {showCTA && (
                  <Link
                    href={ctaLink}
                    className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:opacity-90 w-full"
                    style={{ backgroundColor: theme?.primaryColor || theme?.header?.backgroundColor || '#1e2756' }}
                  >
                    {ctaText}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
} 