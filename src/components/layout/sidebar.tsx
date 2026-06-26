"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, LayoutGrid } from "lucide-react"
import { cn } from "@/lib/utils"
import { categories } from "@/data/categories"
import { getIcon } from "@/lib/icons"

export function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={cn(
        "relative hidden shrink-0 flex-col border-r border-border bg-sidebar transition-all duration-300 lg:flex",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center justify-between border-b border-border px-4 py-3.5">
        {!collapsed && (
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Categories
          </span>
        )}
        <button
          onClick={() => setCollapsed(v => !v)}
          className={cn(
            "flex items-center justify-center rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
            collapsed && "mx-auto"
          )}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto p-2">
        <AnimatePresence mode="wait">
          {collapsed ? (
            <motion.div
              key="collapsed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-1"
            >
              <Link
                href="/tools"
                className={cn(
                  "flex items-center justify-center rounded-lg p-2.5 transition-colors",
                  pathname === "/tools"
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
                title="All Tools"
              >
                <LayoutGrid className="h-4 w-4" />
              </Link>
              {categories.map(category => {
                const Icon = getIcon(category.icon)
                const href = `/categories/${category.slug}`
                const isActive = pathname === href
                return (
                  <Link
                    key={category.id}
                    href={href}
                    className={cn(
                      "flex items-center justify-center rounded-lg p-2.5 transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                    title={category.name}
                  >
                    <Icon className="h-4 w-4" />
                  </Link>
                )
              })}
            </motion.div>
          ) : (
            <motion.div
              key="expanded"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-0.5"
            >
              <Link
                href="/tools"
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                  pathname === "/tools"
                    ? "bg-primary/10 font-medium text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <LayoutGrid className="h-4 w-4 shrink-0" />
                <span>All Tools</span>
              </Link>
              <div className="my-2 border-t border-border" />
              {categories.map(category => {
                const Icon = getIcon(category.icon)
                const href = `/categories/${category.slug}`
                const isActive = pathname === href
                return (
                  <Link
                    key={category.id}
                    href={href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                      isActive
                        ? "bg-primary/10 font-medium text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span className="flex-1 truncate">{category.name}</span>
                    <span className="text-xs text-muted-foreground">{category.tools}</span>
                  </Link>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </aside>
  )
}
