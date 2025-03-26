// Import the getContent function from our utilities
import { getContent } from '../../utils/content.js';

/**
 * API handler for retrieving content
 * Accepts GET requests to fetch the current content data
 */
export default function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed', success: false });
  }

  try {
    // Use the getContent function to read data from content.json
    const contentData = getContent();

    // Return the content data
    return res.status(200).json({ 
      success: true,
      data: contentData
    });
  } catch (error) {
    console.error('Error fetching content:', error);
    
    // Return an error response
    return res.status(500).json({ 
      error: 'Failed to fetch content data', 
      message: error.message,
      success: false 
    });
  }
} 