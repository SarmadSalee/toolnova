import type { ReactNode } from "react"
import Link from "next/link"
import { ChevronRight, Clock, Star, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { tools } from "@/data/tools"
import { Icon } from "@/components/ui/icon"
import Badge from "@/components/ui/badge"
import type { FaqItem } from "@/types"

interface ToolLayoutProps {
  title: string
  description: string
  breadcrumbItems: { label: string; href?: string }[]
  children: ReactNode
  faqItems?: FaqItem[]
  relatedTools?: string[]
  publishedAt?: string
  tags?: string[]
}

function ToolSchema({ title, description, faqItems }: { title: string; description: string; faqItems?: FaqItem[] }) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: title,
    description,
    applicationCategory: "Utility",
    operatingSystem: "All",
    browserRequirements: "Requires JavaScript",
  }

  if (faqItems && faqItems.length > 0) {
    schema.mainEntity = faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    }))
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

function RelatedTools({ relatedTools }: { relatedTools?: string[] }) {
  if (!relatedTools || relatedTools.length === 0) return null

  const related = tools.filter((t) => relatedTools.includes(t.id)).slice(0, 4)

  if (related.length === 0) return null

  return (
    <aside className="space-y-4">
      <h3 className="text-lg font-semibold">Related Tools</h3>
      <div className="grid gap-3">
        {related.map((tool) => (
          <Link
            key={tool.id}
            href={tool.path}
            className={cn(
              "group flex items-center gap-3 rounded-xl border border-border bg-card p-4",
              "transition-all duration-200 hover:shadow-elevated hover:-translate-y-0.5"
            )}
          >
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
              <Icon name={tool.icon} size={18} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-foreground truncate">{tool.name}</p>
              <p className="text-xs text-muted-foreground truncate">{tool.description}</p>
            </div>
            <ChevronRight className="size-4 shrink-0 text-muted-foreground group-hover:text-foreground transition-colors" />
          </Link>
        ))}
      </div>
    </aside>
  )
}

function AdPlaceholder() {
  return (
    <div className="flex min-h-[250px] items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/50">
      <p className="text-sm text-muted-foreground">Advertisement</p>
    </div>
  )
}

export default function ToolLayout({
  title,
  description,
  breadcrumbItems,
  children,
  faqItems,
  relatedTools,
  publishedAt,
  tags,
}: ToolLayoutProps) {
  return (
    <>
      <ToolSchema title={title} description={description} faqItems={faqItems} />

      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
            {breadcrumbItems.map((item, index) => (
              <li key={index} className="flex items-center gap-1.5">
                {index > 0 && <ChevronRight className="size-3.5 shrink-0" />}
                {item.href ? (
                  <Link
                    href={item.href}
                    className="hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-foreground font-medium">{item.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <div className="mb-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {title}
              </h1>
              <p className="mt-2 text-base text-muted-foreground max-w-3xl sm:text-lg">
                {description}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                {publishedAt && (
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="size-3.5" />
                    {new Date(publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                )}
                {tags?.map((tag) => (
                  <Badge key={tag} variant="primary" size="sm">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
          <div className="min-w-0">
            <article className="space-y-8">
              <section className="rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8">
                {children}
              </section>

              {faqItems && faqItems.length > 0 && (
                <section className="rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8">
                  <h2 className="mb-6 text-2xl font-bold text-foreground">
                    Frequently Asked Questions
                  </h2>
                  <div className="divide-y divide-border">
                    {faqItems.map((item, index) => (
                      <div key={index} className="py-4 first:pt-0 last:pb-0">
                        <h3 className="text-base font-semibold text-foreground">
                          {item.question}
                        </h3>
                        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </article>
          </div>

          <aside className="space-y-8">
            <RelatedTools relatedTools={relatedTools} />
            <AdPlaceholder />
          </aside>
        </div>
      </div>
    </>
  )
}
