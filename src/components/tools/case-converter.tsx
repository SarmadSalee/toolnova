"use client"

import { useState, useCallback } from "react"
import { motion } from "framer-motion"
import { Copy, CaseSensitive, RotateCcw } from "lucide-react"
import Button from "@/components/ui/button"
import EmptyState from "@/components/ui/empty-state"
import { useToolContext } from "./tool-wrapper"

type CaseType =
  | "upper"
  | "lower"
  | "title"
  | "camel"
  | "pascal"
  | "snake"
  | "kebab"
  | "upperSnake"
  | "sentence"
  | "toggle"

const caseLabels: Record<CaseType, string> = {
  upper: "UPPER CASE",
  lower: "lower case",
  title: "Title Case",
  camel: "camelCase",
  pascal: "PascalCase",
  snake: "snake_case",
  kebab: "kebab-case",
  upperSnake: "UPPER_SNAKE_CASE",
  sentence: "Sentence case",
  toggle: "tOGGLE cASE",
}

function convert(text: string, type: CaseType): string {
  switch (type) {
    case "upper":
      return text.toUpperCase()
    case "lower":
      return text.toLowerCase()
    case "title":
      return text.replace(/\b\w/g, (c) => c.toUpperCase())
    case "camel":
      return text
        .replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase())
        .replace(/^[A-Z]/, (c) => c.toLowerCase())
    case "pascal":
      return text
        .replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase())
        .replace(/^[a-z]/, (c) => c.toUpperCase())
    case "snake":
      return text
        .replace(/[^a-zA-Z0-9\s]/g, "")
        .replace(/\s+/g, "_")
        .toLowerCase()
    case "kebab":
      return text
        .replace(/[^a-zA-Z0-9\s]/g, "")
        .replace(/\s+/g, "-")
        .toLowerCase()
    case "upperSnake":
      return text
        .replace(/[^a-zA-Z0-9\s]/g, "")
        .replace(/\s+/g, "_")
        .toUpperCase()
    case "sentence":
      return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
    case "toggle":
      return text
        .split("")
        .map((c, i) =>
          i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()
        )
        .join("")
  }
}

export default function CaseConverter() {
  const { copy, reset: resetCtx } = useToolContext()
  const [input, setInput] = useState("")

  const cases: CaseType[] = [
    "upper",
    "lower",
    "title",
    "camel",
    "pascal",
    "snake",
    "kebab",
    "upperSnake",
    "sentence",
    "toggle",
  ]

  const reset = useCallback(() => {
    setInput("")
    resetCtx()
  }, [resetCtx])

  return (
    <div className="space-y-6">
      <div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text to convert..."
          className="min-h-[120px] w-full rounded-xl border border-border bg-background p-4 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring resize-y"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {cases.map((type) => (
          <Button
            key={type}
            variant="outline"
            size="sm"
            onClick={() => {
              const result = convert(input, type)
              copy(result, `${caseLabels[type]} copied`)
            }}
          >
            {caseLabels[type]}
          </Button>
        ))}
      </div>

      <Button variant="ghost" size="sm" onClick={reset} icon={<RotateCcw className="size-3.5" />}>
        Reset
      </Button>

      {input && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-3"
        >
          {cases.map((type) => {
            const result = convert(input, type)
            if (!result) return null
            return (
              <div
                key={type}
                className="group flex items-center justify-between rounded-xl border border-border bg-background px-4 py-3"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-muted-foreground mb-0.5">{caseLabels[type]}</p>
                  <p className="text-sm text-foreground font-mono truncate">{result}</p>
                </div>
                <button
                  onClick={() => copy(result, `${caseLabels[type]} copied`)}
                  className="ml-3 shrink-0 p-1.5 hover:bg-muted rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                >
                  <Copy className="size-4 text-muted-foreground" />
                </button>
              </div>
            )
          })}
        </motion.div>
      )}

      {!input && (
        <EmptyState
          icon={<CaseSensitive className="size-8" />}
          title="Enter text to convert"
          description="Type or paste text and choose a case format"
        />
      )}
    </div>
  )
}
