"use client"

import * as React from "react"
import { AnimatePresence, motion } from "framer-motion"
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from "lucide-react"
import { cn } from "@/lib/utils"

// Toast variants with colors and icons matching design tokens
const toastVariants = {
  default: {
    container: "border-border bg-surface-elevated",
    icon: CheckCircle,
    iconClass: "text-primary",
  },
  success: {
    container: "border-success/30 bg-success/10",
    icon: CheckCircle,
    iconClass: "text-success",
  },
  error: {
    container: "border-error/30 bg-error/10",
    icon: AlertCircle,
    iconClass: "text-error",
  },
  warning: {
    container: "border-warning/30 bg-warning/10",
    icon: AlertTriangle,
    iconClass: "text-warning",
  },
  info: {
    container: "border-info/30 bg-info/10",
    icon: Info,
    iconClass: "text-info",
  },
}

type ToastVariant = keyof typeof toastVariants

interface Toast {
  id: string
  title: string
  description?: string
  variant?: ToastVariant
  duration?: number
}

interface ToastContextValue {
  toasts: Toast[]
  addToast: (toast: Omit<Toast, "id">) => void
  removeToast: (id: string) => void
}

const ToastContext = React.createContext<ToastContextValue | undefined>(undefined)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Toast[]>([])

  const addToast = React.useCallback((toast: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substring(2, 9)
    const newToast = { ...toast, id }
    setToasts((prev) => {
      // Max 3 visible toasts
      const updated = [...prev, newToast]
      if (updated.length > 3) {
        return updated.slice(-3)
      }
      return updated
    })

    // Auto dismiss after duration (default 5000ms)
    const duration = toast.duration ?? 5000
    if (duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
      }, duration)
    }
  }, [])

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastViewport />
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = React.useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}

function ToastViewport() {
  const { toasts, removeToast } = useToast()

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
        ))}
      </AnimatePresence>
    </div>
  )
}

function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: (id: string) => void }) {
  const variant = toast.variant ?? "default"
  const config = toastVariants[variant]
  const Icon = config.icon

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={cn(
        "pointer-events-auto relative flex items-start gap-3 w-80 p-4 rounded-lg border shadow-lg backdrop-blur-sm",
        config.container
      )}
    >
      <Icon className={cn("w-5 h-5 shrink-0 mt-0.5", config.iconClass)} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-[var(--text-primary)]">{toast.title}</p>
        {toast.description && (
          <p className="mt-1 text-xs text-[var(--text-secondary)]">{toast.description}</p>
        )}
      </div>
      <button
        onClick={() => onRemove(toast.id)}
        className="shrink-0 rounded-md p-1 hover:bg-[var(--background-subtle)] transition-colors cursor-pointer"
        aria-label="Kapat"
      >
        <X className="w-4 h-4 text-[var(--text-muted)]" />
      </button>
    </motion.div>
  )
}

// Standalone toast function for programmatic use
let toastFn: ((toast: Omit<Toast, "id">) => void) | null = null

export function setToastFunction(fn: (toast: Omit<Toast, "id">) => void) {
  toastFn = fn
}

export function toast(options: Omit<Toast, "id">) {
  if (toastFn) {
    toastFn(options)
  }
}

export { type Toast, type ToastVariant }
