'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { Content } from '@/utils/content';
import { FaPhone, FaClock, FaShieldAlt, FaStar, FaEnvelope } from 'react-icons/fa';

interface MenuItem {
  text: string;
  link: string;
}

interface HeaderProps {
  content: Content;
}

export default function Header({ content }: HeaderProps) {
  const { business, theme, header } = content;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState('up');
  const [lastScrollY, setLastScrollY] = useState(0);
  const headerRef = useRef<HTMLDivElement>(null);

  const defaultMenuItems: MenuItem[] = [
    { text: 'Home', link: '/' },
    { text: 'About', link: '/about' },
    { text: 'Services', link: '/services' },
    { text: 'Contact', link: '/contact' }
  ];

  const menuItems = header?.menuItems || defaultMenuItems;
  const showTopBar = header?.showTopBar !== false;
  const showCTA = header?.ctaButton?.show !== false;
  const ctaText = header?.ctaButton?.text || 'Get a Free Quote';
  const ctaLink = header?.ctaButton?.link || '/contact';

  // Close mobile menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle scroll behavior
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
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Close mobile menu on window resize (when switching to desktop)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

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
    <div className="fixed w-full top-0 z-50" ref={headerRef}>
      {/* Top Bar - Mobile Version (Only shows the phone number) */}
      {showTopBar && (
        <div style={topBarStyle} className="block md:hidden h-10 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="flex justify-center items-center h-10">
              <a 
                href={`tel:${business.phone}`}
                className="text-sm hover:opacity-80 transition-opacity flex items-center"
                style={topBarLinkStyle}
              >
                <FaPhone style={topBarIconStyle} className="text-sm mr-2" />
                {business.phone}
              </a>
            </div>
          </div>
        </div>
      )}
      
      {/* Top Bar - Desktop Version */}
      {showTopBar && (
        <div style={topBarStyle} className="hidden md:block h-10 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center h-10">
              <div className="flex items-center space-x-4 lg:space-x-6">
                <div className="flex items-center space-x-2">
                  <FaClock style={topBarIconStyle} className="text-sm" />
                  <span className="text-sm whitespace-nowrap">{header?.businessHours || "Mon-Fri: 8am-6pm"}</span>
                </div>
                <div className="hidden lg:flex items-center space-x-2">
                  <FaShieldAlt style={topBarIconStyle} className="text-sm" />
                  <span className="text-sm whitespace-nowrap">{header?.insuranceText || "Fully Insured"}</span>
                </div>
                <div className="hidden lg:flex items-center space-x-2">
                  <FaStar style={topBarIconStyle} className="text-sm" />
                  <span className="text-sm whitespace-nowrap">{header?.experienceText || "5+ Years Experience"}</span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <FaPhone style={topBarIconStyle} className="text-sm" />
                  <a 
                    href={`tel:${business.phone}`}
                    className="text-sm hover:opacity-80 transition-opacity whitespace-nowrap"
                    style={topBarLinkStyle}
                  >
                    {business.phone}
                  </a>
                </div>
                <div className="hidden md:flex items-center space-x-2">
                  <FaEnvelope style={topBarIconStyle} className="text-sm" />
                  <a 
                    href={`mailto:${business.email}`}
                    className="text-sm hover:opacity-80 transition-opacity whitespace-nowrap"
                    style={topBarLinkStyle}
                  >
                    {business.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Header */}
      <header style={headerStyle} className="w-full bg-white absolute transition-all duration-300">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16 md:h-20 lg:h-24">
            {/* Logo and Business Name */}
            <Link href="/" className="flex items-center space-x-2 md:space-x-3 group">
              {business.logo && (
                <div className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 overflow-hidden">
                  <Image 
                    src={business.logo} 
                    alt={business.name} 
                    fill
                    className="object-contain transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 40px, (max-width: 768px) 48px, (max-width: 1024px) 56px, 64px"
                    priority
                  />
                </div>
              )}
              <div className="flex flex-col">
                <span 
                  className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight truncate max-w-[150px] sm:max-w-[200px] md:max-w-none"
                  style={linkStyle}
                >
                  {business.name}
                </span>
                {business.tagline && (
                  <span 
                    className="text-xs sm:text-sm text-gray-600 hidden sm:block"
                    style={{ color: theme?.header?.linkColor || '#4B5563' }}
                  >
                    {business.tagline}
                  </span>
                )}
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
              <nav className="flex items-center space-x-4 lg:space-x-6">
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
                  className="inline-flex items-center px-4 lg:px-6 py-2 lg:py-3 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:opacity-90 whitespace-nowrap"
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
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu - Full Screen Overlay */}
        <div 
          className={`md:hidden fixed inset-0 bg-white z-50 transition-transform duration-300 ease-in-out ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          } pt-16`}
          style={{ top: showTopBar ? '50px' : '0' }}
        >
          <div className="px-4 py-6 h-full overflow-y-auto">
            <nav className="flex flex-col space-y-6">
              {menuItems.map((item) => (
                <Link 
                  key={item.text}
                  href={item.link}
                  className="font-medium text-lg py-2 border-b border-gray-100 flex justify-between items-center"
                  style={linkStyle}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.text}
                  <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </Link>
              ))}
            </nav>
            
            <div className="mt-8 space-y-6">
              <div className="flex flex-col space-y-4 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-900">Contact Us</h3>
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <FaPhone style={iconStyle} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <a 
                      href={`tel:${business.phone}`}
                      className="text-base font-medium"
                      style={linkStyle}
                    >
                      {business.phone}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <FaEnvelope style={iconStyle} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <a 
                      href={`mailto:${business.email}`}
                      className="text-base font-medium"
                      style={linkStyle}
                    >
                      {business.email}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <FaClock style={iconStyle} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Hours</p>
                    <p className="text-base font-medium" style={linkStyle}>
                      {header?.businessHours || "Mon-Fri: 8am-6pm"}
                    </p>
                  </div>
                </div>
              </div>
              
              {showCTA && (
                <Link
                  href={ctaLink}
                  className="inline-flex items-center justify-center w-full px-6 py-4 rounded-lg text-base font-medium text-white transition-all duration-200 hover:opacity-90"
                  style={{ backgroundColor: theme?.primaryColor || theme?.header?.backgroundColor || '#1e2756' }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {ctaText}
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
} 