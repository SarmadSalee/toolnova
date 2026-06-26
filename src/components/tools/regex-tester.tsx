"use client"

import { useState, useMemo, useCallback } from "react"
import { motion } from "framer-motion"
import { Copy, RotateCcw, SearchCode } from "lucide-react"
import { cn } from "@/lib/utils"
import Button from "@/components/ui/button"
import Input from "@/components/ui/input"
import Card from "@/components/ui/card"
import EmptyState from "@/components/ui/empty-state"
import { useToolContext } from "./tool-wrapper"

const cheatsheet = [
  { pattern: ".", desc: "Any character except newline" },
  { pattern: "\\d", desc: "Digit (0-9)" },
  { pattern: "\\w", desc: "Word character (a-z, A-Z, 0-9, _)" },
  { pattern: "\\s", desc: "Whitespace" },
  { pattern: "^", desc: "Start of string" },
  { pattern: "$", desc: "End of string" },
  { pattern: "*", desc: "Zero or more" },
  { pattern: "+", desc: "One or more" },
  { pattern: "?", desc: "Zero or one" },
  { pattern: "{n}", desc: "Exactly n times" },
  { pattern: "[abc]", desc: "Any of a, b, or c" },
  { pattern: "[a-z]", desc: "Range a to z" },
  { pattern: "(x|y)", desc: "Either x or y" },
  { pattern: "\\b", desc: "Word boundary" },
]

export default function RegexTester() {
  const { copy, reset: resetCtx } = useToolContext()
  const [pattern, setPattern] = useState("")
  const [flags, setFlags] = useState("gm")
  const [testText, setTestText] = useState("")
  const [replacement, setReplacement] = useState("")
  const [showCheat, setShowCheat] = useState(false)
  const [error, setError] = useState("")

  const matches = useMemo(() => {
    if (!pattern.trim() || !testText) return { matches: [], count: 0, error: null }
    try {
      const regex = new RegExp(pattern, flags)
      const results: { match: string; index: number; groups: string }[] = []
      let m: RegExpExecArray | null
      let count = 0
      const global = flags.includes("g")
      if (global) {
        while ((m = regex.exec(testText)) !== null) {
          results.push({
            match: m[0],
            index: m.index,
            groups: m.groups ? JSON.stringify(m.groups) : "None",
          })
          count++
          if (m.index === regex.lastIndex) regex.lastIndex++
        }
      } else {
        m = regex.exec(testText)
        if (m) {
          results.push({
            match: m[0],
            index: m.index,
            groups: m.groups ? JSON.stringify(m.groups) : "None",
          })
          count = 1
        }
      }
      return { matches: results, count, error: null }
    } catch (e) {
      return { matches: [], count: 0, error: (e as Error).message }
    }
  }, [pattern, flags, testText])

  const replacedText = useMemo(() => {
    if (!pattern.trim() || !testText || !replacement) return ""
    try {
      const regex = new RegExp(pattern, flags)
      return testText.replace(regex, replacement)
    } catch {
      return ""
    }
  }, [pattern, flags, testText, replacement])

  const highlightedText = useMemo(() => {
    if (!pattern.trim() || !testText) return ""
    try {
      const regex = new RegExp(pattern, flags)
      return testText.replace(
        regex,
        (match) => `<mark class="bg-primary/20 text-foreground rounded px-0.5">${match}</mark>`
      )
    } catch {
      return testText
    }
  }, [pattern, flags, testText])

  const reset = useCallback(() => {
    setPattern("")
    setFlags("gm")
    setTestText("")
    setReplacement("")
    setError("")
    resetCtx()
  }, [resetCtx])

  return (
    <div className="space-y-6">
      <div>
        <label className="mb-2 block text-sm font-medium text-foreground">
          Regex Pattern
        </label>
        <div className="flex gap-2">
          <div className="flex-1">
            <Input
              value={pattern}
              onChange={(e) => { setPattern(e.target.value); setError("") }}
              placeholder="[a-z]+"
              className="font-mono"
            />
          </div>
          <Input
            value={flags}
            onChange={(e) => setFlags(e.target.value)}
            className="w-24 font-mono"
            placeholder="gim"
          />
        </div>
        {matches.error && (
          <p className="mt-1 text-xs text-error">{matches.error}</p>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {["g", "i", "m", "s", "u", "y"].map((flag) => (
          <label key={flag} className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={flags.includes(flag)}
              onChange={(e) => {
                const f = e.target.checked
                  ? [...new Set([...flags, flag])].join("")
                  : flags.replace(flag, "")
                setFlags(f)
              }}
              className="rounded border-border accent-primary"
            />
            <span className="text-xs font-mono text-foreground">{flag}</span>
          </label>
        ))}
        <button
          onClick={() => setShowCheat(!showCheat)}
          className="text-xs text-primary hover:underline ml-2"
        >
          {showCheat ? "Hide" : "Show"} Cheatsheet
        </button>
      </div>

      {showCheat && (
        <Card>
          <h3 className="text-xs font-semibold text-foreground mb-2">Regex Cheatsheet</h3>
          <div className="grid grid-cols-2 gap-1 text-xs sm:grid-cols-3">
            {cheatsheet.map((item) => (
              <div key={item.pattern} className="flex gap-2">
                <code className="font-mono text-primary">{item.pattern}</code>
                <span className="text-muted-foreground">{item.desc}</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      <div>
        <label className="mb-2 block text-sm font-medium text-foreground">
          Test String
        </label>
        <textarea
          value={testText}
          onChange={(e) => setTestText(e.target.value)}
          placeholder="Enter text to test against..."
          className="min-h-[120px] w-full rounded-xl border border-border bg-background p-4 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring resize-y font-mono"
        />
      </div>

      {pattern && testText && (
        <>
          <div>
            <p className="mb-2 text-xs text-muted-foreground">
              Matches: <span className="text-foreground font-medium">{matches.count}</span>
            </p>
            <div
              className="rounded-xl border border-border bg-background p-4 text-sm font-mono whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ __html: highlightedText }}
            />
          </div>

          {matches.matches.length > 0 && (
            <div className="max-h-48 overflow-auto rounded-xl border border-border">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-muted text-muted-foreground">
                    <th className="p-2 text-left">#</th>
                    <th className="p-2 text-left">Match</th>
                    <th className="p-2 text-left">Index</th>
                    <th className="p-2 text-left">Groups</th>
                  </tr>
                </thead>
                <tbody>
                  {matches.matches.map((m, i) => (
                    <tr key={i} className="border-t border-border text-foreground">
                      <td className="p-2">{i + 1}</td>
                      <td className="p-2 font-mono">{m.match}</td>
                      <td className="p-2">{m.index}</td>
                      <td className="p-2">{m.groups}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Replace with
            </label>
            <div className="flex gap-2">
              <div className="flex-1">
                <Input
                  value={replacement}
                  onChange={(e) => setReplacement(e.target.value)}
                  placeholder="Replacement text"
                />
              </div>
              {replacedText && (
                <Button
                  variant="ghost"
                  size="sm"
                  icon={<Copy className="size-3.5" />}
                  onClick={() => copy(replacedText, "Replaced text copied")}
                >
                  Copy
                </Button>
              )}
            </div>
            {replacedText && (
              <div className="mt-2 rounded-xl border border-border bg-background p-3 text-sm font-mono whitespace-pre-wrap">
                {replacedText}
              </div>
            )}
          </div>
        </>
      )}

      <Button variant="ghost" onClick={reset} icon={<RotateCcw className="size-4" />}>
        Reset
      </Button>

      {!pattern && !testText && (
        <EmptyState
          icon={<SearchCode className="size-8" />}
          title="Test your regular expressions"
          description="Enter a pattern and test string to see matches"
        />
      )}
    </div>
  )
}
