"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Icon } from "@/components/ui/icon"
import { categories } from "@/data/categories"
import { cn } from "@/lib/utils"

const categoryVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.4, ease: "easeOut" as const },
  }),
} as const

export function CategoriesSection() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-10 text-center">
          <h2 className="mb-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Browse by <span className="gradient-text">Category</span>
          </h2>
          <p className="mx-auto max-w-lg text-muted-foreground">
            Find exactly what you need — organized into 15 categories for every use case.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((category, i) => (
            <motion.div
              key={category.id}
              custom={i}
              variants={categoryVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -6, transition: { type: "spring", stiffness: 300 } }}
            >
              <Link
                href={`/categories/${category.slug}`}
                className={cn(
                  "group relative flex h-full flex-col rounded-xl border border-border/50 p-5 transition-colors",
                  "bg-card hover:border-border"
                )}
              >
                <div className={cn(
                  "mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl",
                  "bg-gradient-to-br shadow-sm",
                  category.gradient
                )}>
                  <Icon name={category.icon} className="text-white" size={22} />
                </div>
                <h3 className="mb-1.5 text-base font-semibold text-foreground">{category.name}</h3>
                <p className="mb-4 flex-1 text-xs leading-relaxed text-muted-foreground">{category.description}</p>
                <div className="flex items-center gap-1.5 text-xs font-medium text-primary">
                  <span>{category.tools} tools</span>
                  <Icon name="chevron-right" size={14} className="transition-transform group-hover:translate-x-0.5" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
