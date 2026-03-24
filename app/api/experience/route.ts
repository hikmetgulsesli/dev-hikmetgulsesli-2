import { NextRequest, NextResponse } from 'next/server';
import type { Experience } from '@/types';

const experiences: Experience[] = [
  {
    id: 'exp-1',
    title: 'Senior Full-Stack Developer',
    company: 'TechCorp',
    companyUrl: 'https://techcorp.example.com',
    location: 'İstanbul, Türkiye',
    startDate: '2022-01',
    endDate: null,
    current: true,
    description: 'Led development of microservices architecture using Node.js and React. Managed team of 5 developers.',
    logo: '/logos/techcorp.png',
    type: 'full-time',
    achievements: [
      'Reduced API response time by 40% through caching strategies',
      'Implemented CI/CD pipeline reducing deployment time by 60%',
      'Led migration from monolith to microservices',
    ],
    createdAt: '2022-01-15T00:00:00Z',
    updatedAt: '2024-03-01T00:00:00Z',
  },
  {
    id: 'exp-2',
    title: 'Full-Stack Developer',
    company: 'StartupXYZ',
    companyUrl: 'https://startupxyz.example.com',
    location: 'Remote',
    startDate: '2020-03',
    endDate: '2021-12',
    current: false,
    description: 'Built and maintained full-stack applications using React, Node.js, and PostgreSQL.',
    logo: '/logos/startupxyz.png',
    type: 'full-time',
    achievements: [
      'Developed real-time collaboration features',
      'Built custom design system used across 3 products',
    ],
    createdAt: '2020-03-01T00:00:00Z',
    updatedAt: '2021-12-31T00:00:00Z',
  },
  {
    id: 'exp-3',
    title: 'Junior Frontend Developer',
    company: 'WebAgency',
    location: 'İstanbul, Türkiye',
    startDate: '2018-06',
    endDate: '2020-02',
    current: false,
    description: 'Developed responsive web applications using JavaScript and CSS frameworks.',
    logo: '/logos/webagency.png',
    type: 'full-time',
    achievements: [
      'Improved page load times by 30%',
      'Created reusable component library',
    ],
    createdAt: '2018-06-01T00:00:00Z',
    updatedAt: '2020-02-28T00:00:00Z',
  },
];

export async function GET(request: NextRequest) {
  // Sort by startDate descending (most recent first)
  const sortedExperiences = [...experiences].sort((a, b) => {
    const dateA = new Date(a.startDate);
    const dateB = new Date(b.startDate);
    return dateB.getTime() - dateA.getTime();
  });

  return NextResponse.json({
    success: true,
    data: sortedExperiences,
  });
}
