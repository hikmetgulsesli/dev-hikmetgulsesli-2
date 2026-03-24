import { NextRequest, NextResponse } from 'next/server';
import type { Skill } from '@/types';

const skills: Skill[] = [
  // Frontend
  {
    id: 'skill-1',
    name: 'React',
    icon: '/icons/react.svg',
    proficiency: 95,
    category: 'frontend',
    years: 6,
    projects: 25,
  },
  {
    id: 'skill-2',
    name: 'Next.js',
    icon: '/icons/nextjs.svg',
    proficiency: 90,
    category: 'frontend',
    years: 4,
    projects: 15,
  },
  {
    id: 'skill-3',
    name: 'TypeScript',
    icon: '/icons/typescript.svg',
    proficiency: 92,
    category: 'frontend',
    years: 5,
    projects: 20,
  },
  {
    id: 'skill-4',
    name: 'Tailwind CSS',
    icon: '/icons/tailwind.svg',
    proficiency: 95,
    category: 'frontend',
    years: 4,
    projects: 18,
  },
  // Backend
  {
    id: 'skill-5',
    name: 'Node.js',
    icon: '/icons/nodejs.svg',
    proficiency: 88,
    category: 'backend',
    years: 6,
    projects: 15,
  },
  {
    id: 'skill-6',
    name: 'Express',
    icon: '/icons/express.svg',
    proficiency: 85,
    category: 'backend',
    years: 5,
    projects: 12,
  },
  // Database
  {
    id: 'skill-7',
    name: 'PostgreSQL',
    icon: '/icons/postgresql.svg',
    proficiency: 82,
    category: 'database',
    years: 5,
    projects: 10,
  },
  {
    id: 'skill-8',
    name: 'MongoDB',
    icon: '/icons/mongodb.svg',
    proficiency: 80,
    category: 'database',
    years: 4,
    projects: 8,
  },
  // DevOps
  {
    id: 'skill-9',
    name: 'Docker',
    icon: '/icons/docker.svg',
    proficiency: 78,
    category: 'devops',
    years: 4,
    projects: 12,
  },
  {
    id: 'skill-10',
    name: 'AWS',
    icon: '/icons/aws.svg',
    proficiency: 75,
    category: 'devops',
    years: 3,
    projects: 8,
  },
  // Mobile
  {
    id: 'skill-11',
    name: 'React Native',
    icon: '/icons/react.svg',
    proficiency: 70,
    category: 'mobile',
    years: 2,
    projects: 3,
  },
  // Design
  {
    id: 'skill-12',
    name: 'Figma',
    icon: '/icons/figma.svg',
    proficiency: 85,
    category: 'design',
    years: 4,
    projects: 10,
  },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');

  let filteredSkills = skills;

  if (category) {
    filteredSkills = skills.filter((skill) => skill.category === category);
  }

  return NextResponse.json({
    success: true,
    data: filteredSkills,
  });
}
