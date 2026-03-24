import { NextResponse } from 'next/server';
import { getCategoriesWithCount } from '@/lib/posts';

export async function GET() {
  const categories = await getCategoriesWithCount();
  
  return NextResponse.json({
    success: true,
    data: categories
  });
}
