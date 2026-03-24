import { NextResponse } from 'next/server';
import type { Author } from '@/types';

const profile: Author = {
  name: 'Hikmet Güleşli',
  avatar: 'https://hikmetgulsesli.com/avatar.jpg',
  title: 'Full-Stack Developer & UI/UX Designer',
  bio: 'Modern web teknolojileri ile dijital ürünler geliştiriyorum. React, Next.js, TypeScript ve Node.js konusunda uzmanlaşmış olsam da, her zaman yeni teknolojiler öğrenmeye açığım.',
  location: 'İstanbul, Türkiye',
  social: {
    github: 'https://github.com/hikmetgulsesli',
    linkedin: 'https://linkedin.com/in/hikmetgulsesli',
    twitter: 'https://twitter.com/hikmetgulsesli',
    email: 'hikmet@hikmetgulsesli.com',
    website: 'https://hikmetgulsesli.com',
  },
  skills: [
    'React',
    'Next.js',
    'TypeScript',
    'Node.js',
    'PostgreSQL',
    'MongoDB',
    'Docker',
    'AWS',
    'Figma',
    'Tailwind CSS',
  ],
};

export async function GET() {
  return NextResponse.json({
    success: true,
    data: profile,
  });
}
