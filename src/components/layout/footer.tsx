"use client"

import Link from "next/link"
import Image from "next/image"
import { Heart } from "lucide-react"
import { categories } from "@/data/categories"
import { cn } from "@/lib/utils"
import { getIcon } from "@/lib/icons"

const resourceLinks = [
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
]

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Cookie Policy", href: "/cookies" },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          <div className="space-y-4 sm:col-span-2 lg:col-span-2">
            <Link href="/" className="inline-flex flex-col items-start gap-2">
              <Image
                src="/Gemini_Generated_Image_l8kes8l8kes8l8ke-removebg-preview.png"
                alt="ToolNova"
                width={220}
                height={60}
                className="h-16 w-auto"
              />
              <span className="text-xl font-bold tracking-tight">
                <span className="gradient-text">ToolNova</span>
                <span className="block text-xs font-normal text-muted-foreground mt-0.5">The Modern Toolkit for Everyone</span>
              </span>
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              A premium collection of free online tools for developers, designers, and
              professionals. Fast, secure, and privacy-first.
            </p>

          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold">Tools</h3>
            <ul className="space-y-2">
              {categories.slice(0, 6).map(category => {
                const Icon = getIcon(category.icon)
                return (
                  <li key={category.id}>
                    <Link
                      href={`/categories/${category.slug}`}
                      className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <Icon className="h-3.5 w-3.5 shrink-0 transition-colors group-hover:text-primary" />
                      {category.name}
                    </Link>
                  </li>
                )
              })}
              <li>
                <Link
                  href="/tools"
                  className="text-sm font-medium text-primary transition-colors hover:text-primary/80"
                >
                  View All Tools
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold">Resources</h3>
            <ul className="space-y-2">
              {resourceLinks.map(link => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold">Legal</h3>
            <ul className="space-y-2">
              {legalLinks.map(link => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-border pt-6 text-center sm:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} ToolNova. All rights reserved.
          </p>
          <p className="flex items-center gap-1 text-xs text-muted-foreground">
            Made with <Heart className="h-3 w-3 fill-current text-red-500" /> by{" "}
            <span className="gradient-text font-medium">ToolNova</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
