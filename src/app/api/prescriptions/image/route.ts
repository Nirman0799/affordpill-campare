// src/app/api/prescriptions/image/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const filePath = searchParams.get('path');
  
  if (!filePath) {
    return new NextResponse('File path is required', { status: 400 });
  }
  
  try {
    const supabase = await createClient();
    

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    
    // fetch image
    const { data, error } = await supabase.storage
      .from('prescriptions')
      .download(filePath);
      
    if (error) {
      console.error('Download error:', error);
      return new NextResponse('File not found', { status: 404 });
    }
    

    const headers = new Headers();
    headers.set('Content-Type', data.type);
    headers.set('Cache-Control', 'public, max-age=3600'); // caching
    
    return new NextResponse(data, {
      status: 200,
      headers
    });
  } catch (error) {
    console.error('Error fetching image:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}