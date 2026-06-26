"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from "lucide-react"

type ToastType = "success" | "error" | "warning" | "info"

interface ToastData {
  id: string
  message: string
  type: ToastType
}

const icons: Record<ToastType, React.ReactNode> = {
  success: <CheckCircle className="size-5 text-success" />,
  error: <AlertCircle className="size-5 text-error" />,
  warning: <AlertTriangle className="size-5 text-warning" />,
  info: <Info className="size-5 text-primary" />,
}

interface ToastContainerProps {
  toasts: ToastData[]
  removeToast: (id: string) => void
}

export default function ToastContainer({ toasts, removeToast }: ToastContainerProps) {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            layout
            initial={{ opacity: 0, x: 100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={cn(
              "flex items-center gap-3 rounded-xl border bg-card px-4 py-3 shadow-elevated min-w-[300px] max-w-md",
              toast.type === "success" && "border-success/20",
              toast.type === "error" && "border-error/20",
              toast.type === "warning" && "border-warning/20",
              toast.type === "info" && "border-primary/20"
            )}
          >
            {icons[toast.type]}
            <p className="flex-1 text-sm text-foreground">{toast.message}</p>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              <X className="size-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export function useToastState() {
  const [toasts, setToasts] = useState<ToastData[]>([])

  const addToast = (message: string, type: ToastType = "info", duration = 4000) => {
    const id = Math.random().toString(36).substring(2, 9)
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, duration)
  }

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  return { toasts, addToast, removeToast }
}
