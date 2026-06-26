import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronLeft } from "lucide-react"
import { categories, getCategoryBySlug } from "@/data/categories"
import { tools } from "@/data/tools"
import { Icon } from "@/components/ui/icon"
import Badge from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const category = getCategoryBySlug(slug)
  if (!category) return {}

  return {
    title: `${category.name} - Free Online Tools`,
    description: category.description,
  }
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params
  const category = getCategoryBySlug(slug)
  if (!category) notFound()

  const categoryTools = tools.filter((t) => t.category === category.id)

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Link
        href="/categories"
        className="mb-8 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ChevronLeft className="size-4" />
        All Categories
      </Link>

      <div className="mb-10">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center mb-4">
          <div
            className={cn(
              "inline-flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-white",
              category.gradient
            )}
          >
            <Icon name={category.icon} size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-4xl">
              {category.name}
            </h1>
            <p className="mt-1 text-muted-foreground">
              {categoryTools.length} {categoryTools.length === 1 ? "tool" : "tools"} available
            </p>
          </div>
        </div>
        <p className="max-w-2xl text-lg text-muted-foreground">
          {category.description}
        </p>
      </div>

      {categoryTools.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categoryTools.map((tool) => (
            <Link
              key={tool.id}
              href={tool.path}
              className={cn(
                "group relative overflow-hidden rounded-xl border border-border bg-card p-5",
                "transition-all duration-200 hover:shadow-elevated hover:-translate-y-0.5"
              )}
            >
              {tool.trending && (
                <div className="absolute right-3 top-3">
                  <Badge variant="warning" size="sm">
                    Trending
                  </Badge>
                </div>
              )}
              <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-200">
                <Icon name={tool.icon} size={18} />
              </div>
              <h3 className="mb-1 text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                {tool.name}
              </h3>
              <p className="text-xs text-muted-foreground line-clamp-2">
                {tool.description}
              </p>
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Icon name="boxes" size={48} className="mb-4 text-muted-foreground" />
          <h2 className="text-xl font-semibold text-foreground">No tools yet</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Tools in this category are coming soon.
          </p>
        </div>
      )}
    </div>
  )
}
