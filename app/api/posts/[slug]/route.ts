import { NextRequest, NextResponse } from 'next/server';
import { getPostBySlug } from '@/lib/posts';
import type { ApiResponse, BlogPost } from '@/types';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  
  if (!post) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Belirtilen yazı bulunamadı.'
        }
      },
      { status: 404 }
    );
  }
  
  const response: ApiResponse<BlogPost> = {
    success: true,
    data: post
  };
  
  return NextResponse.json(response);
}
