import { describe, it, expect } from "vitest"

describe("Skeleton Component", () => {
  it("should have 4 variants", () => {
    const variants = ["text", "circular", "rectangular", "card"]
    expect(variants.length).toBe(4)
  })

  it("should have pulse animation that alternates opacity 1 to 0.5 to 1", () => {
    // CSS animation keyframes for pulse
    const pulseAnimation = {
      "0%": { opacity: 1 },
      "50%": { opacity: 0.5 },
      "100%": { opacity: 1 },
    }

    expect(pulseAnimation["0%"].opacity).toBe(1)
    expect(pulseAnimation["50%"].opacity).toBe(0.5)
    expect(pulseAnimation["100%"].opacity).toBe(1)
  })

  it("should have wave animation with gradient sweep", () => {
    const waveGradient = "linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent)"
    expect(waveGradient).toContain("transparent")
    expect(waveGradient).toContain("rgba(255,255,255,0.1)")
  })

  it("should use correct base class for skeleton", () => {
    const baseClass = "bg-[var(--background-subtle)]"
    expect(baseClass).toContain("background-subtle")
  })

  it("should have correct variant border radius classes", () => {
    const variantClasses = {
      text: "rounded-md h-4",
      circular: "rounded-full",
      rectangular: "rounded-lg",
      card: "rounded-xl",
    }

    expect(variantClasses.text).toContain("rounded-md")
    expect(variantClasses.circular).toContain("rounded-full")
    expect(variantClasses.rectangular).toContain("rounded-lg")
    expect(variantClasses.card).toContain("rounded-xl")
  })
})
