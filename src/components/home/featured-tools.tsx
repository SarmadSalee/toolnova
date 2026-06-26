"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Icon } from "@/components/ui/icon"
import { featuredTools } from "@/data/tools"
import { cn } from "@/lib/utils"

export function FeaturedTools() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-10 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div>
            <h2 className="mb-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Featured <span className="gradient-text">Tools</span>
            </h2>
            <p className="text-muted-foreground">Our most popular and powerful tools, ready to use.</p>
          </div>
          <Link
            href="/tools"
            className="group flex shrink-0 items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80"
          >
            View All Tools
            <Icon name="arrow-right" size={16} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {featuredTools.slice(0, 8).map((tool, i) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              whileHover={{ y: -4, transition: { type: "spring", stiffness: 300 } }}
            >
              <Link
                href={tool.path}
                className={cn(
                  "group flex h-full flex-col rounded-xl border border-border/50 p-5 transition-colors",
                  "bg-card hover:border-border hover:shadow-card"
                )}
              >
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary shadow-sm">
                  <Icon name={tool.icon} className="text-white" size={18} />
                </div>
                <h3 className="mb-1 text-sm font-semibold text-foreground">{tool.name}</h3>
                <p className="flex-1 text-xs leading-relaxed text-muted-foreground">{tool.description}</p>
                <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="rounded-md bg-muted px-2 py-0.5 font-medium text-primary capitalize">
                    {tool.category}
                  </span>
                  {tool.trending && (
                    <span className="flex items-center gap-0.5 text-orange-500">
                      <Icon name="fire" size={12} />
                      Trending
                    </span>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
