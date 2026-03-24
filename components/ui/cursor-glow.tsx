"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import * as React from "react"

interface CursorGlowProps {
  /** Radial gradient color in hex or rgba, default #10b981 */
  color?: string
  /** Glow radius in pixels, default 300 */
  size?: number
  /** Glow opacity at center, default 0.15 */
  opacity?: number
  /** Smoothness factor (0-1), default 0.1 - higher is smoother but slower */
  smoothing?: number
  /** CSS blend mode, default "screen" */
  blendMode?: string
  className?: string
}

/**
 * Cursor Glow component
 * 
 * A radial gradient that follows the cursor smoothly with lerp interpolation.
 * Automatically disabled on touch devices.
 * 
 * @example
 * <CursorGlow color="#10b981" size={300} opacity={0.15} />
 */
function CursorGlow({
  color = "#10b981",
  size = 300,
  opacity = 0.15,
  smoothing = 0.1,
  blendMode = "screen",
  className,
}: CursorGlowProps) {
  const [isTouchDevice, setIsTouchDevice] = React.useState(false)
  const [isVisible, setIsVisible] = React.useState(false)

  // Detect touch device
  React.useEffect(() => {
    const checkTouch = () => {
      const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0
      setIsTouchDevice(hasTouch)
    }
    
    checkTouch()
    window.addEventListener("resize", checkTouch)
    return () => window.removeEventListener("resize", checkTouch)
  }, [])

  // Mouse position with spring smoothing for natural movement
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 }
  const smoothedX = useSpring(mouseX, { ...springConfig, stiffness: 300 * smoothing })
  const smoothedY = useSpring(mouseY, { ...springConfig, stiffness: 300 * smoothing })

  // Radial gradient style
  const background = useTransform(
    [smoothedX, smoothedY],
    ([x, y]) => 
      `radial-gradient(circle ${size}px at ${x}px ${y}px, ${color} ${opacity * 100}%, transparent 100%)`
  )

  // Track mouse position
  React.useEffect(() => {
    if (isTouchDevice) return

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    window.addEventListener("mousemove", handleMouseMove)
    document.documentElement.addEventListener("mouseleave", handleMouseLeave)
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [isTouchDevice, mouseX, mouseY, isVisible])

  // Don't render on touch devices
  if (isTouchDevice) {
    return null
  }

  return (
    <motion.div
      className={`pointer-events-none fixed inset-0 z-[9999] ${className || ""}`}
      style={{
        background,
        mixBlendMode: blendMode as React.CSSProperties["mixBlendMode"],
        opacity: isVisible ? 1 : 0,
        transition: "opacity 300ms ease-out",
      }}
      aria-hidden="true"
    />
  )
}

export { CursorGlow, type CursorGlowProps }
