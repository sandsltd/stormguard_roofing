'use server';

import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const contentPath = path.join(process.cwd(), 'src/data/content.json');

async function saveContentToFile(content: any) {
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

export async function POST(request: NextRequest) {
  try {
    const content = await request.json();
    
    if (!content || typeof content !== 'object') {
      return NextResponse.json(
        { success: false, error: 'Invalid content data' },
        { status: 400 }
      );
    }

    await saveContentToFile(content);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving content:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save content' },
      { status: 500 }
    );
  }
} 