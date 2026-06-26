import type { Metadata } from "next"
import Link from "next/link"
import { Check, Sparkles, Zap, Shield, Star, ArrowRight } from "lucide-react"
import Button from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Premium",
  description: "Unlock premium features and support ToolNova's development.",
}

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Access to all basic tools",
    features: [
      "All 500+ free tools",
      "Basic features",
      "Standard support",
      "Community access",
    ],
    cta: "Current Plan",
    featured: false,
  },
  {
    name: "Pro",
    price: "$9",
    period: "/month",
    description: "For power users and professionals",
    features: [
      "Everything in Free",
      "Priority processing",
      "Advanced features",
      "Batch processing",
      "Priority support",
      "No ads",
      "Export to multiple formats",
    ],
    cta: "Coming Soon",
    featured: true,
  },
  {
    name: "Team",
    price: "$29",
    period: "/month",
    description: "For teams and organizations",
    features: [
      "Everything in Pro",
      "Team dashboard",
      "Usage analytics",
      "API access",
      "Dedicated support",
      "Custom integrations",
      "White-label options",
    ],
    cta: "Coming Soon",
    featured: false,
  },
]

export default function PremiumPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <div className="mb-4 inline-flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-white shadow-lg">
          <Sparkles className="size-7" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Premium Plans
        </h1>
        <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
          While all our tools are free, premium plans unlock advanced features and support
          our mission to build the best toolkit on the internet.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3 mx-auto max-w-5xl">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative rounded-2xl border p-6 sm:p-8 ${
              plan.featured
                ? "border-primary/50 bg-gradient-to-b from-primary/5 to-background shadow-elevated"
                : "border-border bg-card shadow-soft"
            }`}
          >
            {plan.featured && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">
                  <Star className="size-3" />
                  Most Popular
                </span>
              </div>
            )}

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-foreground">{plan.name}</h3>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                {plan.period && (
                  <span className="text-sm text-muted-foreground">{plan.period}</span>
                )}
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>
            </div>

            <ul className="mb-8 space-y-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <Check className="mt-0.5 size-4 shrink-0 text-success" />
                  <span className="text-sm text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              className={`w-full rounded-xl py-3 text-sm font-semibold transition-all ${
                plan.featured
                  ? "gradient-primary text-white shadow-lg shadow-primary/20 hover:shadow-xl"
                  : plan.name === "Free"
                  ? "border border-border bg-muted text-muted-foreground cursor-default"
                  : "border border-border text-foreground hover:bg-muted"
              }`}
              disabled={plan.name === "Free"}
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-16 rounded-2xl border border-border bg-card p-8 shadow-soft">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground">
              Not ready for premium?
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              All our basic tools are and always will be free. No sign-up required.
            </p>
          </div>
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
          >
            Browse Free Tools
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
