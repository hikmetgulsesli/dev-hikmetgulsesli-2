import { NextRequest, NextResponse } from 'next/server';
import { getAllSkills, filterSkillsByCategory } from '@/lib/skills';
import type { ApiResponse, Skill } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    
    let skills = await getAllSkills();
    
    // Apply category filter if provided
    if (category) {
      skills = filterSkillsByCategory(skills, category);
    }
    
    const response: ApiResponse<Skill[]> = {
      success: true,
      data: skills
    };
    
    return NextResponse.json(response);
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Yetenekler yüklenirken bir hata oluştu.'
        }
      },
      { status: 500 }
    );
  }
}
