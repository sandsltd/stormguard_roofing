import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function GET(request: NextRequest) {
  try {
    // Extract the path to revalidate from the URL query parameters
    const path = request.nextUrl.searchParams.get('path') || '/';
    
    // Revalidate the path
    revalidatePath(path);
    
    // Return a success response
    return NextResponse.json({ 
      revalidated: true,
      message: `Path "${path}" revalidated successfully`,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error revalidating path:', error);
    
    // Return an error response
    return NextResponse.json({ 
      revalidated: false,
      message: 'Error revalidating path',
      error: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
} 