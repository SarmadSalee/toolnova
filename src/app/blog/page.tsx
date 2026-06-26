import type { Metadata } from "next"
import Link from "next/link"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import { blogPosts } from "@/data/blog"
import Badge from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Blog",
  description: "Articles, guides, and tutorials about online tools, productivity, and more.",
}

export default function BlogPage() {
  const featured = blogPosts.filter((p) => p.featured)
  const recent = blogPosts.filter((p) => !p.featured)

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Blog
        </h1>
        <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
          Articles, guides, and tutorials to help you get the most out of online tools.
        </p>
      </div>

      {featured.length > 0 && (
        <div className="mb-12">
          <h2 className="mb-6 text-xl font-semibold text-foreground">Featured</h2>
          <div className="grid gap-6 lg:grid-cols-2">
            {featured.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className={cn(
                  "group relative overflow-hidden rounded-2xl border border-border bg-card p-6 sm:p-8",
                  "transition-all duration-200 hover:shadow-elevated hover:-translate-y-0.5"
                )}
              >
                <div className="mb-3 flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="size-3.5" />
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="size-3.5" />
                    {post.readingTime} min read
                  </span>
                </div>
                <h3 className="mb-2 text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
                  {post.description}
                </p>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" size="sm">{post.category}</Badge>
                  <span className="flex items-center gap-1 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    Read more <ArrowRight className="size-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div>
        <h2 className="mb-6 text-xl font-semibold text-foreground">Recent Articles</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recent.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className={cn(
                "group rounded-xl border border-border bg-card p-5",
                "transition-all duration-200 hover:shadow-elevated hover:-translate-y-0.5"
              )}
            >
              <div className="mb-3 flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="size-3" />
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="size-3" />
                  {post.readingTime} min
                </span>
              </div>
              <h3 className="mb-2 text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                {post.title}
              </h3>
              <p className="mb-3 text-sm text-muted-foreground line-clamp-2">
                {post.description}
              </p>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" size="sm">{post.category}</Badge>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
