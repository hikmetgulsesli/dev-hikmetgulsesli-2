"use client"

import * as React from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface AccordionItem {
  value: string
  trigger: string
  content: React.ReactNode
  disabled?: boolean
}

interface AccordionProps {
  type?: "single" | "multiple"
  defaultValue?: string | string[]
  items: AccordionItem[]
  className?: string
  allowAllClosed?: boolean
}

function Accordion({
  type = "single",
  defaultValue,
  items,
  className,
  allowAllClosed = false,
}: AccordionProps) {
  const [openItems, setOpenItems] = React.useState<string[]>(() => {
    if (!defaultValue) return []
    if (Array.isArray(defaultValue)) return defaultValue
    return [defaultValue]
  })

  const handleToggle = (value: string) => {
    setOpenItems((prev) => {
      if (prev.includes(value)) {
        if (allowAllClosed || (type === "single" && prev.length === 1)) {
          return prev.filter((v) => v !== value)
        }
        return prev.filter((v) => v !== value)
      }
      if (type === "single") {
        return [value]
      }
      return [...prev, value]
    })
  }

  return (
    <div className={cn("space-y-2", className)}>
      {items.map((item) => (
        <AccordionItemComponent
          key={item.value}
          item={item}
          isOpen={openItems.includes(item.value)}
          onToggle={() => !item.disabled && handleToggle(item.value)}
        />
      ))}
    </div>
  )
}

interface AccordionItemProps {
  item: AccordionItem
  isOpen: boolean
  onToggle: () => void
}

function AccordionItemComponent({ item, isOpen, onToggle }: AccordionItemProps) {
  const contentRef = React.useRef<HTMLDivElement>(null)

  return (
    <div className="border border-[var(--border)] rounded-lg overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        disabled={item.disabled}
        aria-expanded={isOpen}
        aria-controls={`accordion-content-${item.value}`}
        className={cn(
          "w-full flex items-center justify-between px-4 py-3 text-left transition-colors",
          "hover:bg-[var(--background-subtle)]",
          isOpen && "text-[var(--primary)]",
          item.disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        <span className="font-medium">{item.trigger}</span>
        <ChevronDown
          className={cn(
            "w-4 h-4 shrink-0 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{ overflow: "hidden" }}
          >
            <div
              ref={contentRef}
              id={`accordion-content-${item.value}`}
              className="px-4 pb-3 pt-1 text-sm text-[var(--text-secondary)]"
            >
              {item.content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export { Accordion, type AccordionItem }
