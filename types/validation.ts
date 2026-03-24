import { z } from 'zod';

// Contact form validation schema
// firstName: 2-50 letters only
// lastName: 2-50 letters only
// email: valid email format
// subject: 5-200 characters
// message: 20-2000 characters
export const contactFormSchema = z.object({
  firstName: z
    .string()
    .min(2, 'Ad en az 2 karakter olmalıdır')
    .max(50, 'Ad en fazla 50 karakter olabilir')
    .regex(/^[a-zA-ZÇçĞğıİÖöŞşÜü\s]+$/, 'Ad sadece harf içerebilir'),

  lastName: z
    .string()
    .min(2, 'Soyad en az 2 karakter olmalıdır')
    .max(50, 'Soyad en fazla 50 karakter olabilir')
    .regex(/^[a-zA-ZÇçĞğıİÖöŞşÜü\s]+$/, 'Soyad sadece harf içerebilir'),

  email: z
    .string()
    .min(5, 'E-posta en az 5 karakter olmalıdır')
    .max(100, 'E-posta en fazla 100 karakter olabilir')
    .email('Geçerli bir e-posta adresi giriniz'),

  subject: z
    .string()
    .min(5, 'Konu en az 5 karakter olmalıdır')
    .max(200, 'Konu en fazla 200 karakter olabilir'),

  message: z
    .string()
    .min(20, 'Mesaj en az 20 karakter olmalıdır')
    .max(2000, 'Mesaj en fazla 2000 karakter olabilir'),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;
