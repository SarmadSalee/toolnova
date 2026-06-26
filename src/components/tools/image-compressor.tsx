"use client"

import { useState, useRef, useCallback } from "react"
import { motion } from "framer-motion"
import { Download, Image, RotateCcw, Upload } from "lucide-react"
import { cn, formatBytes } from "@/lib/utils"
import Button from "@/components/ui/button"
import EmptyState from "@/components/ui/empty-state"
import { useToolContext } from "./tool-wrapper"

export default function ImageCompressor() {
  const { reset: resetCtx } = useToolContext()
  const [original, setOriginal] = useState<File | null>(null)
  const [originalUrl, setOriginalUrl] = useState("")
  const [compressedUrl, setCompressedUrl] = useState("")
  const [quality, setQuality] = useState(80)
  const [format, setFormat] = useState("original")
  const [originalSize, setOriginalSize] = useState(0)
  const [compressedSize, setCompressedSize] = useState(0)
  const [dragging, setDragging] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const compress = useCallback(
    (file: File) => {
      const url = URL.createObjectURL(file)
      setOriginalUrl(url)
      setOriginal(file)
      setOriginalSize(file.size)

      const img = document.createElement("img")
      img.onload = () => {
        const canvas = document.createElement("canvas")
        canvas.width = img.width
        canvas.height = img.height
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        ctx.drawImage(img, 0, 0)

        let mimeType = file.type
        if (format === "jpeg") mimeType = "image/jpeg"
        else if (format === "png") mimeType = "image/png"
        else if (format === "webp") mimeType = "image/webp"

        canvas.toBlob(
          (blob) => {
            if (blob) {
              setCompressedUrl(URL.createObjectURL(blob))
              setCompressedSize(blob.size)
            }
          },
          mimeType,
          quality / 100
        )
      }
      img.src = url
    },
    [quality, format]
  )

  const handleFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/")) return
      compress(file)
    },
    [compress]
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setDragging(false)
      const file = e.dataTransfer.files[0]
      if (file) handleFile(file)
    },
    [handleFile]
  )

  const reset = useCallback(() => {
    if (originalUrl) URL.revokeObjectURL(originalUrl)
    if (compressedUrl) URL.revokeObjectURL(compressedUrl)
    setOriginal(null)
    setOriginalUrl("")
    setCompressedUrl("")
    setOriginalSize(0)
    setCompressedSize(0)
    setQuality(80)
    setFormat("original")
    resetCtx()
  }, [originalUrl, compressedUrl, resetCtx])

  const download = useCallback(() => {
    if (!compressedUrl) return
    const a = document.createElement("a")
    a.href = compressedUrl
    const ext = format === "original" ? original?.name.split(".").pop() : format
    a.download = `compressed.${ext}`
    a.click()
  }, [compressedUrl, format, original])

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
        <p className="text-sm font-medium text-foreground">
          Drop an image here or click to browse
        </p>
        <p className="mt-1 text-xs text-muted-foreground">Supports JPEG, PNG, WebP</p>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) handleFile(file)
          }}
        />
      </div>

      {original && (
        <div className="space-y-4">
          <div className="w-48">
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Quality: {quality}%
            </label>
            <input
              type="range"
              min={1}
              max={100}
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
              className="w-full accent-primary"
            />
          </div>

          <div className="w-48">
            <label className="mb-1.5 block text-sm font-medium text-foreground">Format</label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className="h-10 w-full rounded-lg border border-border bg-background px-2 text-sm text-foreground"
            >
              <option value="original">Original</option>
              <option value="jpeg">JPEG</option>
              <option value="png">PNG</option>
              <option value="webp">WebP</option>
            </select>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="mb-2 text-xs text-muted-foreground">
                Original: {formatBytes(originalSize)}
              </p>
              <img
                src={originalUrl}
                alt="Original"
                className="w-full rounded-xl border border-border object-contain max-h-64"
              />
            </div>
            {compressedUrl && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <p className="mb-2 text-xs text-muted-foreground">
                  Compressed: {formatBytes(compressedSize)} (-
                  {Math.round((1 - compressedSize / originalSize) * 100)}%)
                </p>
                <img
                  src={compressedUrl}
                  alt="Compressed"
                  className="w-full rounded-xl border border-border object-contain max-h-64"
                />
              </motion.div>
            )}
          </div>

          <div className="flex gap-3">
            {compressedUrl && (
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

      {!original && (
        <EmptyState
          icon={<Image className="size-8" />}
          title="Upload an image to compress"
          description="Drag & drop or click to browse"
        />
      )}
    </div>
  )
}
