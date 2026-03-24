/**
 * Tests for CSS Design Tokens
 * Validates the Kinetic Console design system tokens
 */

import { describe, expect, test } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

// Parse CSS custom properties from globals.css
function parseCSSVariables(): Record<string, string> {
  const globalsCssPath = path.resolve(process.cwd(), 'app', 'globals.css');
  const cssContent = fs.readFileSync(globalsCssPath, 'utf-8');

  const vars: Record<string, string> = {};
  // Extract :root block
  const rootBlockMatch = cssContent.match(/:root\s*\{([^}]+)\}/);
  if (!rootBlockMatch) {
    return vars;
  }

  const matches = rootBlockMatch[1].matchAll(/--([\w-]+):\s*([^;]+);/g);
  for (const match of matches) {
    vars[match[1]] = match[2].trim();
  }
  return vars;
}

// Parse ::selection rule from globals.css
function parseSelectionRule(): { backgroundColor: string; color: string } | null {
  const globalsCssPath = path.resolve(process.cwd(), 'app', 'globals.css');
  const cssContent = fs.readFileSync(globalsCssPath, 'utf-8');

  const selectionMatch = cssContent.match(/::selection\s*\{([^}]+)\}/);
  if (!selectionMatch) {
    return null;
  }

  const block = selectionMatch[1];
  const bgMatch = block.match(/background-color:\s*([^;]+);/);
  const colorMatch = block.match(/color:\s*([^;]+);/);

  return {
    backgroundColor: bgMatch ? bgMatch[1].trim() : '',
    color: colorMatch ? colorMatch[1].trim() : '',
  };
}

const cssVars = parseCSSVariables();
const selectionRule = parseSelectionRule();

describe('Primary Colors', () => {
  test('primary color is emerald green', () => {
    expect(cssVars['color-primary']).toBe('#4edea3');
  });

  test('primary dark variant exists', () => {
    expect(cssVars['color-primary-dark']).toBe('#3bc98a');
  });

  test('primary light variant exists', () => {
    expect(cssVars['color-primary-light']).toBe('#6fe4b5');
  });

  test('on-primary is dark for contrast', () => {
    expect(cssVars['color-on-primary']).toBe('#0a0a0a');
  });

  test('primary container uses rgba', () => {
    expect(cssVars['color-primary-container']).toContain('rgba');
    expect(cssVars['color-primary-container']).toContain('78, 222, 163');
  });
});

describe('Secondary Colors', () => {
  test('secondary color is indigo', () => {
    expect(cssVars['color-secondary']).toBe('#c0c1ff');
  });

  test('secondary container uses rgba', () => {
    expect(cssVars['color-secondary-container']).toContain('rgba');
  });
});

describe('Tertiary Colors', () => {
  test('tertiary color is rose', () => {
    expect(cssVars['color-tertiary']).toBe('#ffb4ab');
  });
});

describe('Error Colors', () => {
  test('error color is distinct red (not duplicate of tertiary)', () => {
    // Error should be red, not rose
    expect(cssVars['color-error']).not.toBe('#ffb4ab');
    // Should be a red color (hex #f44336 or rgba with red values)
    expect(cssVars['color-error']).toMatch(/^#f44336$|^rgba?\([^)]*(?:244|239)[^)]*\)$/);
  });
});

describe('Surface Colors', () => {
  test('surface base is deep obsidian', () => {
    expect(cssVars['color-surface']).toBe('#131318');
  });

  test('surface-container-low is lighter', () => {
    expect(cssVars['color-surface-container-low']).toBe('#1b1b20');
  });

  test('surface-container is even lighter', () => {
    expect(cssVars['color-surface-container']).toBe('#1f1f25');
  });

  test('surface-container-high is for hover states', () => {
    expect(cssVars['color-surface-container-high']).toBe('#2a292f');
  });

  test('on-surface is high contrast white', () => {
    expect(cssVars['color-on-surface']).toBe('#fafafa');
  });

  test('on-surface-variant is muted', () => {
    expect(cssVars['color-on-surface-variant']).toBe('#a1a1aa');
  });
});

describe('Outline Colors (Ghost Borders)', () => {
  test('outline uses 20% opacity', () => {
    expect(cssVars['color-outline']).toBe('rgba(161, 161, 170, 0.2)');
  });

  test('outline-variant uses 10% opacity', () => {
    expect(cssVars['color-outline-variant']).toBe('rgba(161, 161, 170, 0.1)');
  });
});

describe('Selection Colors', () => {
  test('selection uses primary with 30% opacity', () => {
    expect(selectionRule).not.toBeNull();
    // Should use primary color (rgba with 0.3 alpha)
    expect(selectionRule!.backgroundColor).toMatch(/rgba?\([^)]*78,?\s*222,?\s*163,?\s*0\.3[^)]*\)/);
  });
});

describe('Background Colors', () => {
  test('background is near black', () => {
    expect(cssVars['color-background']).toBe('#0a0a0a');
  });

  test('on-background is white', () => {
    expect(cssVars['color-on-background']).toBe('#fafafa');
  });
});

describe('Shadow Colors', () => {
  test('shadow is black', () => {
    expect(cssVars['color-shadow']).toBe('#000000');
  });

  test('scrim is black', () => {
    expect(cssVars['color-scrim']).toBe('#000000');
  });
});
