import { describe, it, expect } from 'vitest';
import { contactFormSchema } from '@/types/validation';
import { checkRateLimit } from '@/lib/rate-limit';

describe('Contact API', () => {
  describe('contactFormSchema validation', () => {
    const validData = {
      firstName: 'Elif',
      lastName: 'Yılmaz',
      email: 'elif@reelforge.com',
      subject: 'Yeni bir proje fikrim var',
      message: 'Merhaba, yeni bir web projesi için fikirlerimi paylaşmak istiyorum. React ve Next.js kullanarak modern bir uygulama geliştirmek istiyorum.'
    };

    it('should validate correct contact form data', () => {
      const result = contactFormSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should reject firstName with less than 2 characters', () => {
      const result = contactFormSchema.safeParse({
        ...validData,
        firstName: 'A'
      });
      expect(result.success).toBe(false);
    });

    it('should reject lastName with less than 2 characters', () => {
      const result = contactFormSchema.safeParse({
        ...validData,
        lastName: 'B'
      });
      expect(result.success).toBe(false);
    });

    it('should reject invalid email format', () => {
      const result = contactFormSchema.safeParse({
        ...validData,
        email: 'notanemail'
      });
      expect(result.success).toBe(false);
    });

    it('should reject subject with less than 5 characters', () => {
      const result = contactFormSchema.safeParse({
        ...validData,
        subject: 'Hi'
      });
      expect(result.success).toBe(false);
    });

    it('should reject message with less than 20 characters', () => {
      const result = contactFormSchema.safeParse({
        ...validData,
        message: 'Short message'
      });
      expect(result.success).toBe(false);
    });

    it('should reject message with more than 2000 characters', () => {
      const result = contactFormSchema.safeParse({
        ...validData,
        message: 'A'.repeat(2001)
      });
      expect(result.success).toBe(false);
    });

    it('should accept Turkish characters in firstName', () => {
      const result = contactFormSchema.safeParse({
        ...validData,
        firstName: 'Çınar'
      });
      expect(result.success).toBe(true);
    });

    it('should accept spaces and hyphens in names', () => {
      const result = contactFormSchema.safeParse({
        ...validData,
        firstName: "O'Brien-Smith"
      });
      expect(result.success).toBe(true);
    });
  });

  describe('Rate limiting', () => {
    it('should allow first request', () => {
      const testIp = `test-rate-limit-${Date.now()}`;
      const result = checkRateLimit(testIp);
      expect(result.allowed).toBe(true);
      expect(result.remaining).toBe(4); // 5 - 1 = 4
    });

    it('should allow multiple requests within limit', () => {
      const testIp = `test-rate-limit-multiple-${Date.now()}`;
      
      // Make 5 requests
      for (let i = 0; i < 5; i++) {
        const result = checkRateLimit(testIp);
        expect(result.allowed).toBe(true);
      }
    });

    it('should block requests over the limit', () => {
      const testIp = `test-rate-limit-block-${Date.now()}`;
      
      // Make 5 requests (the limit)
      for (let i = 0; i < 5; i++) {
        checkRateLimit(testIp);
      }
      
      // 6th request should be blocked
      const result = checkRateLimit(testIp);
      expect(result.allowed).toBe(false);
      expect(result.remaining).toBe(0);
    });

    it('should track remaining requests correctly', () => {
      const testIp = `test-rate-limit-remaining-${Date.now()}`;
      
      let result = checkRateLimit(testIp);
      expect(result.remaining).toBe(4);
      
      result = checkRateLimit(testIp);
      expect(result.remaining).toBe(3);
      
      result = checkRateLimit(testIp);
      expect(result.remaining).toBe(2);
      
      result = checkRateLimit(testIp);
      expect(result.remaining).toBe(1);
      
      result = checkRateLimit(testIp);
      expect(result.remaining).toBe(0);
    });
  });
});
