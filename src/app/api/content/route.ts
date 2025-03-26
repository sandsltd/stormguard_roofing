import { NextRequest, NextResponse } from 'next/server';
import { getContent, saveContent } from '@/utils/content';

// Set revalidation time to 1 hour (3600 seconds)
export const revalidate = 3600;

export async function GET() {
  try {
    const content = await getContent();
    console.log('GET /api/content - Content loaded:', content);
    return NextResponse.json(content);
  } catch (error) {
    console.error('Error in GET /api/content:', error);
    return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const content = await request.json();
    console.log('POST /api/content - Saving content:', content);
    await saveContent(content);
    console.log('POST /api/content - Content saved successfully');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in POST /api/content:', error);
    return NextResponse.json({ error: 'Failed to save content' }, { status: 500 });
  }
} 