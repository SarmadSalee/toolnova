"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { RotateCcw, AlertTriangle, X } from "lucide-react"

interface ResetButtonProps {
  onReset: () => void
  className?: string
  label?: string
}

export default function ResetButton({ onReset, className, label = "Reset" }: ResetButtonProps) {
  const [confirming, setConfirming] = useState(false)

  const handleReset = () => {
    if (!confirming) {
      setConfirming(true)
      setTimeout(() => setConfirming(false), 3000)
      return
    }
    onReset()
    setConfirming(false)
  }

  const cancel = (e: React.MouseEvent) => {
    e.stopPropagation()
    setConfirming(false)
  }

  return (
    <motion.button
      whileHover={!confirming ? { scale: 1.05 } : undefined}
      whileTap={!confirming ? { scale: 0.95 } : undefined}
      onClick={handleReset}
      className={cn(
        "inline-flex items-center justify-center rounded-lg border px-3 py-2 text-sm transition-colors cursor-pointer",
        confirming
          ? "border-error bg-error/10 text-error"
          : "border-border bg-background text-muted-foreground hover:text-foreground hover:border-ring",
        className
      )}
      aria-label={confirming ? "Confirm reset" : label}
    >
      <AnimatePresence mode="wait">
        {confirming ? (
          <motion.span
            key="confirm"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="flex items-center gap-1.5"
          >
            <AlertTriangle className="size-4" />
            <span className="text-xs font-medium">Are you sure?</span>
            <span
              onClick={cancel}
              className="ml-1 rounded p-0.5 hover:bg-error/20 transition-colors"
            >
              <X className="size-3.5" />
            </span>
          </motion.span>
        ) : (
          <motion.span
            key="reset"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="flex items-center gap-1.5"
          >
            <RotateCcw className="size-4" />
            <span className="text-xs font-medium">{label}</span>
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  )
}
