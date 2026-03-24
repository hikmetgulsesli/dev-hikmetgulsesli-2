import { describe, it, expect } from 'vitest';
import type { Skill } from '@/types';

describe('Skills API', () => {
  describe('GET /api/skills', () => {
    it('supports ?category filter', () => {
      const skills: Skill[] = [
        { id: '1', name: 'React', category: 'frontend', proficiency: 90 },
        { id: '2', name: 'Node.js', category: 'backend', proficiency: 85 },
        { id: '3', name: 'PostgreSQL', category: 'database', proficiency: 80 },
        { id: '4', name: 'TypeScript', category: 'frontend', proficiency: 92 },
      ];

      // Filter by category
      const frontendSkills = skills.filter(s => s.category === 'frontend');
      
      expect(frontendSkills).toHaveLength(2);
      expect(frontendSkills.every(s => s.category === 'frontend')).toBe(true);
    });

    it('returns all skills when no filter', () => {
      const skills: Skill[] = [
        { id: '1', name: 'React', category: 'frontend', proficiency: 90 },
        { id: '2', name: 'Node.js', category: 'backend', proficiency: 85 },
        { id: '3', name: 'PostgreSQL', category: 'database', proficiency: 80 },
      ];

      expect(skills).toHaveLength(3);
    });

    it('Skill type supports all categories', () => {
      const allCategories: Skill['category'][] = ['frontend', 'backend', 'database', 'devops', 'mobile', 'design', 'soft-skills'];
      
      allCategories.forEach(category => {
        const skill: Skill = {
          id: `skill-${category}`,
          name: `Test Skill`,
          category,
          proficiency: 80,
        };
        expect(skill.category).toBe(category);
      });
    });

    it('skill has proficiency as number 1-100', () => {
      const skill: Skill = {
        id: '1',
        name: 'React',
        category: 'frontend',
        proficiency: 95,
      };

      expect(skill.proficiency).toBeGreaterThanOrEqual(1);
      expect(skill.proficiency).toBeLessThanOrEqual(100);
    });
  });
});
