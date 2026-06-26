"use client"

import { useState, useCallback } from "react"
import { motion } from "framer-motion"
import { Copy, Key, RefreshCw } from "lucide-react"
import Button from "@/components/ui/button"
import Input from "@/components/ui/input"
import EmptyState from "@/components/ui/empty-state"
import { useToolContext } from "./tool-wrapper"

function generateUUID(upper: boolean, dashes: boolean): string {
  const hex = "0123456789abcdef"
  let uuid = ""
  for (let i = 0; i < 36; i++) {
    if (i === 8 || i === 13 || i === 18 || i === 23) {
      uuid += "-"
    } else if (i === 14) {
      uuid += "4"
    } else if (i === 19) {
      uuid += hex[(Math.random() * 4) | 8]
    } else {
      uuid += hex[(Math.random() * 16) | 0]
    }
  }
  let result = uuid
  if (!dashes) result = result.replace(/-/g, "")
  if (upper) result = result.toUpperCase()
  return result
}

export default function UuidGenerator() {
  const { copy, reset: resetCtx } = useToolContext()
  const [count, setCount] = useState(5)
  const [upper, setUpper] = useState(false)
  const [dashes, setDashes] = useState(true)
  const [uuids, setUuids] = useState<string[]>([])

  const generate = useCallback(() => {
    const list = Array.from({ length: count }, () => generateUUID(upper, dashes))
    setUuids(list)
  }, [count, upper, dashes])

  const reset = useCallback(() => {
    setCount(5)
    setUpper(false)
    setDashes(true)
    setUuids([])
    resetCtx()
  }, [resetCtx])

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end gap-4">
        <div className="w-32">
          <label className="mb-1.5 block text-sm font-medium text-foreground">Count (1-100)</label>
          <Input
            type="number"
            min={1}
            max={100}
            value={count}
            onChange={(e) => setCount(Math.min(100, Math.max(1, Number(e.target.value))))}
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={upper}
            onChange={(e) => setUpper(e.target.checked)}
            className="rounded border-border accent-primary"
          />
          <span className="text-sm text-foreground">Uppercase</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={dashes}
            onChange={(e) => setDashes(e.target.checked)}
            className="rounded border-border accent-primary"
          />
          <span className="text-sm text-foreground">With dashes</span>
        </label>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button onClick={generate} icon={<RefreshCw className="size-4" />}>
          Generate
        </Button>
        {uuids.length > 0 && (
          <Button
            variant="ghost"
            icon={<Copy className="size-4" />}
            onClick={() => copy(uuids.join("\n"), "All UUIDs copied")}
          >
            Copy All
          </Button>
        )}
        <Button variant="ghost" onClick={reset} icon={<RefreshCw className="size-4" />}>
          Reset
        </Button>
      </div>

      {uuids.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-2"
        >
          {uuids.map((uuid, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }}
              className="group flex items-center justify-between rounded-xl border border-border bg-background px-4 py-3"
            >
              <code className="font-mono text-sm text-foreground">{uuid}</code>
              <button
                onClick={() => copy(uuid, "UUID copied")}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-muted rounded-lg"
              >
                <Copy className="size-4 text-muted-foreground" />
              </button>
            </motion.div>
          ))}
        </motion.div>
      )}

      {uuids.length === 0 && (
        <EmptyState
          icon={<Key className="size-8" />}
          title="Generate UUIDs"
          description="Click Generate to create random UUID v4 identifiers"
        />
      )}
    </div>
  )
}
