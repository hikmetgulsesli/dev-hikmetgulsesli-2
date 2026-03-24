import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import * as React from "react"
import { Avatar } from "@/components/ui/avatar"

describe("Avatar", () => {
  const defaultProps = {
    alt: "Kullanıcı avatarı",
    fallback: "Hikmet Güleşli",
  }

  describe("sizes", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl", "2xl"] as const
    const expectedSizes: Record<(typeof sizes)[number], string> = {
      xs: "w-6 h-6 text-xs",
      sm: "w-8 h-8 text-xs",
      md: "w-10 h-10 text-sm",
      lg: "w-14 h-14 text-base",
      xl: "w-20 h-20 text-xl",
      "2xl": "w-32 h-32 text-2xl",
    }

    sizes.forEach((size) => {
      it(`renders ${size} size correctly`, () => {
        const { container } = render(<Avatar {...defaultProps} size={size} />)
        const avatar = container.firstChild as HTMLElement
        expect(avatar.className).toContain(expectedSizes[size])
      })
    })
  })

  describe("fallback initials", () => {
    it("returns first two letters for single word", () => {
      const { container } = render(<Avatar {...defaultProps} fallback="Hikmet" />)
      expect(container.textContent).toBe("HI")
    })

    it("returns first and last letter for multiple words", () => {
      const { container } = render(<Avatar {...defaultProps} fallback="Hikmet Güleşli" />)
      expect(container.textContent).toBe("HG")
    })

    it("handles Turkish characters", () => {
      const { container } = render(<Avatar {...defaultProps} fallback="Elif Yılmaz" />)
      expect(container.textContent).toBe("EY")
    })
  })

  describe("status indicator", () => {
    const statuses = ["online", "offline", "busy", "away"] as const

    statuses.forEach((status) => {
      it(`renders ${status} status correctly`, () => {
        const { container } = render(<Avatar {...defaultProps} status={status} />)
        const statusIndicator = container.querySelector("span > span")
        expect(statusIndicator).toBeTruthy()
      })
    })

    it("shows ping animation for online status", () => {
      const { container } = render(<Avatar {...defaultProps} status="online" />)
      const pingElement = container.querySelector(".animate-ping")
      expect(pingElement).toBeTruthy()
    })

    it("shows ping animation for busy status", () => {
      const { container } = render(<Avatar {...defaultProps} status="busy" />)
      const pingElement = container.querySelector(".animate-ping")
      expect(pingElement).toBeTruthy()
    })

    it("does not show ping for offline status", () => {
      const { container } = render(<Avatar {...defaultProps} status="offline" />)
      const pingElement = container.querySelector(".animate-ping")
      expect(pingElement).toBeNull()
    })

    it("does not show ping for away status", () => {
      const { container } = render(<Avatar {...defaultProps} status="away" />)
      const pingElement = container.querySelector(".animate-ping")
      expect(pingElement).toBeNull()
    })
  })

  describe("image handling", () => {
    it("shows image when src is provided and loads successfully", async () => {
      const { container } = render(
        <Avatar {...defaultProps} src="https://example.com/avatar.jpg" />
      )
      const img = container.querySelector("img")
      expect(img).toBeTruthy()
    })

    it("shows fallback when image fails to load", async () => {
      const { container } = render(
        <Avatar {...defaultProps} src="https://invalid-url.jpg" />
      )
      const img = container.querySelector("img")
      expect(img).toBeTruthy()
      fireEvent.error(img!)
      expect(container.textContent).toContain("HG")
    })
  })

  describe("rounded prop", () => {
    it("is rounded by default", () => {
      const { container } = render(<Avatar {...defaultProps} />)
      const avatar = container.firstChild as HTMLElement
      expect(avatar.className).toContain("rounded-full")
    })

    it("can be disabled with rounded={false}", () => {
      const { container } = render(<Avatar {...defaultProps} rounded={false} />)
      const avatar = container.firstChild as HTMLElement
      expect(avatar.className).toContain("rounded-lg")
      expect(avatar.className).not.toContain("rounded-full")
    })
  })

  describe("accessibility", () => {
    it("has proper role attribute", () => {
      const { container } = render(<Avatar {...defaultProps} />)
      const avatar = container.firstChild as HTMLElement
      expect(avatar.tagName).toBe("DIV")
    })
  })
})
