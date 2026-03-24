import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import * as React from "react"
import { Lightbox } from "@/components/ui/lightbox"

describe("Lightbox", () => {
  const testImages = [
    { src: "/image1.jpg", alt: "Resim 1", caption: "İlk resim" },
    { src: "/image2.jpg", alt: "Resim 2", caption: "İkinci resim" },
    { src: "/image3.jpg", alt: "Resim 3" },
  ]

  const renderLightbox = (props: Partial<React.ComponentProps<typeof Lightbox>> = {}) => {
    const defaultProps = {
      images: testImages,
      open: true,
      onOpenChange: vi.fn(),
      ...props,
    }
    return render(<Lightbox {...defaultProps} />)
  }

  describe("opening and closing", () => {
    it("renders when open", () => {
      renderLightbox()
      expect(document.body.querySelector(".fixed.inset-0.z-50")).toBeTruthy()
    })

    it("does not render when closed", () => {
      renderLightbox({ open: false })
      expect(document.body.querySelector(".fixed.inset-0.z-50")).toBeNull()
    })
  })

  describe("keyboard navigation", () => {
    it("closes on Escape key", () => {
      const onOpenChange = vi.fn()
      renderLightbox({ onOpenChange })

      fireEvent.keyDown(document, { key: "Escape" })
      expect(onOpenChange).toHaveBeenCalledWith(false)
    })

    it("navigates to previous image on ArrowLeft", () => {
      const { container } = renderLightbox()
      const prevButton = container.querySelector("button[aria-label='Önceki']")
      expect(prevButton).toBeTruthy()
    })

    it("navigates to next image on ArrowRight", () => {
      const { container } = renderLightbox()
      const nextButton = container.querySelector("button[aria-label='Sonraki']")
      expect(nextButton).toBeTruthy()
    })
  })

  describe("navigation buttons", () => {
    it("renders previous button", () => {
      const { container } = renderLightbox()
      expect(container.querySelector("button[aria-label='Önceki']")).toBeTruthy()
    })

    it("renders next button", () => {
      const { container } = renderLightbox()
      expect(container.querySelector("button[aria-label='Sonraki']")).toBeTruthy()
    })

    it("hides navigation buttons for single image", () => {
      const { container } = renderLightbox({
        images: [{ src: "/single.jpg", alt: "Tek resim" }],
      })
      expect(container.querySelector("button[aria-label='Önceki']")).toBeNull()
      expect(container.querySelector("button[aria-label='Sonraki']")).toBeNull()
    })
  })

  describe("close mechanisms", () => {
    it("closes on X button click", () => {
      const onOpenChange = vi.fn()
      const { container } = renderLightbox({ onOpenChange })

      const closeButton = container.querySelector("button[aria-label='Kapat']")
      fireEvent.click(closeButton!)
      expect(onOpenChange).toHaveBeenCalledWith(false)
    })

    it("closes on overlay click", () => {
      const onOpenChange = vi.fn()
      renderLightbox({ onOpenChange })

      const overlay = document.body.querySelector(".fixed.inset-0.z-50")
      fireEvent.click(overlay!)
      expect(onOpenChange).toHaveBeenCalledWith(false)
    })

    it("does not close when clicking on image", () => {
      const onOpenChange = vi.fn()
      renderLightbox({ onOpenChange })

      const img = document.body.querySelector("img")
      fireEvent.click(img!)
      expect(onOpenChange).not.toHaveBeenCalled()
    })
  })

  describe("zoom controls", () => {
    it("renders zoom controls", () => {
      renderLightbox()
      expect(document.body.querySelector("button[aria-label='Büyüt']")).toBeTruthy()
      expect(document.body.querySelector("button[aria-label='Küçült']")).toBeTruthy()
    })

    it("shows current zoom level", () => {
      renderLightbox()
      expect(document.body.textContent).toContain("100%")
    })
  })

  describe("image counter", () => {
    it("shows current position", () => {
      renderLightbox()
      expect(document.body.textContent).toContain("1 / 3")
    })
  })

  describe("initial index", () => {
    it("starts at initialIndex", () => {
      renderLightbox({ initialIndex: 1 })
      expect(document.body.textContent).toContain("2 / 3")
    })
  })

  describe("image display", () => {
    it("displays current image alt text", () => {
      renderLightbox({ initialIndex: 0 })
      const img = document.body.querySelector("img") as HTMLImageElement
      expect(img.alt).toBe("Resim 1")
    })

    it("displays caption when present", () => {
      renderLightbox({ initialIndex: 0 })
      expect(document.body.textContent).toContain("İlk resim")
    })

    it("does not display caption when absent", () => {
      renderLightbox({ initialIndex: 2 })
      expect(document.body.textContent).not.toContain("İlk resim")
      expect(document.body.textContent).not.toContain("İkinci resim")
    })
  })

  describe("cycling navigation", () => {
    it("wraps from last to first", () => {
      const { container } = renderLightbox({ initialIndex: 2 })
      const nextButton = container.querySelector("button[aria-label='Sonraki']")
      fireEvent.click(nextButton!)
      expect(document.body.textContent).toContain("1 / 3")
    })

    it("wraps from first to last", () => {
      const { container } = renderLightbox({ initialIndex: 0 })
      const prevButton = container.querySelector("button[aria-label='Önceki']")
      fireEvent.click(prevButton!)
      expect(document.body.textContent).toContain("3 / 3")
    })
  })
})
