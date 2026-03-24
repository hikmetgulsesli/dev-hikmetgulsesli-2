import { describe, it, expect } from 'vitest';
import { getAuthor } from '@/lib/profile';

describe('Profile API', () => {
  describe('getAuthor', () => {
    it('should return author data', async () => {
      const author = await getAuthor();
      
      expect(author).toBeDefined();
      expect(author.name).toBe('Hikmet Güleşli');
      expect(author.title).toBe('Full-Stack Developer & Sistem Mühendisi');
      expect(author.bio).toBeTruthy();
      expect(author.social).toBeDefined();
      expect(author.social.github).toBe('https://github.com/hikmetgulsesli');
      expect(author.social.linkedin).toBe('https://linkedin.com/in/hikmetgulsesli');
      expect(author.social.email).toBe('hikmet@hikmetgulsesli.com');
    });
  });
});
