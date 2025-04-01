import type { Content } from './content';

/**
 * Fetch content from the API
 * @returns {Promise<Content>} Content data
 */
export async function fetchContent(): Promise<Content> {
  try {
    const response = await fetch('/api/content', {
      // Add cache control headers
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch content: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid content data received');
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching content:', error);
    throw error;
  }
}

/**
 * Save content through the API
 * @param {Content} content - Content data to save
 * @returns {Promise<void>}
 */
export async function saveContent(content: Content): Promise<void> {
  try {
    // Make sure user is authenticated
    const isAuthenticated = sessionStorage.getItem('adminAuthenticated') === 'true';
    if (!isAuthenticated) {
      throw new Error('You must be authenticated to save content');
    }
    
    const response = await fetch('/api/content', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(content),
    });
    
    if (!response.ok) {
      throw new Error('Failed to save content');
    }
  } catch (error) {
    console.error('Error saving content:', error);
    throw error;
  }
} 