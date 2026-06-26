"use client"

import { createContext, useContext, useCallback, useState, type ReactNode } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, Copy, RotateCcw, Share2, X } from "lucide-react"
import { copyToClipboard, shareData } from "@/lib/utils"
import { cn } from "@/lib/utils"
import Button from "@/components/ui/button"

interface Toast {
  id: string
  message: string
  type: "success" | "error"
}

interface ToolContextType {
  copy: (text: string, label?: string) => Promise<void>
  reset: () => void
  share: (title: string, text: string, url?: string) => Promise<void>
  toasts: Toast[]
}

const ToolContext = createContext<ToolContextType | null>(null)

export function useToolContext() {
  const ctx = useContext(ToolContext)
  if (!ctx) throw new Error("useToolContext must be used within ToolWrapper")
  return ctx
}

interface ToolWrapperProps {
  children: ReactNode
  onReset?: () => void
}

export default function ToolWrapper({ children, onReset }: ToolWrapperProps) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = useCallback((message: string, type: "success" | "error" = "success") => {
    const id = Math.random().toString(36).substring(2)
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3000)
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const copy = useCallback(
    async (text: string, label = "Copied") => {
      try {
        await copyToClipboard(text)
        addToast(`${label} to clipboard!`)
      } catch {
        addToast("Failed to copy", "error")
      }
    },
    [addToast]
  )

  const reset = useCallback(() => {
    onReset?.()
    addToast("Reset successfully")
  }, [onReset, addToast])

  const share = useCallback(
    async (title: string, text: string, url?: string) => {
      try {
        await shareData(title, text, url || window.location.href)
      } catch {
        addToast("Share cancelled", "error")
      }
    },
    [addToast]
  )

  return (
    <ToolContext.Provider value={{ copy, reset, share, toasts }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-3 shadow-elevated text-sm font-medium min-w-[250px]",
                toast.type === "success"
                  ? "bg-success text-white"
                  : "bg-error text-white"
              )}
            >
              {toast.type === "success" ? (
                <Check className="size-4 shrink-0" />
              ) : (
                <X className="size-4 shrink-0" />
              )}
              <span className="flex-1">{toast.message}</span>
              <button
                onClick={() => removeToast(toast.id)}
                className="shrink-0 opacity-70 hover:opacity-100 transition-opacity"
              >
                <X className="size-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToolContext.Provider>
  )
}

interface ToolActionBarProps {
  onCopy?: () => void
  onReset?: () => void
  onShare?: () => void
  showCopy?: boolean
  showReset?: boolean
  showShare?: boolean
  copyLabel?: string
}

export function ToolActionBar({
  onCopy,
  onReset,
  onShare,
  showCopy = true,
  showReset = true,
  showShare = true,
  copyLabel,
}: ToolActionBarProps) {
  const { copy } = useToolContext()
  return (
    <div className="flex flex-wrap items-center gap-2">
      {showCopy && onCopy && (
        <Button
          variant="secondary"
          size="sm"
          icon={<Copy className="size-3.5" />}
          onClick={() => copy("", copyLabel)}
        >
          Copy
        </Button>
      )}
      {showReset && onReset && (
        <Button
          variant="secondary"
          size="sm"
          icon={<RotateCcw className="size-3.5" />}
          onClick={onReset}
        >
          Reset
        </Button>
      )}
      {showShare && onShare && (
        <Button
          variant="secondary"
          size="sm"
          icon={<Share2 className="size-3.5" />}
          onClick={onShare}
        >
          Share
        </Button>
      )}
    </div>
  )
}
