import Link from "next/link"
import { cn } from "@/lib/utils"

const popularTerms = [
  { label: "JSON Formatter", href: "/tools/json-formatter" },
  { label: "QR Generator", href: "/tools/qr-generator" },
  { label: "Password Generator", href: "/tools/password-generator" },
  { label: "BMI Calculator", href: "/tools/bmi-calculator" },
  { label: "UUID Generator", href: "/tools/uuid-generator" },
  { label: "Color Picker", href: "/tools/color-picker" },
  { label: "Word Counter", href: "/tools/word-counter" },
  { label: "Base64 Encoder", href: "/tools/base64-encoder" },
  { label: "Image Compressor", href: "/tools/image-compressor" },
  { label: "Case Converter", href: "/tools/case-converter" },
]

export function PopularSearches() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="mb-6 text-center text-2xl font-bold tracking-tight sm:text-3xl">
          Popular <span className="gradient-text">Searches</span>
        </h2>

        <div className="flex flex-wrap justify-center gap-3">
          {popularTerms.map((term) => (
            <Link
              key={term.href}
              href={term.href}
              className={cn(
                "inline-flex items-center rounded-full border border-border/50 px-4 py-2 text-xs font-medium",
                "bg-card text-muted-foreground transition-all hover:border-primary/30 hover:text-primary hover:shadow-sm"
              )}
            >
              {term.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
