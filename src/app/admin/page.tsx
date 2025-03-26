'use client';

import { useState, useEffect } from 'react';
import { fetchContent, saveContent } from '@/utils/client-content.ts';
import type { Content } from '@/types/content';

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
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Hero Title</label>
                      <input
                        type="text"
                        value={content.homepage.heroTitle}
                        onChange={(e) => handleContentChange('homepage.heroTitle', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Hero Subtitle</label>
                      <input
                        type="text"
                        value={content.homepage.heroSubtitle}
                        onChange={(e) => handleContentChange('homepage.heroSubtitle', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Hero Image Path</label>
                      <input
                        type="text"
                        value={content.homepage.heroImage}
                        onChange={(e) => handleContentChange('homepage.heroImage', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
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
                          </div>
                        </div>
                      ))}
                      <button
                        onClick={() => handleArrayItemChange('homepage.features', content.homepage.features.length, { title: '', description: '' })}
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
                          <div className="space-y-2">
                            <input
                              type="text"
                              value={service.title}
                              onChange={(e) => handleArrayItemChange('homepage.services', index, { ...service, title: e.target.value })}
                              placeholder="Title"
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                            <textarea
                              value={service.description}
                              onChange={(e) => handleArrayItemChange('homepage.services', index, { ...service, description: e.target.value })}
                              placeholder="Description"
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                              rows={2}
                            />
                            <input
                              type="text"
                              value={service.image}
                              onChange={(e) => handleArrayItemChange('homepage.services', index, { ...service, image: e.target.value })}
                              placeholder="Image Path"
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                          </div>
                        </div>
                      ))}
                      <button
                        onClick={() => handleArrayItemChange('homepage.services', content.homepage.services.length, { title: '', description: '', image: '' })}
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
                            <input
                              type="text"
                              value={testimonial.name}
                              onChange={(e) => handleArrayItemChange('homepage.testimonials', index, { ...testimonial, name: e.target.value })}
                              placeholder="Name"
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                            <textarea
                              value={testimonial.text}
                              onChange={(e) => handleArrayItemChange('homepage.testimonials', index, { ...testimonial, text: e.target.value })}
                              placeholder="Testimonial Text"
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                              rows={2}
                            />
                            <input
                              type="number"
                              value={testimonial.rating}
                              onChange={(e) => handleArrayItemChange('homepage.testimonials', index, { ...testimonial, rating: parseInt(e.target.value) })}
                              placeholder="Rating (1-5)"
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                          </div>
                        </div>
                      ))}
                      <button
                        onClick={() => handleArrayItemChange('homepage.testimonials', content.homepage.testimonials.length, { name: '', text: '', rating: 5 })}
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 