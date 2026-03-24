import { describe, it, expect, vi } from "vitest"
import { render } from "@testing-library/react"
import * as React from "react"
import { CursorGlow, CursorGlowProps } from "@/components/ui/cursor-glow"

// Mock framer-motion at the top level
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div data-testid="cursor-glow" {...props}>{children}</div>,
  },
  useMotionValue: () => ({ set: () => {} }),
  useSpring: () => ({ set: () => {} }),
  useTransform: () => () => {},
}))

describe("CursorGlow", () => {
  describe("type exports", () => {
    it("exports CursorGlowProps type", () => {
      // Verify the type is exported (TypeScript compile check)
      const props: CursorGlowProps = {
        color: "#10b981",
        size: 300,
        opacity: 0.15,
        smoothing: 0.1,
        blendMode: "screen",
      }
      expect(props.color).toBe("#10b981")
      expect(props.size).toBe(300)
    })
  })

  describe("renders without crashing", () => {
    it("renders CursorGlow component", () => {
      const { container } = render(<CursorGlow />)
      // Basic smoke test - component renders without crashing
      expect(container).toBeDefined()
    })
  })
})
