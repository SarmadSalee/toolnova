import { BlogPost } from "@/types"

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Ultimate Guide to Online Developer Tools in 2026",
    description:
      "Discover the best free online tools every developer should know about. From JSON formatters to JWT decoders, we cover it all.",
    slug: "ultimate-guide-online-developer-tools-2026",
    category: "Developer",
    author: "ToolNova Team",
    publishedAt: "2026-06-15",
    readingTime: 8,
    tags: ["developer tools", "productivity", "web development"],
    featured: true,
  },
  {
    id: "2",
    title: "How to Generate Secure Passwords That Are Actually Safe",
    description:
      "Learn the science behind password generation and how to create unbreakable passwords for your accounts.",
    slug: "generate-secure-passwords-actually-safe",
    category: "Security",
    author: "ToolNova Team",
    publishedAt: "2026-06-10",
    readingTime: 5,
    tags: ["password", "security", "privacy"],
  },
  {
    id: "3",
    title: "JSON Formatting Best Practices for Cleaner Code",
    description:
      "Master JSON formatting with our comprehensive guide. Learn about proper indentation, validation, and structure.",
    slug: "json-formatting-best-practices",
    category: "Developer",
    author: "ToolNova Team",
    publishedAt: "2026-06-05",
    readingTime: 6,
    tags: ["json", "formatting", "best practices"],
    featured: true,
  },
  {
    id: "4",
    title: "Understanding BMI: What Your Numbers Really Mean",
    description:
      "A complete guide to understanding Body Mass Index, its limitations, and what it means for your health.",
    slug: "understanding-bmi-what-numbers-mean",
    category: "Health",
    author: "ToolNova Team",
    publishedAt: "2026-05-28",
    readingTime: 7,
    tags: ["bmi", "health", "fitness"],
  },
  {
    id: "5",
    title: "QR Codes in 2026: New Uses and Best Practices",
    description:
      "QR codes are more relevant than ever. Learn about modern use cases and how to create professional QR codes.",
    slug: "qr-codes-2026-new-uses-best-practices",
    category: "Technology",
    author: "ToolNova Team",
    publishedAt: "2026-05-20",
    readingTime: 6,
    tags: ["qr codes", "technology", "marketing"],
    featured: true,
  },
  {
    id: "6",
    title: "Color Theory for Non-Designers: A Practical Guide",
    description:
      "Learn the basics of color theory and how to use our color picker and gradient generator to create stunning designs.",
    slug: "color-theory-non-designers-practical-guide",
    category: "Design",
    author: "ToolNova Team",
    publishedAt: "2026-05-15",
    readingTime: 9,
    tags: ["color theory", "design", "gradients"],
  },
]

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug)
}

export function getRelatedPosts(currentSlug: string, limit = 3) {
  const current = getBlogPostBySlug(currentSlug)
  if (!current) return blogPosts.slice(0, limit)
  return blogPosts
    .filter((p) => p.slug !== currentSlug && p.category === current.category)
    .slice(0, limit)
}

export function getFeaturedPosts() {
  return blogPosts.filter((p) => p.featured)
}
