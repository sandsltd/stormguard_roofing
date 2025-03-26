'use client';

import { useState, useEffect } from 'react';
import { fetchContent, saveContent } from '@/utils/client-content.ts';
import type { Content } from '@/types/content';
import { 
  FaHome, FaTools, FaSearch, FaCalendarAlt, FaCloudRain, 
  FaExclamationCircle, FaBuilding, FaSync, FaShieldAlt, 
  FaPhone, FaLeaf, FaWrench, FaSnowflake, FaBolt, 
  FaWind, FaHardHat, FaRuler, FaStar, FaDollarSign,
  FaChartLine, FaClock
} from 'react-icons/fa';
import { MdApartment, MdRoofing, MdHouse, MdConstruction, MdWaterDrop } from 'react-icons/md';
import { GiHouse, GiWindow, GiCementShoes } from 'react-icons/gi';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import { BsHouseDoor } from 'react-icons/bs';

// Component to render icons for preview
const IconPreview = ({ iconName }: { iconName: string }) => {
  switch (iconName) {
    case 'home': return <FaHome className="inline-block text-blue-600 text-lg" />;
    case 'tools': return <FaTools className="inline-block text-blue-600 text-lg" />;
    case 'search': return <FaSearch className="inline-block text-blue-600 text-lg" />;
    case 'calendar': return <FaCalendarAlt className="inline-block text-blue-600 text-lg" />;
    case 'rain': return <FaCloudRain className="inline-block text-blue-600 text-lg" />;
    case 'alert': return <FaExclamationCircle className="inline-block text-blue-600 text-lg" />;
    case 'office': return <MdApartment className="inline-block text-blue-600 text-lg" />;
    case 'refresh': return <FaSync className="inline-block text-blue-600 text-lg" />;
    case 'building': return <FaBuilding className="inline-block text-blue-600 text-lg" />;
    case 'shield': return <FaShieldAlt className="inline-block text-blue-600 text-lg" />;
    case 'phone': return <FaPhone className="inline-block text-blue-600 text-lg" />;
    case 'leaf': return <FaLeaf className="inline-block text-blue-600 text-lg" />;
    case 'wrench': return <FaWrench className="inline-block text-blue-600 text-lg" />;
    case 'snow': return <FaSnowflake className="inline-block text-blue-600 text-lg" />;
    case 'lightning': return <FaBolt className="inline-block text-blue-600 text-lg" />;
    case 'wind': return <FaWind className="inline-block text-blue-600 text-lg" />;
    case 'hardhat': return <FaHardHat className="inline-block text-blue-600 text-lg" />;
    case 'ruler': return <FaRuler className="inline-block text-blue-600 text-lg" />;
    case 'star': return <FaStar className="inline-block text-blue-600 text-lg" />;
    case 'dollar': return <FaDollarSign className="inline-block text-blue-600 text-lg" />;
    case 'chart': return <FaChartLine className="inline-block text-blue-600 text-lg" />;
    case 'clock': return <FaClock className="inline-block text-blue-600 text-lg" />;
    case 'roofing': return <MdRoofing className="inline-block text-blue-600 text-lg" />;
    case 'house': return <MdHouse className="inline-block text-blue-600 text-lg" />;
    case 'construction': return <MdConstruction className="inline-block text-blue-600 text-lg" />;
    case 'waterdrop': return <MdWaterDrop className="inline-block text-blue-600 text-lg" />;
    case 'housealt': return <GiHouse className="inline-block text-blue-600 text-lg" />;
    case 'window': return <GiWindow className="inline-block text-blue-600 text-lg" />;
    case 'cement': return <GiCementShoes className="inline-block text-blue-600 text-lg" />;
    case 'officealt': return <HiOutlineOfficeBuilding className="inline-block text-blue-600 text-lg" />;
    case 'houseoutline': return <BsHouseDoor className="inline-block text-blue-600 text-lg" />;
    default: return <FaHome className="inline-block text-blue-600 text-lg" />;
  }
};

export default function Admin() {
  const [content, setContent] = useState<Content | null>(null);
  const [activeTab, setActiveTab] = useState('business');
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const data = await fetchContent();
        if (data) {
          setContent(data);
        }
      } catch (error) {
        console.error('Error loading content:', error);
      }
    };
    loadContent();
  }, []);

  const handleContentChange = (path: string, value: any) => {
    setContent(prev => {
      if (!prev) return prev;
      const parts = path.split('.');
      const newContent = { ...prev };
      let current: any = newContent;
      
      // Create nested objects if they don't exist
      for (let i = 0; i < parts.length - 1; i++) {
        if (!current[parts[i]]) {
          current[parts[i]] = {};
        }
        current = current[parts[i]];
      }
      
      current[parts[parts.length - 1]] = value;
      return newContent;
    });
  };

  const handleNestedChange = (path: string, value: any) => {
    handleContentChange(path, value);
  };

  const handleArrayItemChange = (path: string, index: number, value: any) => {
    setContent(prev => {
      if (!prev) return prev;
      const parts = path.split('.');
      const newContent = { ...prev };
      let current: any = newContent;
      for (let i = 0; i < parts.length - 1; i++) {
        current = current[parts[i]];
      }
      const array = current[parts[parts.length - 1]];
      if (value === null) {
        array.splice(index, 1);
      } else {
        array[index] = value;
      }
      return newContent;
    });
  };

  const handleSave = async () => {
    if (!content) return;
    
    setIsSaving(true);
    setSaveStatus('Saving...');
    
    try {
      await saveContent(content);
      setSaveStatus('Changes saved successfully!');
    } catch (error) {
      console.error('Error saving content:', error);
      setSaveStatus('Error saving changes');
    } finally {
      setIsSaving(false);
      setTimeout(() => setSaveStatus(''), 3000);
    }
  };

  if (!content) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center text-xl">Loading content data...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-[130px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow">
          <div className="px-4 py-5 sm:p-6">
            <h1 className="text-2xl font-semibold text-gray-900 mb-6">Admin Dashboard</h1>
            <div className="flex justify-between items-center mb-8">
              <div className="flex gap-4">
                <button
                  onClick={() => setIsPreviewMode(!isPreviewMode)}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  {isPreviewMode ? 'Exit Preview' : 'Preview Site'}
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
                >
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>

            {saveStatus && (
              <div className={`mb-4 p-4 rounded ${saveStatus.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {saveStatus}
              </div>
            )}

            <div className="bg-white shadow rounded-lg">
              <div className="border-b border-gray-200">
                <nav className="flex -mb-px">
                  <button
                    onClick={() => setActiveTab('business')}
                    className={`${
                      activeTab === 'business'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
                  >
                    Business Info
                  </button>
                  <button
                    onClick={() => setActiveTab('homepage')}
                    className={`${
                      activeTab === 'homepage'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
                  >
                    Homepage
                  </button>
                  <button
                    onClick={() => setActiveTab('about')}
                    className={`${
                      activeTab === 'about'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
                  >
                    About
                  </button>
                  <button
                    onClick={() => setActiveTab('services')}
                    className={`${
                      activeTab === 'services'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
                  >
                    Services
                  </button>
                  <button
                    onClick={() => setActiveTab('contact')}
                    className={`${
                      activeTab === 'contact'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
                  >
                    Contact
                  </button>
                  <button
                    onClick={() => setActiveTab('socials')}
                    className={`${
                      activeTab === 'socials'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
                  >
                    Social Media
                  </button>
                  <button
                    onClick={() => setActiveTab('design')}
                    className={`${
                      activeTab === 'design'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
                  >
                    Design
                  </button>
                  <button
                    onClick={() => setActiveTab('header')}
                    className={`${
                      activeTab === 'header'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
                  >
                    Header
                  </button>
                </nav>
              </div>

              <div className="p-6">
                {activeTab === 'business' && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Business Name</label>
                      <input
                        type="text"
                        value={content.business.name}
                        onChange={(e) => handleContentChange('business.name', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Tagline</label>
                      <input
                        type="text"
                        value={content.business.tagline || ""}
                        onChange={(e) => handleContentChange('business.tagline', e.target.value)}
                        placeholder="e.g., Cheshire's Premier Roofing Specialists"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Phone</label>
                      <input
                        type="text"
                        value={content.business.phone}
                        onChange={(e) => handleContentChange('business.phone', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <input
                        type="email"
                        value={content.business.email}
                        onChange={(e) => handleContentChange('business.email', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Address</label>
                      <textarea
                        value={content.business.address}
                        onChange={(e) => handleContentChange('business.address', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        rows={3}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Logo Path</label>
                      <input
                        type="text"
                        value={content.business.logo}
                        onChange={(e) => handleContentChange('business.logo', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                )}

                {activeTab === 'homepage' && (
                  <div className="space-y-6">
                    <div className="border-t pt-6">
                      <h3 className="text-lg font-medium text-gray-700 mb-4">Content Sections</h3>
                    </div>

                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 mb-8">
                      <h3 className="text-xl font-bold text-blue-700 mb-4">Premium Hero Section</h3>
                      <p className="text-blue-600 mb-6">Edit the content for the new premium hero section that appears on your homepage.</p>
                      
                      {/* Initialize the premium hero object if it doesn't exist */}
                      {!content.homepage.premiumHero && (
                        <button
                          onClick={() => handleContentChange('homepage.premiumHero', {
                            backgroundImage: '/images/roofers/roofer_fixing_tile_on_roof.png',
                            title: {
                              line1: 'Expert',
                              line2: 'Roofing Services',
                              line3: 'In Dorchester'
                            },
                            subtitle: 'Professional roofing solutions with superior craftsmanship and unmatched customer service. We\'ve got you covered.',
                            ctaPrimary: {
                              text: 'Get a Free Quote',
                              link: '/contact'
                            },
                            ctaSecondary: {
                              text: 'Our Services',
                              link: '/services'
                            },
                            featureBadges: ['Licensed & Insured', '10+ Years Experience', 'Free Inspections', 'Emergency Service']
                          })}
                          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                          Initialize Premium Hero
                        </button>
                      )}
                      
                      {content.homepage.premiumHero && (
                        <div className="space-y-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Background Image Path</label>
                            <input
                              type="text"
                              value={content.homepage.premiumHero.backgroundImage}
                              onChange={(e) => handleContentChange('homepage.premiumHero.backgroundImage', e.target.value)}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                          </div>
                          
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-medium text-gray-700 mb-4">Heading (Three Lines)</h4>
                            <div className="space-y-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700">Line 1</label>
                                <input
                                  type="text"
                                  value={content.homepage.premiumHero.title.line1}
                                  onChange={(e) => handleContentChange('homepage.premiumHero.title.line1', e.target.value)}
                                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700">Line 2 (Gradient Effect)</label>
                                <input
                                  type="text"
                                  value={content.homepage.premiumHero.title.line2}
                                  onChange={(e) => handleContentChange('homepage.premiumHero.title.line2', e.target.value)}
                                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700">Line 3</label>
                                <input
                                  type="text"
                                  value={content.homepage.premiumHero.title.line3}
                                  onChange={(e) => handleContentChange('homepage.premiumHero.title.line3', e.target.value)}
                                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Subtitle</label>
                            <textarea
                              value={content.homepage.premiumHero.subtitle}
                              onChange={(e) => handleContentChange('homepage.premiumHero.subtitle', e.target.value)}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                              rows={3}
                            />
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <h4 className="font-medium text-gray-700 mb-4">Primary Button (Blue)</h4>
                              <div className="space-y-4">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700">Button Text</label>
                                  <input
                                    type="text"
                                    value={content.homepage.premiumHero.ctaPrimary.text}
                                    onChange={(e) => handleContentChange('homepage.premiumHero.ctaPrimary.text', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700">Button Link</label>
                                  <input
                                    type="text"
                                    value={content.homepage.premiumHero.ctaPrimary.link}
                                    onChange={(e) => handleContentChange('homepage.premiumHero.ctaPrimary.link', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                  />
                                </div>
                              </div>
                            </div>
                            
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <h4 className="font-medium text-gray-700 mb-4">Secondary Button (Transparent)</h4>
                              <div className="space-y-4">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700">Button Text</label>
                                  <input
                                    type="text"
                                    value={content.homepage.premiumHero.ctaSecondary.text}
                                    onChange={(e) => handleContentChange('homepage.premiumHero.ctaSecondary.text', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700">Button Link</label>
                                  <input
                                    type="text"
                                    value={content.homepage.premiumHero.ctaSecondary.link}
                                    onChange={(e) => handleContentChange('homepage.premiumHero.ctaSecondary.link', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Feature Badges</label>
                            <div className="space-y-2">
                              {content.homepage.premiumHero.featureBadges.map((badge, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                  <input
                                    type="text"
                                    value={badge}
                                    onChange={(e) => {
                                      const newBadges = [...content.homepage.premiumHero.featureBadges];
                                      newBadges[index] = e.target.value;
                                      handleContentChange('homepage.premiumHero.featureBadges', newBadges);
                                    }}
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                  />
                                  <button
                                    onClick={() => {
                                      const newBadges = [...content.homepage.premiumHero.featureBadges];
                                      newBadges.splice(index, 1);
                                      handleContentChange('homepage.premiumHero.featureBadges', newBadges);
                                    }}
                                    className="text-red-600 hover:text-red-800"
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                  </button>
                                </div>
                              ))}
                              <button
                                onClick={() => {
                                  const newBadges = [...content.homepage.premiumHero.featureBadges, ''];
                                  handleContentChange('homepage.premiumHero.featureBadges', newBadges);
                                }}
                                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                              >
                                Add Feature Badge
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 mb-8">
                      <h3 className="text-xl font-bold text-blue-700 mb-4">Features Section</h3>
                      <p className="text-blue-600 mb-6">Edit the "Why Choose Us" section heading and description.</p>
                      
                      {/* Initialize the features section object if it doesn't exist */}
                      {!content.homepage.featuresSection && (
                        <button
                          onClick={() => handleContentChange('homepage.featuresSection', {
                            title: "Why Choose Us",
                            description: "We combine expertise, quality materials, and exceptional service to deliver outstanding results for every project.",
                            ctaText: "View All Our Services",
                            ctaLink: "/services"
                          })}
                          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                          Initialize Features Section
                        </button>
                      )}
                      
                      {content.homepage.featuresSection && (
                        <div className="space-y-6">
                          <div className="bg-white p-4 rounded-lg shadow-sm">
                            <div className="space-y-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Section Title</label>
                                <input
                                  type="text"
                                  value={content.homepage.featuresSection.title}
                                  onChange={(e) => handleContentChange('homepage.featuresSection.title', e.target.value)}
                                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                  placeholder="e.g., Why Choose Us"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Section Description</label>
                                <textarea
                                  value={content.homepage.featuresSection.description}
                                  onChange={(e) => handleContentChange('homepage.featuresSection.description', e.target.value)}
                                  rows={3}
                                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                  placeholder="Description text that appears below the section title"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">CTA Button Text</label>
                                <input
                                  type="text"
                                  value={content.homepage.featuresSection.ctaText}
                                  onChange={(e) => handleContentChange('homepage.featuresSection.ctaText', e.target.value)}
                                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                  placeholder="e.g., View All Our Services"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">CTA Button Link</label>
                                <input
                                  type="text"
                                  value={content.homepage.featuresSection.ctaLink}
                                  onChange={(e) => handleContentChange('homepage.featuresSection.ctaLink', e.target.value)}
                                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                  placeholder="e.g., /services"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 mb-8">
                      <h3 className="text-xl font-bold text-blue-700 mb-4">Introduction Section</h3>
                      <p className="text-blue-600 mb-6">Edit the content for the introduction section that appears below the hero on your homepage.</p>
                      
                      {/* Initialize the introduction object if it doesn't exist */}
                      {!content.homepage.introduction && (
                        <button
                          onClick={() => handleContentChange('homepage.introduction', {
                            title: "Dorset's Most Trusted",
                            subtitle: "Roofing Specialists",
                            description: "With over a decade of experience serving Dorchester and surrounding areas, we've built a reputation for quality craftsmanship, reliability, and exceptional customer service. From simple repairs to complete roof replacements, our team delivers superior results that stand the test of time.",
                            image: "/images/roofers/team_of_roofers.jpg",
                            yearFounded: "2010",
                            projectsCompleted: "500+",
                            satisfaction: "98%"
                          })}
                          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                          Initialize Introduction Section
                        </button>
                      )}
                      
                      {content.homepage.introduction && (
                        <div className="space-y-6">
                          <div className="bg-white p-4 rounded-lg shadow-sm">
                            <h4 className="font-medium text-gray-700 mb-4">Main Title</h4>
                            <div className="space-y-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Main Title</label>
                                <input
                                  type="text"
                                  value={content.homepage.introduction.title}
                                  onChange={(e) => handleContentChange('homepage.introduction.title', e.target.value)}
                                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                  placeholder="e.g., Dorset's Most Trusted"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle (Gradient Effect)</label>
                                <input
                                  type="text"
                                  value={content.homepage.introduction.subtitle}
                                  onChange={(e) => handleContentChange('homepage.introduction.subtitle', e.target.value)}
                                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                  placeholder="e.g., Roofing Specialists"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                  value={content.homepage.introduction.description}
                                  onChange={(e) => handleContentChange('homepage.introduction.description', e.target.value)}
                                  rows={4}
                                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                  placeholder="Detailed description about your company"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Introduction Image Path</label>
                                <input
                                  type="text"
                                  value={content.homepage.introduction.image}
                                  onChange={(e) => handleContentChange('homepage.introduction.image', e.target.value)}
                                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                  placeholder="/images/your-team-image.jpg"
                                />
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-white p-4 rounded-lg shadow-sm">
                            <h4 className="font-medium text-gray-700 mb-4">Statistics</h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Year Founded</label>
                                <input
                                  type="text"
                                  value={content.homepage.introduction.yearFounded}
                                  onChange={(e) => handleContentChange('homepage.introduction.yearFounded', e.target.value)}
                                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                  placeholder="e.g., 2010"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Projects Completed</label>
                                <input
                                  type="text"
                                  value={content.homepage.introduction.projectsCompleted}
                                  onChange={(e) => handleContentChange('homepage.introduction.projectsCompleted', e.target.value)}
                                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                  placeholder="e.g., 500+"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Customer Satisfaction</label>
                                <input
                                  type="text"
                                  value={content.homepage.introduction.satisfaction}
                                  onChange={(e) => handleContentChange('homepage.introduction.satisfaction', e.target.value)}
                                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                  placeholder="e.g., 98%"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 mb-8">
                      <h3 className="text-xl font-bold text-blue-700 mb-4">Services Section</h3>
                      <p className="text-blue-600 mb-6">Edit the section title and description for the services section.</p>
                      
                      {/* Initialize the services section object if it doesn't exist */}
                      {!content.homepage.servicesSection && (
                        <button
                          onClick={() => handleContentChange('homepage.servicesSection', {
                            title: "Our Services",
                            description: "Professional roofing solutions for residential and commercial properties in Dorchester and surrounding areas."
                          })}
                          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                          Initialize Services Section
                        </button>
                      )}
                      
                      {content.homepage.servicesSection && (
                        <div className="space-y-6">
                          <div className="bg-white p-4 rounded-lg shadow-sm">
                            <div className="space-y-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Section Title</label>
                                <input
                                  type="text"
                                  value={content.homepage.servicesSection.title}
                                  onChange={(e) => handleContentChange('homepage.servicesSection.title', e.target.value)}
                                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                  placeholder="e.g., Our Services"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Section Description</label>
                                <textarea
                                  value={content.homepage.servicesSection.description}
                                  onChange={(e) => handleContentChange('homepage.servicesSection.description', e.target.value)}
                                  rows={3}
                                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                  placeholder="Description text that appears below the section title"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Features</label>
                      {content.homepage.features.map((feature, index) => (
                        <div key={index} className="mb-4 p-4 border rounded">
                          <div className="flex justify-between mb-2">
                            <h4 className="font-medium">Feature {index + 1}</h4>
                            <button
                              onClick={() => handleArrayItemChange('homepage.features', index, null)}
                              className="text-red-600 hover:text-red-800"
                            >
                              Remove
                            </button>
                          </div>
                          <div className="space-y-2">
                            <input
                              type="text"
                              value={feature.title}
                              onChange={(e) => handleArrayItemChange('homepage.features', index, { ...feature, title: e.target.value })}
                              placeholder="Title"
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                            <textarea
                              value={feature.description}
                              onChange={(e) => handleArrayItemChange('homepage.features', index, { ...feature, description: e.target.value })}
                              placeholder="Description"
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                              rows={2}
                            />
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mt-2 mb-1">Icon Type</label>
                              <select
                                value={feature.icon || ''}
                                onChange={(e) => handleArrayItemChange('homepage.features', index, { ...feature, icon: e.target.value })}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                              >
                                <option value="">Select an icon</option>
                                <option value="team">Team Icon</option>
                                <option value="materials">Materials Icon</option>
                                <option value="warranty">Warranty/Shield Icon</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mt-2 mb-1">Learn More Text</label>
                              <input
                                type="text"
                                value={feature.learnMoreText || 'Learn more'}
                                onChange={(e) => handleArrayItemChange('homepage.features', index, { ...feature, learnMoreText: e.target.value })}
                                placeholder="e.g., Learn more"
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mt-2 mb-1">Learn More Link</label>
                              <input
                                type="text"
                                value={feature.learnMoreLink || '#'}
                                onChange={(e) => handleArrayItemChange('homepage.features', index, { ...feature, learnMoreLink: e.target.value })}
                                placeholder="e.g., /services/roofing"
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                      <button
                        onClick={() => handleArrayItemChange('homepage.features', content.homepage.features.length, { title: '', description: '', icon: '', learnMoreText: '', learnMoreLink: '#' })}
                        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        Add Feature
                      </button>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Services</label>
                      {content.homepage.services.map((service, index) => (
                        <div key={index} className="mb-4 p-4 border rounded">
                          <div className="flex justify-between mb-2">
                            <h4 className="font-medium">Service {index + 1}</h4>
                            <button
                              onClick={() => handleArrayItemChange('homepage.services', index, null)}
                              className="text-red-600 hover:text-red-800"
                            >
                              Remove
                            </button>
                          </div>
                          <div className="space-y-3">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                              <input
                                type="text"
                                value={service.title}
                                onChange={(e) => handleArrayItemChange('homepage.services', index, { ...service, title: e.target.value })}
                                placeholder="Title"
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                              <textarea
                                value={service.description}
                                onChange={(e) => handleArrayItemChange('homepage.services', index, { ...service, description: e.target.value })}
                                placeholder="Description"
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                rows={3}
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                              <select
                                value={service.icon || ''}
                                onChange={(e) => handleArrayItemChange('homepage.services', index, { ...service, icon: e.target.value })}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                              >
                                <optgroup label="Roofing & Construction">
                                  <option value="roofing"><IconPreview iconName="roofing" /> Roofing</option>
                                  <option value="home"><IconPreview iconName="home" /> House</option>
                                  <option value="house"><IconPreview iconName="house" /> Modern House</option>
                                  <option value="housealt"><IconPreview iconName="housealt" /> House Alternative</option>
                                  <option value="houseoutline"><IconPreview iconName="houseoutline" /> House Outline</option>
                                  <option value="office"><IconPreview iconName="office" /> Office Building</option>
                                  <option value="officealt"><IconPreview iconName="officealt" /> Office Alternative</option>
                                  <option value="building"><IconPreview iconName="building" /> Building</option>
                                  <option value="window"><IconPreview iconName="window" /> Window</option>
                                </optgroup>
                                <optgroup label="Services & Repairs">
                                  <option value="tools"><IconPreview iconName="tools" /> Tools</option>
                                  <option value="wrench"><IconPreview iconName="wrench" /> Wrench</option>
                                  <option value="construction"><IconPreview iconName="construction" /> Construction</option>
                                  <option value="hardhat"><IconPreview iconName="hardhat" /> Hard Hat</option>
                                  <option value="ruler"><IconPreview iconName="ruler" /> Measuring</option>
                                  <option value="search"><IconPreview iconName="search" /> Inspection</option>
                                  <option value="refresh"><IconPreview iconName="refresh" /> Replacement</option>
                                  <option value="cement"><IconPreview iconName="cement" /> Cement</option>
                                </optgroup>
                                <optgroup label="Weather & Environmental">
                                  <option value="rain"><IconPreview iconName="rain" /> Rain</option>
                                  <option value="waterdrop"><IconPreview iconName="waterdrop" /> Water Drop</option>
                                  <option value="snow"><IconPreview iconName="snow" /> Snow</option>
                                  <option value="lightning"><IconPreview iconName="lightning" /> Lightning</option>
                                  <option value="wind"><IconPreview iconName="wind" /> Wind</option>
                                  <option value="leaf"><IconPreview iconName="leaf" /> Eco-Friendly</option>
                                </optgroup>
                                <optgroup label="Business & Scheduling">
                                  <option value="calendar"><IconPreview iconName="calendar" /> Calendar</option>
                                  <option value="clock"><IconPreview iconName="clock" /> Clock</option>
                                  <option value="phone"><IconPreview iconName="phone" /> Phone</option>
                                  <option value="dollar"><IconPreview iconName="dollar" /> Price</option>
                                  <option value="chart"><IconPreview iconName="chart" /> Performance</option>
                                  <option value="shield"><IconPreview iconName="shield" /> Protection</option>
                                  <option value="alert"><IconPreview iconName="alert" /> Alert</option>
                                  <option value="star"><IconPreview iconName="star" /> Quality</option>
                                </optgroup>
                              </select>
                              <div className="mt-2 flex items-center text-sm text-gray-500">
                                <span className="flex items-center">Selected icon: <span className="mx-2"><IconPreview iconName={service.icon || 'home'} /></span> {service.icon || 'home'}</span>
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
                              <input
                                type="text"
                                value={service.buttonText || "Get a Free Quote"}
                                onChange={(e) => handleArrayItemChange('homepage.services', index, { ...service, buttonText: e.target.value })}
                                placeholder="e.g., Get a Free Quote"
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Button Link</label>
                              <input
                                type="text"
                                value={service.buttonLink || "/contact"}
                                onChange={(e) => handleArrayItemChange('homepage.services', index, { ...service, buttonLink: e.target.value })}
                                placeholder="e.g., /contact"
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                      <button
                        onClick={() => handleArrayItemChange('homepage.services', content.homepage.services.length, { title: '', description: '', icon: '', buttonText: 'Get a Free Quote', buttonLink: '/contact' })}
                        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        Add Service
                      </button>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Testimonials</label>
                      {content.homepage.testimonials.map((testimonial, index) => (
                        <div key={index} className="mb-4 p-4 border rounded">
                          <div className="flex justify-between mb-2">
                            <h4 className="font-medium">Testimonial {index + 1}</h4>
                            <button
                              onClick={() => handleArrayItemChange('homepage.testimonials', index, null)}
                              className="text-red-600 hover:text-red-800"
                            >
                              Remove
                            </button>
                          </div>
                          <div className="space-y-2">
                            <div>
                              <label className="block text-sm font-medium text-gray-700">Author Name</label>
                              <input
                                type="text"
                                value={testimonial.author || ''}
                                onChange={(e) => handleArrayItemChange('homepage.testimonials', index, { ...testimonial, author: e.target.value })}
                                placeholder="Author Name"
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700">Location</label>
                              <input
                                type="text"
                                value={testimonial.role || ''}
                                onChange={(e) => handleArrayItemChange('homepage.testimonials', index, { ...testimonial, role: e.target.value })}
                                placeholder="e.g., Homeowner, Business Owner"
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700">Testimonial Quote</label>
                              <textarea
                                value={testimonial.quote || ''}
                                onChange={(e) => handleArrayItemChange('homepage.testimonials', index, { ...testimonial, quote: e.target.value })}
                                placeholder="Enter the testimonial quote"
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                rows={3}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                      <button
                        onClick={() => handleArrayItemChange('homepage.testimonials', content.homepage.testimonials.length, { author: '', role: '', quote: '' })}
                        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        Add Testimonial
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === 'about' && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Title</label>
                      <input
                        type="text"
                        value={content.about.title}
                        onChange={(e) => handleContentChange('about.title', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Subtitle</label>
                      <input
                        type="text"
                        value={content.about.subtitle}
                        onChange={(e) => handleContentChange('about.subtitle', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Hero Image Path</label>
                      <input
                        type="text"
                        value={content.about.heroImage}
                        onChange={(e) => handleContentChange('about.heroImage', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Main Content</label>
                      <div className="space-y-4">
                        <input
                          type="text"
                          value={content.about.mainContent.title}
                          onChange={(e) => handleContentChange('about.mainContent.title', e.target.value)}
                          placeholder="Title"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                        <textarea
                          value={content.about.mainContent.description}
                          onChange={(e) => handleContentChange('about.mainContent.description', e.target.value)}
                          placeholder="Description"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          rows={3}
                        />
                        <textarea
                          value={content.about.mainContent.history}
                          onChange={(e) => handleContentChange('about.mainContent.history', e.target.value)}
                          placeholder="History"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          rows={3}
                        />
                        <textarea
                          value={content.about.mainContent.mission}
                          onChange={(e) => handleContentChange('about.mainContent.mission', e.target.value)}
                          placeholder="Mission"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          rows={3}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Team Members</label>
                      {content.about.team.map((member, index) => (
                        <div key={index} className="mb-4 p-4 border rounded">
                          <div className="flex justify-between mb-2">
                            <h4 className="font-medium">Team Member {index + 1}</h4>
                            <button
                              onClick={() => handleArrayItemChange('about.team', index, null)}
                              className="text-red-600 hover:text-red-800"
                            >
                              Remove
                            </button>
                          </div>
                          <div className="space-y-2">
                            <input
                              type="text"
                              value={member.name}
                              onChange={(e) => handleArrayItemChange('about.team', index, { ...member, name: e.target.value })}
                              placeholder="Name"
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                            <input
                              type="text"
                              value={member.role}
                              onChange={(e) => handleArrayItemChange('about.team', index, { ...member, role: e.target.value })}
                              placeholder="Role"
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                            <textarea
                              value={member.bio}
                              onChange={(e) => handleArrayItemChange('about.team', index, { ...member, bio: e.target.value })}
                              placeholder="Bio"
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                              rows={2}
                            />
                            <input
                              type="text"
                              value={member.image}
                              onChange={(e) => handleArrayItemChange('about.team', index, { ...member, image: e.target.value })}
                              placeholder="Image Path"
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                          </div>
                        </div>
                      ))}
                      <button
                        onClick={() => handleArrayItemChange('about.team', content.about.team.length, { name: '', role: '', bio: '', image: '' })}
                        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        Add Team Member
                      </button>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Values</label>
                      {content.about.values.map((value, index) => (
                        <div key={index} className="mb-4 p-4 border rounded">
                          <div className="flex justify-between mb-2">
                            <h4 className="font-medium">Value {index + 1}</h4>
                            <button
                              onClick={() => handleArrayItemChange('about.values', index, null)}
                              className="text-red-600 hover:text-red-800"
                            >
                              Remove
                            </button>
                          </div>
                          <div className="space-y-2">
                            <input
                              type="text"
                              value={value.title}
                              onChange={(e) => handleArrayItemChange('about.values', index, { ...value, title: e.target.value })}
                              placeholder="Title"
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                            <textarea
                              value={value.description}
                              onChange={(e) => handleArrayItemChange('about.values', index, { ...value, description: e.target.value })}
                              placeholder="Description"
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                              rows={2}
                            />
                          </div>
                        </div>
                      ))}
                      <button
                        onClick={() => handleArrayItemChange('about.values', content.about.values.length, { title: '', description: '' })}
                        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        Add Value
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === 'services' && (
                  <div className="space-y-8">
                    {/* Hero Section */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Hero Section</h3>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                          type="text"
                          value={content.services.hero.title}
                          onChange={(e) => handleContentChange('services.hero.title', e.target.value)}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Subtitle</label>
                        <input
                          type="text"
                          value={content.services.hero.subtitle}
                          onChange={(e) => handleContentChange('services.hero.subtitle', e.target.value)}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    {/* Services List */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium">Services</h3>
                        <button
                          onClick={() => handleArrayItemChange('services.services', content.services.services.length, {
                            title: '',
                            description: '',
                            image: '',
                            features: []
                          })}
                          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                          Add Service
                        </button>
                      </div>
                      
                      <div className="space-y-4">
                        {content.services.services.map((service, index) => (
                          <div key={index} className="p-4 border rounded-lg">
                            <div className="flex justify-between items-center mb-4">
                              <h4 className="text-md font-medium">Service {index + 1}</h4>
                              <button
                                onClick={() => handleArrayItemChange('services.services', index, null)}
                                className="text-red-600 hover:text-red-800"
                              >
                                Remove
                              </button>
                            </div>
                            <div className="space-y-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700">Title</label>
                                <input
                                  type="text"
                                  value={service.title}
                                  onChange={(e) => handleArrayItemChange('services.services', index, {
                                    ...service,
                                    title: e.target.value
                                  })}
                                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea
                                  value={service.description}
                                  onChange={(e) => handleArrayItemChange('services.services', index, {
                                    ...service,
                                    description: e.target.value
                                  })}
                                  rows={3}
                                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700">Image Path</label>
                                <input
                                  type="text"
                                  value={service.image}
                                  onChange={(e) => handleArrayItemChange('services.services', index, {
                                    ...service,
                                    image: e.target.value
                                  })}
                                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Features</label>
                                {service.features.map((feature, featureIndex) => (
                                  <div key={featureIndex} className="flex gap-2 mb-2">
                                    <input
                                      type="text"
                                      value={feature}
                                      onChange={(e) => {
                                        const newFeatures = [...service.features];
                                        newFeatures[featureIndex] = e.target.value;
                                        handleArrayItemChange('services.services', index, {
                                          ...service,
                                          features: newFeatures
                                        });
                                      }}
                                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                    <button
                                      onClick={() => {
                                        const newFeatures = service.features.filter((_, i) => i !== featureIndex);
                                        handleArrayItemChange('services.services', index, {
                                          ...service,
                                          features: newFeatures
                                        });
                                      }}
                                      className="px-2 text-red-600 hover:text-red-800"
                                    >
                                      Remove
                                    </button>
                                  </div>
                                ))}
                                <button
                                  onClick={() => {
                                    const newFeatures = [...service.features, ''];
                                    handleArrayItemChange('services.services', index, {
                                      ...service,
                                      features: newFeatures
                                    });
                                  }}
                                  className="mt-2 px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                                >
                                  Add Feature
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA Section */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Call to Action</h3>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                          type="text"
                          value={content.services.cta.title}
                          onChange={(e) => handleContentChange('services.cta.title', e.target.value)}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                          value={content.services.cta.description}
                          onChange={(e) => handleContentChange('services.cta.description', e.target.value)}
                          rows={2}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Button Text</label>
                        <input
                          type="text"
                          value={content.services.cta.buttonText}
                          onChange={(e) => handleContentChange('services.cta.buttonText', e.target.value)}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Button Link</label>
                        <input
                          type="text"
                          value={content.services.cta.buttonLink}
                          onChange={(e) => handleContentChange('services.cta.buttonLink', e.target.value)}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'contact' && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Address</label>
                      <textarea
                        value={content.contact.address}
                        onChange={(e) => handleContentChange('contact.address', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        rows={3}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Phone</label>
                      <input
                        type="text"
                        value={content.contact.phone}
                        onChange={(e) => handleContentChange('contact.phone', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <input
                        type="email"
                        value={content.contact.email}
                        onChange={(e) => handleContentChange('contact.email', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Business Hours</label>
                      <input
                        type="text"
                        value={content.contact.hours}
                        onChange={(e) => handleContentChange('contact.hours', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Form Title</label>
                      <input
                        type="text"
                        value={content.contact.formTitle}
                        onChange={(e) => handleContentChange('contact.formTitle', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Form Description</label>
                      <textarea
                        value={content.contact.formDescription}
                        onChange={(e) => handleContentChange('contact.formDescription', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        rows={3}
                      />
                    </div>
                  </div>
                )}

                {activeTab === 'socials' && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Facebook URL</label>
                      <input
                        type="url"
                        value={content.socials.facebook}
                        onChange={(e) => handleContentChange('socials.facebook', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Twitter URL</label>
                      <input
                        type="url"
                        value={content.socials.twitter}
                        onChange={(e) => handleContentChange('socials.twitter', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Instagram URL</label>
                      <input
                        type="url"
                        value={content.socials.instagram}
                        onChange={(e) => handleContentChange('socials.instagram', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">LinkedIn URL</label>
                      <input
                        type="url"
                        value={content.socials.linkedin}
                        onChange={(e) => handleContentChange('socials.linkedin', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                )}

                {activeTab === 'design' && (
                  <div className="space-y-8">
                    {/* Header Design Section */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Header Design</h3>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Background Color</label>
                        <div className="mt-1 flex items-center gap-2">
                          <input
                            type="color"
                            value={content.theme?.header?.backgroundColor || '#ffffff'}
                            onChange={(e) => handleContentChange('theme.header.backgroundColor', e.target.value)}
                            className="h-10 w-20"
                          />
                          <input
                            type="text"
                            value={content.theme?.header?.backgroundColor || '#ffffff'}
                            onChange={(e) => handleContentChange('theme.header.backgroundColor', e.target.value)}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            placeholder="#ffffff"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Text Color</label>
                        <div className="mt-1 flex items-center gap-2">
                          <input
                            type="color"
                            value={content.theme?.header?.textColor || '#000000'}
                            onChange={(e) => handleContentChange('theme.header.textColor', e.target.value)}
                            className="h-10 w-20"
                          />
                          <input
                            type="text"
                            value={content.theme?.header?.textColor || '#000000'}
                            onChange={(e) => handleContentChange('theme.header.textColor', e.target.value)}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            placeholder="#000000"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Link Color</label>
                        <div className="mt-1 flex items-center gap-2">
                          <input
                            type="color"
                            value={content.theme?.header?.linkColor || '#4B5563'}
                            onChange={(e) => handleContentChange('theme.header.linkColor', e.target.value)}
                            className="h-10 w-20"
                          />
                          <input
                            type="text"
                            value={content.theme?.header?.linkColor || '#4B5563'}
                            onChange={(e) => handleContentChange('theme.header.linkColor', e.target.value)}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            placeholder="#4B5563"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Link Hover Color</label>
                        <div className="mt-1 flex items-center gap-2">
                          <input
                            type="color"
                            value={content.theme?.header?.linkHoverColor || '#1F2937'}
                            onChange={(e) => handleContentChange('theme.header.linkHoverColor', e.target.value)}
                            className="h-10 w-20"
                          />
                          <input
                            type="text"
                            value={content.theme?.header?.linkHoverColor || '#1F2937'}
                            onChange={(e) => handleContentChange('theme.header.linkHoverColor', e.target.value)}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            placeholder="#1F2937"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Icon Color</label>
                        <input
                          type="color"
                          value={content.theme?.header?.iconColor || '#4B5563'}
                          onChange={(e) => handleContentChange('theme.header.iconColor', e.target.value)}
                          className="mt-1 block w-full h-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>

                      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Preview</h4>
                        <div 
                          className="border rounded-lg overflow-hidden"
                          style={{
                            backgroundColor: content.theme?.header?.backgroundColor || '#ffffff'
                          }}
                        >
                          <div className="p-4">
                            <div className="flex items-center justify-between">
                              <div 
                                className="font-medium"
                                style={{
                                  color: content.theme?.header?.textColor || '#000000'
                                }}
                              >
                                Logo
                              </div>
                              <div className="flex gap-4">
                                {['Home', 'About', 'Services', 'Contact'].map((item) => (
                                  <div
                                    key={item}
                                    className="cursor-pointer transition-colors duration-200"
                                    style={{
                                      color: content.theme?.header?.linkColor || '#4B5563'
                                    }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.color = content.theme?.header?.linkHoverColor || '#1F2937';
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.color = content.theme?.header?.linkColor || '#4B5563';
                                    }}
                                  >
                                    {item}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Footer Design Section */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Footer Design</h3>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Background Color</label>
                        <div className="mt-1 flex items-center gap-2">
                          <input
                            type="color"
                            value={content.theme?.footer?.backgroundColor || '#1F2937'}
                            onChange={(e) => handleContentChange('theme.footer.backgroundColor', e.target.value)}
                            className="h-10 w-20"
                          />
                          <input
                            type="text"
                            value={content.theme?.footer?.backgroundColor || '#1F2937'}
                            onChange={(e) => handleContentChange('theme.footer.backgroundColor', e.target.value)}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            placeholder="#1F2937"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Text Color</label>
                        <div className="mt-1 flex items-center gap-2">
                          <input
                            type="color"
                            value={content.theme?.footer?.textColor || '#ffffff'}
                            onChange={(e) => handleContentChange('theme.footer.textColor', e.target.value)}
                            className="h-10 w-20"
                          />
                          <input
                            type="text"
                            value={content.theme?.footer?.textColor || '#ffffff'}
                            onChange={(e) => handleContentChange('theme.footer.textColor', e.target.value)}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            placeholder="#ffffff"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Link Color</label>
                        <div className="mt-1 flex items-center gap-2">
                          <input
                            type="color"
                            value={content.theme?.footer?.linkColor || '#60A5FA'}
                            onChange={(e) => handleContentChange('theme.footer.linkColor', e.target.value)}
                            className="h-10 w-20"
                          />
                          <input
                            type="text"
                            value={content.theme?.footer?.linkColor || '#60A5FA'}
                            onChange={(e) => handleContentChange('theme.footer.linkColor', e.target.value)}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            placeholder="#60A5FA"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Link Hover Color</label>
                        <div className="mt-1 flex items-center gap-2">
                          <input
                            type="color"
                            value={content.theme?.footer?.linkHoverColor || '#93C5FD'}
                            onChange={(e) => handleContentChange('theme.footer.linkHoverColor', e.target.value)}
                            className="h-10 w-20"
                          />
                          <input
                            type="text"
                            value={content.theme?.footer?.linkHoverColor || '#93C5FD'}
                            onChange={(e) => handleContentChange('theme.footer.linkHoverColor', e.target.value)}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            placeholder="#93C5FD"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Icon Color</label>
                        <div className="mt-1 flex items-center gap-2">
                          <input
                            type="color"
                            value={content.theme?.footer?.iconColor || '#60A5FA'}
                            onChange={(e) => handleContentChange('theme.footer.iconColor', e.target.value)}
                            className="h-10 w-20"
                          />
                          <input
                            type="text"
                            value={content.theme?.footer?.iconColor || '#60A5FA'}
                            onChange={(e) => handleContentChange('theme.footer.iconColor', e.target.value)}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            placeholder="#60A5FA"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Border Color</label>
                        <div className="mt-1 flex items-center gap-2">
                          <input
                            type="color"
                            value={content.theme?.footer?.borderColor || '#374151'}
                            onChange={(e) => handleContentChange('theme.footer.borderColor', e.target.value)}
                            className="h-10 w-20"
                          />
                          <input
                            type="text"
                            value={content.theme?.footer?.borderColor || '#374151'}
                            onChange={(e) => handleContentChange('theme.footer.borderColor', e.target.value)}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            placeholder="#374151"
                          />
                        </div>
                      </div>

                      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Preview</h4>
                        <div 
                          className="border rounded-lg overflow-hidden"
                          style={{
                            backgroundColor: content.theme?.footer?.backgroundColor || '#1F2937'
                          }}
                        >
                          <div className="p-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                              <div>
                                <h3 className="text-lg font-semibold mb-4" style={{ color: content.theme?.footer?.textColor || '#ffffff' }}>
                                  Contact Us
                                </h3>
                                <div className="space-y-2" style={{ color: content.theme?.footer?.textColor || '#ffffff' }}>
                                  <p>123 Main St</p>
                                  <p>Phone: (555) 123-4567</p>
                                  <p>Email: info@example.com</p>
                                </div>
                              </div>
                              <div>
                                <h3 className="text-lg font-semibold mb-4" style={{ color: content.theme?.footer?.textColor || '#ffffff' }}>
                                  Quick Links
                                </h3>
                                <ul className="space-y-2">
                                  {['Home', 'About', 'Services', 'Contact'].map((item) => (
                                    <li key={item}>
                                      <div
                                        className="cursor-pointer transition-colors duration-200"
                                        style={{
                                          color: content.theme?.footer?.linkColor || '#60A5FA'
                                        }}
                                        onMouseEnter={(e) => {
                                          e.currentTarget.style.color = content.theme?.footer?.linkHoverColor || '#93C5FD';
                                        }}
                                        onMouseLeave={(e) => {
                                          e.currentTarget.style.color = content.theme?.footer?.linkColor || '#60A5FA';
                                        }}
                                      >
                                        {item}
                                      </div>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <h3 className="text-lg font-semibold mb-4" style={{ color: content.theme?.footer?.textColor || '#ffffff' }}>
                                  Connect With Us
                                </h3>
                                <div className="flex space-x-4">
                                  {['Facebook', 'Twitter', 'Instagram', 'LinkedIn'].map((social) => (
                                    <div
                                      key={social}
                                      className="cursor-pointer transition-colors duration-200"
                                      style={{
                                        color: content.theme?.footer?.iconColor || '#60A5FA'
                                      }}
                                      onMouseEnter={(e) => {
                                        e.currentTarget.style.color = content.theme?.footer?.linkHoverColor || '#93C5FD';
                                      }}
                                      onMouseLeave={(e) => {
                                        e.currentTarget.style.color = content.theme?.footer?.iconColor || '#60A5FA';
                                      }}
                                    >
                                      {social}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <div className="mt-8 pt-8 border-t" style={{ borderColor: content.theme?.footer?.borderColor || '#374151' }}>
                              <p className="text-center" style={{ color: content.theme?.footer?.textColor || '#ffffff' }}>
                                © 2024 Example Company. All rights reserved.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'header' && (
                  <div className="space-y-8">
                    {/* Top Bar Section */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Top Bar Settings</h3>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Business Hours</label>
                        <input
                          type="text"
                          value={content.header?.businessHours || "Mon-Fri: 8am-6pm"}
                          onChange={(e) => handleContentChange('header.businessHours', e.target.value)}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          placeholder="e.g., Mon-Fri: 8am-6pm"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Insurance Text</label>
                        <input
                          type="text"
                          value={content.header?.insuranceText || "Fully Insured"}
                          onChange={(e) => handleContentChange('header.insuranceText', e.target.value)}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          placeholder="e.g., Fully Insured"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Experience Text</label>
                        <input
                          type="text"
                          value={content.header?.experienceText || "5+ Years Experience"}
                          onChange={(e) => handleContentChange('header.experienceText', e.target.value)}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          placeholder="e.g., 5+ Years Experience"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Show Top Bar</label>
                        <div className="mt-1">
                          <label className="inline-flex items-center">
                            <input
                              type="checkbox"
                              checked={content.header?.showTopBar !== false}
                              onChange={(e) => handleContentChange('header.showTopBar', e.target.checked)}
                              className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                            <span className="ml-2 text-sm text-gray-600">Display top bar with business information</span>
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Navigation Section */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Navigation Menu</h3>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Menu Items</label>
                        {(content.header?.menuItems || [
                          { text: 'Home', link: '/' },
                          { text: 'About', link: '/about' },
                          { text: 'Services', link: '/services' },
                          { text: 'Areas', link: '/areas' },
                          { text: 'Blog', link: '/blog' },
                          { text: 'FAQ', link: '/faq' },
                          { text: 'Contact', link: '/contact' }
                        ]).map((item, index) => (
                          <div key={index} className="flex items-center gap-2 mb-4">
                            <div className="flex-1 grid grid-cols-2 gap-2">
                              <div>
                                <label className="block text-xs text-gray-500 mb-1">Display Text</label>
                                <input
                                  type="text"
                                  value={item.text}
                                  onChange={(e) => {
                                    const newItems = [...(content.header?.menuItems || [
                                      { text: 'Home', link: '/' },
                                      { text: 'About', link: '/about' },
                                      { text: 'Services', link: '/services' },
                                      { text: 'Areas', link: '/areas' },
                                      { text: 'Blog', link: '/blog' },
                                      { text: 'FAQ', link: '/faq' },
                                      { text: 'Contact', link: '/contact' }
                                    ])];
                                    newItems[index] = { ...newItems[index], text: e.target.value };
                                    handleContentChange('header.menuItems', newItems);
                                  }}
                                  placeholder="e.g., Home"
                                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                              </div>
                              <div>
                                <label className="block text-xs text-gray-500 mb-1">Link URL</label>
                                <input
                                  type="text"
                                  value={item.link}
                                  onChange={(e) => {
                                    const newItems = [...(content.header?.menuItems || [
                                      { text: 'Home', link: '/' },
                                      { text: 'About', link: '/about' },
                                      { text: 'Services', link: '/services' },
                                      { text: 'Areas', link: '/areas' },
                                      { text: 'Blog', link: '/blog' },
                                      { text: 'FAQ', link: '/faq' },
                                      { text: 'Contact', link: '/contact' }
                                    ])];
                                    newItems[index] = { ...newItems[index], link: e.target.value };
                                    handleContentChange('header.menuItems', newItems);
                                  }}
                                  placeholder="e.g., /home"
                                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                              </div>
                            </div>
                            <button
                              onClick={() => {
                                const newItems = (content.header?.menuItems || [
                                  { text: 'Home', link: '/' },
                                  { text: 'About', link: '/about' },
                                  { text: 'Services', link: '/services' },
                                  { text: 'Areas', link: '/areas' },
                                  { text: 'Blog', link: '/blog' },
                                  { text: 'FAQ', link: '/faq' },
                                  { text: 'Contact', link: '/contact' }
                                ]).filter((_, i) => i !== index);
                                handleContentChange('header.menuItems', newItems);
                              }}
                              className="p-2 text-red-600 hover:text-red-800"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={() => {
                            const newItems = [...(content.header?.menuItems || [
                              { text: 'Home', link: '/' },
                              { text: 'About', link: '/about' },
                              { text: 'Services', link: '/services' },
                              { text: 'Areas', link: '/areas' },
                              { text: 'Blog', link: '/blog' },
                              { text: 'FAQ', link: '/faq' },
                              { text: 'Contact', link: '/contact' }
                            ]), { text: '', link: '' }];
                            handleContentChange('header.menuItems', newItems);
                          }}
                          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                          Add Menu Item
                        </button>
                      </div>
                    </div>

                    {/* CTA Button Section */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Call-to-Action Button</h3>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Button Text</label>
                        <input
                          type="text"
                          value={content.header?.ctaButton?.text || "Get a Free Quote"}
                          onChange={(e) => handleContentChange('header.ctaButton.text', e.target.value)}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          placeholder="e.g., Get a Free Quote"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Button Link</label>
                        <input
                          type="text"
                          value={content.header?.ctaButton?.link || "/quote"}
                          onChange={(e) => handleContentChange('header.ctaButton.link', e.target.value)}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          placeholder="e.g., /quote"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Show CTA Button</label>
                        <div className="mt-1">
                          <label className="inline-flex items-center">
                            <input
                              type="checkbox"
                              checked={content.header?.ctaButton?.show !== false}
                              onChange={(e) => handleContentChange('header.ctaButton.show', e.target.checked)}
                              className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                            <span className="ml-2 text-sm text-gray-600">Display call-to-action button</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 