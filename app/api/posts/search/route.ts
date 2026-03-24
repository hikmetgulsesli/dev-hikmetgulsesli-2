import { NextRequest, NextResponse } from 'next/server';
import { searchPosts } from '@/lib/posts';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  
  if (!query) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'BAD_REQUEST',
          message: 'Arama sorgusu gereklidir.'
        }
      },
      { status: 400 }
    );
  }
  
  const posts = await searchPosts(query);
  
  const results = posts.slice(0, 5).map(post => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt
  }));
  
  return NextResponse.json({
    success: true,
    data: results
  });
}
