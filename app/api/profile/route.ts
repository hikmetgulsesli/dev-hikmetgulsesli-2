import { NextResponse } from 'next/server';
import { getAuthor } from '@/lib/profile';
import type { ApiResponse, Author } from '@/types';

export async function GET() {
  try {
    const author = await getAuthor();
    
    const response: ApiResponse<Author> = {
      success: true,
      data: author
    };
    
    return NextResponse.json(response);
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Profil yüklenirken bir hata oluştu.'
        }
      },
      { status: 500 }
    );
  }
}
