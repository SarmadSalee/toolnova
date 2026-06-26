"use client"

import { motion } from "framer-motion"
import { Icon } from "@/components/ui/icon"
import { cn } from "@/lib/utils"

const benefits = [
  {
    icon: "star",
    title: "100% Free",
    description: "All tools are completely free with no hidden charges.",
    gradient: "from-emerald-500 to-green-500",
  },
  {
    icon: "check",
    title: "No Sign Up",
    description: "Start using tools instantly without creating an account.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: "shield",
    title: "Privacy First",
    description: "Everything runs in your browser. We never store your data.",
    gradient: "from-violet-500 to-purple-500",
  },
]

export function Benefits() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-5xl px-4">
        <div className="mb-10 text-center">
          <h2 className="mb-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Why Choose <span className="gradient-text">ToolNova</span>
          </h2>
          <p className="mx-auto max-w-lg text-muted-foreground">
            Built with you in mind — no strings attached, just powerful tools.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {benefits.map((benefit, i) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              whileHover={{ y: -4, transition: { type: "spring", stiffness: 300 } }}
              className={cn(
                "flex flex-col items-center rounded-xl border border-border/50 p-8 text-center",
                "bg-card transition-colors hover:border-border hover:shadow-card"
              )}
            >
              <div className={cn(
                "mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl",
                "bg-gradient-to-br shadow-sm",
                benefit.gradient
              )}>
                <Icon name={benefit.icon} className="text-white" size={26} />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">{benefit.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
