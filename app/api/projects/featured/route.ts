import { NextRequest, NextResponse } from 'next/server';
import { getFeaturedProjects } from '@/lib/projects';
import type { ApiResponse, Project } from '@/types';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get('limit') ?? '6', 10);
  
  // Enforce max 6 items
  const effectiveLimit = Math.min(limit, 6);
  
  const projects = await getFeaturedProjects(effectiveLimit);
  
  const response: ApiResponse<Project[]> = {
    success: true,
    data: projects
  };
  
  return NextResponse.json(response);
}
