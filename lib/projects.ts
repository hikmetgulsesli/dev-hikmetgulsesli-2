import { promises as fs } from 'fs';
import path from 'path';
import type { Project } from '@/types';

const DATA_DIR = path.join(process.cwd(), 'data', 'projects');

export async function getAllProjects(): Promise<Project[]> {
  const files = await fs.readdir(DATA_DIR);
  const jsonFiles = files.filter(f => f.endsWith('.json'));
  
  const projects: Project[] = [];
  
  for (const file of jsonFiles) {
    const filePath = path.join(DATA_DIR, file);
    const content = await fs.readFile(filePath, 'utf-8');
    const project = JSON.parse(content) as Project;
    if (project.status === 'published') {
      projects.push(project);
    }
  }
  
  return projects.sort((a, b) => (a.sortOrder ?? 999) - (b.sortOrder ?? 999));
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const filePath = path.join(DATA_DIR, `${slug}.json`);
  
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    const project = JSON.parse(content) as Project;
    
    if (project.status !== 'published') {
      return null;
    }
    
    return project;
  } catch {
    return null;
  }
}

export async function getFeaturedProjects(limit: number = 6): Promise<Project[]> {
  const allProjects = await getAllProjects();
  return allProjects
    .filter(p => p.featured)
    .slice(0, limit);
}

export async function searchProjects(
  query: string
): Promise<Project[]> {
  const allProjects = await getAllProjects();
  const lowerQuery = query.toLowerCase();
  
  return allProjects.filter(project => 
    project.title.toLowerCase().includes(lowerQuery) ||
    project.description.toLowerCase().includes(lowerQuery) ||
    project.shortDescription.toLowerCase().includes(lowerQuery)
  );
}

export function filterProjectsByCategory(
  projects: Project[],
  category: string
): Project[] {
  return projects.filter(p => p.category === category);
}

export function filterFeaturedProjects(projects: Project[]): Project[] {
  return projects.filter(p => p.featured);
}
