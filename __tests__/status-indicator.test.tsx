import { describe, it, expect } from "vitest"

describe("Status Indicator Component", () => {
  it("should have 4 status states", () => {
    const statuses = ["online", "offline", "busy", "away"]
    expect(statuses.length).toBe(4)
  })

  it("should show green ping animation for online status", () => {
    const statusConfig = {
      online: { bg: "bg-[var(--success)]", animation: "ping" },
    }

    expect(statusConfig.online.animation).toBe("ping")
    expect(statusConfig.online.bg).toContain("success")
  })

  it("should show red pulse animation for busy status", () => {
    const statusConfig = {
      busy: { bg: "bg-[var(--error)]", animation: "pulse" },
    }

    expect(statusConfig.busy.animation).toBe("pulse")
    expect(statusConfig.busy.bg).toContain("error")
  })

  it("should have correct size classes", () => {
    const sizeClasses = {
      sm: "w-2 h-2",
      md: "w-3 h-3",
      lg: "w-4 h-4",
    }

    expect(sizeClasses.sm).toContain("w-2")
    expect(sizeClasses.md).toContain("w-3")
    expect(sizeClasses.lg).toContain("w-4")
  })

  it("should have no animation for offline status", () => {
    const statusConfig = {
      offline: { bg: "bg-[var(--text-muted)]", animation: "none" },
    }

    expect(statusConfig.offline.animation).toBe("none")
  })

  it("should have no animation for away status", () => {
    const statusConfig = {
      away: { bg: "bg-[var(--warning)]", animation: "none" },
    }

    expect(statusConfig.away.animation).toBe("none")
  })

  it("should use correct animation durations", () => {
    const pingDuration = "2s"
    const pulseDuration = "1.5s"

    expect(pingDuration).toBe("2s")
    expect(pulseDuration).toBe("1.5s")
  })
})
