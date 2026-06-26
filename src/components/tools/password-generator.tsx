"use client"

import { useState, useCallback } from "react"
import { motion } from "framer-motion"
import { Copy, Lock, RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"
import Button from "@/components/ui/button"
import Input from "@/components/ui/input"
import EmptyState from "@/components/ui/empty-state"
import { useToolContext } from "./tool-wrapper"

function generatePassword(
  length: number,
  upper: boolean,
  lower: boolean,
  numbers: boolean,
  symbols: boolean,
  excludeSimilar: boolean
): string {
  let chars = ""
  if (upper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  if (lower) chars += "abcdefghijklmnopqrstuvwxyz"
  if (numbers) chars += "0123456789"
  if (symbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?/~"

  if (excludeSimilar) {
    chars = chars.replace(/[il1Lo0O]/g, "")
  }

  if (!chars) return ""

  let password = ""
  for (let i = 0; i < length; i++) {
    password += chars[Math.floor(Math.random() * chars.length)]
  }
  return password
}

function getStrength(password: string): { label: string; color: string; width: number } {
  let score = 0
  if (password.length >= 8) score++
  if (password.length >= 12) score++
  if (password.length >= 16) score++
  if (/[A-Z]/.test(password)) score++
  if (/[a-z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++

  if (score <= 2) return { label: "Weak", color: "bg-error", width: 25 }
  if (score <= 4) return { label: "Fair", color: "bg-warning", width: 50 }
  if (score <= 6) return { label: "Strong", color: "bg-success", width: 75 }
  return { label: "Very Strong", color: "bg-primary", width: 100 }
}

export default function PasswordGenerator() {
  const { copy, reset: resetCtx } = useToolContext()
  const [length, setLength] = useState(16)
  const [upper, setUpper] = useState(true)
  const [lower, setLower] = useState(true)
  const [numbers, setNumbers] = useState(true)
  const [symbols, setSymbols] = useState(true)
  const [excludeSimilar, setExcludeSimilar] = useState(false)
  const [passwords, setPasswords] = useState<string[]>([])

  const generate = useCallback(() => {
    const list = Array.from({ length: 5 }, () =>
      generatePassword(length, upper, lower, numbers, symbols, excludeSimilar)
    )
    setPasswords(list)
  }, [length, upper, lower, numbers, symbols, excludeSimilar])

  const reset = useCallback(() => {
    setLength(16)
    setUpper(true)
    setLower(true)
    setNumbers(true)
    setSymbols(true)
    setExcludeSimilar(false)
    setPasswords([])
    resetCtx()
  }, [resetCtx])

  const strength = passwords[0] ? getStrength(passwords[0]) : null

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">
            Length: {length}
          </label>
          <input
            type="range"
            min={4}
            max={128}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full accent-primary"
          />
          <div className="flex justify-between text-[10px] text-muted-foreground">
            <span>4</span>
            <span>128</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {[
            { label: "Uppercase (A-Z)", key: "upper", checked: upper, set: setUpper },
            { label: "Lowercase (a-z)", key: "lower", checked: lower, set: setLower },
            { label: "Numbers (0-9)", key: "numbers", checked: numbers, set: setNumbers },
            { label: "Symbols (!@#)", key: "symbols", checked: symbols, set: setSymbols },
            { label: "Exclude Similar", key: "exclude", checked: excludeSimilar, set: setExcludeSimilar },
          ].map((opt) => (
            <label
              key={opt.key}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={opt.checked}
                onChange={(e) => opt.set(e.target.checked)}
                className="rounded border-border accent-primary"
              />
              <span className="text-sm text-foreground">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button onClick={generate} icon={<RefreshCw className="size-4" />}>
          Generate
        </Button>
        {passwords.length > 0 && (
          <Button
            variant="ghost"
            icon={<Copy className="size-4" />}
            onClick={() => copy(passwords.join("\n"), "All passwords copied")}
          >
            Copy All
          </Button>
        )}
        <Button variant="ghost" onClick={reset} icon={<RefreshCw className="size-4" />}>
          Reset
        </Button>
      </div>

      {strength && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Strength</span>
            <span className={cn("text-xs font-medium", strength.label === "Weak" && "text-error", strength.label === "Fair" && "text-warning", strength.label === "Strong" && "text-success", strength.label === "Very Strong" && "text-primary")}>
              {strength.label}
            </span>
          </div>
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <div
              className={cn("h-full rounded-full transition-all duration-500", strength.color)}
              style={{ width: `${strength.width}%` }}
            />
          </div>
        </div>
      )}

      {passwords.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-2"
        >
          {passwords.map((pw, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group flex items-center justify-between rounded-xl border border-border bg-background px-4 py-3"
            >
              <code className="font-mono text-sm text-foreground break-all mr-2">{pw}</code>
              <button
                onClick={() => copy(pw, "Password copied")}
                className="shrink-0 p-1.5 hover:bg-muted rounded-lg opacity-0 group-hover:opacity-100 transition-all"
              >
                <Copy className="size-4 text-muted-foreground" />
              </button>
            </motion.div>
          ))}
        </motion.div>
      )}

      {passwords.length === 0 && (
        <EmptyState
          icon={<Lock className="size-8" />}
          title="Generate secure passwords"
          description="Configure options and click Generate"
        />
      )}
    </div>
  )
}
