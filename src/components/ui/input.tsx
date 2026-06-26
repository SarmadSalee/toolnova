"use client"

import { forwardRef, useState } from "react"
import { cn } from "@/lib/utils"

const variantStyles = {
  default:
    "bg-background border-border focus:border-ring focus:ring-1 focus:ring-ring",
  filled:
    "bg-muted border-transparent focus:bg-background focus:border-ring focus:ring-1 focus:ring-ring",
  glass:
    "bg-glass border-white/20 focus:border-ring focus:ring-1 focus:ring-ring dark:bg-white/5 dark:border-white/10",
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: keyof typeof variantStyles
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
  error?: string
  floatingLabel?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant = "default", iconLeft, iconRight, error, floatingLabel, id, placeholder, ...props }, ref) => {
    const [focused, setFocused] = useState(false)
    const hasValue = props.value !== undefined && props.value !== ""
    const showLabel = floatingLabel && (focused || hasValue)

    return (
      <div className="relative w-full">
        {floatingLabel && (
          <label
            htmlFor={id}
            className={cn(
              "absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground transition-all duration-200 pointer-events-none",
              iconLeft && "left-10",
              showLabel && "top-0 -translate-y-1/2 scale-75 px-1 bg-background",
              error && "text-error"
            )}
          >
            {floatingLabel}
          </label>
        )}
        {iconLeft && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
            {iconLeft}
          </div>
        )}
        <input
          ref={ref}
          id={id}
          placeholder={floatingLabel && showLabel ? "" : placeholder}
          onFocus={(e) => { setFocused(true); props.onFocus?.(e) }}
          onBlur={(e) => { setFocused(false); props.onBlur?.(e) }}
          className={cn(
            "flex h-10 w-full rounded-lg border px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground transition-colors duration-200 outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50",
            variantStyles[variant],
            iconLeft && "pl-10",
            iconRight && "pr-10",
            floatingLabel && "pt-4 pb-1",
            error && "border-error focus:border-error focus:ring-error",
            className
          )}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          {...props}
        />
        {iconRight && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
            {iconRight}
          </div>
        )}
        {error && (
          <p id={`${id}-error`} className="mt-1 text-xs text-error" role="alert">
            {error}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = "Input"
export default Input
