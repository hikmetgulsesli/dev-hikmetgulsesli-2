import { promises as fs } from 'fs';
import path from 'path';
import type { Author } from '@/types';

const DATA_DIR = path.join(process.cwd(), 'data', 'profile');

export async function getAuthor(): Promise<Author> {
  const filePath = path.join(DATA_DIR, 'author.json');
  const content = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(content) as Author;
}
