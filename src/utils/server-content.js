const fs = require('fs');
const path = require('path');

// Path to the content.json file
const contentFilePath = path.join(process.cwd(), 'src/data/content.json');

/**
 * Read content from content.json file
 * @returns {Object} Content data
 */
export function getContent() {
  try {
    const contentFile = fs.readFileSync(contentFilePath, 'utf8');
    return JSON.parse(contentFile);
  } catch (error) {
    console.error('Error reading content file:', error);
    throw new Error('Failed to read content data');
  }
}

/**
 * Save content to content.json file
 * @param {Object} data - Content data to save
 * @returns {Promise<void>}
 */
export async function saveContent(data) {
  try {
    const contentJson = JSON.stringify(data, null, 2);
    fs.writeFileSync(contentFilePath, contentJson, 'utf8');
  } catch (error) {
    console.error('Error writing content file:', error);
    throw new Error('Failed to update content data');
  }
} 