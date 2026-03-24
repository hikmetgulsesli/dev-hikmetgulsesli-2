"use client"

import { motion } from "framer-motion"
import * as React from "react"
import { cn } from "@/lib/utils"

type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl"

type AvatarStatus = "online" | "offline" | "busy" | "away"

interface AvatarProps {
  src?: string
  alt: string
  fallback: string
  size?: AvatarSize
  status?: AvatarStatus
  rounded?: boolean
  className?: string
}

const sizeMap: Record<AvatarSize, string> = {
  xs: "w-6 h-6 text-xs",
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-14 h-14 text-base",
  xl: "w-20 h-20 text-xl",
  "2xl": "w-32 h-32 text-2xl",
}

const statusColors: Record<AvatarStatus, string> = {
  online: "bg-green-500",
  offline: "bg-gray-500",
  busy: "bg-red-500",
  away: "bg-yellow-500",
}

const statusPingClass: Record<AvatarStatus, string> = {
  online: "bg-green-500",
  offline: "",
  busy: "bg-red-500",
  away: "",
}

function getInitials(fallback: string): string {
  const words = fallback.trim().split(/\s+/)
  if (words.length === 1) {
    return words[0].substring(0, 2).toUpperCase()
  }
  return (words[0][0] + words[words.length - 1][0]).toUpperCase()
}

function Avatar({ src, alt, fallback, size = "md", status, rounded = true, className }: AvatarProps) {
  const [imageError, setImageError] = React.useState(false)
  const [loaded, setLoaded] = React.useState(false)

  const initials = getInitials(fallback)
  const sizeClass = sizeMap[size]

  return (
    <motion.div
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center overflow-hidden bg-primary font-medium text-white",
        sizeClass,
        rounded ? "rounded-full" : "rounded-lg",
        className
      )}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.15 }}
    >
      {src && !imageError ? (
        <>
          {!loaded && (
            <div className="absolute inset-0 animate-pulse bg-primary/20" />
          )}
          <img
            src={src}
            alt={alt}
            className={cn(
              "h-full w-full object-cover",
              loaded ? "opacity-100" : "opacity-0",
              rounded ? "rounded-full" : "rounded-lg"
            )}
            onError={() => setImageError(true)}
            onLoad={() => setLoaded(true)}
          />
        </>
      ) : (
        <span>{initials}</span>
      )}
      {status && (
        <span
          className={cn(
            "absolute bottom-0 right-0 block rounded-full ring-2 ring-background",
            size === "xs" || size === "sm" ? "w-2 h-2" : "w-3 h-3"
          )}
        >
          <span className={cn("block h-full w-full rounded-full", statusColors[status])} />
          {statusPingClass[status] && (
            <span
              className={cn(
                "absolute inset-0 animate-ping rounded-full opacity-75",
                statusPingClass[status]
              )}
            />
          )}
        </span>
      )}
    </motion.div>
  )
}

export { Avatar, type AvatarProps, type AvatarSize, type AvatarStatus }
