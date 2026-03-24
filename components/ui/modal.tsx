"use client"

import * as React from "react"
import { AnimatePresence, motion } from "framer-motion"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface ModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
  size?: "sm" | "md" | "lg" | "xl" | "full"
  showClose?: boolean
}

const sizeClasses = {
  sm: "max-w-[320px]",
  md: "max-w-[480px]",
  lg: "max-w-[640px]",
  xl: "max-w-[800px]",
  full: "max-w-[calc(100vw-32px)] max-h-[calc(100vh-32px)]",
}

function Modal({ open, onOpenChange, children, size = "md", showClose = true }: ModalProps) {
  // Handle escape key
  React.useEffect(() => {
    if (!open) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onOpenChange(false)
      }
    }

    document.addEventListener("keydown", handleEscape)
    // Prevent body scroll when modal is open
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = ""
    }
  }, [open, onOpenChange])

  // Focus trap
  const modalRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (!open || !modalRef.current) return

    const modal = modalRef.current
    const focusableElements = modal.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    // Focus first element
    firstElement?.focus()

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement?.focus()
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault()
          firstElement?.focus()
        }
      }
    }

    modal.addEventListener("keydown", handleTab)
    return () => modal.removeEventListener("keydown", handleTab)
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100]">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-[8px]"
            onClick={() => onOpenChange(false)}
            aria-hidden="true"
          />
          
          {/* Modal Content */}
          <div className="fixed inset-0 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className={cn(
                "relative w-full bg-[var(--background-elevated)] border border-[var(--border)] rounded-xl shadow-2xl pointer-events-auto",
                "max-h-[calc(100vh-32px)] overflow-hidden",
                sizeClasses[size]
              )}
              role="dialog"
              aria-modal="true"
            >
              {showClose && (
                <button
                  onClick={() => onOpenChange(false)}
                  className="absolute top-4 right-4 rounded-md p-1.5 hover:bg-[var(--background-subtle)] transition-colors cursor-pointer z-10"
                  aria-label="Kapat"
                >
                  <X className="w-5 h-5 text-[var(--text-secondary)]" />
                </button>
              )}
              {children}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}

function ModalHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("px-6 py-4 border-b border-[var(--border)]", className)}>
      {children}
    </div>
  )
}

function ModalBody({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("px-6 py-4 overflow-y-auto max-h-[60vh]", className)}>{children}</div>
}

function ModalFooter({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("px-6 py-4 border-t border-[var(--border)] flex justify-end gap-3", className)}>
      {children}
    </div>
  )
}

export { Modal, ModalHeader, ModalBody, ModalFooter, type ModalProps }
