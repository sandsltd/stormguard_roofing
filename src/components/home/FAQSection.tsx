'use client';

import { useState } from 'react';
import { Content } from '@/utils/content';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  content: Content;
}

export default function FAQSection({ content }: FAQSectionProps) {
  // Track which FAQ items are expanded
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  // Use primary color from theme or default to indigo
  const primaryColor = content.theme?.primaryColor || '#4f46e5';
  
  // Initialize faqSection with default values if it doesn't exist
  const faqSection = content.homepage.faqSection || {
    title: "Frequently Asked Questions",
    description: "Find answers to common questions about our roofing services and solutions."
  };

  // Default FAQs if none exist
  const defaultFaqs: FAQItem[] = [
    {
      question: "How long does a typical roof installation take?",
      answer: "The duration of a roof installation depends on several factors including the size and complexity of your roof, the materials used, and weather conditions. For most residential properties, a complete roof installation typically takes 1-3 days. For larger or more complex roofs, it may take up to a week. We always provide a specific timeframe estimate before starting your project."
    },
    {
      question: "Do you offer emergency roof repair services?",
      answer: "Yes, we offer emergency roof repair services for situations that require immediate attention, such as storm damage or leaks that are causing damage to your property. Our emergency team is available to respond quickly to protect your home from further damage. Please contact our emergency line for immediate assistance."
    },
    {
      question: "What roofing materials do you recommend for Cannock homes?",
      answer: "For homes in Cannock, we typically recommend materials that can withstand the local weather conditions, which include frequent rainfall and occasional strong winds. Clay and concrete tiles are popular options as they're durable and complement the architectural styles in the area. We also offer high-quality slate options, which provide excellent longevity and a classic appearance. For flat roofs, we recommend modern EPDM or GRP fiberglass systems that provide superior waterproofing. During our free consultation, we'll assess your specific needs and recommend the most suitable materials for your Cannock property.",
    },
    {
      question: "How often should I have my roof inspected?",
      answer: "We recommend having your roof professionally inspected at least once every 1-2 years. Additionally, you should consider an inspection after major weather events such as strong storms or heavy snowfall. Regular inspections help catch minor issues before they become major problems, potentially saving you significant repair costs in the long run."
    },
    {
      question: "Do you provide warranties on your roofing work?",
      answer: "Yes, we stand behind our quality workmanship and materials. We offer a comprehensive warranty on all our roofing installations and repairs. Our standard workmanship warranty covers a period of 10 years, while material warranties vary depending on the products used, typically ranging from 25-50 years. We'll provide you with detailed warranty information specific to your project before work begins."
    }
  ];

  const faqs = content.homepage.faqs || defaultFaqs;

  // Toggle expanded state for FAQ items
  const toggleItem = (index: number) => {
    setExpandedItems(prev => {
      if (prev.includes(index)) {
        return prev.filter(i => i !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  // Custom focus ring style using the theme color
  const focusRingStyle = {
    '--ring-color': `${primaryColor}50`,
    '--ring-offset-color': primaryColor
  } as React.CSSProperties;

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{faqSection.title}</h2>
          <p className="text-lg text-gray-600">{faqSection.description}</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-200"
            >
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                onClick={() => toggleItem(index)}
                aria-expanded={expandedItems.includes(index)}
                aria-controls={`faq-answer-${index}`}
                style={focusRingStyle}
              >
                <span className="text-lg font-medium text-gray-900">{faq.question}</span>
                <span style={{ color: primaryColor }} className="ml-4">
                  {expandedItems.includes(index) ? (
                    <FaChevronUp className="h-5 w-5" />
                  ) : (
                    <FaChevronDown className="h-5 w-5" />
                  )}
                </span>
              </button>
              
              <div 
                id={`faq-answer-${index}`}
                className={`px-6 transition-all duration-300 ease-in-out overflow-hidden ${
                  expandedItems.includes(index) 
                    ? 'max-h-96 pb-4 opacity-100' 
                    : 'max-h-0 pb-0 opacity-0'
                }`}
              >
                <p className="text-gray-600 whitespace-pre-line">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 