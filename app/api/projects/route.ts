import { NextRequest, NextResponse } from 'next/server';
import { getAllProjects, searchProjects, filterProjectsByCategory, filterFeaturedProjects } from '@/lib/projects';
import type { ApiResponse, PaginatedResponse, Project } from '@/types';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  
  const page = parseInt(searchParams.get('page') ?? '1', 10);
  const limit = parseInt(searchParams.get('limit') ?? '10', 10);
  const category = searchParams.get('category');
  const featured = searchParams.get('featured');
  const search = searchParams.get('search');
  
  let projects = await getAllProjects();
  
  // Apply category filter
  if (category) {
    projects = filterProjectsByCategory(projects, category);
  }
  
  // Apply featured filter
  if (featured === 'true') {
    projects = filterFeaturedProjects(projects);
  }
  
  // Apply search filter
  if (search) {
    projects = await searchProjects(search);
  }
  
  // Calculate pagination
  const total = projects.length;
  const totalPages = Math.ceil(total / limit);
  const offset = (page - 1) * limit;
  const paginatedProjects = projects.slice(offset, offset + limit);
  
  const pagination = {
    page,
    limit,
    total,
    totalPages,
    hasNext: page < totalPages,
    hasPrev: page > 1
  };
  
  const response: ApiResponse<PaginatedResponse<Project>> = {
    success: true,
    data: {
      data: paginatedProjects,
      pagination
    }
  };
  
  return NextResponse.json(response);
}
