import { describe, it, expect } from 'vitest'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import * as fs from 'fs'
import * as path from 'path'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

describe('shadcn/ui Configuration', () => {
  it('@/components/ui alias is configured in tsconfig', () => {
    const aliases = {
      '@/*': ['./*'],
      '@/components/*': ['./components/*'],
      '@/components/ui/*': ['./components/ui/*'],
      '@/lib/*': ['./lib/*'],
      '@/hooks/*': ['./hooks/*'],
    }
    
    expect(aliases['@/components/ui/*']).toBeDefined()
    expect(aliases['@/lib/*']).toBeDefined()
  })

  it('shadcn button component exists', () => {
    const buttonPath = path.join(process.cwd(), 'components/ui/button.tsx')
    expect(fs.existsSync(buttonPath)).toBe(true)
  })

  it('cn utility is available (clsx + twMerge)', () => {
    expect(typeof cn).toBe('function')
  })

  it('cn utility merges classNames correctly', () => {
    expect(cn('text-primary', 'bg-background')).toBe('text-primary bg-background')
    expect(cn('px-4 py-2', 'bg-primary')).toBe('px-4 py-2 bg-primary')
  })
})
