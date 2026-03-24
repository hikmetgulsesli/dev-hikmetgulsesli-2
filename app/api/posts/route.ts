import { NextRequest, NextResponse } from 'next/server';
import { getAllPosts, searchPosts, filterPostsByCategory, filterPostsByTag } from '@/lib/posts';
import type { ApiResponse, PaginatedResponse, BlogPost } from '@/types';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  
  const page = parseInt(searchParams.get('page') ?? '1', 10);
  const limit = parseInt(searchParams.get('limit') ?? '10', 10);
  const category = searchParams.get('category');
  const tag = searchParams.get('tag');
  const search = searchParams.get('search');
  
  let posts = await getAllPosts();
  
  // Apply category filter
  if (category) {
    posts = filterPostsByCategory(posts, category);
  }
  
  // Apply tag filter
  if (tag) {
    posts = filterPostsByTag(posts, tag);
  }
  
  // Apply search filter
  if (search) {
    posts = await searchPosts(search);
  }
  
  // Calculate pagination
  const total = posts.length;
  const totalPages = Math.ceil(total / limit);
  const offset = (page - 1) * limit;
  const paginatedPosts = posts.slice(offset, offset + limit);
  
  const pagination = {
    page,
    limit,
    total,
    totalPages,
    hasNext: page < totalPages,
    hasPrev: page > 1
  };
  
  const response: ApiResponse<PaginatedResponse<BlogPost>> = {
    success: true,
    data: {
      data: paginatedPosts,
      pagination
    }
  };
  
  return NextResponse.json(response);
}

export async function POST() {
  // Admin stub - in production this would require authentication
  return NextResponse.json(
    { 
      success: false, 
      error: { 
        code: 'UNAUTHORIZED', 
        message: 'Bu işlem için yetkilendirme gereklidir.' 
      } 
    },
    { status: 401 }
  );
}
