"use client"

import { useState, useCallback } from "react"
import { motion } from "framer-motion"
import { Braces, Copy, Minus, Plus, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"
import Button from "@/components/ui/button"
import EmptyState from "@/components/ui/empty-state"
import { useToolContext } from "./tool-wrapper"

function formatJson(input: string, minify = false): string {
  try {
    const parsed = JSON.parse(input)
    return minify ? JSON.stringify(parsed) : JSON.stringify(parsed, null, 2)
  } catch {
    throw new Error("Invalid JSON")
  }
}

function highlightJson(json: string): string {
  return json
    .replace(/(&)/g, "&amp;")
    .replace(/(<)/g, "&lt;")
    .replace(/(>)/g, "&gt;")
    .replace(
      /("(?:[^"\\]|\\.)*")\s*:/g,
      '<span class="text-accent">$1</span>:'
    )
    .replace(
      /"(?:[^"\\]|\\.)*"/g,
      '<span class="text-success">$&</span>'
    )
    .replace(/\b(-?\d+\.?\d*[eE]?[+-]?\d*)\b/g, '<span class="text-primary">$1</span>')
    .replace(/\b(true|false)\b/g, '<span class="text-warning">$1</span>')
    .replace(/\bnull\b/g, '<span class="text-error">$1</span>')
}

export default function JsonFormatter() {
  const { copy, reset: resetCtx } = useToolContext()
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [error, setError] = useState("")
  const [minify, setMinify] = useState(false)
  const [treeView, setTreeView] = useState(false)

  const handleFormat = useCallback(() => {
    if (!input.trim()) {
      setError("Please enter JSON data")
      setOutput("")
      return
    }
    try {
      const formatted = formatJson(input, minify)
      setOutput(formatted)
      setError("")
    } catch (e) {
      setError((e as Error).message)
      setOutput("")
    }
  }, [input, minify])

  const reset = useCallback(() => {
    setInput("")
    setOutput("")
    setError("")
    resetCtx()
  }, [resetCtx])

  return (
    <div className="space-y-6">
      <div>
        <label className="mb-2 block text-sm font-medium text-foreground">
          Enter JSON
        </label>
        <textarea
          value={input}
          onChange={(e) => { setInput(e.target.value); setError("") }}
          placeholder='{"key": "value"}'
          className="min-h-[180px] w-full rounded-xl border border-border bg-background p-4 font-mono text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring resize-y"
          spellCheck={false}
        />
      </div>

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-error"
        >
          {error}
        </motion.p>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <Button onClick={handleFormat} icon={<Braces className="size-4" />}>
          Format
        </Button>
        <Button
          variant="outline"
          onClick={() => setMinify(!minify)}
          icon={minify ? <Plus className="size-4" /> : <Minus className="size-4" />}
        >
          {minify ? "Beautify" : "Minify"}
        </Button>
        <Button
          variant="outline"
          onClick={() => setTreeView(!treeView)}
        >
          {treeView ? "Raw" : "Tree"}
        </Button>
        <Button variant="ghost" onClick={reset} icon={<RotateCcw className="size-4" />}>
          Reset
        </Button>
      </div>

      {output && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">Output</span>
            <Button
              variant="ghost"
              size="sm"
              icon={<Copy className="size-3.5" />}
              onClick={() => copy(output, "JSON copied")}
            >
              Copy
            </Button>
          </div>
          <div
            className={cn(
              "min-h-[180px] w-full rounded-xl border border-border bg-background p-4 font-mono text-sm leading-relaxed overflow-auto",
              treeView && "space-y-1"
            )}
          >
            {treeView ? (
              <JsonTreeView data={input} />
            ) : (
              <pre
                className="whitespace-pre-wrap break-all"
                dangerouslySetInnerHTML={{ __html: highlightJson(output) }}
              />
            )}
          </div>
        </motion.div>
      )}

      {!input && !output && (
        <EmptyState
          icon={<Braces className="size-8" />}
          title="Enter JSON to format"
          description="Paste or type your JSON data above and click Format"
        />
      )}
    </div>
  )
}

function JsonTreeView({ data }: { data: string }) {
  try {
    const parsed = JSON.parse(data)
    return <TreeNode value={parsed} depth={0} />
  } catch {
    return <span className="text-error">Invalid JSON</span>
  }
}

function TreeNode({ value, depth }: { value: unknown; depth: number }) {
  const [expanded, setExpanded] = useState(true)

  if (value === null) return <span className="text-error">null</span>
  if (typeof value === "string")
    return <span className="text-success">"{value}"</span>
  if (typeof value === "number")
    return <span className="text-primary">{String(value)}</span>
  if (typeof value === "boolean")
    return <span className="text-warning">{String(value)}</span>

  if (Array.isArray(value)) {
    return (
      <div className="pl-4 border-l border-border">
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-muted-foreground hover:text-foreground text-xs mr-1"
        >
          {expanded ? "▼" : "▶"} [{value.length}]
        </button>
        {expanded && (
          <div className="space-y-0.5">
            {value.map((item, i) => (
              <div key={i} className="flex gap-2">
                <span className="text-muted-foreground text-xs shrink-0">{i}:</span>
                <TreeNode value={item} depth={depth + 1} />
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  if (typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>)
    return (
      <div className="pl-4 border-l border-border">
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-muted-foreground hover:text-foreground text-xs mr-1"
        >
          {expanded ? "▼" : "▶"} {`{${entries.length}}`}
        </button>
        {expanded && (
          <div className="space-y-0.5">
            {entries.map(([key, val]) => (
              <div key={key} className="flex gap-2">
                <span className="text-accent shrink-0">"{key}":</span>
                <TreeNode value={val} depth={depth + 1} />
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  return <span>{String(value)}</span>
}
