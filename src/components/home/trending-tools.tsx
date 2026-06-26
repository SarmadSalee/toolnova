"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useDragControls } from "framer-motion"
import { Icon } from "@/components/ui/icon"
import { trendingTools } from "@/data/tools"
import { cn } from "@/lib/utils"

export function TrendingTools() {
  const containerRef = useRef<HTMLDivElement>(null)
  const dragControls = useDragControls()

  const toolColors = [
    "from-red-500 to-rose-500",
    "from-amber-500 to-orange-500",
    "from-emerald-500 to-green-500",
    "from-blue-500 to-cyan-500",
    "from-violet-500 to-purple-500",
    "from-pink-500 to-fuchsia-500",
    "from-teal-500 to-cyan-500",
    "from-indigo-500 to-blue-500",
  ]

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-6 flex items-center gap-3">
          <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-red-500 shadow-sm">
            <Icon name="flame" className="text-white" size={18} />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Trending <span className="gradient-text">Now</span>
            </h2>
            <p className="text-sm text-muted-foreground">Most popular tools this week</p>
          </div>
        </div>

        <div
          ref={containerRef}
          className="relative overflow-x-auto pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <motion.div
            drag="x"
            dragControls={dragControls}
            dragConstraints={containerRef}
            dragElastic={0.1}
            className="flex gap-4 cursor-grab active:cursor-grabbing"
          >
            {trendingTools.map((tool, i) => (
              <Link
                key={tool.id}
                href={tool.path}
                className={cn(
                  "group w-64 shrink-0 rounded-xl border border-border/50 p-5 transition-colors",
                  "bg-card hover:border-border hover:shadow-card"
                )}
              >
                <div className={cn(
                  "mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl",
                  "bg-gradient-to-br shadow-sm",
                  toolColors[i % toolColors.length]
                )}>
                  <Icon name={tool.icon} className="text-white" size={20} />
                </div>
                <h3 className="mb-1 text-base font-semibold text-foreground">{tool.name}</h3>
                <p className="mb-4 text-xs leading-relaxed text-muted-foreground line-clamp-2">{tool.description}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="rounded-md bg-muted px-2 py-0.5 font-medium text-primary capitalize">
                    {tool.category}
                  </span>
                  <span className="flex items-center gap-0.5 text-orange-500">
                    <Icon name="fire" size={12} />
                    Trending
                  </span>
                </div>
              </Link>
            ))}
          </motion.div>
        </div>

        <div className="mt-4 flex items-center justify-center gap-1 text-xs text-muted-foreground">
          <Icon name="chevron-right" size={14} className="animate-pulse" />
          <span>Drag to scroll</span>
          <Icon name="chevron-left" size={14} className="animate-pulse" />
        </div>
      </div>
    </section>
  )
}
