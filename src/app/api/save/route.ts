import { NextRequest, NextResponse } from 'next/server';
import { updateContent as saveContent } from '@/utils/content';

export async function POST(request: NextRequest) {
  try {
    // Parse the JSON body from the request
    const body = await request.json();

    // Validate that the request body contains valid content
    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { success: false, error: 'Invalid content data' },
        { status: 400 }
      );
    }

    // Use the updateContent function from our utils to save the content
    await saveContent(body);

    // Return a success response
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving content:', error);
    
    return NextResponse.json(
      { success: false, error: 'Failed to save content data' },
      { status: 500 }
    );
  }
} 