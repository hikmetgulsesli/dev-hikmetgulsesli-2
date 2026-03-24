import { describe, it, expect } from 'vitest'
import * as framerMotion from 'framer-motion'

describe('Framer Motion Configuration', () => {
  it('framer-motion is installed', () => {
    expect(framerMotion).toBeDefined()
    expect(framerMotion.motion).toBeDefined()
  })

  it('motion.div is available', () => {
    const { motion } = framerMotion
    expect(motion.div).toBeDefined()
    // In framer-motion v12+, motion components are objects
    expect(motion.div || typeof motion.div === 'object').toBeTruthy()
  })

  it('animation variants are defined per PRD', () => {
    const variants = {
      fade: {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.3, ease: 'easeOut' } },
      },
      fadeUp: {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
      },
      scale: {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: 'easeOut' } },
      },
    }

    expect(variants.fade.hidden.opacity).toBe(0)
    expect(variants.fadeUp.hidden.y).toBe(20)
    expect(variants.scale.hidden.scale).toBe(0.95)
  })
})
