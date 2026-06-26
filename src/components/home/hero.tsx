"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Icon } from "@/components/ui/icon"
import { cn } from "@/lib/utils"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
} as const

const floatingCards = [
  { icon: "braces", label: "JSON Formatter", color: "from-yellow-400 to-orange-500", x: "10%", y: "15%", delay: 0 },
  { icon: "qr-code", label: "QR Generator", color: "from-purple-500 to-violet-500", x: "75%", y: "10%", delay: 1 },
  { icon: "palette", label: "Color Picker", color: "from-violet-500 to-purple-600", x: "85%", y: "55%", delay: 2 },
  { icon: "lock", label: "Password Gen", color: "from-red-500 to-rose-500", x: "5%", y: "60%", delay: 0.5 },
  { icon: "calculator", label: "BMI Calculator", color: "from-cyan-500 to-blue-500", x: "20%", y: "75%", delay: 1.5 },
]

function FloatingCard({ icon, label, color, x, y, delay }: (typeof floatingCards)[number]) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.5 + delay, duration: 0.5 }}
      className={cn(
        "absolute hidden lg:flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/80 dark:bg-zinc-900/80 shadow-elevated border border-white/20 dark:border-zinc-700/30 backdrop-blur-sm",
        "animate-float"
      )}
      style={{ left: x, top: y, animationDelay: `${delay}s` }}
    >
      <div className={cn("p-1.5 rounded-lg bg-gradient-to-br", color)}>
        <Icon name={icon} className="text-white" size={14} />
      </div>
      <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300 whitespace-nowrap">{label}</span>
    </motion.div>
  )
}

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-16 pt-24 md:pt-32 lg:pb-24">
      <div className="animate-gradient absolute inset-0 -z-10 bg-[linear-gradient(135deg,#2563EB10,#06B6D410,#8B5CF610,#2563EB10)]" />
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute right-1/3 top-1/3 h-80 w-80 rounded-full bg-secondary/5 blur-3xl" />
        <div className="absolute bottom-1/4 left-1/3 h-72 w-72 rounded-full bg-accent/5 blur-3xl" />
      </div>

      {floatingCards.map((card) => (
        <FloatingCard key={card.label} {...card} />
      ))}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-5xl px-4 text-center"
      >
        <motion.div variants={itemVariants} className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary">
          <Icon name="sparkles" size={14} />
          <span>500+ Free Tools at Your Fingertips</span>
        </motion.div>

        <motion.h1 variants={itemVariants} className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          <span className="gradient-text">The Ultimate Free</span>
          <br />
          Online Toolkit
        </motion.h1>

        <motion.p variants={itemVariants} className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Discover 500+ powerful online tools for developers, designers, and creators.
          Format JSON, generate QR codes, edit images, and more — all free, no sign-up required.
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/categories"
            className="group gradient-primary flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:scale-105 hover:shadow-xl hover:shadow-primary/30"
          >
            Explore Tools
            <Icon name="arrow-right" className="transition-transform group-hover:translate-x-0.5" size={18} />
          </Link>
          <Link
            href="/tools"
            className="group flex items-center gap-2 rounded-full border border-border px-8 py-3.5 text-sm font-semibold text-foreground transition-all hover:bg-muted"
          >
            Browse All
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="mx-auto mt-16 max-w-3xl px-4"
      >
        <div className="bg-glass flex flex-wrap items-center justify-center gap-6 rounded-2xl border border-border/50 px-4 py-4 sm:gap-16 sm:px-12">
          {[
            { value: "500+", label: "Tools" },
            { value: "1M+", label: "Users" },
            { value: "100%", label: "Free" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-lg font-bold text-foreground sm:text-2xl">{stat.value}</div>
              <div className="text-xs text-muted-foreground sm:text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
