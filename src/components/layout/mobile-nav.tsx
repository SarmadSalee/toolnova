"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { categories } from "@/data/categories"
import { getIcon } from "@/lib/icons"

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const pathname = usePathname()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col border-l border-border bg-background shadow-elevated"
          >
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <Link
                href="/"
                onClick={onClose}
              >
                <Image
                  src="/Gemini_Generated_Image_l8kes8l8kes8l8ke-removebg-preview.png"
                  alt="ToolNova"
                  width={200}
                  height={56}
                  className="h-14 w-auto"
                />
              </Link>
              <button
                onClick={onClose}
                className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto p-4">
              <div className="mb-6 space-y-1">
                <MobileNavLink href="/" label="Home" pathname={pathname} onClick={onClose} />
                <MobileNavLink href="/tools" label="All Tools" pathname={pathname} onClick={onClose} />
                <MobileNavLink href="/categories" label="Categories" pathname={pathname} onClick={onClose} />
                <MobileNavLink href="/blog" label="Blog" pathname={pathname} onClick={onClose} />
                <MobileNavLink href="/about" label="About" pathname={pathname} onClick={onClose} />
              </div>

              <div className="mb-4 px-1">
                <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Categories
                </h3>
              </div>
              <div className="space-y-0.5">
                {categories.map(category => {
                  const Icon = getIcon(category.icon)
                  const href = `/categories/${category.slug}`
                  const isActive = pathname === href
                  return (
                    <Link
                      key={category.id}
                      href={href}
                      onClick={onClose}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition-colors",
                        isActive
                          ? "bg-primary/10 font-medium text-primary"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="flex-1">{category.name}</span>
                      <span className="text-xs text-muted-foreground">{category.tools}</span>
                    </Link>
                  )
                })}
              </div>
            </nav>

            <div className="border-t border-border p-4">
              <Link
                href="/tools"
                onClick={onClose}
                className="flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-primary/90"
              >
                Browse All Tools
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

function MobileNavLink({
  href,
  label,
  pathname,
  onClick,
}: {
  href: string
  label: string
  pathname: string
  onClick: () => void
}) {
  const isActive = pathname === href
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "flex items-center rounded-lg px-3 py-3 text-sm transition-colors",
        isActive
          ? "bg-primary/10 font-medium text-primary"
          : "text-foreground hover:bg-muted"
      )}
    >
      {label}
    </Link>
  )
}
