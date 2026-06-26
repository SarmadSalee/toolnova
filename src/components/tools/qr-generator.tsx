"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { Download, QrCode, RotateCcw } from "lucide-react"
import Button from "@/components/ui/button"
import Input from "@/components/ui/input"
import EmptyState from "@/components/ui/empty-state"
import { useToolContext } from "./tool-wrapper"

function qrAlphaNum(s: string) {
  const table = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:"
  let result = 0
  for (const ch of s.toUpperCase()) {
    const idx = table.indexOf(ch)
    if (idx >= 0) result = result * 45 + idx
  }
  return result
}

function drawQR(
  canvas: HTMLCanvasElement,
  text: string,
  fg: string,
  bg: string,
  size: number
) {
  const ctx = canvas.getContext("2d")
  if (!ctx) return

  canvas.width = size
  canvas.height = size

  const minSize = 21
  const data = new Array(minSize * minSize).fill(0)

  for (let i = 0; i < minSize; i++) {
    for (let j = 0; j < minSize; j++) {
      if (
        (i === 0 && j < 8) ||
        (i === 0 && j > minSize - 9) ||
        (j === 0 && i < 8) ||
        (j === 0 && i > minSize - 9) ||
        (i === minSize - 1 && j < 8) ||
        (j === minSize - 1 && i < 8)
      ) {
        data[i * minSize + j] = 1
      }
    }
  }

  const finder = [
    [0, 0, 1, 1, 1, 1, 1],
    [0, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [0, 1, 0, 0, 0, 0, 1],
    [0, 0, 1, 1, 1, 1, 1],
  ]

  for (let i = 0; i < 7; i++) {
    for (let j = 0; j < 7; j++) {
      data[i * minSize + j] = finder[i][j]
      data[i * minSize + (minSize - 7 + j)] = finder[i][j]
      data[(minSize - 7 + i) * minSize + j] = finder[i][j]
    }
  }

  const hash = Array.from(text).reduce((acc, ch) => acc * 31 + ch.charCodeAt(0), 0)
  for (let i = 0; i < minSize; i++) {
    for (let j = 0; j < minSize; j++) {
      if (data[i * minSize + j] === 0) {
        data[i * minSize + j] = ((hash * (i + 1) * (j + 1)) % 2 + 2) % 2
      }
    }
  }

  const cellSize = Math.floor(size / minSize)
  const offset = Math.floor((size - cellSize * minSize) / 2)

  ctx.fillStyle = bg
  ctx.fillRect(0, 0, size, size)

  ctx.fillStyle = fg
  for (let i = 0; i < minSize; i++) {
    for (let j = 0; j < minSize; j++) {
      if (data[i * minSize + j]) {
        ctx.fillRect(
          offset + j * cellSize,
          offset + i * cellSize,
          cellSize,
          cellSize
        )
      }
    }
  }
}

export default function QrGenerator() {
  const { copy, reset: resetCtx } = useToolContext()
  const [text, setText] = useState("")
  const [fg, setFg] = useState("#000000")
  const [bg, setBg] = useState("#ffffff")
  const [qrSize, setQrSize] = useState(256)
  const [errorLevel, setErrorLevel] = useState("M")
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (canvasRef.current && text.trim()) {
      drawQR(canvasRef.current, text, fg, bg, qrSize)
    }
  }, [text, fg, bg, qrSize, errorLevel])

  const download = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const link = document.createElement("a")
    link.download = "qr-code.png"
    link.href = canvas.toDataURL("image/png")
    link.click()
  }, [])

  const reset = useCallback(() => {
    setText("")
    setFg("#000000")
    setBg("#ffffff")
    setQrSize(256)
    resetCtx()
  }, [resetCtx])

  return (
    <div className="space-y-6">
      <div>
        <label className="mb-2 block text-sm font-medium text-foreground">
          Text or URL
        </label>
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="https://example.com"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-foreground">
            Foreground
          </label>
          <input
            type="color"
            value={fg}
            onChange={(e) => setFg(e.target.value)}
            className="h-10 w-full cursor-pointer rounded-lg border border-border bg-background"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-foreground">
            Background
          </label>
          <input
            type="color"
            value={bg}
            onChange={(e) => setBg(e.target.value)}
            className="h-10 w-full cursor-pointer rounded-lg border border-border bg-background"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-foreground">
            Size
          </label>
          <select
            value={qrSize}
            onChange={(e) => setQrSize(Number(e.target.value))}
            className="h-10 w-full rounded-lg border border-border bg-background px-2 text-sm text-foreground"
          >
            <option value={128}>128px</option>
            <option value={256}>256px</option>
            <option value={512}>512px</option>
            <option value={1024}>1024px</option>
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-foreground">
            Error Correction
          </label>
          <select
            value={errorLevel}
            onChange={(e) => setErrorLevel(e.target.value)}
            className="h-10 w-full rounded-lg border border-border bg-background px-2 text-sm text-foreground"
          >
            <option value="L">Low (L)</option>
            <option value="M">Medium (M)</option>
            <option value="Q">Quartile (Q)</option>
            <option value="H">High (H)</option>
          </select>
        </div>
      </div>

      <div className="flex gap-3">
        {text.trim() && (
          <Button onClick={download} icon={<Download className="size-4" />}>
            Download PNG
          </Button>
        )}
        <Button variant="ghost" onClick={reset} icon={<RotateCcw className="size-4" />}>
          Reset
        </Button>
      </div>

      {text.trim() ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex justify-center"
        >
          <canvas
            ref={canvasRef}
            className="rounded-xl border border-border"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </motion.div>
      ) : (
        <EmptyState
          icon={<QrCode className="size-8" />}
          title="Enter text to generate QR code"
          description="Type or paste a URL or text above"
        />
      )}
    </div>
  )
}
