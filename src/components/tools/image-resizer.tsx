"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { motion } from "framer-motion"
import { Crop, Download, Image, RotateCcw, Upload } from "lucide-react"
import { cn, formatBytes } from "@/lib/utils"
import Button from "@/components/ui/button"
import Input from "@/components/ui/input"
import EmptyState from "@/components/ui/empty-state"
import { useToolContext } from "./tool-wrapper"

const presets = [
  { label: "Facebook Post", width: 1200, height: 630 },
  { label: "Twitter Post", width: 1200, height: 675 },
  { label: "Instagram Square", width: 1080, height: 1080 },
  { label: "Instagram Portrait", width: 1080, height: 1350 },
  { label: "LinkedIn Banner", width: 1584, height: 396 },
  { label: "YouTube Thumbnail", width: 1280, height: 720 },
  { label: "Pinterest Pin", width: 1000, height: 1500 },
  { label: "OG Image", width: 1200, height: 630 },
]

export default function ImageResizer() {
  const { reset: resetCtx } = useToolContext()
  const [file, setFile] = useState<File | null>(null)
  const [originalUrl, setOriginalUrl] = useState("")
  const [resizedUrl, setResizedUrl] = useState("")
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const [origWidth, setOrigWidth] = useState(0)
  const [origHeight, setOrigHeight] = useState(0)
  const [lockAspect, setLockAspect] = useState(true)
  const [dragging, setDragging] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  const resize = useCallback(
    (w: number, h: number) => {
      if (!file) return
      const img = document.createElement("img")
      img.onload = () => {
        const canvas = document.createElement("canvas")
        canvas.width = w
        canvas.height = h
        const ctx = canvas.getContext("2d")
        if (!ctx) return
        ctx.drawImage(img, 0, 0, w, h)
        const url = canvas.toDataURL(file.type || "image/png")
        setResizedUrl(url)
      }
      img.src = originalUrl
    },
    [file, originalUrl]
  )

  useEffect(() => {
    if (width > 0 && height > 0) resize(width, height)
  }, [width, height, resize])

  const handleFile = useCallback((f: File) => {
    if (!f.type.startsWith("image/")) return
    setFile(f)
    const url = URL.createObjectURL(f)
    setOriginalUrl(url)
    const img = document.createElement("img")
    img.onload = () => {
      setOrigWidth(img.width)
      setOrigHeight(img.height)
      setWidth(img.width)
      setHeight(img.height)
    }
    img.src = url
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setDragging(false)
      const f = e.dataTransfer.files[0]
      if (f) handleFile(f)
    },
    [handleFile]
  )

  const applyPreset = useCallback(
    (w: number, h: number) => {
      if (lockAspect && origWidth > 0) {
        const ratio = origWidth / origHeight
        const newH = Math.round(w / ratio)
        setWidth(w)
        setHeight(newH)
      } else {
        setWidth(w)
        setHeight(h)
      }
    },
    [lockAspect, origWidth, origHeight]
  )

  const reset = useCallback(() => {
    if (originalUrl) URL.revokeObjectURL(originalUrl)
    if (resizedUrl) URL.revokeObjectURL(resizedUrl)
    setFile(null)
    setOriginalUrl("")
    setResizedUrl("")
    setWidth(0)
    setHeight(0)
    setOrigWidth(0)
    setOrigHeight(0)
    resetCtx()
  }, [originalUrl, resizedUrl, resetCtx])

  const download = useCallback(() => {
    if (!resizedUrl) return
    const a = document.createElement("a")
    a.href = resizedUrl
    const ext = file?.name.split(".").pop() || "png"
    a.download = `resized-${width}x${height}.${ext}`
    a.click()
  }, [resizedUrl, file, width, height])

  return (
    <div className="space-y-6">
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileRef.current?.click()}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-12 transition-all",
          dragging
            ? "border-primary bg-primary/5"
            : "border-border hover:border-primary/50 hover:bg-muted/50"
        )}
      >
        <Upload className="mb-4 size-10 text-muted-foreground" />
        <p className="text-sm font-medium text-foreground">Drop image here or click to browse</p>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0]
            if (f) handleFile(f)
          }}
        />
      </div>

      {file && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-end gap-4">
            <div className="w-28">
              <label className="mb-1.5 block text-xs font-medium text-foreground">Width (px)</label>
              <Input
                type="number"
                min={1}
                value={width}
                onChange={(e) => {
                  const w = Number(e.target.value)
                  setWidth(w)
                  if (lockAspect && origHeight > 0) {
                    setHeight(Math.round(w / (origWidth / origHeight)))
                  }
                }}
              />
            </div>
            <div className="w-28">
              <label className="mb-1.5 block text-xs font-medium text-foreground">Height (px)</label>
              <Input
                type="number"
                min={1}
                value={height}
                onChange={(e) => {
                  const h = Number(e.target.value)
                  setHeight(h)
                  if (lockAspect && origWidth > 0) {
                    setWidth(Math.round(h * (origWidth / origHeight)))
                  }
                }}
              />
            </div>
            <label className="flex items-center gap-2 cursor-pointer pt-5">
              <input
                type="checkbox"
                checked={lockAspect}
                onChange={(e) => setLockAspect(e.target.checked)}
                className="rounded border-border accent-primary"
              />
              <span className="text-sm text-foreground">Lock aspect ratio</span>
            </label>
          </div>

          <div>
            <p className="mb-2 text-xs text-muted-foreground">Preset Sizes</p>
            <div className="flex flex-wrap gap-2">
              {presets.map((p) => (
                <Button
                  key={p.label}
                  variant="outline"
                  size="sm"
                  onClick={() => applyPreset(p.width, p.height)}
                >
                  {p.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="mb-1 text-xs text-muted-foreground">
                Original: {origWidth} x {origHeight}
              </p>
              <img
                ref={imageRef}
                src={originalUrl}
                alt="Original"
                className="w-full rounded-xl border border-border object-contain max-h-64"
              />
            </div>
            {resizedUrl && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <p className="mb-1 text-xs text-muted-foreground">
                  Resized: {width} x {height}
                </p>
                <img
                  src={resizedUrl}
                  alt="Resized"
                  className="w-full rounded-xl border border-border object-contain max-h-64"
                />
              </motion.div>
            )}
          </div>

          <div className="flex gap-3">
            {resizedUrl && (
              <Button onClick={download} icon={<Download className="size-4" />}>
                Download
              </Button>
            )}
            <Button variant="ghost" onClick={reset} icon={<RotateCcw className="size-4" />}>
              Reset
            </Button>
          </div>
        </div>
      )}

      {!file && (
        <EmptyState
          icon={<Crop className="size-8" />}
          title="Upload an image to resize"
          description="Drag & drop or click to browse"
        />
      )}
    </div>
  )
}
