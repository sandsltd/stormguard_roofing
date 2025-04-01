import { NextRequest, NextResponse } from 'next/server';
import { getContent, saveContent } from '@/utils/content';

// Set revalidation time to 1 hour (3600 seconds)
export const revalidate = 3600;

export async function GET() {
  try {
    const content = await getContent();
    if (!content) {
      throw new Error('No content available');
    }
    return NextResponse.json(content);
  } catch (error) {
    console.error('Error in content API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch content', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const content = await request.json();
    if (!content || typeof content !== 'object') {
      throw new Error('Invalid content data received');
    }
    await saveContent(content);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving content:', error);
    return NextResponse.json(
      { error: 'Failed to save content', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 