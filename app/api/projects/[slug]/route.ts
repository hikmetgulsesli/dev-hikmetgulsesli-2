import { NextRequest, NextResponse } from 'next/server';
import { getProjectBySlug } from '@/lib/projects';
import type { ApiResponse, Project } from '@/types';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  
  const project = await getProjectBySlug(slug);
  
  if (!project) {
    const response: ApiResponse<null> = {
      success: false,
      error: {
        code: 'NOT_FOUND',
        message: `Project with slug "${slug}" not found`
      }
    };
    
    return NextResponse.json(response, { status: 404 });
  }
  
  const response: ApiResponse<Project> = {
    success: true,
    data: project
  };
  
  return NextResponse.json(response);
}
