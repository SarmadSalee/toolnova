"use client"

import { useState, useCallback } from "react"
import { motion } from "framer-motion"
import { Binary, Copy, RotateCcw, Upload } from "lucide-react"
import Button from "@/components/ui/button"
import EmptyState from "@/components/ui/empty-state"
import { useToolContext } from "./tool-wrapper"

export default function Base64Encoder() {
  const { copy, reset: resetCtx } = useToolContext()
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [mode, setMode] = useState<"encode" | "decode">("encode")
  const [charset, setCharset] = useState("utf-8")
  const [error, setError] = useState("")

  const process = useCallback(() => {
    if (!input) {
      setOutput("")
      setError("")
      return
    }
    try {
      setError("")
      if (mode === "encode") {
        if (charset === "utf-8") {
          const bytes = new TextEncoder().encode(input)
          let binary = ""
          for (const byte of bytes) {
            binary += String.fromCharCode(byte)
          }
          setOutput(btoa(binary))
        } else {
          setOutput(btoa(input))
        }
      } else {
        const decoded = atob(input)
        if (charset === "utf-8") {
          const bytes = new Uint8Array(decoded.length)
          for (let i = 0; i < decoded.length; i++) {
            bytes[i] = decoded.charCodeAt(i)
          }
          setOutput(new TextDecoder().decode(bytes))
        } else {
          setOutput(decoded)
        }
      }
    } catch {
      setError(mode === "encode" ? "Failed to encode" : "Invalid Base64 input")
      setOutput("")
    }
  }, [input, mode, charset])

  const handleFile = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (!file) return
      const reader = new FileReader()
      reader.onload = () => {
        const result = reader.result as string
        if (mode === "encode") {
          const base64 = result.split(",")[1] || result
          setInput("")
          setOutput(base64)
        } else {
          setInput(result)
          try {
            const decoded = atob(result)
            const bytes = new Uint8Array(decoded.length)
            for (let i = 0; i < decoded.length; i++) {
              bytes[i] = decoded.charCodeAt(i)
            }
            setOutput(new TextDecoder().decode(bytes))
            setError("")
          } catch {
            setError("Invalid Base64 file")
          }
        }
      }
      if (mode === "encode") reader.readAsDataURL(file)
      else reader.readAsText(file)
    },
    [mode]
  )

  const reset = useCallback(() => {
    setInput("")
    setOutput("")
    setError("")
    setMode("encode")
    setCharset("utf-8")
    resetCtx()
  }, [resetCtx])

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex gap-1 rounded-lg border border-border p-1">
          <button
            onClick={() => { setMode("encode"); setOutput(""); setError("") }}
            className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${mode === "encode" ? "bg-primary text-white" : "text-foreground hover:bg-muted"}`}
          >
            Encode
          </button>
          <button
            onClick={() => { setMode("decode"); setOutput(""); setError("") }}
            className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${mode === "decode" ? "bg-primary text-white" : "text-foreground hover:bg-muted"}`}
          >
            Decode
          </button>
        </div>
        <select
          value={charset}
          onChange={(e) => setCharset(e.target.value)}
          className="h-10 rounded-lg border border-border bg-background px-2 text-sm text-foreground"
        >
          <option value="utf-8">UTF-8</option>
          <option value="latin-1">Latin-1</option>
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-foreground">
          {mode === "encode" ? "Input Text" : "Base64 Input"}
        </label>
        <textarea
          value={input}
          onChange={(e) => { setInput(e.target.value); setError("") }}
          placeholder={mode === "encode" ? "Enter text to encode..." : "Enter Base64 to decode..."}
          className="min-h-[120px] w-full rounded-xl border border-border bg-background p-4 text-sm font-mono text-foreground placeholder:text-muted-foreground transition-colors focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring resize-y"
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button onClick={process} icon={<Binary className="size-4" />}>
          {mode === "encode" ? "Encode" : "Decode"}
        </Button>
        <label className="cursor-pointer inline-flex items-center justify-center rounded-lg border border-border bg-transparent h-10 px-4 text-sm font-medium text-foreground hover:bg-muted transition-all shadow-soft gap-2">
          <Upload className="size-4" />
          Upload File
          <input
            type="file"
            className="hidden"
            onChange={handleFile}
          />
        </label>
        {output && (
          <Button
            variant="ghost"
            size="sm"
            icon={<Copy className="size-3.5" />}
            onClick={() => copy(output, `${mode === "encode" ? "Encoded" : "Decoded"} text copied`)}
          >
            Copy
          </Button>
        )}
        <Button variant="ghost" onClick={reset} icon={<RotateCcw className="size-4" />}>
          Reset
        </Button>
      </div>

      {error && (
        <p className="text-sm text-error">{error}</p>
      )}

      {output && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <label className="mb-2 block text-sm font-medium text-foreground">
            Output ({mode === "encode" ? "Base64" : "Decoded Text"})
          </label>
          <div className="min-h-[120px] w-full rounded-xl border border-border bg-background p-4 text-sm font-mono text-foreground break-all">
            {output}
          </div>
        </motion.div>
      )}

      {!input && !output && (
        <EmptyState
          icon={<Binary className="size-8" />}
          title="Encode or decode Base64"
          description="Enter text and click Encode/Decode"
        />
      )}
    </div>
  )
}
