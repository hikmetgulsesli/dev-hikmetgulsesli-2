// Simple in-memory rate limiter for contact form
// Rate limit: 5 requests per hour per IP

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();

const WINDOW_MS = 60 * 60 * 1000; // 1 hour in milliseconds
const MAX_REQUESTS = 5;

export function checkRateLimit(ip: string): { allowed: boolean; remaining: number; resetIn: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  
  // If no entry or entry has expired, create new entry
  if (!entry || now >= entry.resetTime) {
    rateLimitMap.set(ip, {
      count: 1,
      resetTime: now + WINDOW_MS,
    });
    return { allowed: true, remaining: MAX_REQUESTS - 1, resetIn: WINDOW_MS };
  }
  
  // If within window and under limit, increment
  if (entry.count < MAX_REQUESTS) {
    entry.count += 1;
    return { 
      allowed: true, 
      remaining: MAX_REQUESTS - entry.count, 
      resetIn: entry.resetTime - now 
    };
  }
  
  // Rate limited
  return { 
    allowed: false, 
    remaining: 0, 
    resetIn: entry.resetTime - now 
  };
}

export function getClientIp(request: Request): string {
  // Try to get IP from various headers
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp;
  }
  
  // Fallback to a default for testing
  return '127.0.0.1';
}
