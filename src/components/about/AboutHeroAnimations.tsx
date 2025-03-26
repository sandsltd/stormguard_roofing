'use client';

import React from 'react';

/**
 * Client component to handle the animations for the About page hero section
 */
export default function AboutHeroAnimations() {
  return (
    <style jsx global>{`
      @keyframes pulse-slow {
        0%, 100% { opacity: 0.4; }
        50% { opacity: 0.7; }
      }
      
      @keyframes fade-in-up {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      .animate-pulse-slow {
        animation: pulse-slow 6s ease-in-out infinite;
      }
      
      .animate-fade-in-up {
        animation: fade-in-up 0.8s ease-out forwards;
        opacity: 0;
      }
      
      .animation-delay-300 {
        animation-delay: 300ms;
      }
      
      .animation-delay-600 {
        animation-delay: 600ms;
      }
      
      .animation-delay-900 {
        animation-delay: 900ms;
      }
      
      .animation-delay-1200 {
        animation-delay: 1200ms;
      }
      
      .animation-delay-2000 {
        animation-delay: 2000ms;
      }
    `}</style>
  );
} 