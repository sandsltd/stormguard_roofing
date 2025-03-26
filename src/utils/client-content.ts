import type { Content } from './content';

/**
 * Fetch content from the API
 * @returns {Promise<Content | null>} Content data
 */
export async function fetchContent(): Promise<Content | null> {
  try {
    const response = await fetch('/api/content');
    if (!response.ok) {
      throw new Error('Failed to fetch content');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching content:', error);
    return null;
  }
}

/**
 * Save content through the API
 * @param {Content} content - Content data to save
 * @returns {Promise<void>}
 */
export async function saveContent(content: Content): Promise<void> {
  try {
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