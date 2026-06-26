import type { Metadata } from "next"
import { Sparkles, Globe, Lock, Zap, Heart } from "lucide-react"

export const metadata: Metadata = {
  title: "About",
  description: "Learn about ToolNova - our mission, values, and the team behind the tools.",
}

const values = [
  {
    icon: Sparkles,
    title: "Quality First",
    description: "Every tool is crafted with care, ensuring a premium user experience.",
  },
  {
    icon: Globe,
    title: "Free for Everyone",
    description: "All tools are completely free to use. No hidden charges, no premium tiers.",
  },
  {
    icon: Lock,
    title: "Privacy Focused",
    description: "Everything runs in your browser. We never store or transmit your data.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Built with modern technology for instant results and smooth interactions.",
  },
  {
    icon: Heart,
    title: "Community Driven",
    description: "We build tools based on real user needs and feedback.",
  },
]

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          About <span className="gradient-text">ToolNova</span>
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          We&apos;re on a mission to build the highest-quality collection of free online tools
          for everyone.
        </p>
      </div>

      <div className="mb-16 rounded-2xl border border-border bg-card p-8 shadow-soft">
        <h2 className="text-2xl font-bold text-foreground mb-4">Our Mission</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          ToolNova was created with a simple vision: to provide everyone with access to
          powerful, professional-quality tools without any barriers. We believe that essential
          utilities should be free, fast, and private.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Whether you&apos;re a developer debugging JSON, a designer picking colors, a marketer
          generating QR codes, or a student calculating your BMI - ToolNova has you covered
          with beautiful, intuitive tools that work instantly in your browser.
        </p>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Our Values</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((value) => (
            <div
              key={value.title}
              className="rounded-xl border border-border bg-card p-6 shadow-soft transition-shadow hover:shadow-elevated"
            >
              <div className="mb-4 inline-flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <value.icon className="size-5" />
              </div>
              <h3 className="text-base font-semibold text-foreground mb-2">{value.title}</h3>
              <p className="text-sm text-muted-foreground">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 p-8 text-center">
        <h2 className="text-2xl font-bold text-foreground mb-4">Join Our Journey</h2>
        <p className="text-muted-foreground max-w-lg mx-auto mb-6">
          We&apos;re constantly adding new tools and improving existing ones. Follow us on social
          media or subscribe to our newsletter to stay updated.
        </p>
        <p className="text-sm text-muted-foreground">
          Built with ❤️ by the ToolNova Team
        </p>
      </div>
    </div>
  )
}
