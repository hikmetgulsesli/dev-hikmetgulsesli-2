import { NextRequest, NextResponse } from 'next/server';
import { contactFormSchema } from '@/types/validation';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';
import type { ApiResponse, ContactSubmission } from '@/types';

// In-memory store for contact submissions (in production, this would be a database)
const submissions: ContactSubmission[] = [];

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const clientIp = getClientIp(request);
    
    // Check rate limit
    const rateLimitResult = checkRateLimit(clientIp);
    
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'RATE_LIMITED',
            message: 'Çok fazla istek gönderdiniz. Lütfen daha sonra tekrar deneyin.',
            details: {
              remainingTime: `${Math.ceil(rateLimitResult.resetIn / 60000)} dakika`
            }
          }
        } as ApiResponse<never>,
        { 
          status: 429,
          headers: {
            'X-RateLimit-Remaining': String(rateLimitResult.remaining),
            'X-RateLimit-Reset': String(rateLimitResult.resetIn),
          }
        }
      );
    }
    
    // Parse and validate request body
    const body = await request.json();
    const validationResult = contactFormSchema.safeParse(body);
    
    if (!validationResult.success) {
      const errors: Record<string, string> = {};
      validationResult.error.issues.forEach((issue) => {
        const field = issue.path.join('.');
        errors[field] = issue.message;
      });
      
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Form verileri doğrulanamadı.',
            details: errors
          }
        } as ApiResponse<never>,
        { status: 400 }
      );
    }
    
    // Create submission
    const submission: ContactSubmission = {
      ...validationResult.data,
      id: `contact-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      submittedAt: new Date().toISOString(),
      ipAddress: clientIp,
      userAgent: request.headers.get('user-agent') || undefined,
      status: 'new'
    };
    
    // Store submission (in production, this would be saved to a database)
    submissions.push(submission);
    
    return NextResponse.json(
      {
        success: true,
        data: {
          id: submission.id,
          message: 'Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağım.'
        }
      } as ApiResponse<{ id: string; message: string }>,
      { 
        status: 201,
        headers: {
          'X-RateLimit-Remaining': String(rateLimitResult.remaining),
        }
      }
    );
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.'
        }
      } as ApiResponse<never>,
      { status: 500 }
    );
  }
}

// Export submissions for testing
export { submissions };
