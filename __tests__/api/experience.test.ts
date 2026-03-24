import { describe, it, expect } from 'vitest';
import { getAllExperience, filterExperienceByCategory } from '@/lib/experience';

describe('Experience API', () => {
  describe('getAllExperience', () => {
    it('should return all experiences sorted by startDate descending', async () => {
      const experiences = await getAllExperience();
      
      expect(experiences).toBeDefined();
      expect(Array.isArray(experiences)).toBe(true);
      expect(experiences.length).toBeGreaterThan(0);
      
      // Verify sorted by startDate descending
      for (let i = 0; i < experiences.length - 1; i++) {
        const current = new Date(experiences[i].startDate);
        const next = new Date(experiences[i + 1].startDate);
        expect(current.getTime()).toBeGreaterThanOrEqual(next.getTime());
      }
    });

    it('should return experience with required fields', async () => {
      const experiences = await getAllExperience();
      const first = experiences[0];
      
      expect(first.id).toBeDefined();
      expect(first.title).toBeDefined();
      expect(first.company).toBeDefined();
      expect(first.startDate).toBeDefined();
      expect(first.description).toBeDefined();
      expect(first.type).toBeDefined();
    });
  });

  describe('filterExperienceByCategory', () => {
    it('should filter experiences by type', async () => {
      const experiences = await getAllExperience();
      const fullTimeExperiences = filterExperienceByCategory(experiences, 'full-time');
      
      expect(fullTimeExperiences).toBeDefined();
      fullTimeExperiences.forEach(exp => {
        expect(exp.type).toBe('full-time');
      });
    });
  });
});
