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
      for (let i = 0; i < parts.length - 1; i++) {
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
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
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
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Services</label>
                    {content.services.map((service, index) => (
                      <div key={index} className="mb-4 p-4 border rounded">
                        <div className="flex justify-between mb-2">
                          <h4 className="font-medium">Service {index + 1}</h4>
                          <button
                            onClick={() => handleArrayItemChange('services', index, null)}
                            className="text-red-600 hover:text-red-800"
                          >
                            Remove
                          </button>
                        </div>
                        <div className="space-y-2">
                          <input
                            type="text"
                            value={service.title}
                            onChange={(e) => handleArrayItemChange('services', index, { ...service, title: e.target.value })}
                            placeholder="Title"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                          <textarea
                            value={service.description}
                            onChange={(e) => handleArrayItemChange('services', index, { ...service, description: e.target.value })}
                            placeholder="Description"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            rows={2}
                          />
                          <input
                            type="text"
                            value={service.image}
                            onChange={(e) => handleArrayItemChange('services', index, { ...service, image: e.target.value })}
                            placeholder="Image Path"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Features</label>
                            {service.features.map((feature, featureIndex) => (
                              <div key={featureIndex} className="flex gap-2 mb-2">
                                <input
                                  type="text"
                                  value={feature}
                                  onChange={(e) => {
                                    const newFeatures = [...service.features];
                                    newFeatures[featureIndex] = e.target.value;
                                    handleArrayItemChange('services', index, { ...service, features: newFeatures });
                                  }}
                                  placeholder="Feature"
                                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                                <button
                                  onClick={() => {
                                    const newFeatures = service.features.filter((_, i) => i !== featureIndex);
                                    handleArrayItemChange('services', index, { ...service, features: newFeatures });
                                  }}
                                  className="px-2 py-1 text-red-600 hover:text-red-800"
                                >
                                  Remove
                                </button>
                              </div>
                            ))}
                            <button
                              onClick={() => {
                                const newFeatures = [...service.features, ''];
                                handleArrayItemChange('services', index, { ...service, features: newFeatures });
                              }}
                              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                              Add Feature
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                    <button
                      onClick={() => handleArrayItemChange('services', content.services.length, { title: '', description: '', image: '', features: [] })}
                      className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Add Service
                    </button>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 