"use client"

import { forwardRef } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

const variants = {
  primary:
    "bg-primary text-white hover:brightness-110 shadow-soft",
  secondary:
    "bg-glass border border-white/20 text-foreground hover:bg-white/30 shadow-soft dark:bg-white/5 dark:border-white/10 dark:hover:bg-white/10",
  outline:
    "border border-border bg-transparent text-foreground hover:bg-muted",
  ghost:
    "bg-transparent text-foreground hover:bg-muted",
  danger:
    "bg-error text-white hover:brightness-110 shadow-soft",
  gradient:
    "gradient-primary text-white hover:brightness-110 shadow-soft",
}

const sizes = {
  sm: "h-8 px-3 text-xs gap-1.5",
  md: "h-10 px-4 text-sm gap-2",
  lg: "h-12 px-6 text-base gap-2.5",
  xl: "h-14 px-8 text-lg gap-3",
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants
  size?: keyof typeof sizes
  loading?: boolean
  icon?: React.ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading, icon, children, disabled, ...props }, ref) => {
    const baseClasses = cn(
      "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none",
      variants[variant],
      sizes[size],
      className
    )
    return (
      <motion.div
        whileHover={{ scale: disabled ? 1 : 1.02 }}
        whileTap={{ scale: disabled ? 1 : 0.97 }}
        className="inline-flex"
      >
        <button
          ref={ref}
          className={baseClasses}
          disabled={disabled || loading}
          {...props}
        >
          {loading ? <Loader2 className="size-4 animate-spin" /> : icon}
          {children}
        </button>
      </motion.div>
    )
  }
)

Button.displayName = "Button"
export default Button
