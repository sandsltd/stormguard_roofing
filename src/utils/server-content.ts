import fs from 'fs';
import path from 'path';

const contentPath = path.join(process.cwd(), 'src/data/content.json');

export async function getContent() {
  try {
    const fileContent = await fs.promises.readFile(contentPath, 'utf8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Error reading content:', error);
    throw new Error('Failed to read content');
  }
}

export async function updateContent(content: any) {
  try {
    // Ensure the directory exists
    const dir = path.dirname(contentPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Write the content to the file
    await fs.promises.writeFile(
      contentPath,
      JSON.stringify(content, null, 2),
      'utf8'
    );
    return true;
  } catch (error) {
    console.error('Error writing content:', error);
    throw new Error('Failed to write content');
  }
} 