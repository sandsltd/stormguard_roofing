// Import the saveContent function from our utilities
import { saveContent } from '../../utils/content.js';

/**
 * API handler for saving content
 * Accepts POST requests with JSON content data
 */
export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed', success: false });
  }

  try {
    // Get the content data from the request body
    const contentData = req.body;

    // Validate that the request body contains valid content
    if (!contentData || typeof contentData !== 'object') {
      return res.status(400).json({ error: 'Invalid content data', success: false });
    }

    // Use the saveContent function to write the data to content.json
    await saveContent(contentData);

    // Return a success response
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error saving content:', error);
    
    // Return an error response
    return res.status(500).json({ 
      error: 'Failed to save content data', 
      message: error.message,
      success: false 
    });
  }
} 