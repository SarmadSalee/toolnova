"use client"

import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { Clock, Copy, RotateCcw } from "lucide-react"
import Button from "@/components/ui/button"
import Input from "@/components/ui/input"
import Card from "@/components/ui/card"
import EmptyState from "@/components/ui/empty-state"
import { useToolContext } from "./tool-wrapper"

function relativeTime(date: Date): string {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const abs = Math.abs(diff)
  const seconds = Math.floor(abs / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  const suffix = diff >= 0 ? "ago" : "from now"

  if (seconds < 60) return `${seconds} seconds ${suffix}`
  if (minutes < 60) return `${minutes} minutes ${suffix}`
  if (hours < 24) return `${hours} hours ${suffix}`
  if (days < 30) return `${days} days ${suffix}`
  return `${Math.floor(days / 30)} months ${suffix}`
}

export default function TimestampConverter() {
  const { copy, reset: resetCtx } = useToolContext()
  const [now, setNow] = useState(new Date())
  const [unixInput, setUnixInput] = useState("")
  const [dateInput, setDateInput] = useState("")
  const [converted, setConverted] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const dateFromUnix = useCallback(() => {
    const ts = Number(unixInput)
    if (!ts) return
    const d = new Date(ts * 1000)
    setDateInput(d.toISOString().slice(0, 16))
    setConverted(true)
  }, [unixInput])

  const unixFromDate = useCallback(() => {
    if (!dateInput) return
    const d = new Date(dateInput)
    setUnixInput(String(Math.floor(d.getTime() / 1000)))
    setConverted(true)
  }, [dateInput])

  const formats = converted && unixInput
    ? (() => {
        const d = new Date(Number(unixInput) * 1000)
        return [
          { label: "Unix (seconds)", value: unixInput },
          { label: "Unix (milliseconds)", value: String(d.getTime()) },
          { label: "ISO 8601", value: d.toISOString() },
          { label: "UTC", value: d.toUTCString() },
          { label: "Local", value: d.toLocaleString() },
          { label: "Relative", value: relativeTime(d) },
        ]
      })()
    : []

  const reset = useCallback(() => {
    setUnixInput("")
    setDateInput("")
    setConverted(false)
    resetCtx()
  }, [resetCtx])

  return (
    <div className="space-y-6">
      <Card className="text-center">
        <p className="text-xs text-muted-foreground mb-1">Current Unix Timestamp</p>
        <p className="text-2xl font-bold font-mono text-primary">
          {Math.floor(now.getTime() / 1000)}
        </p>
        <p className="text-xs text-muted-foreground mt-1">{now.toLocaleString()}</p>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">
            Unix Timestamp (seconds)
          </label>
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                type="number"
                value={unixInput}
                onChange={(e) => { setUnixInput(e.target.value); setConverted(false) }}
                placeholder="e.g. 1719360000"
              />
            </div>
            <Button size="sm" onClick={dateFromUnix}>
              &rarr;
            </Button>
          </div>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">
            Human-readable Date
          </label>
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                type="datetime-local"
                value={dateInput}
                onChange={(e) => { setDateInput(e.target.value); setConverted(false) }}
              />
            </div>
            <Button size="sm" onClick={unixFromDate}>
              &larr;
            </Button>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <Button variant="ghost" onClick={reset} icon={<RotateCcw className="size-4" />}>
          Reset
        </Button>
      </div>

      {formats.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2"
        >
          {formats.map((f) => (
            <div
              key={f.label}
              className="group flex items-center justify-between rounded-xl border border-border bg-background px-4 py-3"
            >
              <div>
                <p className="text-xs text-muted-foreground">{f.label}</p>
                <p className="text-sm font-mono text-foreground">{f.value}</p>
              </div>
              <button
                onClick={() => copy(f.value, `${f.label} copied`)}
                className="shrink-0 p-1.5 hover:bg-muted rounded-lg opacity-0 group-hover:opacity-100 transition-all"
              >
                <Copy className="size-4 text-muted-foreground" />
              </button>
            </div>
          ))}
        </motion.div>
      )}

      {!converted && (
        <EmptyState
          icon={<Clock className="size-8" />}
          title="Convert timestamps"
          description="Enter a Unix timestamp or a date to convert"
        />
      )}
    </div>
  )
}
