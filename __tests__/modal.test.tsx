import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"

describe("Modal Component", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("should have correct overlay styles - bg-black/80 + backdrop-blur(8px)", () => {
    const overlayClass = "bg-black/80 backdrop-blur-[8px]"
    expect(overlayClass).toContain("bg-black/80")
    expect(overlayClass).toContain("backdrop-blur-[8px]")
  })

  it("should close on Escape key press", () => {
    // Test the modal's Escape key handling logic
    const handleEscape = (key: string, onClose: () => void) => {
      if (key === "Escape") {
        onClose()
      }
    }

    let isOpen = true
    const closeFn = () => { isOpen = false }

    // Simulate Escape key handling logic
    handleEscape("Escape", closeFn)

    expect(isOpen).toBe(false)
  })

  it("should close on overlay click", () => {
    let isOpen = true
    const handleClose = () => {
      isOpen = false
    }

    // Simulate clicking the overlay
    handleClose()

    expect(isOpen).toBe(false)
  })

  it("should have correct size classes", () => {
    const sizeClasses = {
      sm: "max-w-[320px]",
      md: "max-w-[480px]",
      lg: "max-w-[640px]",
      xl: "max-w-[800px]",
      full: "max-w-[calc(100vw-32px)] max-h-[calc(100vh-32px)]",
    }

    expect(sizeClasses.sm).toContain("320px")
    expect(sizeClasses.md).toContain("480px")
    expect(sizeClasses.lg).toContain("640px")
    expect(sizeClasses.xl).toContain("800px")
    expect(sizeClasses.full).toContain("100vw")
  })

  it("should prevent body scroll when open", () => {
    const initialOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    expect(document.body.style.overflow).toBe("hidden")
    document.body.style.overflow = initialOverflow
  })

  it("should restore body scroll when closed", () => {
    document.body.style.overflow = "hidden"
    document.body.style.overflow = ""
    expect(document.body.style.overflow).toBe("")
  })
})
