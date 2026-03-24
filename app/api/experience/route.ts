import { NextResponse } from 'next/server';
import { getAllExperience } from '@/lib/experience';
import type { ApiResponse, Experience } from '@/types';

export async function GET() {
  try {
    const experiences = await getAllExperience();
    
    // Already sorted by startDate descending in lib/experience.ts
    
    const response: ApiResponse<Experience[]> = {
      success: true,
      data: experiences
    };
    
    return NextResponse.json(response);
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Deneyimler yüklenirken bir hata oluştu.'
        }
      },
      { status: 500 }
    );
  }
}
