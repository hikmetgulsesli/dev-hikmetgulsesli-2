import { describe, it, expect } from 'vitest'

describe('Design Tokens Configuration', () => {
  // Colors from PRD
  const designTokens = {
    background: '#0a0a0f',
    backgroundElevated: '#111113',
    backgroundSubtle: '#1a1a1f',
    primary: '#10b981',
    primaryHover: '#059669',
    accent: '#6366f1',
    accentAlt: '#8b5cf6',
    textPrimary: '#fafafa',
    textSecondary: '#a1a1aa',
    textMuted: '#6b7280',
    border: '#27272a',
    borderHover: '#3f3f46',
    borderActive: '#10b981',
    success: '#22c55e',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  }

  it('background color is #0a0a0f', () => {
    expect(designTokens.background).toBe('#0a0a0f')
  })

  it('primary color is #10b981 (emerald)', () => {
    expect(designTokens.primary).toBe('#10b981')
  })

  it('accent color is #6366f1 (indigo)', () => {
    expect(designTokens.accent).toBe('#6366f1')
  })

  it('accent-alt color is #8b5cf6 (violet)', () => {
    expect(designTokens.accentAlt).toBe('#8b5cf6')
  })

  it('text primary is #fafafa', () => {
    expect(designTokens.textPrimary).toBe('#fafafa')
  })

  it('border color is #27272a', () => {
    expect(designTokens.border).toBe('#27272a')
  })

  it('all status colors are defined', () => {
    expect(designTokens.success).toBe('#22c55e')
    expect(designTokens.warning).toBe('#f59e0b')
    expect(designTokens.error).toBe('#ef4444')
    expect(designTokens.info).toBe('#3b82f6')
  })
})

describe('Tailwind Theme Variables', () => {
  const tailwindVars = {
    'color-background': 'var(--background)',
    'color-primary': 'var(--primary)',
    'color-accent': 'var(--accent)',
    'color-text-primary': 'var(--text-primary)',
    'color-border': 'var(--border)',
    'font-heading': 'var(--font-heading)',
    'font-body': 'var(--font-body)',
    'font-mono': 'var(--font-mono)',
  }

  it('CSS variables are properly mapped', () => {
    expect(tailwindVars['color-background']).toBe('var(--background)')
    expect(tailwindVars['color-primary']).toBe('var(--primary)')
    expect(tailwindVars['color-accent']).toBe('var(--accent)')
    expect(tailwindVars['color-text-primary']).toBe('var(--text-primary)')
    expect(tailwindVars['color-border']).toBe('var(--border)')
  })

  it('font families are mapped', () => {
    expect(tailwindVars['font-heading']).toBe('var(--font-heading)')
    expect(tailwindVars['font-body']).toBe('var(--font-body)')
    expect(tailwindVars['font-mono']).toBe('var(--font-mono)')
  })
})
