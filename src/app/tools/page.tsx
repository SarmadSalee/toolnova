import type { Metadata } from "next"
import Link from "next/link"
import { Search } from "lucide-react"
import { tools } from "@/data/tools"
import { categories } from "@/data/categories"
import { Icon } from "@/components/ui/icon"
import Badge from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "All Tools",
  description:
    "Browse our complete collection of 500+ free online tools. Find the perfect tool for your task.",
  openGraph: {
    title: "All Tools - ToolNova",
    description:
      "Browse our complete collection of 500+ free online tools.",
  },
}

export default function ToolsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          All Tools
        </h1>
        <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
          Browse our complete collection of free online tools. Each tool is designed to be fast,
          secure, and privacy-first.
        </p>
      </div>

      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search tools..."
          className="w-full rounded-xl border border-border bg-card py-3.5 pl-12 pr-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-1 focus:ring-ring"
        />
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        <Link
          href="/tools"
          className="inline-flex items-center rounded-full bg-primary px-4 py-1.5 text-xs font-medium text-white"
        >
          All
        </Link>
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.slug}`}
            className="inline-flex items-center rounded-full border border-border bg-background px-4 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            {category.name}
          </Link>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {tools.map((tool) => {
          const category = categories.find((c) => c.id === tool.category)
          return (
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
              <p className="mb-3 text-xs text-muted-foreground line-clamp-2">
                {tool.description}
              </p>
              <div className="flex items-center gap-2">
                {category && (
                  <span
                    className="text-[10px] font-medium text-muted-foreground"
                  >
                    {category.name}
                  </span>
                )}
                {tool.new && (
                  <Badge variant="accent" size="sm">
                    New
                  </Badge>
                )}
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
