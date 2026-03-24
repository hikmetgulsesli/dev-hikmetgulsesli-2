import { NextRequest, NextResponse } from 'next/server';
import { getFeaturedPosts } from '@/lib/posts';
import type { ApiResponse, BlogPost } from '@/types';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get('limit') ?? '1', 10);
  
  const posts = await getFeaturedPosts(limit);
  
  const response: ApiResponse<BlogPost[]> = {
    success: true,
    data: posts
  };
  
  return NextResponse.json(response);
}
