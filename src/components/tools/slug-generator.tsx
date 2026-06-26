"use client"

import { useState, useMemo, useCallback } from "react"
import { motion } from "framer-motion"
import { Copy, Link, RotateCcw } from "lucide-react"
import Button from "@/components/ui/button"
import Input from "@/components/ui/input"
import EmptyState from "@/components/ui/empty-state"
import { useToolContext } from "./tool-wrapper"

function generateSlug(
  text: string,
  separator: string,
  lower: boolean,
  maxLength: number
): string {
  let slug = text.trim()
  if (!slug) return ""

  if (lower) slug = slug.toLowerCase()

  slug = slug
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s]+/g, separator)
    .replace(new RegExp(`${separator}+`, "g"), separator)
    .replace(new RegExp(`^${separator}|${separator}$`, "g"), "")

  if (maxLength > 0) {
    slug = slug.slice(0, maxLength).replace(new RegExp(`${separator}$`), "")
  }

  return slug
}

export default function SlugGenerator() {
  const { copy, reset: resetCtx } = useToolContext()
  const [input, setInput] = useState("")
  const [separator, setSeparator] = useState("-")
  const [lowercase, setLowercase] = useState(true)
  const [maxLength, setMaxLength] = useState(0)

  const slug = useMemo(
    () => generateSlug(input, separator, lowercase, maxLength),
    [input, separator, lowercase, maxLength]
  )

  const reset = useCallback(() => {
    setInput("")
    setSeparator("-")
    setLowercase(true)
    setMaxLength(0)
    resetCtx()
  }, [resetCtx])

  return (
    <div className="space-y-6">
      <div>
        <label className="mb-2 block text-sm font-medium text-foreground">
          Enter text
        </label>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text to convert to a slug..."
        />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="w-32">
          <label className="mb-1.5 block text-xs font-medium text-foreground">Separator</label>
          <select
            value={separator}
            onChange={(e) => setSeparator(e.target.value)}
            className="h-10 w-full rounded-lg border border-border bg-background px-2 text-sm text-foreground"
          >
            <option value="-">Hyphen (-)</option>
            <option value="_">Underscore (_)</option>
            <option value=".">Dot (.)</option>
            <option value="~">Tilde (~)</option>
          </select>
        </div>
        <div className="w-32">
          <label className="mb-1.5 block text-xs font-medium text-foreground">Max Length</label>
          <Input
            type="number"
            min={0}
            max={200}
            value={maxLength}
            onChange={(e) => setMaxLength(Math.max(0, Number(e.target.value)))}
            placeholder="0 = no limit"
          />
        </div>
        <label className="flex items-center gap-2 cursor-pointer pt-5">
          <input
            type="checkbox"
            checked={lowercase}
            onChange={(e) => setLowercase(e.target.checked)}
            className="rounded border-border accent-primary"
          />
          <span className="text-sm text-foreground">Lowercase</span>
        </label>
      </div>

      <div className="flex gap-3">
        {slug && (
          <Button onClick={() => copy(slug, "Slug copied")} icon={<Copy className="size-4" />}>
            Copy Slug
          </Button>
        )}
        <Button variant="ghost" onClick={reset} icon={<RotateCcw className="size-4" />}>
          Reset
        </Button>
      </div>

      {slug && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-border bg-background p-4"
        >
          <p className="text-xs text-muted-foreground mb-1">Generated Slug</p>
          <p className="font-mono text-lg text-primary break-all">{slug}</p>
        </motion.div>
      )}

      {!input && (
        <EmptyState
          icon={<Link className="size-8" />}
          title="Enter text to generate a slug"
          description="Type above to create a URL-friendly slug"
        />
      )}
    </div>
  )
}
