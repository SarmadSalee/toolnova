"use client"

import { useState, useCallback } from "react"
import { motion } from "framer-motion"
import { Copy, RotateCcw, Shield } from "lucide-react"
import Button from "@/components/ui/button"
import Input from "@/components/ui/input"
import Card from "@/components/ui/card"
import EmptyState from "@/components/ui/empty-state"
import { useToolContext } from "./tool-wrapper"

function decodeJWT(token: string) {
  const parts = token.split(".")
  if (parts.length !== 3) throw new Error("Invalid JWT: must have 3 parts")

  const decodePart = (part: string) => {
    try {
      const base64 = part.replace(/-/g, "+").replace(/_/g, "/")
      const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=")
      const decoded = atob(padded)
      return JSON.parse(decoded)
    } catch {
      throw new Error("Failed to decode JWT part")
    }
  }

  return {
    header: decodePart(parts[0]),
    payload: decodePart(parts[1]),
    signature: parts[2],
  }
}

function formatTimestamp(ts: number | undefined): string {
  if (!ts) return "N/A"
  return new Date(ts * 1000).toLocaleString()
}

export default function JwtDecoder() {
  const { copy, reset: resetCtx } = useToolContext()
  const [token, setToken] = useState("")
  const [decoded, setDecoded] = useState<{
    header: Record<string, unknown>
    payload: Record<string, unknown>
    signature: string
  } | null>(null)
  const [error, setError] = useState("")

  const decode = useCallback(() => {
    if (!token.trim()) {
      setError("Please enter a JWT token")
      setDecoded(null)
      return
    }
    try {
      const result = decodeJWT(token.trim())
      setDecoded(result)
      setError("")
    } catch (e) {
      setError((e as Error).message)
      setDecoded(null)
    }
  }, [token])

  const reset = useCallback(() => {
    setToken("")
    setDecoded(null)
    setError("")
    resetCtx()
  }, [resetCtx])

  return (
    <div className="space-y-6">
      <div>
        <label className="mb-2 block text-sm font-medium text-foreground">
          JWT Token
        </label>
        <textarea
          value={token}
          onChange={(e) => { setToken(e.target.value); setError("") }}
          placeholder="eyJhbGciOiJIUzI1NiIs..."
          className="min-h-[100px] w-full rounded-xl border border-border bg-background p-4 font-mono text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring resize-y"
          spellCheck={false}
        />
      </div>

      {error && (
        <p className="text-sm text-error">{error}</p>
      )}

      <div className="flex gap-3">
        <Button onClick={decode} icon={<Shield className="size-4" />}>
          Decode
        </Button>
        <Button variant="ghost" onClick={reset} icon={<RotateCcw className="size-4" />}>
          Reset
        </Button>
      </div>

      {decoded && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <Card>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-foreground">Header</h3>
              <Button
                variant="ghost"
                size="sm"
                icon={<Copy className="size-3.5" />}
                onClick={() => copy(JSON.stringify(decoded.header, null, 2), "Header copied")}
              >
                Copy
              </Button>
            </div>
            <pre className="rounded-lg bg-muted p-3 text-xs font-mono text-foreground overflow-auto">
              {JSON.stringify(decoded.header, null, 2)}
            </pre>
          </Card>

          <Card>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-foreground">Payload</h3>
              <Button
                variant="ghost"
                size="sm"
                icon={<Copy className="size-3.5" />}
                onClick={() => copy(JSON.stringify(decoded.payload, null, 2), "Payload copied")}
              >
                Copy
              </Button>
            </div>
            <pre className="rounded-lg bg-muted p-3 text-xs font-mono text-foreground overflow-auto">
              {JSON.stringify(decoded.payload, null, 2)}
            </pre>
            <div className="mt-3 space-y-1 text-xs text-muted-foreground">
              {(decoded.payload.exp as number) != null && (
                <p>Expiration: <span className="text-foreground font-mono">{formatTimestamp(decoded.payload.exp as number)}</span></p>
              )}
              {(decoded.payload.iat as number) != null && (
                <p>Issued At: <span className="text-foreground font-mono">{formatTimestamp(decoded.payload.iat as number)}</span></p>
              )}
              {(decoded.payload.nbf as number) != null && (
                <p>Not Before: <span className="text-foreground font-mono">{formatTimestamp(decoded.payload.nbf as number)}</span></p>
              )}
            </div>
          </Card>

          <Card>
            <h3 className="text-sm font-semibold text-foreground mb-2">Signature</h3>
            <p className="text-xs font-mono text-muted-foreground break-all">{decoded.signature}</p>
          </Card>
        </motion.div>
      )}

      {!token && !decoded && (
        <EmptyState
          icon={<Shield className="size-8" />}
          title="Enter a JWT token to decode"
          description="Paste your JWT and click Decode"
        />
      )}
    </div>
  )
}
