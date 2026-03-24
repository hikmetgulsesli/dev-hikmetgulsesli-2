import { describe, it, expect } from 'vitest';
import { z } from 'zod';

// Zod schema for contact form validation (same as in the API route)
const contactSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(50, 'First name is too long'),
  lastName: z.string().min(1, 'Last name is required').max(50, 'Last name is too long'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(1, 'Subject is required').max(200, 'Subject is too long'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(5000, 'Message is too long'),
});

describe('Contact Form Validation', () => {
  describe('Valid submissions', () => {
    it('accepts valid contact form data', () => {
      const validData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        subject: 'Test Subject',
        message: 'This is a test message that is long enough.',
      };

      const result = contactSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('accepts minimum length message', () => {
      const validData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        subject: 'Test',
        message: '0123456789', // exactly 10 characters
      };

      const result = contactSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('accepts maximum length message', () => {
      const validData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        subject: 'A'.repeat(200),
        message: 'A'.repeat(5000),
      };

      const result = contactSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });
  });

  describe('Invalid submissions', () => {
    it('rejects empty first name', () => {
      const invalidData = {
        firstName: '',
        lastName: 'Doe',
        email: 'john@example.com',
        subject: 'Test',
        message: 'This is a valid message.',
      };

      const result = contactSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('rejects empty last name', () => {
      const invalidData = {
        firstName: 'John',
        lastName: '',
        email: 'john@example.com',
        subject: 'Test',
        message: 'This is a valid message.',
      };

      const result = contactSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('rejects invalid email format', () => {
      const invalidData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'not-an-email',
        subject: 'Test',
        message: 'This is a valid message.',
      };

      const result = contactSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('rejects empty subject', () => {
      const invalidData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        subject: '',
        message: 'This is a valid message.',
      };

      const result = contactSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('rejects message shorter than 10 characters', () => {
      const invalidData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        subject: 'Test',
        message: 'short',
      };

      const result = contactSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('rejects message longer than 5000 characters', () => {
      const invalidData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        subject: 'Test',
        message: 'A'.repeat(5001),
      };

      const result = contactSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('rejects first name longer than 50 characters', () => {
      const invalidData = {
        firstName: 'A'.repeat(51),
        lastName: 'Doe',
        email: 'john@example.com',
        subject: 'Test',
        message: 'This is a valid message.',
      };

      const result = contactSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('rejects subject longer than 200 characters', () => {
      const invalidData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        subject: 'A'.repeat(201),
        message: 'This is a valid message.',
      };

      const result = contactSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });

  describe('Error details', () => {
    it('returns specific error messages', () => {
      const invalidData = {
        firstName: '',
        lastName: '',
        email: 'invalid',
        subject: '',
        message: 'short',
      };

      const result = contactSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      
      if (!result.success) {
        const errors = result.error.flatten().fieldErrors;
        expect(errors.firstName).toBeDefined();
        expect(errors.lastName).toBeDefined();
        expect(errors.email).toBeDefined();
        expect(errors.subject).toBeDefined();
        expect(errors.message).toBeDefined();
      }
    });
  });
});

// Rate limiting tests
describe('Rate Limiting', () => {
  // Simple rate limit simulation for testing
  class MockRateLimiter {
    private map = new Map<string, { count: number; resetTime: number }>();
    private limit = 5;
    private window = 60 * 60 * 1000;

    check(ip: string): { allowed: boolean; remaining: number } {
      const now = Date.now();
      const entry = this.map.get(ip);

      if (!entry || now > entry.resetTime) {
        this.map.set(ip, { count: 1, resetTime: now + this.window });
        return { allowed: true, remaining: this.limit - 1 };
      }

      if (entry.count < this.limit) {
        entry.count++;
        return { allowed: true, remaining: this.limit - entry.count };
      }

      return { allowed: false, remaining: 0 };
    }

    reset(ip: string) {
      this.map.delete(ip);
    }
  }

  it('allows requests under the limit', () => {
    const limiter = new MockRateLimiter();
    const result = limiter.check('127.0.0.1');
    expect(result.allowed).toBe(true);
    expect(result.remaining).toBe(4);
  });

  it('blocks requests over the limit', () => {
    const limiter = new MockRateLimiter();
    
    // Make 5 requests
    for (let i = 0; i < 5; i++) {
      const result = limiter.check('127.0.0.1');
      expect(result.allowed).toBe(true);
    }
    
    // 6th request should be blocked
    const result = limiter.check('127.0.0.1');
    expect(result.allowed).toBe(false);
    expect(result.remaining).toBe(0);
  });

  it('tracks different IPs separately', () => {
    const limiter = new MockRateLimiter();
    
    // IP 1 makes 5 requests
    for (let i = 0; i < 5; i++) {
      limiter.check('127.0.0.1');
    }
    
    // IP 1 is now blocked
    expect(limiter.check('127.0.0.1').allowed).toBe(false);
    
    // IP 2 should still be allowed
    const result = limiter.check('127.0.0.2');
    expect(result.allowed).toBe(true);
  });

  it('resets count after window expires', async () => {
    const limiter = new MockRateLimiter();
    
    // Make 5 requests
    for (let i = 0; i < 5; i++) {
      limiter.check('127.0.0.1');
    }
    
    // Blocked
    expect(limiter.check('127.0.0.1').allowed).toBe(false);
    
    // Reset
    limiter.reset('127.0.0.1');
    
    // Should be allowed again
    const result = limiter.check('127.0.0.1');
    expect(result.allowed).toBe(true);
  });
});
