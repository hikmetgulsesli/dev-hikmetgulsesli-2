import { describe, it, expect } from 'vitest';
import { contactFormSchema } from '../types/validation';

describe('ContactFormSchema Validation', () => {
  describe('firstName validation', () => {
    it('should accept valid Turkish first names', () => {
      const result = contactFormSchema.safeParse({
        firstName: 'Elif',
        lastName: 'Yılmaz',
        email: 'elif@reelforge.com',
        subject: 'Proje işbirliği hakkında',
        message: 'Merhaba, projeniz hakkında konuşmak istiyorum. Harika bir iş çıkarmışsınız.',
      });
      expect(result.success).toBe(true);
    });

    it('should accept names with spaces', () => {
      const result = contactFormSchema.safeParse({
        firstName: 'Ahmet Kaan',
        lastName: 'Demir',
        email: 'ahmet@techstudio.io',
        subject: 'Freelance teklif',
        message: 'Merhaba, web sitesi yaptırmak istiyorum. Bütçem 10.000 TL civarında.',
      });
      expect(result.success).toBe(true);
    });

    it('should reject names shorter than 2 characters', () => {
      const result = contactFormSchema.safeParse({
        firstName: 'A',
        lastName: 'Yılmaz',
        email: 'test@test.com',
        subject: 'Test konu',
        message: 'Test mesajı 20 karakterden uzun olmalıdır.',
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toContain('firstName');
      }
    });

    it('should reject names longer than 50 characters', () => {
      const result = contactFormSchema.safeParse({
        firstName: 'A'.repeat(51),
        lastName: 'Yılmaz',
        email: 'test@test.com',
        subject: 'Test konu',
        message: 'Test mesajı 20 karakterden uzun olmalıdır.',
      });
      expect(result.success).toBe(false);
    });

    it('should reject names with numbers', () => {
      const result = contactFormSchema.safeParse({
        firstName: 'Elif123',
        lastName: 'Yılmaz',
        email: 'test@test.com',
        subject: 'Test konu',
        message: 'Test mesajı 20 karakterden uzun olmalıdır.',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('lastName validation', () => {
    it('should accept valid Turkish last names', () => {
      const result = contactFormSchema.safeParse({
        firstName: 'Elif',
        lastName: 'Yılmaz',
        email: 'elif@reelforge.com',
        subject: 'Proje işbirliği',
        message: 'Merhaba, projeniz hakkında konuşmak istiyorum. Harika bir iş çıkarmışsınız.',
      });
      expect(result.success).toBe(true);
    });

    it('should reject last names shorter than 2 characters', () => {
      const result = contactFormSchema.safeParse({
        firstName: 'Elif',
        lastName: 'Y',
        email: 'test@test.com',
        subject: 'Test konu',
        message: 'Test mesajı 20 karakterden uzun olmalıdır.',
      });
      expect(result.success).toBe(false);
    });

    it('should reject last names longer than 50 characters', () => {
      const result = contactFormSchema.safeParse({
        firstName: 'Elif',
        lastName: 'Y'.repeat(51),
        email: 'test@test.com',
        subject: 'Test konu',
        message: 'Test mesajı 20 karakterden uzun olmalıdır.',
      });
      expect(result.success).toBe(false);
    });

    it('should reject names with special characters', () => {
      const result = contactFormSchema.safeParse({
        firstName: 'Elif',
        lastName: 'Yılmaz@123',
        email: 'test@test.com',
        subject: 'Test konu',
        message: 'Test mesajı 20 karakterden uzun olmalıdır.',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('email validation', () => {
    it('should accept valid email formats', () => {
      const validEmails = [
        'elif@reelforge.com',
        'ahmet.kaya@techstudio.io',
        'user123@company.co.uk',
        'test+alias@gmail.com',
      ];
      validEmails.forEach((email) => {
        const result = contactFormSchema.safeParse({
          firstName: 'Elif',
          lastName: 'Yılmaz',
          email,
          subject: 'Proje işbirliği',
          message: 'Merhaba, projeniz hakkında konuşmak istiyorum. Harika bir iş çıkarmışsınız.',
        });
        expect(result.success).toBe(true);
      });
    });

    it('should reject invalid email formats', () => {
      const invalidEmails = [
        'notanemail',
        '@nodomain.com',
        'spaces in@email.com',
        'test@',
        'test',
      ];
      invalidEmails.forEach((email) => {
        const result = contactFormSchema.safeParse({
          firstName: 'Elif',
          lastName: 'Yılmaz',
          email,
          subject: 'Proje işbirliği',
          message: 'Merhaba, projeniz hakkında konuşmak istiyorum. Harika bir iş çıkarmışsınız.',
        });
        expect(result.success).toBe(false);
      });
    });

    it('should reject emails shorter than 5 characters', () => {
      const result = contactFormSchema.safeParse({
        firstName: 'Elif',
        lastName: 'Yılmaz',
        email: 'a@b',
        subject: 'Test konu',
        message: 'Test mesajı 20 karakterden uzun olmalıdır.',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('subject validation', () => {
    it('should accept subjects between 5 and 200 characters', () => {
      const result = contactFormSchema.safeParse({
        firstName: 'Elif',
        lastName: 'Yılmaz',
        email: 'elif@reelforge.com',
        subject: 'Proje işbirliği - Yeni web sitesi tasarımı',
        message: 'Merhaba, projeniz hakkında konuşmak istiyorum. Harika bir iş çıkarmışsınız.',
      });
      expect(result.success).toBe(true);
    });

    it('should reject subjects shorter than 5 characters', () => {
      const result = contactFormSchema.safeParse({
        firstName: 'Elif',
        lastName: 'Yılmaz',
        email: 'elif@reelforge.com',
        subject: 'Test',
        message: 'Merhaba, projeniz hakkında konuşmak istiyorum. Harika bir iş çıkarmışsınız.',
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toContain('subject');
      }
    });

    it('should reject subjects longer than 200 characters', () => {
      const result = contactFormSchema.safeParse({
        firstName: 'Elif',
        lastName: 'Yılmaz',
        email: 'elif@reelforge.com',
        subject: 'A'.repeat(201),
        message: 'Merhaba, projeniz hakkında konuşmak istiyorum. Harika bir iş çıkarmışsınız.',
      });
      expect(result.success).toBe(false);
    });

    it('should accept exactly 5 character subject', () => {
      const result = contactFormSchema.safeParse({
        firstName: 'Elif',
        lastName: 'Yılmaz',
        email: 'elif@reelforge.com',
        subject: 'Merha',
        message: 'Merhaba, projeniz hakkında konuşmak istiyorum. Harika bir iş çıkarmışsınız.',
      });
      expect(result.success).toBe(true);
    });

    it('should accept exactly 200 character subject', () => {
      const result = contactFormSchema.safeParse({
        firstName: 'Elif',
        lastName: 'Yılmaz',
        email: 'elif@reelforge.com',
        subject: 'A'.repeat(200),
        message: 'Merhaba, projeniz hakkında konuşmak istiyorum. Harika bir iş çıkarmışsınız.',
      });
      expect(result.success).toBe(true);
    });
  });

  describe('message validation', () => {
    it('should accept messages between 20 and 2000 characters', () => {
      const result = contactFormSchema.safeParse({
        firstName: 'Elif',
        lastName: 'Yılmaz',
        email: 'elif@reelforge.com',
        subject: 'Proje işbirliği',
        message: 'Merhaba Hikmet, portföyünüzü inceledim ve çok etkilendim. Özellikle Vesta Dashboard projeniz göze çarpıyor. Web sitem için benzer bir dashboard yaptırmak istiyorum.',
      });
      expect(result.success).toBe(true);
    });

    it('should reject messages shorter than 20 characters', () => {
      const result = contactFormSchema.safeParse({
        firstName: 'Elif',
        lastName: 'Yılmaz',
        email: 'elif@reelforge.com',
        subject: 'Proje işbirliği',
        message: 'Çok kısa mesaj',
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toContain('message');
      }
    });

    it('should reject messages longer than 2000 characters', () => {
      const result = contactFormSchema.safeParse({
        firstName: 'Elif',
        lastName: 'Yılmaz',
        email: 'elif@reelforge.com',
        subject: 'Proje işbirliği',
        message: 'A'.repeat(2001),
      });
      expect(result.success).toBe(false);
    });

    it('should accept exactly 20 character message', () => {
      const result = contactFormSchema.safeParse({
        firstName: 'Elif',
        lastName: 'Yılmaz',
        email: 'elif@reelforge.com',
        subject: 'Proje işbirliği',
        message: 'A'.repeat(20),
      });
      expect(result.success).toBe(true);
    });

    it('should accept exactly 2000 character message', () => {
      const result = contactFormSchema.safeParse({
        firstName: 'Elif',
        lastName: 'Yılmaz',
        email: 'elif@reelforge.com',
        subject: 'Proje işbirliği',
        message: 'A'.repeat(2000),
      });
      expect(result.success).toBe(true);
    });

    it('should accept Turkish characters in message', () => {
      const result = contactFormSchema.safeParse({
        firstName: 'Elif',
        lastName: 'Yılmaz',
        email: 'elif@reelforge.com',
        subject: 'Proje işbirliği',
        message: 'Merhaba, ı İı Ğğ Şş Öö Üü Çç karakterlerini içeren bir mesaj.',
      });
      expect(result.success).toBe(true);
    });
  });

  describe('full form validation', () => {
    it('should accept valid complete form', () => {
      const result = contactFormSchema.safeParse({
        firstName: 'Ahmet',
        lastName: 'Kaya',
        email: 'ahmet@techstudio.io',
        subject: 'Freelance proje teklifi',
        message: 'Merhaba, web sitem için react tabanlı bir dashboard yaptırmak istiyorum. Bütçem 15.000 TL. Detayları konuşabilir miyiz?',
      });
      expect(result.success).toBe(true);
    });

    it('should reject when any required field is missing', () => {
      const result = contactFormSchema.safeParse({
        firstName: 'Elif',
        // missing lastName
        email: 'elif@reelforge.com',
        subject: 'Proje işbirliği',
        message: 'Merhaba, projeniz hakkında konuşmak istiyorum.',
      });
      expect(result.success).toBe(false);
    });

    it('should reject when email is missing', () => {
      const result = contactFormSchema.safeParse({
        firstName: 'Elif',
        lastName: 'Yılmaz',
        // missing email
        subject: 'Proje işbirliği',
        message: 'Merhaba, projeniz hakkında konuşmak istiyorum.',
      });
      expect(result.success).toBe(false);
    });

    it('should reject when subject is missing', () => {
      const result = contactFormSchema.safeParse({
        firstName: 'Elif',
        lastName: 'Yılmaz',
        email: 'elif@reelforge.com',
        // missing subject
        message: 'Merhaba, projeniz hakkında konuşmak istiyorum.',
      });
      expect(result.success).toBe(false);
    });

    it('should reject when message is missing', () => {
      const result = contactFormSchema.safeParse({
        firstName: 'Elif',
        lastName: 'Yılmaz',
        email: 'elif@reelforge.com',
        subject: 'Proje işbirliği',
        // missing message
      });
      expect(result.success).toBe(false);
    });

    it('should return multiple validation errors', () => {
      const result = contactFormSchema.safeParse({
        firstName: '',
        lastName: '',
        email: 'invalid',
        subject: 'Te',
        message: 'Short',
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.length).toBeGreaterThan(1);
      }
    });
  });

  describe('realistic Turkish data', () => {
    it('should accept realistic Turkish contact form data', () => {
      const result = contactFormSchema.safeParse({
        firstName: 'Zeynep',
        lastName: 'Arslan',
        email: 'zeynep.arslan@inovasyonlab.com.tr',
        subject: 'Mobil uygulama geliştirme işbirliği',
        message: 'Merhaba Hikmet Bey, şirketimiz için bir mobil uygulama projesi planlıyoruz. React Native ile hem iOS hem Android için geliştirme yapıyor musunuz? Portföyünüzü inceledik ve oldukça başarılı projeleriniz var. Bir toplantı ayarlayabilir miyiz?',
      });
      expect(result.success).toBe(true);
    });

    it('should accept foreign name contact', () => {
      const result = contactFormSchema.safeParse({
        firstName: 'Marcus',
        lastName: 'Johnson',
        email: 'marcus.j@innovatehub.co.uk',
        subject: 'Collaboration opportunity from UK',
        message: 'Hello Hikmet, I came across your portfolio and was impressed by your work on the Vesta Dashboard. We are looking for a skilled developer for our fintech startup. Would you be available for a video call next week?',
      });
      expect(result.success).toBe(true);
    });
  });
});
