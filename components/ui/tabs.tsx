"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface TabItem {
  value: string
  label: string
  content: React.ReactNode
  icon?: React.ReactNode
  disabled?: boolean
}

interface TabsProps {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  items: TabItem[]
  className?: string
}

function Tabs({ value, defaultValue, onValueChange, items, className }: TabsProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? items[0]?.value)

  const selectedValue = value ?? internalValue

  const handleSelect = (val: string) => {
    if (value !== undefined && onValueChange) {
      onValueChange(val)
    } else {
      setInternalValue(val)
    }
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Tab List */}
      <div className="border-b border-[var(--border)]" role="tablist">
        <div className="flex gap-1">
          {items.map((item) => {
            const isSelected = item.value === selectedValue
            return (
              <button
                key={item.value}
                type="button"
                role="tab"
                aria-selected={isSelected}
                aria-controls={`tabpanel-${item.value}`}
                disabled={item.disabled}
                onClick={() => handleSelect(item.value)}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium transition-colors cursor-pointer",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]",
                  isSelected
                    ? "text-[var(--primary)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
                  item.disabled && "opacity-50 cursor-not-allowed"
                )}
              >
                <span className="flex items-center gap-2">
                  {item.icon}
                  {item.label}
                </span>
                {/* Active underline with primary color */}
                {isSelected && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--primary)]"
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  />
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Tab Panels */}
      {items.map((item) => {
        const isSelected = item.value === selectedValue
        return (
          <div
            key={item.value}
            role="tabpanel"
            id={`tabpanel-${item.value}`}
            aria-labelledby={item.value}
            hidden={!isSelected}
            className={cn(!isSelected && "hidden")}
          >
            {isSelected && item.content}
          </div>
        )
      })}
    </div>
  )
}

export { Tabs, type TabItem }
