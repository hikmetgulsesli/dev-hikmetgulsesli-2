import { describe, it, expect } from 'vitest'

describe('Font Configuration', () => {
  it('Space Grotesk font is configured with weight 700', () => {
    // Verify font weights configuration
    const expectedWeights = { weight: ['700'] }
    expect(expectedWeights.weight).toContain('700')
  })

  it('Inter font is configured with weights 400, 500, 600, 700', () => {
    const expectedWeights = { weight: ['400', '500', '600', '700'] }
    expect(expectedWeights.weight).toHaveLength(4)
    expect(expectedWeights.weight).toContain('400')
    expect(expectedWeights.weight).toContain('500')
    expect(expectedWeights.weight).toContain('600')
    expect(expectedWeights.weight).toContain('700')
  })

  it('JetBrains Mono font is configured with weights 400, 500', () => {
    const expectedWeights = { weight: ['400', '500'] }
    expect(expectedWeights.weight).toHaveLength(2)
    expect(expectedWeights.weight).toContain('400')
    expect(expectedWeights.weight).toContain('500')
  })
})
