'use client';

import { useState, useEffect } from 'react';
import { fetchContent, saveContent } from '@/utils/client-content.ts';
import Link from 'next/link';

export default function Admin() {
  const [content, setContent] = useState(null);
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

  const handleContentChange = (section, field, value) => {
    setContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleNestedChange = (section, parent, field, value) => {
    setContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [parent]: {
          ...prev[section][parent],
          [field]: value
        }
      }
    }));
  };

  const handleArrayItemChange = (section, index, field, value) => {
    setContent(prev => ({
      ...prev,
      [section]: prev[section].map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const handleSave = async () => {
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

  const renderBusinessTab = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Business Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Business Name
          </label>
          <input
            type="text"
            value={content.business.name}
            onChange={(e) => handleContentChange('business', 'name', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tagline
          </label>
          <input
            type="text"
            value={content.business.tagline}
            onChange={(e) => handleContentChange('business', 'tagline', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={content.business.description}
            onChange={(e) => handleContentChange('business', 'description', e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Logo Path
          </label>
          <input
            type="text"
            value={content.business.logo}
            onChange={(e) => handleContentChange('business', 'logo', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone
          </label>
          <input
            type="text"
            value={content.business.phone}
            onChange={(e) => handleContentChange('business', 'phone', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            value={content.business.email}
            onChange={(e) => handleContentChange('business', 'email', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Address
          </label>
          <input
            type="text"
            value={content.business.address}
            onChange={(e) => handleContentChange('business', 'address', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );

  const renderHomepageTab = () => (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl font-semibold mb-4">Hero Section</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-lg">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              value={content.homepage.hero.title}
              onChange={(e) => handleNestedChange('homepage', 'hero', 'title', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subtitle
            </label>
            <input
              type="text"
              value={content.homepage.hero.subtitle}
              onChange={(e) => handleNestedChange('homepage', 'hero', 'subtitle', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Button Text
            </label>
            <input
              type="text"
              value={content.homepage.hero.buttonText}
              onChange={(e) => handleNestedChange('homepage', 'hero', 'buttonText', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Button URL
            </label>
            <input
              type="text"
              value={content.homepage.hero.buttonUrl}
              onChange={(e) => handleNestedChange('homepage', 'hero', 'buttonUrl', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hero Image Path
            </label>
            <input
              type="text"
              value={content.homepage.hero.image}
              onChange={(e) => handleNestedChange('homepage', 'hero', 'image', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </section>
      
      <section>
        <h2 className="text-xl font-semibold mb-4">Features</h2>
        {content.homepage.features.map((feature, index) => (
          <div key={index} className="mb-6 bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-medium mb-4">Feature {index + 1}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={feature.title}
                  onChange={(e) => handleArrayItemChange('homepage.features', index, 'title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Icon (home, building, tools)
                </label>
                <input
                  type="text"
                  value={feature.icon}
                  onChange={(e) => handleArrayItemChange('homepage.features', index, 'icon', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={feature.description}
                  onChange={(e) => handleArrayItemChange('homepage.features', index, 'description', e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
            </div>
          </div>
        ))}
      </section>
      
      <section>
        <h2 className="text-xl font-semibold mb-4">Testimonials</h2>
        {content.homepage.testimonials.map((testimonial, index) => (
          <div key={index} className="mb-6 bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-medium mb-4">Testimonial {index + 1}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={testimonial.name}
                  onChange={(e) => handleArrayItemChange('homepage.testimonials', index, 'name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Position
                </label>
                <input
                  type="text"
                  value={testimonial.position}
                  onChange={(e) => handleArrayItemChange('homepage.testimonials', index, 'position', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Comment
                </label>
                <textarea
                  value={testimonial.comment}
                  onChange={(e) => handleArrayItemChange('homepage.testimonials', index, 'comment', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image Path
                </label>
                <input
                  type="text"
                  value={testimonial.image}
                  onChange={(e) => handleArrayItemChange('homepage.testimonials', index, 'image', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating (1-5)
                </label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={testimonial.rating}
                  onChange={(e) => handleArrayItemChange('homepage.testimonials', index, 'rating', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsPreviewMode(!isPreviewMode)}
              className="text-blue-600 hover:text-blue-800"
            >
              {isPreviewMode ? 'Exit Preview' : 'Preview Site'}
            </button>
            <Link href="/" className="text-gray-600 hover:text-gray-800">
              Back to Site
            </Link>
          </div>
        </div>
      </header>

      {/* Preview iframe */}
      {isPreviewMode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl h-[90vh] flex flex-col">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-semibold">Site Preview</h2>
              <button
                onClick={() => setIsPreviewMode(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                Close
              </button>
            </div>
            <div className="flex-grow p-4">
              <iframe
                src="/"
                className="w-full h-full border"
                title="Website Preview"
              ></iframe>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="mb-8 border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('business')}
              className={`pb-4 px-1 ${
                activeTab === 'business'
                  ? 'border-b-2 border-blue-500 text-blue-600 font-medium'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Business Info
            </button>
            <button
              onClick={() => setActiveTab('homepage')}
              className={`pb-4 px-1 ${
                activeTab === 'homepage'
                  ? 'border-b-2 border-blue-500 text-blue-600 font-medium'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Homepage
            </button>
            <button
              onClick={() => setActiveTab('about')}
              className={`pb-4 px-1 ${
                activeTab === 'about'
                  ? 'border-b-2 border-blue-500 text-blue-600 font-medium'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              About
            </button>
            <button
              onClick={() => setActiveTab('services')}
              className={`pb-4 px-1 ${
                activeTab === 'services'
                  ? 'border-b-2 border-blue-500 text-blue-600 font-medium'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Services
            </button>
            <button
              onClick={() => setActiveTab('contact')}
              className={`pb-4 px-1 ${
                activeTab === 'contact'
                  ? 'border-b-2 border-blue-500 text-blue-600 font-medium'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Contact
            </button>
            <button
              onClick={() => setActiveTab('socials')}
              className={`pb-4 px-1 ${
                activeTab === 'socials'
                  ? 'border-b-2 border-blue-500 text-blue-600 font-medium'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Social Media
            </button>
          </nav>
        </div>

        {/* Content Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          {activeTab === 'business' && renderBusinessTab()}
          {activeTab === 'homepage' && renderHomepageTab()}
          {/* Add other tab content renderers here */}
        </div>

        {/* Save Button */}
        <div className="flex items-center justify-end space-x-4">
          {saveStatus && (
            <span className={`text-sm ${saveStatus.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
              {saveStatus}
            </span>
          )}
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`px-6 py-2 rounded-md font-medium ${
              isSaving
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
} 