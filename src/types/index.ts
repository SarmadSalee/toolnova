export interface Tool {
  id: string
  name: string
  description: string
  category: ToolCategory
  icon: string
  path: string
  featured?: boolean
  trending?: boolean
  new?: boolean
  popularity?: number
  tags: string[]
  publishedAt: string
}

export type ToolCategory =
  | "developer"
  | "text"
  | "image"
  | "pdf"
  | "color"
  | "seo"
  | "json"
  | "business"
  | "finance"
  | "calculator"
  | "qr"
  | "converter"
  | "generator"
  | "ai"
  | "utility"

export interface Category {
  id: ToolCategory
  name: string
  description: string
  icon: string
  color: string
  gradient: string
  tools: number
  slug: string
}

export interface SeoProps {
  title: string
  description: string
  canonical?: string
  ogImage?: string
  ogType?: string
  publishedAt?: string
  updatedAt?: string
  author?: string
  tags?: string[]
  breadcrumbItems?: BreadcrumbItem[]
  faqItems?: FaqItem[]
}

export interface BreadcrumbItem {
  label: string
  href?: string
}

export interface FaqItem {
  question: string
  answer: string
}

export interface BlogPost {
  id: string
  title: string
  description: string
  slug: string
  category: string
  author: string
  publishedAt: string
  readingTime: number
  tags: string[]
  featured?: boolean
}

export interface Testimonial {
  name: string
  role: string
  content: string
  avatar?: string
}

export interface Stat {
  value: string
  label: string
  suffix?: string
}

export interface NavigationLink {
  label: string
  href: string
  icon?: string
  children?: NavigationLink[]
}
