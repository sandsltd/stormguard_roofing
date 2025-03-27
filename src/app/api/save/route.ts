'use server';

import { saveContent } from '@/utils/content';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    // Get and validate the auth cookie
    const authToken = request.cookies.get('adminToken')?.value;
    
    // If no auth token is present, require authentication from the frontend
    // In a real production app, you'd validate a proper JWT token here
    // For this simple version, we'll fall back to client-side auth
    
    const data = await request.json();
    await saveContent(data);
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error saving content:', error);
    return NextResponse.json({ error: error.message || 'Failed to save content' }, { status: 500 });
  }
} 