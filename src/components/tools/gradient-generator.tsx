"use client"

import { useState, useMemo, useCallback } from "react"
import { motion } from "framer-motion"
import { Copy, Plus, RotateCcw, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import Button from "@/components/ui/button"
import Card from "@/components/ui/card"
import EmptyState from "@/components/ui/empty-state"
import { useToolContext } from "./tool-wrapper"

const presets = [
  { colors: ["#2563EB", "#06B6D4"], label: "Ocean" },
  { colors: ["#8B5CF6", "#2563EB"], label: "Purple Blue" },
  { colors: ["#F59E0B", "#EF4444"], label: "Sunset" },
  { colors: ["#22C55E", "#06B6D4"], label: "Teal Green" },
  { colors: ["#EC4899", "#8B5CF6"], label: "Pink Purple" },
  { colors: ["#F97316", "#F59E0B"], label: "Orange Yellow" },
]

export default function GradientGenerator() {
  const { copy, reset: resetCtx } = useToolContext()
  const [colors, setColors] = useState(["#2563EB", "#8B5CF6"])
  const [direction, setDirection] = useState("to right")
  const [angle, setAngle] = useState(90)

  const cssCode = useMemo(() => {
    const stops = colors.join(", ")
    if (direction === "custom") {
      return `background: linear-gradient(${angle}deg, ${stops});`
    }
    return `background: linear-gradient(${direction}, ${stops});`
  }, [colors, direction, angle])

  const setPreset = useCallback((preset: string[]) => {
    setColors(preset)
  }, [])

  const addColor = useCallback(() => {
    setColors((prev) => [...prev, "#000000"])
  }, [])

  const removeColor = useCallback((index: number) => {
    setColors((prev) => {
      if (prev.length <= 2) return prev
      return prev.filter((_, i) => i !== index)
    })
  }, [])

  const updateColor = useCallback((index: number, color: string) => {
    setColors((prev) => prev.map((c, i) => (i === index ? color : c)))
  }, [])

  const reset = useCallback(() => {
    setColors(["#2563EB", "#8B5CF6"])
    setDirection("to right")
    setAngle(90)
    resetCtx()
  }, [resetCtx])

  return (
    <div className="space-y-6">
      <div
        className={cn(
          "h-48 rounded-2xl border border-border transition-all duration-500"
        )}
        style={{ background: cssCode.replace("background: ", "") }}
      />

      <div>
        <p className="mb-2 text-xs text-muted-foreground">Presets</p>
        <div className="flex flex-wrap gap-2">
          {presets.map((p) => (
            <button
              key={p.label}
              onClick={() => setPreset(p.colors)}
              className="group relative h-10 w-20 rounded-lg border border-border overflow-hidden hover:ring-1 hover:ring-ring transition-all"
            >
              <div
                className="size-full"
                style={{
                  background: `linear-gradient(to right, ${p.colors.join(", ")})`,
                }}
              />
              <span className="absolute inset-0 flex items-center justify-center text-[10px] text-white font-medium opacity-0 group-hover:opacity-100 bg-black/30 transition-opacity">
                {p.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-xs text-muted-foreground">Color Stops</p>
        {colors.map((color, index) => (
          <div key={index} className="flex items-center gap-3">
            <input
              type="color"
              value={color}
              onChange={(e) => updateColor(index, e.target.value)}
              className="h-10 w-12 cursor-pointer rounded-lg border border-border bg-background"
            />
            <input
              value={color}
              onChange={(e) => updateColor(index, e.target.value)}
              className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm font-mono text-foreground"
            />
            {colors.length > 2 && (
              <button
                onClick={() => removeColor(index)}
                className="p-2 hover:bg-muted rounded-lg text-muted-foreground hover:text-error transition-colors"
              >
                <Trash2 className="size-4" />
              </button>
            )}
          </div>
        ))}
        <Button variant="outline" size="sm" onClick={addColor} icon={<Plus className="size-3.5" />}>
          Add Stop
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="w-40">
          <label className="mb-1.5 block text-xs font-medium text-foreground">Direction</label>
          <select
            value={direction}
            onChange={(e) => setDirection(e.target.value)}
            className="h-10 w-full rounded-lg border border-border bg-background px-2 text-sm text-foreground"
          >
            <option value="to right">→ To Right</option>
            <option value="to left">← To Left</option>
            <option value="to bottom">↓ To Bottom</option>
            <option value="to top">↑ To Top</option>
            <option value="to bottom right">↘ Diagonal</option>
            <option value="to bottom left">↙ Diagonal</option>
            <option value="custom">Custom Angle</option>
          </select>
        </div>
        {direction === "custom" && (
          <div className="w-28">
            <label className="mb-1.5 block text-xs font-medium text-foreground">Angle</label>
            <input
              type="number"
              value={angle}
              onChange={(e) => setAngle(Number(e.target.value))}
              className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground"
              min={0}
              max={360}
            />
          </div>
        )}
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground">CSS Code</span>
          <Button variant="ghost" size="sm" icon={<Copy className="size-3.5" />} onClick={() => copy(cssCode, "CSS copied")}>
            Copy
          </Button>
        </div>
        <pre className="rounded-xl border border-border bg-background p-4 text-sm font-mono text-foreground overflow-auto">
          {cssCode}
        </pre>
      </div>

      <Button variant="ghost" onClick={reset} icon={<RotateCcw className="size-4" />}>
        Reset
      </Button>
    </div>
  )
}
