/**
 * Fetch content from the API
 * @returns {Promise<Object>} Content data
 */
export async function fetchContent() {
  try {
    const response = await fetch('http://localhost:3000/api/content', {
      cache: 'no-store', // Disable caching for server components
      headers: {
        'Accept': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch content');
    }
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('Error fetching content:', error);
    return null;
  }
}

/**
 * Save content through the API
 * @param {Object} content - Content data to save
 * @returns {Promise<void>}
 */
export async function saveContent(content) {
  try {
    const response = await fetch('http://localhost:3000/api/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(content),
    });
    
    if (!response.ok) {
      throw new Error('Failed to save content');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error saving content:', error);
    throw error;
  }
} 