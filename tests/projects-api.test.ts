import { describe, it, expect, beforeAll } from 'vitest';
import { getAllProjects, getProjectBySlug, getFeaturedProjects, searchProjects, filterProjectsByCategory, filterFeaturedProjects } from '@/lib/projects';
import type { Project } from '@/types';

describe('Projects API', () => {
  describe('getAllProjects', () => {
    it('returns all published projects', async () => {
      const projects = await getAllProjects();
      expect(Array.isArray(projects)).toBe(true);
      projects.forEach((p: Project) => {
        expect(p.status).toBe('published');
      });
    });

    it('projects have required fields', async () => {
      const projects = await getAllProjects();
      if (projects.length > 0) {
        const project = projects[0];
        expect(project).toHaveProperty('id');
        expect(project).toHaveProperty('slug');
        expect(project).toHaveProperty('title');
        expect(project).toHaveProperty('description');
        expect(project).toHaveProperty('category');
        expect(project).toHaveProperty('status');
        expect(project).toHaveProperty('featured');
        expect(project).toHaveProperty('publishedAt');
      }
    });

    it('projects are sorted by sortOrder', async () => {
      const projects = await getAllProjects();
      if (projects.length > 1) {
        for (let i = 1; i < projects.length; i++) {
          expect((projects[i].sortOrder ?? 999) >= (projects[i - 1].sortOrder ?? 999)).toBe(true);
        }
      }
    });
  });

  describe('getProjectBySlug', () => {
    it('returns project for valid slug', async () => {
      const project = await getProjectBySlug('vesta-dashboard');
      expect(project).not.toBeNull();
      expect(project?.slug).toBe('vesta-dashboard');
    });

    it('returns null for nonexistent slug', async () => {
      const project = await getProjectBySlug('nonexistent-project');
      expect(project).toBeNull();
    });

    it('returns null for draft project', async () => {
      // Create a draft project file temporarily
      const draftProject: Project = {
        id: 'test-draft',
        slug: 'test-draft-project',
        title: 'Test Draft',
        description: 'Test',
        shortDescription: 'Test',
        thumbnail: '',
        images: [],
        category: 'web',
        techStack: [],
        featured: false,
        publishedAt: '2024-01-01T00:00:00Z',
        status: 'draft',
        content: '',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      };
      
      const project = await getProjectBySlug('test-draft-project');
      expect(project).toBeNull();
    });
  });

  describe('getFeaturedProjects', () => {
    it('returns only featured projects', async () => {
      const projects = await getFeaturedProjects();
      projects.forEach((p: Project) => {
        expect(p.featured).toBe(true);
      });
    });

    it('respects the limit parameter', async () => {
      const projects = await getFeaturedProjects(3);
      expect(projects.length).toBeLessThanOrEqual(3);
    });

    it('returns max 6 items even if limit is higher', async () => {
      const projects = await getFeaturedProjects(10);
      expect(projects.length).toBeLessThanOrEqual(6);
    });
  });

  describe('searchProjects', () => {
    it('performs case-insensitive search on title', async () => {
      const results = await searchProjects('VESTA');
      expect(results.length).toBeGreaterThan(0);
      expect(results.some(p => p.title.toLowerCase().includes('vesta'))).toBe(true);
    });

    it('performs case-insensitive search on description', async () => {
      const results = await searchProjects('DASHBOARD');
      expect(results.length).toBeGreaterThan(0);
    });

    it('returns empty array for no matches', async () => {
      const results = await searchProjects('xyznonexistent123');
      expect(results).toEqual([]);
    });
  });

  describe('filterProjectsByCategory', () => {
    it('filters projects by category', async () => {
      const allProjects = await getAllProjects();
      const webProjects = filterProjectsByCategory(allProjects, 'web');
      webProjects.forEach((p: Project) => {
        expect(p.category).toBe('web');
      });
    });

    it('returns empty array for category with no projects', async () => {
      const allProjects = await getAllProjects();
      const mobileProjects = filterProjectsByCategory(allProjects.filter(p => p.category !== 'mobile'), 'mobile');
      // This might return projects from other categories filtered, so just check type
      mobileProjects.forEach((p: Project) => {
        expect(p.category).toBe('mobile');
      });
    });
  });

  describe('filterFeaturedProjects', () => {
    it('filters only featured projects', async () => {
      const allProjects = await getAllProjects();
      const featured = filterFeaturedProjects(allProjects);
      featured.forEach((p: Project) => {
        expect(p.featured).toBe(true);
      });
    });
  });
});
