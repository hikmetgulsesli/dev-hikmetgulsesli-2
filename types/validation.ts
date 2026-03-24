import { z } from 'zod';

// Contact form validation schema
// firstName: 2-50 letters (with trim), supports Turkish characters, hyphens, apostrophes
// lastName: 2-50 letters (with trim), supports Turkish characters, hyphens, apostrophes
// email: valid email format
// subject: 5-200 characters
// message: 20-2000 characters
export const contactFormSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, 'Ad en az 2 karakter olmalıdır')
    .max(50, 'Ad en fazla 50 karakter olabilir')
    .regex(/^[a-zA-ZÇçĞğıİÖöŞşÜü][a-zA-ZÇçĞğıİÖöŞşÜü\s'-]*$/, 'Ad sadece harf, boşluk, tire ve kesme işareti içerebilir'),

  lastName: z
    .string()
    .trim()
    .min(2, 'Soyad en az 2 karakter olmalıdır')
    .max(50, 'Soyad en fazla 50 karakter olabilir')
    .regex(/^[a-zA-ZÇçĞğıİÖöŞşÜü][a-zA-ZÇçĞğıİÖöŞşÜü\s'-]*$/, 'Soyad sadece harf, boşluk, tire ve kesme işareti içerebilir'),

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

// Derive TypeScript type from schema - single source of truth
export type ContactFormInput = z.infer<typeof contactFormSchema>;

// Re-export ContactFormData as alias for ContactFormInput for compatibility
export type { ContactFormInput as ContactFormData };
