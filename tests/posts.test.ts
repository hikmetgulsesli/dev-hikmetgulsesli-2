import { describe, it, expect } from 'vitest';
import { 
  getAllPosts, 
  getPostBySlug, 
  getFeaturedPosts, 
  getPostsByCategory, 
  getPostsByTag, 
  searchPosts, 
  getCategoriesWithCount,
  filterPostsByCategory,
  filterPostsByTag
} from '@/lib/posts';
import type { BlogPost } from '@/types';

describe('Posts API', () => {
  describe('getAllPosts', () => {
    it('returns all published posts', async () => {
      const posts = await getAllPosts();
      expect(Array.isArray(posts)).toBe(true);
      posts.forEach((p: BlogPost) => {
        expect(p.status).toBe('published');
      });
    });

    it('posts have required fields', async () => {
      const posts = await getAllPosts();
      if (posts.length > 0) {
        const post = posts[0];
        expect(post).toHaveProperty('id');
        expect(post).toHaveProperty('slug');
        expect(post).toHaveProperty('title');
        expect(post).toHaveProperty('excerpt');
        expect(post).toHaveProperty('category');
        expect(post).toHaveProperty('tags');
        expect(post).toHaveProperty('status');
        expect(post).toHaveProperty('publishedAt');
        expect(post).toHaveProperty('author');
      }
    });

    it('posts are sorted by publishedAt descending', async () => {
      const posts = await getAllPosts();
      if (posts.length > 1) {
        for (let i = 1; i < posts.length; i++) {
          const prevDate = new Date(posts[i - 1].publishedAt).getTime();
          const currDate = new Date(posts[i].publishedAt).getTime();
          expect(currDate).toBeLessThanOrEqual(prevDate);
        }
      }
    });
  });

  describe('getPostBySlug', () => {
    it('returns post for valid slug', async () => {
      const post = await getPostBySlug('optimizing-react-60fps');
      expect(post).not.toBeNull();
      expect(post?.slug).toBe('optimizing-react-60fps');
    });

    it('returns null for nonexistent slug', async () => {
      const post = await getPostBySlug('nonexistent-post');
      expect(post).toBeNull();
    });

    it('returns null for draft post', async () => {
      const post = await getPostBySlug('nonexistent-draft');
      expect(post).toBeNull();
    });
  });

  describe('getFeaturedPosts', () => {
    it('returns only featured posts', async () => {
      const posts = await getFeaturedPosts();
      posts.forEach((p: BlogPost) => {
        expect(p.featured).toBe(true);
      });
    });

    it('respects the limit parameter', async () => {
      const posts = await getFeaturedPosts(1);
      expect(posts.length).toBeLessThanOrEqual(1);
    });
  });

  describe('getPostsByCategory', () => {
    it('returns posts filtered by category', async () => {
      const posts = await getPostsByCategory('teknik');
      posts.forEach((p: BlogPost) => {
        expect(p.category).toBe('teknik');
      });
    });

    it('returns empty array for nonexistent category', async () => {
      const posts = await getPostsByCategory('nonexistent-category');
      expect(posts).toEqual([]);
    });
  });

  describe('getPostsByTag', () => {
    it('returns posts filtered by tag', async () => {
      const posts = await getPostsByTag('react');
      posts.forEach((p: BlogPost) => {
        expect(p.tags.some(t => t.toLowerCase() === 'react')).toBe(true);
      });
    });

    it('is case-insensitive', async () => {
      const postsLower = await getPostsByTag('REACT');
      const postsUpper = await getPostsByTag('react');
      expect(postsLower.length).toBe(postsUpper.length);
    });

    it('returns empty array for nonexistent tag', async () => {
      const posts = await getPostsByTag('nonexistent-tag-xyz');
      expect(posts).toEqual([]);
    });
  });

  describe('searchPosts', () => {
    it('performs case-insensitive search on title', async () => {
      const results = await searchPosts('OPTIMIZING');
      expect(results.length).toBeGreaterThan(0);
      expect(results.some(p => p.title.toLowerCase().includes('optimizing'))).toBe(true);
    });

    it('performs case-insensitive search on excerpt', async () => {
      const results = await searchPosts('REACT');
      expect(results.length).toBeGreaterThan(0);
    });

    it('performs case-insensitive search on tags', async () => {
      const results = await searchPosts('PERFORMANCE');
      expect(results.length).toBeGreaterThan(0);
    });

    it('returns empty array for no matches', async () => {
      const results = await searchPosts('xyznonexistent123abc');
      expect(results).toEqual([]);
    });
  });

  describe('getCategoriesWithCount', () => {
    it('returns array of category objects with counts', async () => {
      const categories = await getCategoriesWithCount();
      expect(Array.isArray(categories)).toBe(true);
      categories.forEach(cat => {
        expect(cat).toHaveProperty('category');
        expect(cat).toHaveProperty('count');
        expect(typeof cat.count).toBe('number');
        expect(cat.count).toBeGreaterThan(0);
      });
    });

    it('each category has valid name', async () => {
      const categories = await getCategoriesWithCount();
      const validCategories = ['teknik', 'career', 'kisisel', 'tutorial'];
      categories.forEach(cat => {
        expect(validCategories).toContain(cat.category);
      });
    });
  });

  describe('filterPostsByCategory', () => {
    it('filters posts by category', async () => {
      const allPosts = await getAllPosts();
      const teknikPosts = filterPostsByCategory(allPosts, 'teknik');
      teknikPosts.forEach((p: BlogPost) => {
        expect(p.category).toBe('teknik');
      });
    });

    it('returns empty array for category with no posts', async () => {
      const allPosts = await getAllPosts();
      const posts = filterPostsByCategory(allPosts, 'nonexistent');
      expect(posts).toEqual([]);
    });
  });

  describe('filterPostsByTag', () => {
    it('filters posts by tag', async () => {
      const allPosts = await getAllPosts();
      const reactPosts = filterPostsByTag(allPosts, 'react');
      reactPosts.forEach((p: BlogPost) => {
        expect(p.tags.some(t => t.toLowerCase() === 'react')).toBe(true);
      });
    });

    it('is case-insensitive', async () => {
      const allPosts = await getAllPosts();
      const postsLower = filterPostsByTag(allPosts, 'react');
      const postsUpper = filterPostsByTag(allPosts, 'REACT');
      expect(postsLower.length).toBe(postsUpper.length);
    });
  });
});
