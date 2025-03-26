'use client';

import { useState, useEffect } from 'react';
import { fetchContent, saveContent } from '@/utils/client-content';
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
import ImagePicker from '@/components/admin/ImagePicker';
import AreaImagePicker from '@/components/admin/AreaImagePicker';

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

                    <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200 mb-8">
                      <h3 className="text-xl font-bold text-indigo-700 mb-4">Serving Areas Section</h3>
                      <p className="text-indigo-600 mb-6">Edit the section title, description, and locations for the serving areas section.</p>
                      
                      {/* Initialize the serving areas section object if it doesn't exist */}
                      {!content.homepage.servingAreasSection && (
                        <button
                          onClick={() => handleContentChange('homepage.servingAreasSection', {
                            title: "Serving Crewe & Surrounding Areas",
                            description: "Our roofing solutions are tailored to the specific climate challenges and architectural styles of Crewe and Cheshire. We understand the unique weather patterns and building requirements of the local area."
                          })}
                          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                        >
                          Initialize Serving Areas Section
                        </button>
                      )}
                      
                      {content.homepage.servingAreasSection && (
                        <div className="space-y-6">
                          <div className="bg-white p-4 rounded-lg shadow-sm">
                            <div className="space-y-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Section Title</label>
                                <input
                                  type="text"
                                  value={content.homepage.servingAreasSection.title}
                                  onChange={(e) => handleContentChange('homepage.servingAreasSection.title', e.target.value)}
                                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                  placeholder="e.g., Serving Crewe & Surrounding Areas"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Section Description</label>
                                <textarea
                                  value={content.homepage.servingAreasSection.description}
                                  onChange={(e) => handleContentChange('homepage.servingAreasSection.description', e.target.value)}
                                  rows={3}
                                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                  placeholder="Description text that appears below the section title"
                                />
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Locations/Areas We Serve</label>
                            {(content.homepage.servingAreas || []).map((area, index) => (
                              <div key={index} className="mb-4 p-4 border rounded">
                                <div className="flex justify-between mb-2">
                                  <h4 className="font-medium">Area {index + 1}</h4>
                                  <button
                                    onClick={() => handleArrayItemChange('homepage.servingAreas', index, null)}
                                    className="text-red-600 hover:text-red-800"
                                  >
                                    Remove
                                  </button>
                                </div>
                                <div className="space-y-3">
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700">Area Name</label>
                                    <input
                                      type="text"
                                      value={area.name || ''}
                                      onChange={(e) => handleArrayItemChange('homepage.servingAreas', index, { ...area, name: e.target.value })}
                                      placeholder="e.g., Crewe, Nantwich, etc."
                                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700">Description</label>
                                    <textarea
                                      value={area.description || ''}
                                      onChange={(e) => handleArrayItemChange('homepage.servingAreas', index, { ...area, description: e.target.value })}
                                      placeholder="Description of services in this area"
                                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                      rows={3}
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700">Area Image</label>
                                    <AreaImagePicker
                                      value={area.image || ''}
                                      onChange={(imageUrl) => handleArrayItemChange('homepage.servingAreas', index, { ...area, image: imageUrl })}
                                      areaName={area.name}
                                    />
                                    <p className="mt-1 text-xs text-gray-500">
                                      Click the image to select from available options or enter a custom URL
                                    </p>
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700">Tags (comma separated)</label>
                                    <input
                                      type="text"
                                      value={(area.tags || []).join(', ')}
                                      onChange={(e) => {
                                        const tagsArray = e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag);
                                        handleArrayItemChange('homepage.servingAreas', index, { ...area, tags: tagsArray });
                                      }}
                                      placeholder="e.g., Weather Resistant, Local Roofers, etc."
                                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700">CTA Text</label>
                                    <input
                                      type="text"
                                      value={area.ctaText || ''}
                                      onChange={(e) => handleArrayItemChange('homepage.servingAreas', index, { ...area, ctaText: e.target.value })}
                                      placeholder="e.g., Get a Free Quote"
                                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700">CTA Link</label>
                                    <input
                                      type="text"
                                      value={area.ctaLink || ''}
                                      onChange={(e) => handleArrayItemChange('homepage.servingAreas', index, { ...area, ctaLink: e.target.value })}
                                      placeholder="e.g., /contact"
                                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                  </div>
                                </div>
                              </div>
                            ))}
                            <button
                              onClick={() => {
                                const newArea = {
                                  name: 'New Area',
                                  description: 'Description of services in this area',
                                  image: '/images/areas/residential1.jpg',
                                  tags: ['Tag 1', 'Tag 2'],
                                  ctaText: 'Request a Free Quote',
                                  ctaLink: '/contact'
                                };
                                const areas = content.homepage.servingAreas || [];
                                handleArrayItemChange('homepage.servingAreas', areas.length, newArea);
                              }}
                              className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                            >
                              Add Area
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="p-4 bg-amber-50 rounded-lg border border-amber-200 mb-8">
                      <h3 className="text-xl font-bold text-amber-700 mb-4">FAQ Section</h3>
                      <p className="text-amber-600 mb-6">Edit the section title, description, and FAQ items for the FAQ section.</p>
                      
                      {/* Initialize the FAQ section object if it doesn't exist */}
                      {!content.homepage.faqSection && (
                        <button
                          onClick={() => handleContentChange('homepage.faqSection', {
                            title: "Frequently Asked Questions",
                            description: "Find answers to common questions about our roofing services and solutions."
                          })}
                          className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700"
                        >
                          Initialize FAQ Section
                        </button>
                      )}
                      
                      {content.homepage.faqSection && (
                        <div className="space-y-6">
                          <div className="bg-white p-4 rounded-lg shadow-sm">
                            <div className="space-y-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Section Title</label>
                                <input
                                  type="text"
                                  value={content.homepage.faqSection.title}
                                  onChange={(e) => handleContentChange('homepage.faqSection.title', e.target.value)}
                                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                                  placeholder="e.g., Frequently Asked Questions"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Section Description</label>
                                <textarea
                                  value={content.homepage.faqSection.description}
                                  onChange={(e) => handleContentChange('homepage.faqSection.description', e.target.value)}
                                  rows={3}
                                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                                  placeholder="Description text that appears below the section title"
                                />
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">FAQ Items</label>
                            {(content.homepage.faqs || []).map((faq, index) => (
                              <div key={index} className="mb-4 p-4 border rounded">
                                <div className="flex justify-between mb-2">
                                  <h4 className="font-medium">FAQ {index + 1}</h4>
                                  <button
                                    onClick={() => handleArrayItemChange('homepage.faqs', index, null)}
                                    className="text-red-600 hover:text-red-800"
                                  >
                                    Remove
                                  </button>
                                </div>
                                <div className="space-y-3">
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700">Question</label>
                                    <input
                                      type="text"
                                      value={faq.question || ''}
                                      onChange={(e) => handleArrayItemChange('homepage.faqs', index, { ...faq, question: e.target.value })}
                                      placeholder="e.g., How long does a typical roof installation take?"
                                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700">Answer</label>
                                    <textarea
                                      value={faq.answer || ''}
                                      onChange={(e) => handleArrayItemChange('homepage.faqs', index, { ...faq, answer: e.target.value })}
                                      placeholder="Detailed answer to the question"
                                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                                      rows={5}
                                    />
                                  </div>
                                </div>
                              </div>
                            ))}
                            <button
                              onClick={() => {
                                const newFaq = {
                                  question: 'New Question',
                                  answer: 'Detailed answer to the question'
                                };
                                const faqs = content.homepage.faqs || [];
                                handleArrayItemChange('homepage.faqs', faqs.length, newFaq);
                              }}
                              className="mt-2 px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700"
                            >
                              Add FAQ
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="p-4 bg-purple-50 rounded-lg border border-purple-200 mb-8">
                      <h3 className="text-xl font-bold text-purple-700 mb-4">Gallery Section</h3>
                      <p className="text-purple-600 mb-6">Edit the title and description for the gallery section. <strong>Note:</strong> The gallery will only display on the website if there are images in the <code className="bg-gray-100 p-1 rounded">public/images/client-images</code> folder.</p>
                      
                      {/* Alert explaining how the gallery works */}
                      <div className="bg-blue-50 p-4 rounded-lg mb-6 border border-blue-200">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M18 10a8 8 0 100-16 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div className="ml-3">
                            <h3 className="text-sm font-medium text-blue-800">How the Gallery Works</h3>
                            <div className="mt-2 text-sm text-blue-700">
                              <ul className="list-disc pl-5 space-y-1">
                                <li>Upload your images to the <code className="bg-gray-100 p-1 rounded">public/images/client-images</code> folder on your server</li>
                                <li>Supported formats: JPG, JPEG, PNG, GIF, WebP</li>
                                <li>The gallery section will automatically appear on your homepage when images are detected</li>
                                <li>If no images are found, the gallery section will not be displayed</li>
                                <li>Images will be arranged in a responsive grid and can be clicked to view full-size</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Initialize the gallery section object if it doesn't exist */}
                      {!content.homepage.gallerySection && (
                        <button
                          onClick={() => handleContentChange('homepage.gallerySection', {
                            title: "Our Portfolio",
                            description: "Browse through our gallery of completed projects showcasing our craftsmanship and attention to detail."
                          })}
                          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                        >
                          Initialize Gallery Section
                        </button>
                      )}
                      
                      {content.homepage.gallerySection && (
                        <div className="space-y-6">
                          <div className="bg-white p-4 rounded-lg shadow-sm">
                            <div className="space-y-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Section Title</label>
                                <input
                                  type="text"
                                  value={content.homepage.gallerySection.title}
                                  onChange={(e) => handleContentChange('homepage.gallerySection.title', e.target.value)}
                                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                                  placeholder="e.g., Our Portfolio"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Section Description</label>
                                <textarea
                                  value={content.homepage.gallerySection.description}
                                  onChange={(e) => handleContentChange('homepage.gallerySection.description', e.target.value)}
                                  rows={3}
                                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                                  placeholder="Description text that appears below the section title"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
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
                            <input
                              type="text"
                              value={testimonial.quote}
                              onChange={(e) => handleArrayItemChange('homepage.testimonials', index, { ...testimonial, quote: e.target.value })}
                              placeholder="Testimonial text"
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                            <input
                              type="text"
                              value={testimonial.author}
                              onChange={(e) => handleArrayItemChange('homepage.testimonials', index, { ...testimonial, author: e.target.value })}
                              placeholder="Author"
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                          </div>
                        </div>
                      ))}
                      <button
                        onClick={() => handleArrayItemChange('homepage.testimonials', content.homepage.testimonials.length, { quote: '', author: '', role: '' })}
                        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        Add Testimonial
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === 'design' && (
                  <div className="space-y-8">
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 mb-8">
                      <h3 className="text-xl font-bold text-gray-700 mb-4">Brand Colors</h3>
                      <p className="text-gray-600 mb-6">Set your brand colors that will be used throughout the site. The primary color will be used for buttons, links, and highlights.</p>
                      
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Primary Color</label>
                          <div className="flex items-center gap-4">
                            <input
                              type="color"
                              value={content.theme?.primaryColor || '#3b82f6'}
                              onChange={(e) => handleNestedChange('theme.primaryColor', e.target.value)}
                              className="h-10 w-20 rounded border border-gray-300"
                            />
                            <input
                              type="text"
                              value={content.theme?.primaryColor || '#3b82f6'}
                              onChange={(e) => handleNestedChange('theme.primaryColor', e.target.value)}
                              className="block w-40 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                              placeholder="#3b82f6"
                            />
                            <span className="text-sm text-gray-500">Used for buttons, links, and accents</span>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Secondary Color</label>
                          <div className="flex items-center gap-4">
                            <input
                              type="color"
                              value={content.theme?.secondaryColor || '#1e2756'}
                              onChange={(e) => handleNestedChange('theme.secondaryColor', e.target.value)}
                              className="h-10 w-20 rounded border border-gray-300"
                            />
                            <input
                              type="text"
                              value={content.theme?.secondaryColor || '#1e2756'}
                              onChange={(e) => handleNestedChange('theme.secondaryColor', e.target.value)}
                              className="block w-40 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                              placeholder="#1e2756"
                            />
                            <span className="text-sm text-gray-500">Used for headers, footers, and backgrounds</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-8 p-4 bg-white rounded-lg border border-gray-200">
                        <h4 className="font-medium text-gray-700 mb-4">Preview</h4>
                        <div className="space-y-4">
                          <div className="flex flex-wrap gap-4">
                            <div 
                              className="w-32 h-32 rounded-lg flex items-center justify-center text-white font-medium"
                              style={{ backgroundColor: content.theme?.primaryColor || '#3b82f6' }}
                            >
                              Primary Color
                            </div>
                            <div 
                              className="w-32 h-32 rounded-lg flex items-center justify-center text-white font-medium"
                              style={{ backgroundColor: content.theme?.secondaryColor || '#1e2756' }}
                            >
                              Secondary Color
                            </div>
                          </div>
                          
                          <div>
                            <h5 className="font-medium text-gray-600 mb-2">Sample Elements with Your Colors</h5>
                            <div className="space-y-4 p-4 border rounded-lg">
                              <button 
                                className="px-4 py-2 rounded text-white"
                                style={{ backgroundColor: content.theme?.primaryColor || '#3b82f6' }}
                              >
                                Primary Button
                              </button>
                              <button 
                                className="px-4 py-2 rounded text-white ml-4"
                                style={{ backgroundColor: content.theme?.secondaryColor || '#1e2756' }}
                              >
                                Secondary Button
                              </button>
                              
                              <div className="flex items-center space-x-2 mt-4">
                                <span>Text with </span>
                                <a 
                                  href="#" 
                                  className="underline"
                                  style={{ color: content.theme?.primaryColor || '#3b82f6' }}
                                >
                                  colored link
                                </a>
                              </div>
                              
                              <div 
                                className="mt-4 p-4 rounded-lg text-white"
                                style={{ backgroundColor: content.theme?.secondaryColor || '#1e2756' }}
                              >
                                <h3 className="text-lg font-medium">Header Background</h3>
                                <p>This shows how your secondary color looks as a background.</p>
                              </div>
                              
                              <div className="mt-4 p-4 rounded-lg border">
                                <h3 
                                  className="text-lg font-medium"
                                  style={{ color: content.theme?.primaryColor || '#3b82f6' }}
                                >
                                  Heading with Primary Color
                                </h3>
                                <p>Regular text remains in a neutral color for readability.</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <h3 className="text-xl font-bold text-gray-700 mb-4">Header Colors</h3>
                      <p className="text-gray-600 mb-6">Customize the colors used in the website header.</p>
                      
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Background Color</label>
                          <div className="flex items-center gap-4">
                            <input
                              type="color"
                              value={content.theme?.header?.backgroundColor || '#1e2756'}
                              onChange={(e) => handleNestedChange('theme.header.backgroundColor', e.target.value)}
                              className="h-10 w-20 rounded border border-gray-300"
                            />
                            <input
                              type="text"
                              value={content.theme?.header?.backgroundColor || '#1e2756'}
                              onChange={(e) => handleNestedChange('theme.header.backgroundColor', e.target.value)}
                              className="block w-40 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Text Color</label>
                          <div className="flex items-center gap-4">
                            <input
                              type="color"
                              value={content.theme?.header?.textColor || '#ffffff'}
                              onChange={(e) => handleNestedChange('theme.header.textColor', e.target.value)}
                              className="h-10 w-20 rounded border border-gray-300"
                            />
                            <input
                              type="text"
                              value={content.theme?.header?.textColor || '#ffffff'}
                              onChange={(e) => handleNestedChange('theme.header.textColor', e.target.value)}
                              className="block w-40 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Link Color</label>
                          <div className="flex items-center gap-4">
                            <input
                              type="color"
                              value={content.theme?.header?.linkColor || '#4B5563'}
                              onChange={(e) => handleNestedChange('theme.header.linkColor', e.target.value)}
                              className="h-10 w-20 rounded border border-gray-300"
                            />
                            <input
                              type="text"
                              value={content.theme?.header?.linkColor || '#4B5563'}
                              onChange={(e) => handleNestedChange('theme.header.linkColor', e.target.value)}
                              className="block w-40 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Link Hover Color</label>
                          <div className="flex items-center gap-4">
                            <input
                              type="color"
                              value={content.theme?.header?.linkHoverColor || '#3b82f6'}
                              onChange={(e) => handleNestedChange('theme.header.linkHoverColor', e.target.value)}
                              className="h-10 w-20 rounded border border-gray-300"
                            />
                            <input
                              type="text"
                              value={content.theme?.header?.linkHoverColor || '#3b82f6'}
                              onChange={(e) => handleNestedChange('theme.header.linkHoverColor', e.target.value)}
                              className="block w-40 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'header' && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Business Hours</label>
                      <input
                        type="text"
                        value={content.header?.businessHours || ''}
                        onChange={(e) => handleNestedChange('header.businessHours', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="e.g., Mon-Fri: 8am-6pm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Insurance Text</label>
                      <input
                        type="text"
                        value={content.header?.insuranceText || ''}
                        onChange={(e) => handleNestedChange('header.insuranceText', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="e.g., Fully Insured"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Experience Text</label>
                      <input
                        type="text"
                        value={content.header?.experienceText || ''}
                        onChange={(e) => handleNestedChange('header.experienceText', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="e.g., 5+ Years Experience"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={content.header?.showTopBar !== false}
                        onChange={(e) => handleNestedChange('header.showTopBar', e.target.checked)}
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label className="text-sm font-medium text-gray-700">Show Top Bar</label>
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