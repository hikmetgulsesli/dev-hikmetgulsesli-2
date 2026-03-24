import { promises as fs } from 'fs';
import path from 'path';
import type { Skill } from '@/types';

const DATA_DIR = path.join(process.cwd(), 'data', 'skills');

export async function getAllSkills(): Promise<Skill[]> {
  const files = await fs.readdir(DATA_DIR);
  const jsonFiles = files.filter(f => f.endsWith('.json'));
  
  const skills: Skill[] = [];
  
  for (const file of jsonFiles) {
    const filePath = path.join(DATA_DIR, file);
    const content = await fs.readFile(filePath, 'utf-8');
    const skill = JSON.parse(content) as Skill;
    skills.push(skill);
  }
  
  return skills;
}

export function filterSkillsByCategory(
  skills: Skill[],
  category: string
): Skill[] {
  return skills.filter(s => s.category === category);
}
