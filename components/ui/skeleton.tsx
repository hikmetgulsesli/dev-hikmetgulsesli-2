"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface SkeletonProps {
  variant?: "text" | "circular" | "rectangular" | "card"
  width?: number | string
  height?: number | string
  animation?: "pulse" | "wave" | "none"
  className?: string
}

function Skeleton({
  variant = "rectangular",
  width,
  height,
  animation = "pulse",
  className,
}: SkeletonProps) {
  const [isMounted, setIsMounted] = React.useState(false)

  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  const baseClasses = "bg-[var(--background-subtle)]"

  const variantClasses = {
    text: "rounded-md h-4",
    circular: "rounded-full",
    rectangular: "rounded-lg",
    card: "rounded-xl",
  }

  const animationClasses = {
    pulse: "animate-pulse",
    wave: "relative overflow-hidden",
    none: "",
  }

  const style: React.CSSProperties = {}
  if (width) {
    style.width = typeof width === "number" ? `${width}px` : width
  }
  if (height) {
    style.height = typeof height === "number" ? `${height}px` : height
  }

  return (
    <div
      className={cn(
        baseClasses,
        variantClasses[variant],
        animationClasses[animation],
        animation === "wave" && "after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/5 after:to-transparent after:animate-wave",
        className
      )}
      style={style}
    />
  )
}

// Card skeleton with shimmer effect
function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn("bg-[var(--background-elevated)] border border-[var(--border)] rounded-xl p-6 space-y-4", className)}>
      <Skeleton variant="rectangular" height={180} className="w-full" />
      <div className="space-y-2">
        <Skeleton variant="text" className="w-3/4 h-5" />
        <Skeleton variant="text" className="w-1/2 h-4" />
      </div>
      <div className="flex gap-2">
        <Skeleton variant="rectangular" width={60} height={24} className="rounded-full" />
        <Skeleton variant="rectangular" width={80} height={24} className="rounded-full" />
      </div>
    </div>
  )
}

// Profile skeleton
function SkeletonProfile({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <Skeleton variant="circular" width={48} height={48} />
      <div className="space-y-2 flex-1">
        <Skeleton variant="text" className="w-1/3 h-4" />
        <Skeleton variant="text" className="w-1/4 h-3" />
      </div>
    </div>
  )
}

// Table row skeleton
function SkeletonTableRow({ columns = 4, className }: { columns?: number; className?: string }) {
  return (
    <div className={cn("flex items-center gap-4 py-3 border-b border-[var(--border)]", className)}>
      {Array.from({ length: columns }).map((_, i) => (
        <Skeleton key={i} variant="text" className="flex-1" />
      ))}
    </div>
  )
}

export { Skeleton, SkeletonCard, SkeletonProfile, SkeletonTableRow }
