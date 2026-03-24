import { promises as fs } from 'fs';
import path from 'path';
import type { BlogPost } from '@/types';

const DATA_DIR = path.join(process.cwd(), 'data', 'posts');

export async function getAllPosts(): Promise<BlogPost[]> {
  const files = await fs.readdir(DATA_DIR);
  const jsonFiles = files.filter(f => f.endsWith('.json'));
  
  const posts: BlogPost[] = [];
  
  for (const file of jsonFiles) {
    const filePath = path.join(DATA_DIR, file);
    const content = await fs.readFile(filePath, 'utf-8');
    const post = JSON.parse(content) as BlogPost;
    if (post.status === 'published') {
      posts.push(post);
    }
  }
  
  return posts.sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const filePath = path.join(DATA_DIR, `${slug}.json`);
  
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    const post = JSON.parse(content) as BlogPost;
    
    if (post.status !== 'published') {
      return null;
    }
    
    return post;
  } catch {
    return null;
  }
}

export async function getFeaturedPosts(limit: number = 1): Promise<BlogPost[]> {
  const allPosts = await getAllPosts();
  return allPosts
    .filter(p => p.featured)
    .slice(0, limit);
}

export async function getPostsByCategory(category: string): Promise<BlogPost[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter(post => post.category === category);
}

export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter(post => 
    post.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  );
}

export async function searchPosts(query: string): Promise<BlogPost[]> {
  const allPosts = await getAllPosts();
  const lowerQuery = query.toLowerCase();
  
  return allPosts.filter(post => 
    post.title.toLowerCase().includes(lowerQuery) ||
    post.excerpt.toLowerCase().includes(lowerQuery) ||
    post.content.toLowerCase().includes(lowerQuery) ||
    post.tags.some(t => t.toLowerCase().includes(lowerQuery))
  );
}

export async function getCategoriesWithCount(): Promise<{ category: string; count: number }[]> {
  const allPosts = await getAllPosts();
  const categoryMap = new Map<string, number>();
  
  for (const post of allPosts) {
    const current = categoryMap.get(post.category) ?? 0;
    categoryMap.set(post.category, current + 1);
  }
  
  return Array.from(categoryMap.entries()).map(([category, count]) => ({
    category,
    count
  }));
}

export function filterPostsByCategory(
  posts: BlogPost[],
  category: string
): BlogPost[] {
  return posts.filter(p => p.category === category);
}

export function filterPostsByTag(
  posts: BlogPost[],
  tag: string
): BlogPost[] {
  return posts.filter(p => 
    p.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  );
}
