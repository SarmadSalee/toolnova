"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { RotateCcw, Type, TextQuote, Hash, Timer, BookOpen } from "lucide-react"
import { cn } from "@/lib/utils"
import Button from "@/components/ui/button"
import Card from "@/components/ui/card"
import { useToolContext } from "./tool-wrapper"

function analyze(text: string) {
  const words = text.trim() ? text.trim().split(/\s+/).filter(Boolean) : []
  const chars = text.length
  const charsNoSpace = text.replace(/\s/g, "").length
  const sentences = text.trim()
    ? text.split(/[.!?]+/).filter((s) => s.trim().length > 0).length
    : 0
  const paragraphs = text.trim()
    ? text.split(/\n\s*\n/).filter((p) => p.trim().length > 0).length
    : 0
  const readingSpeed = 200
  const speakingSpeed = 150
  const readingMinutes = words.length / readingSpeed
  const speakingMinutes = words.length / speakingSpeed
  const readingTime = readingMinutes < 1 ? "< 1 min" : `${Math.ceil(readingMinutes)} min`
  const speakingTime = speakingMinutes < 1 ? "< 1 min" : `${Math.ceil(speakingMinutes)} min`

  const charFreq: Record<string, number> = {}
  for (const ch of text.toLowerCase()) {
    if (ch.match(/[a-z0-9]/)) {
      charFreq[ch] = (charFreq[ch] || 0) + 1
    }
  }
  const sortedFreq = Object.entries(charFreq)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)

  const wordFreq: Record<string, number> = {}
  for (const w of words) {
    const clean = w.toLowerCase().replace(/[^a-z0-9]/g, "")
    if (clean) wordFreq[clean] = (wordFreq[clean] || 0) + 1
  }
  const keywordDensity = Object.entries(wordFreq)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([word, count]) => ({
      word,
      count,
      density: ((count / words.length) * 100).toFixed(1),
    }))

  return {
    words: words.length,
    chars,
    charsNoSpace,
    sentences,
    paragraphs,
    readingTime,
    speakingTime,
    charFreq: sortedFreq,
    keywordDensity,
  }
}

export default function WordCounter() {
  const { reset: resetCtx } = useToolContext()
  const [text, setText] = useState("")

  const stats = useMemo(() => analyze(text), [text])

  const reset = () => {
    setText("")
    resetCtx()
  }

  return (
    <div className="space-y-6">
      <div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or type your text here..."
          className="min-h-[200px] w-full rounded-xl border border-border bg-background p-4 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring resize-y"
        />
      </div>

      <div className="flex justify-between items-center">
        <Button variant="ghost" size="sm" onClick={reset} icon={<RotateCcw className="size-3.5" />}>
          Reset
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        <StatCard icon={<Type className="size-4" />} label="Words" value={stats.words} />
        <StatCard icon={<Hash className="size-4" />} label="Characters" value={stats.chars} />
        <StatCard icon={<Hash className="size-4" />} label="Chars (no space)" value={stats.charsNoSpace} />
        <StatCard icon={<TextQuote className="size-4" />} label="Sentences" value={stats.sentences} />
        <StatCard icon={<TextQuote className="size-4" />} label="Paragraphs" value={stats.paragraphs} />
        <StatCard icon={<Timer className="size-4" />} label="Reading Time" value={stats.readingTime} />
        <StatCard icon={<BookOpen className="size-4" />} label="Speaking Time" value={stats.speakingTime} />
      </div>

      {text.trim() && stats.charFreq.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2">
          <Card>
            <h3 className="mb-3 text-sm font-semibold text-foreground">Character Frequency</h3>
            <div className="space-y-1.5">
              {stats.charFreq.map(([char, count]) => {
                const max = stats.charFreq[0][1]
                return (
                  <div key={char} className="flex items-center gap-2 text-xs">
                    <span className="w-4 text-center font-mono text-foreground">{char}</span>
                    <div className="h-4 flex-1 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full bg-primary transition-all"
                        style={{ width: `${(count / max) * 100}%` }}
                      />
                    </div>
                    <span className="w-8 text-right text-muted-foreground">{count}</span>
                  </div>
                )
              })}
            </div>
          </Card>

          <Card>
            <h3 className="mb-3 text-sm font-semibold text-foreground">Keyword Density</h3>
            <div className="space-y-1.5">
              {stats.keywordDensity.map(({ word, count, density }) => (
                <div key={word} className="flex items-center justify-between text-xs">
                  <span className="text-foreground font-medium">{word}</span>
                  <span className="text-muted-foreground">
                    {count} ({density}%)
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {!text.trim() && (
        <p className="text-center text-sm text-muted-foreground py-8">
          Start typing or paste text to see statistics
        </p>
      )}
    </div>
  )
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-border bg-card p-4 shadow-soft"
    >
      <div className="flex items-center gap-2 text-muted-foreground mb-1">
        {icon}
        <span className="text-xs">{label}</span>
      </div>
      <p className="text-2xl font-bold text-foreground">{value}</p>
    </motion.div>
  )
}
