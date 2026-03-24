/**
 * Animation variant configurations for framer-motion
 * Part of the Kinetic Console design system
 */

import type { Variants } from 'framer-motion';

/**
 * Fade variants - basic opacity animation
 */
export const fadeVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: 'easeIn',
    },
  },
};

/**
 * Fade up variants - opacity with Y translation
 */
export const fadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.2,
      ease: 'easeIn',
    },
  },
};

/**
 * Scale variants - opacity with scale transform
 */
export const scaleVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.2,
      ease: 'easeIn',
    },
  },
};

/**
 * Slide left variants - slide from right to left
 */
export const slideLeftVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    x: -20,
    transition: {
      duration: 0.3,
      ease: 'easeIn',
    },
  },
};

/**
 * Slide right variants - slide from left to right
 */
export const slideRightVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    x: 20,
    transition: {
      duration: 0.3,
      ease: 'easeIn',
    },
  },
};

/**
 * Page transition variants - full page entrance
 */
export const pageVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: 'easeIn',
    },
  },
};

/**
 * Stagger container variants
 * Use with staggerChildren in parent
 */
export const staggerContainer: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

/**
 * Scroll animation configuration
 * Used with useScroll and useTransform hooks
 */
export const scrollAnimationConfig = {
  // Parallax factor for depth effect
  parallax: {
    slow: 0.3,
    medium: 0.5,
    fast: 0.7,
  },
  // Reveal thresholds
  reveal: {
    start: 0.1,
    end: 0.8,
  },
  // Fade on scroll
  fadeOnScroll: {
    start: 0,
    end: 200,
    opacityOut: 0.3,
  },
};

/**
 * Terminal typing effect configuration
 */
export const typingConfig = {
  speed: 50, // ms per character
  cursorDuration: 800, // ms cursor blink
};

/**
 * Spring transition presets
 */
export const springTransitions = {
  snappy: {
    type: 'spring',
    stiffness: 300,
    damping: 30,
  },
  gentle: {
    type: 'spring',
    stiffness: 120,
    damping: 14,
  },
  bouncy: {
    type: 'spring',
    stiffness: 400,
    damping: 10,
  },
};
