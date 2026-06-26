"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { cn } from "@/lib/utils"

const stats = [
  { value: 500, suffix: "+", label: "Tools Available" },
  { value: 1, suffix: "M+", label: "Active Users", multiplier: 1000000 },
  { value: 100, suffix: "%", label: "Free Forever" },
]

function Counter({ value, suffix, label, multiplier }: { value: number; suffix: string; label: string; multiplier?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const displayValue = isInView ? value : 0

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center gap-2 text-center"
    >
      <motion.div
        className="text-4xl font-bold tracking-tight sm:text-5xl gradient-text"
        initial={{ scale: 0.5 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
      >
        {displayValue}{suffix}
      </motion.div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </motion.div>
  )
}

export function Stats() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-5xl px-4">
        <div className={cn(
          "grid grid-cols-1 gap-8 rounded-2xl border border-border/50 bg-card/50 p-8 sm:grid-cols-3 sm:p-12",
          "shadow-card"
        )}>
          {stats.map((stat) => (
            <Counter key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  )
}
