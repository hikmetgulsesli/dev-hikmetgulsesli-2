import { describe, it, expect } from 'vitest'

// Test that framer-motion is properly imported
describe('Framer Motion Integration', () => {
  it('motion.div can be imported from framer-motion', async () => {
    // Dynamic import to verify framer-motion is available
    const framerMotion = await import('framer-motion')
    expect(framerMotion.motion).toBeDefined()
  })
})
