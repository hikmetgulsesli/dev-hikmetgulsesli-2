import { promises as fs } from 'fs';
import path from 'path';
import type { Experience } from '@/types';

const DATA_DIR = path.join(process.cwd(), 'data', 'experience');

export async function getAllExperience(): Promise<Experience[]> {
  const files = await fs.readdir(DATA_DIR);
  const jsonFiles = files.filter(f => f.endsWith('.json'));
  
  const experiences: Experience[] = [];
  
  for (const file of jsonFiles) {
    const filePath = path.join(DATA_DIR, file);
    const content = await fs.readFile(filePath, 'utf-8');
    const experience = JSON.parse(content) as Experience;
    experiences.push(experience);
  }
  
  // Sort by startDate descending (most recent first)
  return experiences.sort((a, b) => {
    const dateA = new Date(a.startDate);
    const dateB = new Date(b.startDate);
    return dateB.getTime() - dateA.getTime();
  });
}

export function filterExperienceByCategory(
  experiences: Experience[],
  category: string
): Experience[] {
  return experiences.filter(e => e.type === category);
}
