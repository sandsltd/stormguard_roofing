// This is a temporary file with the serving areas admin section
// Copy this section into the admin page after the services section
import AreaImagePicker from '@/components/admin/AreaImagePicker';

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
              <h4 className="font-medium">Area {index + 1}: {area.name}</h4>
              <button
                onClick={() => handleArrayItemChange('homepage.servingAreas', index, null)}
                className="text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>
            <div className="space-y-4">
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Area Image</label>
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
              image: '/images/areas/default1.jpg',
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