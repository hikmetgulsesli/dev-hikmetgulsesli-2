/**
 * Tests for Animation Variants
 * Validates framer-motion animation configurations
 */

import { describe, expect, test } from 'vitest';
import {
  fadeVariants,
  fadeUpVariants,
  scaleVariants,
  slideLeftVariants,
  slideRightVariants,
  pageVariants,
  staggerContainer,
  scrollAnimationConfig,
  typingConfig,
  springTransitions,
} from '@/lib/animations';

describe('fadeVariants', () => {
  test('has hidden state with opacity 0', () => {
    expect(fadeVariants.hidden).toEqual({
      opacity: 0,
    });
  });

  test('has visible state', () => {
    expect(fadeVariants.visible).toBeDefined();
    expect(fadeVariants.visible.opacity).toBe(1);
  });

  test('has exit state', () => {
    expect(fadeVariants.exit).toBeDefined();
    expect(fadeVariants.exit.opacity).toBe(0);
  });

  test('visible transition uses easeOut', () => {
    expect(fadeVariants.visible.transition.ease).toBe('easeOut');
  });
});

describe('fadeUpVariants', () => {
  test('has hidden state with opacity 0 and y offset', () => {
    expect(fadeUpVariants.hidden).toEqual({
      opacity: 0,
      y: 20,
    });
  });

  test('has visible state with y reset', () => {
    expect(fadeUpVariants.visible.y).toBe(0);
  });

  test('uses 20px Y translation', () => {
    expect(fadeUpVariants.hidden.y).toBe(20);
  });
});

describe('scaleVariants', () => {
  test('has hidden state with scale 0.95', () => {
    expect(scaleVariants.hidden).toEqual({
      opacity: 0,
      scale: 0.95,
    });
  });

  test('visible state has scale 1', () => {
    expect(scaleVariants.visible.scale).toBe(1);
  });
});

describe('slideLeftVariants', () => {
  test('has hidden state with x offset', () => {
    expect(slideLeftVariants.hidden).toEqual({
      opacity: 0,
      x: 20,
    });
  });

  test('visible state resets x', () => {
    expect(slideLeftVariants.visible.x).toBe(0);
  });
});

describe('slideRightVariants', () => {
  test('has hidden state with negative x offset', () => {
    expect(slideRightVariants.hidden).toEqual({
      opacity: 0,
      x: -20,
    });
  });

  test('visible state resets x', () => {
    expect(slideRightVariants.visible.x).toBe(0);
  });
});

describe('pageVariants', () => {
  test('has hidden state with opacity 0', () => {
    expect(pageVariants.hidden).toEqual({
      opacity: 0,
    });
  });

  test('visible transition is slower (0.5s)', () => {
    expect(pageVariants.visible.transition.duration).toBe(0.5);
  });
});

describe('staggerContainer', () => {
  test('has staggerChildren configuration', () => {
    expect(staggerContainer.visible.transition.staggerChildren).toBe(0.1);
  });

  test('has delayChildren', () => {
    expect(staggerContainer.visible.transition.delayChildren).toBe(0.1);
  });
});

describe('scrollAnimationConfig', () => {
  test('has parallax factors', () => {
    expect(scrollAnimationConfig.parallax.slow).toBe(0.3);
    expect(scrollAnimationConfig.parallax.medium).toBe(0.5);
    expect(scrollAnimationConfig.parallax.fast).toBe(0.7);
  });

  test('has reveal thresholds', () => {
    expect(scrollAnimationConfig.reveal.start).toBe(0.1);
    expect(scrollAnimationConfig.reveal.end).toBe(0.8);
  });

  test('has fadeOnScroll config', () => {
    expect(scrollAnimationConfig.fadeOnScroll.start).toBe(0);
    expect(scrollAnimationConfig.fadeOnScroll.end).toBe(200);
    expect(scrollAnimationConfig.fadeOnScroll.opacityOut).toBe(0.3);
  });
});

describe('typingConfig', () => {
  test('has typing speed in ms', () => {
    expect(typingConfig.speed).toBe(50);
  });

  test('has cursor blink duration', () => {
    expect(typingConfig.cursorDuration).toBe(800);
  });
});

describe('springTransitions', () => {
  test('has snappy preset', () => {
    expect(springTransitions.snappy.type).toBe('spring');
    expect(springTransitions.snappy.stiffness).toBe(300);
    expect(springTransitions.snappy.damping).toBe(30);
  });

  test('has gentle preset', () => {
    expect(springTransitions.gentle.type).toBe('spring');
    expect(springTransitions.gentle.stiffness).toBe(120);
    expect(springTransitions.gentle.damping).toBe(14);
  });

  test('has bouncy preset', () => {
    expect(springTransitions.bouncy.type).toBe('spring');
    expect(springTransitions.bouncy.stiffness).toBe(400);
    expect(springTransitions.bouncy.damping).toBe(10);
  });
});
