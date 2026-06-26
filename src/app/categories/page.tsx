import type { Metadata } from "next"
import Link from "next/link"
import { categories } from "@/data/categories"
import { tools } from "@/data/tools"
import { Icon } from "@/components/ui/icon"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Categories",
  description: "Explore all tool categories. Find the right tools for your needs.",
}

export default function CategoriesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Categories
        </h1>
        <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
          Browse tools by category to find exactly what you need.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => {
          const toolCount = tools.filter((t) => t.category === category.id).length
          return (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className={cn(
                "group relative overflow-hidden rounded-2xl border border-border bg-card p-6",
                "transition-all duration-200 hover:shadow-elevated hover:-translate-y-1"
              )}
            >
              <div
                className={cn(
                  "mb-4 inline-flex size-12 items-center justify-center rounded-xl bg-gradient-to-br text-white",
                  category.gradient
                )}
              >
                <Icon name={category.icon} size={22} />
              </div>
              <h3 className="mb-1 text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                {category.name}
              </h3>
              <p className="mb-3 text-sm text-muted-foreground line-clamp-2">
                {category.description}
              </p>
              <span className="text-xs font-medium text-primary">
                {toolCount} {toolCount === 1 ? "tool" : "tools"}
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
