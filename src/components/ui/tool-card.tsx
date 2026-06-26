"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Tool } from "@/types"
import Badge from "./badge"
import { Icon } from "./icon"
import { TrendingUp, Sparkles, Clock } from "lucide-react"

interface ToolCardProps {
  tool: Tool
  index?: number
  className?: string
}

export default function ToolCard({ tool, index = 0, className }: ToolCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
    >
      <Link href={tool.path} className="block group">
        <div
          className={cn(
            "relative overflow-hidden rounded-xl border border-border bg-card p-5 shadow-soft transition-all duration-300",
            "hover:shadow-elevated hover:border-primary/30",
            "before:absolute before:inset-0 before:opacity-0 before:transition-opacity before:duration-300",
            "group-hover:before:opacity-100",
            className
          )}
        >
          {/* Animated gradient border on hover */}
          <div className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 gradient-border" />

          {/* Indicators */}
          <div className="absolute right-3 top-3 flex items-center gap-1.5">
            {tool.trending && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="flex items-center gap-1 rounded-full bg-warning/10 px-2 py-0.5 text-[10px] font-medium text-warning"
              >
                <TrendingUp className="size-3" />
                Trending
              </motion.span>
            )}
            {tool.featured && !tool.trending && (
              <span className="flex items-center gap-1 rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-medium text-accent">
                <Sparkles className="size-3" />
                Featured
              </span>
            )}
            {tool.new && (
              <span className="flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                <Clock className="size-3" />
                New
              </span>
            )}
          </div>

          {/* Icon */}
          <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
            <Icon name={tool.icon} size={24} />
          </div>

          {/* Content */}
          <h3 className="mb-1.5 text-base font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
            {tool.name}
          </h3>
          <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
            {tool.description}
          </p>

          {/* Category Badge */}
          <Badge variant="primary" size="sm">
            {tool.category}
          </Badge>
        </div>
      </Link>
    </motion.div>
  )
}
