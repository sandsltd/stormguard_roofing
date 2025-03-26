import { NextRequest, NextResponse } from 'next/server';
import { getContent, updateContent, Content } from '@/utils/content';

export async function GET() {
  try {
    const content = getContent();
    return NextResponse.json(content);
  } catch (error) {
    console.error('Error fetching content:', error);
    return NextResponse.json(
      { error: 'Failed to fetch content' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate content structure
    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { error: 'Invalid content data' },
        { status: 400 }
      );
    }
    
    // Update content
    await updateContent(body as Content);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating content:', error);
    return NextResponse.json(
      { error: 'Failed to update content' },
      { status: 500 }
    );
  }
} 