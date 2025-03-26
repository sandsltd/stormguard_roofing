'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { BusinessContent } from '@/utils/content';

interface FooterProps {
  business: BusinessContent;
  socials: {
    facebook: string;
    twitter: string;
    instagram: string;
    linkedin: string;
  };
  theme?: {
    footer?: {
      backgroundColor?: string;
      textColor?: string;
      linkColor?: string;
      linkHoverColor?: string;
      iconColor?: string;
      borderColor?: string;
    };
  };
}

export default function Footer({ business, socials, theme }: FooterProps) {
  const footerStyle = {
    backgroundColor: theme?.footer?.backgroundColor || '#1F2937',
    color: theme?.footer?.textColor || '#ffffff',
  };

  const linkStyle = {
    color: theme?.footer?.linkColor || '#60A5FA',
  };

  const linkHoverStyle = {
    color: theme?.footer?.linkHoverColor || '#93C5FD',
  };

  const iconStyle = {
    color: theme?.footer?.iconColor || '#60A5FA',
  };

  const borderStyle = {
    borderColor: theme?.footer?.borderColor || '#374151',
  };

  return (
    <footer style={footerStyle}>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Business Info */}
          <div className="col-span-1">
            <Link href="/" className="flex items-center space-x-3 mb-6">
              {business.logo && (
                <div className="relative w-16 h-16 overflow-hidden">
                  <Image 
                    src={business.logo} 
                    alt={business.name} 
                    fill
                    className="object-contain"
                  />
                </div>
              )}
              <div className="flex flex-col">
                <span className="text-xl font-bold">{business.name}</span>
                {business.tagline && (
                  <span className="text-sm opacity-80">{business.tagline}</span>
                )}
              </div>
            </Link>
            <div className="space-y-2">
              <p>{business.address}</p>
              <p>Phone: {business.phone}</p>
              <p>Email: {business.email}</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'About', 'Services', 'Contact'].map((item) => (
                <li key={item}>
                  <Link 
                    href={`/${item.toLowerCase()}`}
                    className="transition-colors duration-200"
                    style={linkStyle}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = theme?.footer?.linkHoverColor || '#93C5FD';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = theme?.footer?.linkColor || '#60A5FA';
                    }}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              {['Residential', 'Commercial', 'Emergency', 'Maintenance'].map((service) => (
                <li key={service}>
                  <Link 
                    href={`/services#${service.toLowerCase()}`}
                    className="transition-colors duration-200"
                    style={linkStyle}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = theme?.footer?.linkHoverColor || '#93C5FD';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = theme?.footer?.linkColor || '#60A5FA';
                    }}
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              {socials.facebook && (
                <a
                  href={socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-200"
                  style={iconStyle}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = theme?.footer?.linkHoverColor || '#93C5FD';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = theme?.footer?.iconColor || '#60A5FA';
                  }}
                >
                  <FaFacebook className="w-6 h-6" />
                </a>
              )}
              {socials.twitter && (
                <a
                  href={socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-200"
                  style={iconStyle}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = theme?.footer?.linkHoverColor || '#93C5FD';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = theme?.footer?.iconColor || '#60A5FA';
                  }}
                >
                  <FaTwitter className="w-6 h-6" />
                </a>
              )}
              {socials.instagram && (
                <a
                  href={socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-200"
                  style={iconStyle}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = theme?.footer?.linkHoverColor || '#93C5FD';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = theme?.footer?.iconColor || '#60A5FA';
                  }}
                >
                  <FaInstagram className="w-6 h-6" />
                </a>
              )}
              {socials.linkedin && (
                <a
                  href={socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-200"
                  style={iconStyle}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = theme?.footer?.linkHoverColor || '#93C5FD';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = theme?.footer?.iconColor || '#60A5FA';
                  }}
                >
                  <FaLinkedin className="w-6 h-6" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Badges Section */}
        <div className="mt-16 mb-10 relative">
          {/* Background glow effect */}
          <div className="absolute inset-0 bg-blue-600/10 blur-3xl rounded-full transform -translate-y-1/2 opacity-30 pointer-events-none"></div>
          
          <h3 className="text-center font-semibold mb-10 relative" style={{ color: theme?.footer?.textColor || '#ffffff' }}>
            <span className="relative text-xl tracking-wide inline-block after:content-[''] after:absolute after:w-[140%] after:h-[1px] after:bg-gradient-to-r after:from-transparent after:via-blue-500/70 after:to-transparent after:-bottom-4 after:left-1/2 after:-translate-x-1/2">
              TRUSTED PARTNERS
            </span>
          </h3>
          
          <div className="flex flex-col md:flex-row justify-center items-center gap-10 md:gap-14 relative z-10">
            {/* Local Roofer Near Me Directory Badge */}
            <a 
              href="https://www.localroofernearme.co.uk" 
              target="_blank" 
              rel="noopener noreferrer"
              className="premium-badge group"
              aria-label="Visit Local Roofer Near Me Directory"
            >
              <div className="badge-inner">
                <div className="badge-logo-wrapper">
                  <img src="https://www.localroofernearme.co.uk/Roofer%20Near%20Me-2.png" alt="Local Roofer Near Me Directory" className="badge-logo" />
                  <div className="badge-logo-glow"></div>
                </div>
                <div className="badge-content">
                  <div className="badge-title">Verified Member</div>
                  <div className="badge-subtitle">Local Roofer Near Me Directory</div>
                </div>
              </div>
              <div className="badge-shine"></div>
            </a>

            {/* Designed and Developed By Badge */}
            <a 
              href="https://www.saunder-simmons.co.uk" 
              target="_blank" 
              rel="noopener noreferrer"
              className="premium-badge group"
              aria-label="Visit Saunders Simmons Ltd"
            >
              <div className="badge-inner">
                <div className="badge-logo-wrapper">
                  <Image 
                    src="/images/logo/saunders_simmons_ltd.png" 
                    alt="Saunders Simmons Ltd" 
                    width={50}
                    height={50}
                    className="badge-logo"
                  />
                  <div className="badge-logo-glow"></div>
                </div>
                <div className="badge-content">
                  <div className="badge-title">Designed & Developed By</div>
                  <div className="badge-subtitle">Saunders Simmons Ltd</div>
                </div>
              </div>
              <div className="badge-shine"></div>
            </a>
          </div>
          
          {/* Badge Styles */}
          <style jsx global>{`
            .premium-badge {
              position: relative;
              display: block;
              padding: 24px 28px;
              width: 330px;
              background: rgba(255, 255, 255, 0.03);
              backdrop-filter: blur(20px);
              border: 1px solid rgba(255, 255, 255, 0.07);
              box-shadow: 
                0 20px 50px rgba(0, 0, 0, 0.3),
                0 5px 15px rgba(0, 0, 0, 0.22),
                inset 0 1px 1px rgba(255, 255, 255, 0.08);
              border-radius: 16px;
              transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
              text-decoration: none;
              overflow: hidden;
            }
            
            .premium-badge:hover {
              transform: translateY(-7px) scale(1.02);
              box-shadow: 
                0 25px 60px rgba(0, 0, 0, 0.35),
                0 8px 25px rgba(0, 0, 0, 0.28),
                inset 0 1px 1px rgba(255, 255, 255, 0.1);
              background: rgba(255, 255, 255, 0.05);
              border-color: rgba(255, 255, 255, 0.12);
            }
            
            .badge-inner {
              display: flex;
              align-items: center;
              gap: 18px;
              position: relative;
              z-index: 1;
            }
            
            .badge-logo-wrapper {
              position: relative;
              width: 56px;
              height: 56px;
              display: flex;
              align-items: center;
              justify-content: center;
              background: white;
              border-radius: 12px;
              padding: 10px;
              box-shadow: 
                0 8px 16px rgba(0, 0, 0, 0.18),
                0 2px 5px rgba(0, 0, 0, 0.15),
                inset 0 -1px 2px rgba(0, 0, 0, 0.05);
              transition: all 0.4s ease;
              overflow: hidden;
            }
            
            .badge-logo-glow {
              position: absolute;
              inset: 0;
              background: radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.3), transparent 70%);
              opacity: 0;
              transition: opacity 0.5s ease;
            }
            
            .premium-badge:hover .badge-logo-wrapper {
              transform: scale(1.08);
              box-shadow: 
                0 12px 24px rgba(0, 0, 0, 0.22),
                0 4px 8px rgba(0, 0, 0, 0.18),
                inset 0 -1px 2px rgba(0, 0, 0, 0.05);
            }
            
            .premium-badge:hover .badge-logo-glow {
              opacity: 1;
            }
            
            .badge-logo {
              width: 100%;
              height: 100%;
              object-fit: contain;
              filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
              position: relative;
              z-index: 1;
            }
            
            .badge-content {
              display: flex;
              flex-direction: column;
              gap: 5px;
            }
            
            .badge-title {
              color: white;
              font-size: 16px;
              font-weight: 600;
              letter-spacing: 0.03em;
              transition: color 0.4s ease, text-shadow 0.4s ease;
            }
            
            .premium-badge:hover .badge-title {
              color: #60A5FA;
              text-shadow: 0 0 15px rgba(96, 165, 250, 0.5);
            }
            
            .badge-subtitle {
              color: rgba(255, 255, 255, 0.65);
              font-size: 14px;
              font-weight: 400;
              letter-spacing: 0.02em;
              transition: color 0.4s ease;
            }
            
            .premium-badge:hover .badge-subtitle {
              color: rgba(255, 255, 255, 0.8);
            }
            
            .badge-shine {
              position: absolute;
              top: 0;
              left: -100%;
              width: 50%;
              height: 100%;
              background: linear-gradient(
                90deg,
                transparent,
                rgba(255, 255, 255, 0.1),
                transparent
              );
              transform: skewX(-15deg);
              transition: 0.2s;
              pointer-events: none;
            }
            
            .premium-badge:hover .badge-shine {
              animation: shine 1.5s ease-in-out;
              animation-fill-mode: forwards;
            }
            
            @keyframes shine {
              100% {
                left: 200%;
              }
            }
          `}</style>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t" style={borderStyle}>
          <p className="text-center text-sm">
            © {new Date().getFullYear()} {business.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 