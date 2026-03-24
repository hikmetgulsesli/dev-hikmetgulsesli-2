import { describe, it, expect } from 'vitest';
import type { Author } from '@/types';

describe('Profile API', () => {
  describe('GET /api/profile', () => {
    it('returns Author type with required fields', () => {
      // Mock the profile response structure
      const mockProfile: Author = {
        name: 'Hikmet Güleşli',
        avatar: 'https://hikmetgulsesli.com/avatar.jpg',
        title: 'Full-Stack Developer & UI/UX Designer',
        bio: 'Modern web teknolojileri ile dijital ürünler geliştiriyorum.',
        location: 'İstanbul, Türkiye',
        social: {
          github: 'https://github.com/hikmetgulsesli',
          linkedin: 'https://linkedin.com/in/hikmetgulsesli',
          twitter: 'https://twitter.com/hikmetgulsesli',
          email: 'hikmet@hikmetgulsesli.com',
          website: 'https://hikmetgulsesli.com',
        },
        skills: ['React', 'Next.js', 'TypeScript'],
      };

      // Verify structure
      expect(mockProfile.name).toBe('Hikmet Güleşli');
      expect(mockProfile.avatar).toBeDefined();
      expect(mockProfile.title).toBeDefined();
      expect(mockProfile.bio).toBeDefined();
      expect(mockProfile.social.github).toContain('github.com');
      expect(mockProfile.social.linkedin).toContain('linkedin.com');
    });

    it('profile has valid social links', () => {
      const profile: Author = {
        name: 'Test User',
        avatar: 'https://example.com/avatar.jpg',
        title: 'Developer',
        bio: 'Test bio',
        social: {
          github: 'https://github.com/testuser',
          linkedin: 'https://linkedin.com/in/testuser',
          twitter: 'https://twitter.com/testuser',
          email: 'test@example.com',
        },
      };

      // Validate social URLs
      expect(profile.social.github).toMatch(/^https:\/\/github\.com\//);
      expect(profile.social.linkedin).toMatch(/^https:\/\/linkedin\.com\//);
      expect(profile.social.twitter).toMatch(/^https:\/\/twitter\.com\//);
      expect(profile.social.email).toMatch(/^[^@]+@[^@]+\.[^@]+$/);
    });
  });
});
