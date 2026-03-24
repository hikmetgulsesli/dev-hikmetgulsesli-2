import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import type { ContactFormData } from '@/types';

// Simple in-memory rate limiting: Map<ip, { count: number, resetTime: number }>
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 5; // 5 requests
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds

function getRateLimitInfo(ip: string): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  // If no entry or entry has expired, create new one
  if (!entry || now > entry.resetTime) {
    const resetTime = now + RATE_LIMIT_WINDOW;
    rateLimitMap.set(ip, { count: 1, resetTime });
    return { allowed: true, remaining: RATE_LIMIT - 1, resetTime };
  }

  // If under limit, increment
  if (entry.count < RATE_LIMIT) {
    entry.count++;
    return { allowed: true, remaining: RATE_LIMIT - entry.count, resetTime: entry.resetTime };
  }

  // Rate limited
  return { allowed: false, remaining: 0, resetTime: entry.resetTime };
}

// Zod schema for contact form validation
const contactSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(50, 'First name is too long'),
  lastName: z.string().min(1, 'Last name is required').max(50, 'Last name is too long'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(1, 'Subject is required').max(200, 'Subject is too long'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(5000, 'Message is too long'),
});

export async function POST(request: NextRequest) {
  // Get client IP for rate limiting
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
             request.headers.get('x-real-ip') || 
             'unknown';

  // Check rate limit
  const rateLimitInfo = getRateLimitInfo(ip);
  
  if (!rateLimitInfo.allowed) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'RATE_LIMITED',
          message: 'Too many requests. Please try again later.',
          details: {
            retryAfter: Math.ceil((rateLimitInfo.resetTime - Date.now()) / 1000),
          },
        },
      },
      {
        status: 429,
        headers: {
          'Retry-After': String(Math.ceil((rateLimitInfo.resetTime - Date.now()) / 1000)),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': String(rateLimitInfo.resetTime),
        },
      }
    );
  }

  try {
    const body = await request.json();

    // Validate request body with Zod
    const validationResult = contactSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid form data',
            details: validationResult.error.flatten().fieldErrors,
          },
        },
        { status: 400 }
      );
    }

    const contactData: ContactFormData = validationResult.data;

    // In a real application, you would:
    // 1. Send email notification
    // 2. Store in database
    // 3. Send to CRM
    // For now, we'll just log and return success
    console.log('Contact form submission:', contactData);

    return NextResponse.json(
      {
        success: true,
        data: {
          message: 'Thank you for your message. I will get back to you soon.',
          submissionId: `sub-${Date.now()}`,
        },
      },
      {
        headers: {
          'X-RateLimit-Remaining': String(rateLimitInfo.remaining),
          'X-RateLimit-Reset': String(rateLimitInfo.resetTime),
        },
      }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'An unexpected error occurred. Please try again.',
        },
      },
      { status: 500 }
    );
  }
}
