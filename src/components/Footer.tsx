'use client';

import Link from 'next/link';
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
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
                  <FaFacebook size={24} />
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
                  <FaTwitter size={24} />
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
                  <FaInstagram size={24} />
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
                  <FaLinkedin size={24} />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t" style={borderStyle}>
          <p className="text-center">&copy; {new Date().getFullYear()} {business.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 