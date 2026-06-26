"use client"

import { useState, useMemo, useCallback } from "react"
import { motion } from "framer-motion"
import { Percent, RotateCcw } from "lucide-react"
import Button from "@/components/ui/button"
import Input from "@/components/ui/input"
import Card from "@/components/ui/card"
import EmptyState from "@/components/ui/empty-state"
import { useToolContext } from "./tool-wrapper"

type Mode = "whatIs" | "isWhat" | "increase"

export default function PercentageCalculator() {
  const { reset: resetCtx } = useToolContext()
  const [mode, setMode] = useState<Mode>("whatIs")
  const [x, setX] = useState("")
  const [y, setY] = useState("")
  const [z, setZ] = useState("")

  const result = useMemo(() => {
    const numX = Number(x)
    const numY = Number(y)
    const numZ = Number(z)

    if (mode === "whatIs") {
      if (!x || !y) return null
      const val = (numX / 100) * numY
      return { value: Math.round(val * 100) / 100, explanation: `${x}% of ${y} = ${Math.round(val * 100) / 100}` }
    }

    if (mode === "isWhat") {
      if (!x || !y) return null
      const val = (numX / numY) * 100
      return { value: Math.round(val * 100) / 100, explanation: `${x} is ${Math.round(val * 100) / 100}% of ${y}` }
    }

    if (mode === "increase") {
      if (!x || !y) return null
      const diff = numY - numX
      const val = (diff / numX) * 100
      const sign = diff >= 0 ? "increase" : "decrease"
      return { value: Math.round(Math.abs(val) * 100) / 100, explanation: `${sign} of ${Math.round(Math.abs(val) * 100) / 100}% from ${x} to ${y}` }
    }

    return null
  }, [mode, x, y, z])

  const reset = useCallback(() => {
    setX("")
    setY("")
    setZ("")
    setMode("whatIs")
    resetCtx()
  }, [resetCtx])

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <Button
          variant={mode === "whatIs" ? "primary" : "outline"}
          size="sm"
          onClick={() => { setMode("whatIs"); setZ("") }}
        >
          What is X% of Y?
        </Button>
        <Button
          variant={mode === "isWhat" ? "primary" : "outline"}
          size="sm"
          onClick={() => { setMode("isWhat"); setZ("") }}
        >
          X is what % of Y?
        </Button>
        <Button
          variant={mode === "increase" ? "primary" : "outline"}
          size="sm"
          onClick={() => { setMode("increase"); setZ("") }}
        >
          % increase/decrease
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">
            {mode === "whatIs" ? "Percentage (X)" : mode === "isWhat" ? "Value (X)" : "From (X)"}
          </label>
          <Input
            type="number"
            value={x}
            onChange={(e) => setX(e.target.value)}
            placeholder={mode === "whatIs" ? "e.g. 20" : "e.g. 50"}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">
            {mode === "whatIs" ? "Value (Y)" : mode === "isWhat" ? "Total (Y)" : "To (Y)"}
          </label>
          <Input
            type="number"
            value={y}
            onChange={(e) => setY(e.target.value)}
            placeholder={mode === "whatIs" ? "e.g. 200" : "e.g. 100"}
          />
        </div>
      </div>

      <div className="flex gap-3">
        <Button variant="ghost" onClick={reset} icon={<RotateCcw className="size-4" />}>
          Reset
        </Button>
      </div>

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card>
            <p className="text-xs text-muted-foreground mb-1">Result</p>
            <p className="text-3xl font-bold text-primary mb-2">{result.value}</p>
            <p className="text-sm text-muted-foreground">{result.explanation}</p>
          </Card>
        </motion.div>
      )}

      {!x && !y && (
        <EmptyState
          icon={<Percent className="size-8" />}
          title="Calculate percentages"
          description="Choose a mode and enter values"
        />
      )}
    </div>
  )
}
