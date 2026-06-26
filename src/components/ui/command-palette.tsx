"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { tools } from "@/data/tools"
import { categories } from "@/data/categories"
import { Tool } from "@/types"
import { Icon } from "./icon"
import { Search, Command, ChevronRight } from "lucide-react"

interface CommandPaletteProps {
  isOpen: boolean
  onClose: () => void
}

export default function CommandPalette({ isOpen: open, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  const filtered = query.trim()
    ? tools.filter(
        (t) =>
          t.name.toLowerCase().includes(query.toLowerCase()) ||
          t.description.toLowerCase().includes(query.toLowerCase()) ||
          t.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()))
      )
    : tools

  const grouped = filtered.reduce<Record<string, Tool[]>>((acc, tool) => {
    if (!acc[tool.category]) acc[tool.category] = []
    acc[tool.category].push(tool)
    return acc
  }, {})

  const flatItems = filtered

  const getCategoryName = (id: string) =>
    categories.find((c) => c.id === id)?.name ?? id

  useEffect(() => {
    if (open) {
      setQuery("")
      setSelectedIndex(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!open) return
      if (e.key === "Escape") {
        onClose()
        return
      }
      if (e.key === "ArrowDown") {
        e.preventDefault()
        setSelectedIndex((prev) => (prev + 1) % Math.max(flatItems.length, 1))
      }
      if (e.key === "ArrowUp") {
        e.preventDefault()
        setSelectedIndex((prev) => (prev - 1 + flatItems.length) % Math.max(flatItems.length, 1))
      }
      if (e.key === "Enter" && flatItems[selectedIndex]) {
        window.location.href = flatItems[selectedIndex].path
        onClose()
      }
    },
    [open, flatItems, selectedIndex, onClose]
  )

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  useEffect(() => {
    if (listRef.current) {
      const selected = listRef.current.querySelector<HTMLAnchorElement>(
        `[data-index="${selectedIndex}"]`
      )
      selected?.scrollIntoView({ block: "nearest" })
    }
  }, [selectedIndex])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        if (open) {
          onClose()
        } else {
          window.dispatchEvent(new CustomEvent("open-command-palette"))
        }
      }
    }
    document.addEventListener("keydown", handleKey)
    return () => document.removeEventListener("keydown", handleKey)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-4 z-50 m-auto flex max-w-2xl flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-elevated sm:inset-x-4 sm:top-1/2 sm:-translate-y-1/2 sm:max-h-[560px]"
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 border-b border-border px-5 py-4">
              <Search className="size-5 shrink-0 text-muted-foreground" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search tools..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground"
              />
              <kbd className="hidden shrink-0 items-center gap-1 rounded-md border border-border bg-muted px-2 py-1 text-[11px] text-muted-foreground sm:flex">
                <Command className="size-3" />
                K
              </kbd>
            </div>

            {/* Results */}
            <div
              ref={listRef}
              className="flex-1 overflow-y-auto overscroll-contain p-2"
            >
              {flatItems.length === 0 ? (
                <div className="flex flex-col items-center py-12 text-center">
                  <Search className="mb-3 size-8 text-muted-foreground" />
                  <p className="text-sm font-medium text-foreground">No results found</p>
                  <p className="text-xs text-muted-foreground">
                    Try a different search term
                  </p>
                </div>
              ) : (
                <>
                  {query.trim() === ""
                    ? Object.entries(grouped).map(([category, categoryTools]) => (
                        <div key={category} className="mb-2">
                          <div className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                            {getCategoryName(category)}
                          </div>
                          {categoryTools.map((tool, idx) => {
                            const globalIdx = flatItems.indexOf(tool)
                            return (
                              <ToolItem
                                key={tool.id}
                                tool={tool}
                                selected={selectedIndex === globalIdx}
                                index={globalIdx}
                                onClick={onClose}
                              />
                            )
                          })}
                        </div>
                      ))
                    : flatItems.map((tool, idx) => (
                        <ToolItem
                          key={tool.id}
                          tool={tool}
                          selected={selectedIndex === idx}
                          index={idx}
                          onClick={onClose}
                        />
                      ))}
                </>
              )}
            </div>

            {/* Footer */}
            <div className="hidden border-t border-border px-5 py-3 text-[11px] text-muted-foreground sm:flex items-center gap-4">
              <span className="flex items-center gap-1">
                <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 text-[10px]">↑↓</kbd>
                Navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 text-[10px]">↵</kbd>
                Open
              </span>
              <span className="flex items-center gap-1">
                <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 text-[10px]">Esc</kbd>
                Close
              </span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

function ToolItem({
  tool,
  selected,
  index,
  onClick,
}: {
  tool: Tool
  selected: boolean
  index: number
  onClick: () => void
}) {
  return (
    <Link
      href={tool.path}
      data-index={index}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition-colors sm:py-2.5",
        selected
          ? "bg-primary/10 text-primary"
          : "text-foreground hover:bg-muted"
      )}
    >
      <div
        className={cn(
          "flex size-8 shrink-0 items-center justify-center rounded-lg",
          selected ? "bg-primary text-white" : "bg-muted text-muted-foreground"
        )}
      >
        <Icon name={tool.icon} size={16} />
      </div>
      <div className="flex-1 truncate">
        <span className="font-medium">{tool.name}</span>
        <span className="ml-2 text-xs text-muted-foreground">
          {tool.description}
        </span>
      </div>
      <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
    </Link>
  )
}

export { CommandPalette }
