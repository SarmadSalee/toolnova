"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const cardVariants = {
  default: "bg-card text-card-foreground border border-border shadow-soft",
  glass: "bg-glass border border-white/20 shadow-soft dark:bg-white/5 dark:border-white/10",
  gradient: "gradient-primary text-white shadow-soft",
  interactive:
    "bg-card text-card-foreground border border-border shadow-soft cursor-pointer",
}

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof cardVariants
}

export default function Card({
  className,
  variant = "default",
  children,
  ...props
}: CardProps) {
  if (variant === "interactive") {
    return (
      <motion.div
        whileHover={{ y: -4, transition: { duration: 0.2 } }}
        className={cn(
          "rounded-xl p-6 transition-shadow duration-200 hover:shadow-elevated",
          cardVariants[variant],
          className
        )}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <div
      className={cn(
        "rounded-xl p-6 transition-shadow duration-200",
        cardVariants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("mb-4", className)} {...props}>
      {children}
    </div>
  )
}

export function CardContent({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("", className)} {...props}>
      {children}
    </div>
  )
}

export function CardFooter({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("mt-4 flex items-center", className)} {...props}>
      {children}
    </div>
  )
}
