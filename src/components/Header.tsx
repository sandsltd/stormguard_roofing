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
    backgroundColor: '#000000',
    borderBottom: '1px solid #222222',
    boxShadow: isScrolled ? '0 2px 4px rgba(0,0,0,0.2)' : 'none',
    transition: 'all 0.3s ease-in-out',
    top: scrollDirection === 'down' && isScrolled && showTopBar ? '0' : (showTopBar ? '40px' : '0'),
  };

  const linkStyle = {
    color: theme?.header?.linkColor || '#ffffff',
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
                <a
                  href="https://maps.app.goo.gl/AFW2kdwb8TBt2Rfr9"
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="hidden lg:flex items-center space-x-2 hover:opacity-80 transition-opacity"
                >
                  <div className="flex text-yellow-400">
                    <FaStar size={12} />
                    <FaStar size={12} />
                    <FaStar size={12} />
                    <FaStar size={12} />
                    <FaStar size={12} />
                  </div>
                  <span className="text-sm whitespace-nowrap">5.0 on Google</span>
                </a>
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
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Header */}
      <header style={headerStyle} className="w-full bg-white absolute transition-all duration-300">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16 md:h-20 lg:h-24">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 relative">
              <Image
                src="/images/logo/logo.png"
                alt="Storm Guard Roofing"
                width={200}
                height={60}
                className="w-[150px] sm:w-[180px] md:w-[200px] h-auto object-contain max-h-[60px] md:max-h-[80px]"
                priority
              />
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
                  className="inline-flex items-center px-4 lg:px-6 py-2.5 lg:py-3.5 rounded-lg text-sm lg:text-base font-bold text-white transition-all duration-300 hover:opacity-100 transform hover:scale-105 hover:-translate-y-0.5 shadow-xl whitespace-nowrap"
                  style={{ 
                    backgroundColor: 'rgb(239, 68, 68)',
                    boxShadow: '0 8px 20px -3px rgba(239, 68, 68, 0.5), 0 0 15px -3px rgba(239, 68, 68, 0.4)'
                  }}
                >
                  <span className="relative z-10 flex items-center">
                    {ctaText}
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
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
            {/* Close button */}
            <button
              className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              <svg className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <nav className="flex flex-col space-y-6">
              {menuItems.map((item) => (
                <Link 
                  key={item.text}
                  href={item.link}
                  className="font-medium text-lg py-2 border-b border-gray-100 flex justify-between items-center"
                  style={{ color: '#000000' }}
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
                      style={{ color: '#000000' }}
                    >
                      {business.phone}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <FaClock style={iconStyle} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Hours</p>
                    <p className="text-base font-medium" style={{ color: '#000000' }}>
                      {header?.businessHours || "Mon-Fri: 8am-6pm"}
                    </p>
                  </div>
                </div>
              </div>
              
              {showCTA && (
                <Link
                  href={ctaLink}
                  className="inline-flex items-center justify-center w-full px-6 py-4 rounded-lg text-base font-bold text-white transition-all duration-300 hover:opacity-100 transform hover:scale-105 shadow-xl"
                  style={{ 
                    backgroundColor: 'rgb(239, 68, 68)',
                    boxShadow: '0 8px 20px -3px rgba(239, 68, 68, 0.5), 0 0 15px -3px rgba(239, 68, 68, 0.4)'
                  }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="relative z-10 flex items-center">
                    {ctaText}
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
} 