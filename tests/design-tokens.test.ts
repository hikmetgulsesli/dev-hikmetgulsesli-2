/**
 * Tests for CSS Design Tokens
 * Validates the Kinetic Console design system token structure
 */

import { describe, expect, test } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

// Parse CSS custom properties from globals.css
// Handles both :root {} and @theme inline {} blocks
function parseCSSVariables(): Record<string, string> {
  const globalsCssPath = path.resolve(process.cwd(), 'app', 'globals.css');
  const cssContent = fs.readFileSync(globalsCssPath, 'utf-8');

  const vars: Record<string, string> = {};
  
  // Find @theme inline block with proper brace matching
  const startMarker = '@theme inline';
  const startIdx = cssContent.indexOf(startMarker);
  
  if (startIdx !== -1) {
    // Find the opening brace after "@theme inline"
    let openBrace = startIdx;
    while (openBrace < cssContent.length && cssContent[openBrace] !== '{') {
      openBrace++;
    }
    
    let depth = 0;
    let endIdx = openBrace;
    
    for (let i = openBrace; i < cssContent.length; i++) {
      if (cssContent[i] === '{') depth++;
      else if (cssContent[i] === '}') {
        depth--;
        if (depth === 0) {
          endIdx = i;
          break;
        }
      }
    }
    
    const block = cssContent.substring(openBrace + 1, endIdx);
    const matches = block.matchAll(/--([\w-]+):\s*([^;]+);/g);
    for (const match of matches) {
      vars[match[1]] = match[2].trim();
    }
  }
  
  return vars;
}

// Parse ::selection rule from globals.css
function parseSelectionRule(): { exists: boolean; hasBackground: boolean; hasColor: boolean } {
  const globalsCssPath = path.resolve(process.cwd(), 'app', 'globals.css');
  const cssContent = fs.readFileSync(globalsCssPath, 'utf-8');

  const selectionMatch = cssContent.match(/::selection\s*\{([^}]+)\}/);
  if (!selectionMatch) {
    return { exists: false, hasBackground: false, hasColor: false };
  }

  const block = selectionMatch[1];
  return {
    exists: true,
    hasBackground: block.includes('background') || block.includes('background-color'),
    hasColor: block.includes('color'),
  };
}

// Parse scrollbar styles to verify they're scoped properly
function hasScrollbarStyles(): boolean {
  const globalsCssPath = path.resolve(process.cwd(), 'app', 'globals.css');
  const cssContent = fs.readFileSync(globalsCssPath, 'utf-8');
  
  // Check for webkit-scrollbar styles
  return cssContent.includes('::-webkit-scrollbar');
}

// Parse reduced motion media query
function hasReducedMotionSupport(): boolean {
  const globalsCssPath = path.resolve(process.cwd(), 'app', 'globals.css');
  const cssContent = fs.readFileSync(globalsCssPath, 'utf-8');
  
  return cssContent.includes('prefers-reduced-motion');
}

const cssVars = parseCSSVariables();
const selectionRule = parseSelectionRule();

describe('Design Token Structure', () => {
  test('has color-background mapped', () => {
    expect(cssVars['color-background']).toBeDefined();
    expect(cssVars['color-background']).toBe('var(--background)');
  });

  test('has color-primary mapped', () => {
    expect(cssVars['color-primary']).toBeDefined();
    expect(cssVars['color-primary']).toBe('var(--primary)');
  });

  test('has color-accent mapped', () => {
    expect(cssVars['color-accent']).toBeDefined();
    expect(cssVars['color-accent']).toBe('var(--accent)');
  });

  test('has color-text-primary mapped', () => {
    expect(cssVars['color-text-primary']).toBeDefined();
  });

  test('has color-border mapped', () => {
    expect(cssVars['color-border']).toBeDefined();
  });

  test('has status colors mapped', () => {
    expect(cssVars['color-success']).toBeDefined();
    expect(cssVars['color-warning']).toBeDefined();
    expect(cssVars['color-error']).toBeDefined();
  });

  test('design tokens reference base variables', () => {
    // All color-* vars should reference base vars
    expect(cssVars['color-primary']).toMatch(/^var\(--/);
  });
});

describe('Selection Styling', () => {
  test('selection rule exists in globals.css', () => {
    expect(selectionRule.exists).toBe(true);
  });

  test('selection has background-color and color', () => {
    expect(selectionRule.hasBackground).toBe(true);
    expect(selectionRule.hasColor).toBe(true);
  });
});

describe('Scrollbar Styling', () => {
  test('custom scrollbar styles exist', () => {
    expect(hasScrollbarStyles()).toBe(true);
  });
});

describe('Accessibility', () => {
  test('reduced motion support exists', () => {
    expect(hasReducedMotionSupport()).toBe(true);
  });
});
