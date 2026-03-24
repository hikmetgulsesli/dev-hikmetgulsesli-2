"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

type Status = "online" | "offline" | "busy" | "away"

interface StatusIndicatorProps {
  status: Status
  size?: "sm" | "md" | "lg"
  showLabel?: boolean
  animate?: boolean
  label?: string
}

const statusConfig = {
  online: {
    bg: "bg-[var(--success)]",
    label: "Çevrimiçi",
    animation: "ping",
  },
  offline: {
    bg: "bg-[var(--text-muted)]",
    label: "Çevrimdışı",
    animation: "none",
  },
  busy: {
    bg: "bg-[var(--error)]",
    label: "Meşgul",
    animation: "pulse",
  },
  away: {
    bg: "bg-[var(--warning)]",
    label: "Uzak",
    animation: "none",
  },
}

const sizeClasses = {
  sm: "w-2 h-2",
  md: "w-3 h-3",
  lg: "w-4 h-4",
}

function StatusIndicator({
  status,
  size = "md",
  showLabel = false,
  animate = true,
  label,
}: StatusIndicatorProps) {
  const config = statusConfig[status]
  const shouldAnimate = animate && config.animation !== "none"

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        {/* Ping/Pulse animation layer */}
        {shouldAnimate && config.animation === "ping" && (
          <span
            className={cn(
              "absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping",
              config.bg
            )}
            style={{ animationDuration: "2s" }}
          />
        )}
        {shouldAnimate && config.animation === "pulse" && (
          <span
            className={cn(
              "absolute inline-flex h-full w-full rounded-full animate-pulse opacity-75",
              config.bg
            )}
            style={{ animationDuration: "1.5s" }}
          />
        )}
        {/* Main dot */}
        <span
          className={cn(
            "relative inline-flex rounded-full",
            sizeClasses[size],
            config.bg
          )}
        />
      </div>
      {showLabel && (
        <span className="text-xs text-[var(--text-secondary)]">
          {label ?? config.label}
        </span>
      )}
    </div>
  )
}

export { StatusIndicator, type Status }
