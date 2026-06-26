import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Calendar, Clock, ArrowLeft, ChevronRight } from "lucide-react"
import { blogPosts, getBlogPostBySlug, getRelatedPosts } from "@/data/blog"
import Badge from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)
  if (!post) return {}

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author],
      tags: post.tags,
    },
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)
  if (!post) notFound()

  const relatedPosts = getRelatedPosts(slug)

  const sections = [
    {
      title: "Introduction",
      content: `Welcome to ToolNova's blog. In this article, we explore "${post.title}". Whether you're a developer, designer, or just someone looking to improve your workflow, this guide will provide valuable insights and practical tips.`,
    },
    {
      title: "Why This Matters",
      content: `Understanding ${post.category.toLowerCase()} concepts is more important than ever in 2026. With the rapid evolution of technology, having the right knowledge and tools can significantly impact your productivity and results.`,
    },
    {
      title: "Getting Started",
      content: `To get the most out of this guide, we recommend having your browser ready to try out the tools and techniques we discuss. ToolNova offers a comprehensive suite of free online tools that complement the topics covered in this article.`,
    },
    {
      title: "Key Takeaways",
      content: `After reading this article, you'll have a solid understanding of the subject matter and be equipped with practical knowledge you can apply immediately. Don't forget to explore our related tools to enhance your experience.`,
    },
    {
      title: "Conclusion",
      content: `We hope this guide has been helpful. Stay tuned for more articles covering a wide range of topics related to online tools, productivity, and technology. If you found this useful, consider sharing it with others who might benefit.`,
    },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.description,
            author: { "@type": "Person", name: post.author },
            datePublished: post.publishedAt,
            dateModified: post.publishedAt,
            publisher: { "@type": "Organization", name: "ToolNova" },
          }),
        }}
      />

      <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to Blog
        </Link>

        <header className="mb-10">
          <div className="mb-4 flex items-center gap-3">
            <Badge variant="secondary" size="sm">{post.category}</Badge>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="size-3.5" />
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="size-3.5" />
              {post.readingTime} min read
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">{post.description}</p>
          <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
            <span>By {post.author}</span>
          </div>
        </header>

        <div className="mb-10">
          <nav className="rounded-xl border border-border bg-card p-4 sm:p-5">
            <h2 className="mb-3 text-sm font-semibold text-foreground">Table of Contents</h2>
            <ol className="space-y-2">
              {sections.map((section, index) => (
                <li key={index}>
                  <a
                    href={`#section-${index}`}
                    className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground min-h-[44px]"
                  >
                    <ChevronRight className="size-3 shrink-0" />
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>

        <div className="prose prose-zinc dark:prose-invert max-w-none">
          {sections.map((section, index) => (
            <section key={index} id={`section-${index}`} className="mb-8">
              <h2 className="text-xl font-bold text-foreground mb-4 sm:text-2xl">{section.title}</h2>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">{section.content}</p>
              {index === 0 && (
                <div className="mt-6 rounded-xl border border-border bg-card p-6">
                  <h3 className="text-sm font-semibold text-foreground mb-3">Related Tools</h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="primary" size="sm">{tag}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </section>
          ))}
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary" size="sm">{tag}</Badge>
            ))}
          </div>
        </div>

        {relatedPosts.length > 0 && (
          <div className="mt-12 border-t border-border pt-8">
            <h2 className="mb-6 text-xl font-semibold text-foreground">Related Articles</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((related) => (
                <Link
                  key={related.id}
                  href={`/blog/${related.slug}`}
                  className={cn(
                    "group rounded-xl border border-border bg-card p-4",
                    "transition-all duration-200 hover:shadow-elevated hover:-translate-y-0.5"
                  )}
                >
                  <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                    {related.title}
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                    {related.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </>
  )
}
