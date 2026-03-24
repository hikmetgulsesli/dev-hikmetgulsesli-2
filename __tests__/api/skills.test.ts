import { describe, it, expect } from 'vitest';
import { getAllSkills, filterSkillsByCategory } from '@/lib/skills';

describe('Skills API', () => {
  describe('getAllSkills', () => {
    it('should return all skills', async () => {
      const skills = await getAllSkills();
      
      expect(skills).toBeDefined();
      expect(Array.isArray(skills)).toBe(true);
      expect(skills.length).toBeGreaterThan(0);
    });

    it('should return skills with required fields', async () => {
      const skills = await getAllSkills();
      const first = skills[0];
      
      expect(first.id).toBeDefined();
      expect(first.name).toBeDefined();
      expect(first.category).toBeDefined();
    });
  });

  describe('filterSkillsByCategory', () => {
    it('should filter skills by category - frontend', async () => {
      const skills = await getAllSkills();
      const frontendSkills = filterSkillsByCategory(skills, 'frontend');
      
      expect(frontendSkills).toBeDefined();
      frontendSkills.forEach(skill => {
        expect(skill.category).toBe('frontend');
      });
    });

    it('should filter skills by category - backend', async () => {
      const skills = await getAllSkills();
      const backendSkills = filterSkillsByCategory(skills, 'backend');
      
      expect(backendSkills).toBeDefined();
      backendSkills.forEach(skill => {
        expect(skill.category).toBe('backend');
      });
    });

    it('should filter skills by category - devops', async () => {
      const skills = await getAllSkills();
      const devopsSkills = filterSkillsByCategory(skills, 'devops');
      
      expect(devopsSkills).toBeDefined();
      devopsSkills.forEach(skill => {
        expect(skill.category).toBe('devops');
      });
    });

    it('should return empty array for non-existent category', async () => {
      const skills = await getAllSkills();
      const nonExistent = filterSkillsByCategory(skills, 'non-existent');
      
      expect(nonExistent).toBeDefined();
      expect(nonExistent.length).toBe(0);
    });
  });
});
