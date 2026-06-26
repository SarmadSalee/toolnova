"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { shareData, copyToClipboard } from "@/lib/utils"
import { Share2, Check, Link } from "lucide-react"

interface ShareButtonProps {
  title: string
  text: string
  url: string
  className?: string
}

export default function ShareButton({ title, text, url, className }: ShareButtonProps) {
  const [shared, setShared] = useState(false)

  const handleShare = async () => {
    try {
      await shareData(title, text, url)
    } catch {
      await copyToClipboard(url)
    }
    setShared(true)
    setTimeout(() => setShared(false), 2000)
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleShare}
      className={cn(
        "inline-flex items-center justify-center rounded-lg border border-border bg-background px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:border-ring transition-colors cursor-pointer",
        shared && "border-primary text-primary",
        className
      )}
      aria-label={shared ? "Link copied" : "Share"}
    >
      <AnimatePresence mode="wait">
        {shared ? (
          <motion.span
            key="check"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="flex items-center gap-1.5"
          >
            <Link className="size-4" />
            <span className="text-xs font-medium">Link Copied!</span>
          </motion.span>
        ) : (
          <motion.span
            key="share"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="flex items-center gap-1.5"
          >
            <Share2 className="size-4" />
            <span className="text-xs font-medium">Share</span>
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  )
}
