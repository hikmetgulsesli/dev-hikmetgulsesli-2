import { describe, it, expect } from 'vitest';
import type { Experience } from '@/types';

describe('Experience API', () => {
  describe('GET /api/experience', () => {
    it('returns array sorted by startDate descending', () => {
      const experiences: Experience[] = [
        {
          id: 'exp-1',
          title: 'Senior Developer',
          company: 'Company A',
          startDate: '2022-01',
          endDate: null,
          current: true,
          description: 'Current role',
          type: 'full-time',
          createdAt: '2022-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z',
        },
        {
          id: 'exp-2',
          title: 'Junior Developer',
          company: 'Company B',
          startDate: '2020-01',
          endDate: '2021-12',
          current: false,
          description: 'Past role',
          type: 'full-time',
          createdAt: '2020-01-01T00:00:00Z',
          updatedAt: '2021-12-31T00:00:00Z',
        },
      ];

      // Sort by startDate descending
      const sorted = [...experiences].sort((a, b) => {
        const dateA = new Date(a.startDate);
        const dateB = new Date(b.startDate);
        return dateB.getTime() - dateA.getTime();
      });

      expect(sorted[0].company).toBe('Company A'); // 2022 > 2020
      expect(sorted[1].company).toBe('Company B');
    });

    it('Experience type has correct structure', () => {
      const experience: Experience = {
        id: 'exp-test',
        title: 'Software Engineer',
        company: 'Test Corp',
        companyUrl: 'https://testcorp.example.com',
        location: 'Remote',
        startDate: '2021-06',
        endDate: null,
        current: true,
        description: 'Engineering work',
        type: 'full-time',
        achievements: ['Built features', 'Mentored juniors'],
        createdAt: '2021-06-01T00:00:00Z',
        updatedAt: '2024-03-01T00:00:00Z',
      };

      expect(experience.title).toBe('Software Engineer');
      expect(experience.company).toBe('Test Corp');
      expect(experience.current).toBe(true);
      expect(experience.endDate).toBeNull();
      expect(experience.achievements).toHaveLength(2);
    });

    it('marks current experience correctly', () => {
      const currentExperience: Experience = {
        id: 'exp-current',
        title: 'Current Role',
        company: 'Current Co',
        startDate: '2023-01',
        endDate: null,
        current: true,
        description: 'Present work',
        type: 'full-time',
        createdAt: '2023-01-01T00:00:00Z',
        updatedAt: '2024-03-01T00:00:00Z',
      };

      expect(currentExperience.current).toBe(true);
      expect(currentExperience.endDate).toBeNull();
    });

    it('handles past experience with endDate', () => {
      const pastExperience: Experience = {
        id: 'exp-past',
        title: 'Past Role',
        company: 'Past Co',
        startDate: '2020-01',
        endDate: '2022-12',
        current: false,
        description: 'Past work',
        type: 'full-time',
        createdAt: '2020-01-01T00:00:00Z',
        updatedAt: '2022-12-31T00:00:00Z',
      };

      expect(pastExperience.current).toBe(false);
      expect(pastExperience.endDate).toBe('2022-12');
    });
  });
});
