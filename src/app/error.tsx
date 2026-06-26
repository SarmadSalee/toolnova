"use client"

import { useEffect } from "react"
import { RotateCcw, AlertTriangle } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-6 inline-flex size-16 items-center justify-center rounded-2xl bg-error/10 text-error">
        <AlertTriangle className="size-8" />
      </div>
      <h1 className="mb-3 text-2xl font-bold text-foreground">Something went wrong</h1>
      <p className="mb-8 max-w-md text-muted-foreground">
        An unexpected error occurred. Please try again.
      </p>
      <button
        onClick={reset}
        className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
      >
        <RotateCcw className="size-4" />
        Try Again
      </button>
    </div>
  )
}
