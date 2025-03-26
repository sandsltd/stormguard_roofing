import { NextRequest, NextResponse } from 'next/server';
import { getContent, saveContent } from '@/utils/server-content';

// Set revalidation time to 1 hour (3600 seconds)
export const revalidate = 3600;

export async function GET() {
  try {
    const content = getContent();
    return NextResponse.json({ success: true, data: content });
  } catch (error) {
    console.error('Error fetching content:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch content' },
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
    
    // Save content
    await saveContent(body);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating content:', error);
    return NextResponse.json(
      { error: 'Failed to update content' },
      { status: 500 }
    );
  }
} 