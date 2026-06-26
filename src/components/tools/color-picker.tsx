"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Copy, Palette, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"
import Button from "@/components/ui/button"
import Card from "@/components/ui/card"
import EmptyState from "@/components/ui/empty-state"
import { useToolContext } from "./tool-wrapper"

function hexToRgb(hex: string) {
  const r = Number.parseInt(hex.slice(1, 3), 16)
  const g = Number.parseInt(hex.slice(3, 5), 16)
  const b = Number.parseInt(hex.slice(5, 7), 16)
  return { r, g, b }
}

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255; g /= 255; b /= 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  let h = 0, s = 0, l = (max + min) / 2
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
      case g: h = ((b - r) / d + 2) / 6; break
      case b: h = ((r - g) / d + 4) / 6; break
    }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) }
}

function rgbToOklch(r: number, g: number, b: number) {
  const rr = r / 255, gg = g / 255, bb = b / 255
  const l = 0.4122214708 * rr + 0.5363325363 * gg + 0.0514459929 * bb
  const m = 0.2119034982 * rr + 0.6806995451 * gg + 0.1073969566 * bb
  const s = 0.0883024619 * rr + 0.2817188376 * gg + 0.6299787005 * bb
  const l_ = Math.cbrt(l), m_ = Math.cbrt(m), s_ = Math.cbrt(s)
  const L = 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_
  const C = 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_
  const H = -0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_
  return { L: (L * 100).toFixed(1), C: C.toFixed(3), H: H.toFixed(1) }
}

function complementary(hex: string) {
  const { r, g, b } = hexToRgb(hex)
  return `#${(0xffffff ^ ((r << 16) | (g << 8) | b)).toString(16).padStart(6, "0")}`
}

function analogous(hex: string) {
  const { r, g, b } = hexToRgb(hex)
  const { h, s, l } = rgbToHsl(r, g, b)
  const h1 = (h + 30) % 360
  const h2 = (h - 30 + 360) % 360
  return [hslToHex(h1, s, l), hslToHex(h2, s, l)]
}

function hslToHex(h: number, s: number, l: number) {
  s /= 100; l /= 100
  const a = s * Math.min(l, 1 - l)
  const f = (n: number) => {
    const k = (n + h / 30) % 12
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
    return Math.round(255 * color)
  }
  return `#${[f(0), f(8), f(4)].map((c) => c.toString(16).padStart(2, "0")).join("")}`
}

function triadic(hex: string) {
  const { r, g, b } = hexToRgb(hex)
  const { h, s, l } = rgbToHsl(r, g, b)
  const h1 = (h + 120) % 360
  const h2 = (h + 240) % 360
  return [hslToHex(h1, s, l), hslToHex(h2, s, l)]
}

export default function ColorPicker() {
  const { copy, reset: resetCtx } = useToolContext()
  const [color, setColor] = useState("#2563EB")

  const values = useMemo(() => {
    const { r, g, b } = hexToRgb(color)
    const hsl = rgbToHsl(r, g, b)
    const oklch = rgbToOklch(r, g, b)
    const comp = complementary(color)
    const anal = analogous(color)
    const triad = triadic(color)
    return { r, g, b, hsl, oklch, comp, anal, triad }
  }, [color])

  const reset = () => {
    setColor("#2563EB")
    resetCtx()
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start gap-6">
        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">Pick a color</label>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="h-20 w-20 cursor-pointer rounded-xl border border-border bg-background"
          />
        </div>
        <div className="flex-1 min-w-0 space-y-2">
          <div
            className="h-24 rounded-xl border border-border"
            style={{ backgroundColor: color }}
          />
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <CopyBadge label="HEX" value={color} onCopy={() => copy(color, "HEX copied")} />
            <CopyBadge label="RGB" value={`rgb(${values.r}, ${values.g}, ${values.b})`} onCopy={() => copy(`rgb(${values.r}, ${values.g}, ${values.b})`, "RGB copied")} />
            <CopyBadge label="HSL" value={`hsl(${values.hsl.h}, ${values.hsl.s}%, ${values.hsl.l}%)`} onCopy={() => copy(`hsl(${values.hsl.h}, ${values.hsl.s}%, ${values.hsl.l}%)`, "HSL copied")} />
            <CopyBadge label="OKLCH" value={`oklch(${values.oklch.L}% ${values.oklch.C} ${values.oklch.H})`} onCopy={() => copy(`oklch(${values.oklch.L}% ${values.oklch.C} ${values.oklch.H})`, "OKLCH copied")} />
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <h3 className="mb-2 text-sm font-semibold text-foreground">Complementary</h3>
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-lg border" style={{ backgroundColor: values.comp }} />
            <span className="text-xs font-mono text-muted-foreground">{values.comp}</span>
          </div>
        </Card>
        <Card>
          <h3 className="mb-2 text-sm font-semibold text-foreground">Analogous</h3>
          <div className="flex items-center gap-2">
            {values.anal.map((c) => (
              <div key={c} className="flex items-center gap-1.5">
                <div className="size-8 rounded-lg border" style={{ backgroundColor: c }} />
                <span className="text-[10px] font-mono text-muted-foreground">{c}</span>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <h3 className="mb-2 text-sm font-semibold text-foreground">Triadic</h3>
          <div className="flex items-center gap-2">
            {values.triad.map((c) => (
              <div key={c} className="flex items-center gap-1.5">
                <div className="size-8 rounded-lg border" style={{ backgroundColor: c }} />
                <span className="text-[10px] font-mono text-muted-foreground">{c}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Button variant="ghost" onClick={reset} icon={<RotateCcw className="size-4" />}>
        Reset
      </Button>
    </div>
  )
}

function CopyBadge({ label, value, onCopy }: { label: string; value: string; onCopy: () => void }) {
  return (
    <div
      className="flex items-center justify-between rounded-lg border border-border bg-background px-3 py-2 cursor-pointer hover:bg-muted transition-colors group"
      onClick={onCopy}
    >
      <div>
        <span className="text-[10px] text-muted-foreground">{label}</span>
        <p className="text-xs text-foreground truncate max-w-[140px]">{value}</p>
      </div>
      <Copy className="size-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
    </div>
  )
}
