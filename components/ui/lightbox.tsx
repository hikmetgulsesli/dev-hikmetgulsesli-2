"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react"
import * as React from "react"
import { cn } from "@/lib/utils"

interface LightboxProps {
  images: { src: string; alt: string; caption?: string }[]
  initialIndex?: number
  open: boolean
  onOpenChange: (open: boolean) => void
  onIndexChange?: (index: number) => void
}

function Lightbox({ images, initialIndex = 0, open, onOpenChange, onIndexChange }: LightboxProps) {
  const [currentIndex, setCurrentIndex] = React.useState(initialIndex)
  const [scale, setScale] = React.useState(1)
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    setCurrentIndex(initialIndex)
    setScale(1)
  }, [initialIndex, open])

  React.useEffect(() => {
    if (!open) return

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          onOpenChange(false)
          break
        case "ArrowLeft":
          goToPrevious()
          break
        case "ArrowRight":
          goToNext()
          break
        case "+":
        case "=":
          handleZoomIn()
          break
        case "-":
          handleZoomOut()
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [open, currentIndex])

  const goToPrevious = React.useCallback(() => {
    setCurrentIndex((prev) => {
      const newIndex = prev === 0 ? images.length - 1 : prev - 1
      onIndexChange?.(newIndex)
      return newIndex
    })
    setScale(1)
  }, [images.length, onIndexChange])

  const goToNext = React.useCallback(() => {
    setCurrentIndex((prev) => {
      const newIndex = prev === images.length - 1 ? 0 : prev + 1
      onIndexChange?.(newIndex)
      return newIndex
    })
    setScale(1)
  }, [images.length, onIndexChange])

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.5, 4))
  }

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.5, 1))
  }

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onOpenChange(false)
    }
  }

  if (!open || images.length === 0) return null

  const currentImage = images[currentIndex]

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={handleOverlayClick}
        >
          {/* Close button */}
          <button
            onClick={() => onOpenChange(false)}
            className="absolute top-4 right-4 z-10 rounded-lg bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
            aria-label="Kapat"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Navigation buttons */}
          {images.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-4 z-10 rounded-lg bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
                aria-label="Önceki"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-4 z-10 rounded-lg bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
                aria-label="Sonraki"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}

          {/* Zoom controls */}
          <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-lg bg-white/10 px-4 py-2">
            <button
              onClick={handleZoomOut}
              className="rounded p-1 text-white transition-colors hover:bg-white/20"
              aria-label="Küçült"
              disabled={scale <= 1}
            >
              <ZoomOut className="h-5 w-5" />
            </button>
            <span className="min-w-12 text-center text-sm text-white">{Math.round(scale * 100)}%</span>
            <button
              onClick={handleZoomIn}
              className="rounded p-1 text-white transition-colors hover:bg-white/20"
              aria-label="Büyüt"
              disabled={scale >= 4}
            >
              <ZoomIn className="h-5 w-5" />
            </button>
          </div>

          {/* Image counter */}
          <div className="absolute top-4 left-1/2 z-10 -translate-x-1/2 rounded-lg bg-white/10 px-3 py-1 text-sm text-white">
            {currentIndex + 1} / {images.length}
          </div>

          {/* Image container */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="relative max-h-[85vh] max-w-[90vw] overflow-hidden"
          >
            <img
              src={currentImage.src}
              alt={currentImage.alt}
              className="max-h-[85vh] max-w-[90vw] object-contain"
              style={{ transform: `scale(${scale})` }}
              draggable={false}
            />
            {currentImage.caption && (
              <p className="mt-2 text-center text-sm text-white/80">{currentImage.caption}</p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export { Lightbox, type LightboxProps }
