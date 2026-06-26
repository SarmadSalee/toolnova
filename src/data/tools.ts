import { Tool } from "@/types"

export const tools: Tool[] = [
  {
    id: "json-formatter",
    name: "JSON Formatter",
    description: "Format, validate, and beautify JSON data with syntax highlighting and tree view.",
    category: "json",
    icon: "braces",
    path: "/tools/json-formatter",
    featured: true,
    trending: true,
    tags: ["json", "formatter", "beautify", "validate", "prettify"],
    publishedAt: "2026-01-01",
  },
  {
    id: "uuid-generator",
    name: "UUID Generator",
    description: "Generate random UUIDs (v4) instantly. Copy with one click.",
    category: "developer",
    icon: "key",
    path: "/tools/uuid-generator",
    featured: true,
    tags: ["uuid", "guid", "generator", "random", "id"],
    publishedAt: "2026-01-01",
  },
  {
    id: "qr-generator",
    name: "QR Generator",
    description: "Create custom QR codes with colors, logos, and sizes. Download as PNG or SVG.",
    category: "qr",
    icon: "qr-code",
    path: "/tools/qr-generator",
    featured: true,
    trending: true,
    tags: ["qr", "code", "generator", "barcode", "scan"],
    publishedAt: "2026-01-01",
  },
  {
    id: "word-counter",
    name: "Word Counter",
    description: "Count words, characters, sentences, and paragraphs with real-time statistics.",
    category: "text",
    icon: "type",
    path: "/tools/word-counter",
    featured: true,
    tags: ["words", "counter", "characters", "sentences", "text"],
    publishedAt: "2026-01-01",
  },
  {
    id: "case-converter",
    name: "Case Converter",
    description: "Convert text between camelCase, snake_case, kebab-case, PascalCase, and more.",
    category: "text",
    icon: "case-sensitive",
    path: "/tools/case-converter",
    trending: true,
    tags: ["case", "converter", "camel", "snake", "kebab", "pascal"],
    publishedAt: "2026-01-01",
  },
  {
    id: "slug-generator",
    name: "Slug Generator",
    description: "Generate URL-friendly slugs from any text. Perfect for SEO-friendly URLs.",
    category: "seo",
    icon: "link",
    path: "/tools/slug-generator",
    tags: ["slug", "url", "seo", "generator", "permalink"],
    publishedAt: "2026-01-01",
  },
  {
    id: "image-compressor",
    name: "Image Compressor",
    description: "Compress images without losing quality. Supports JPEG, PNG, WebP, and AVIF.",
    category: "image",
    icon: "image",
    path: "/tools/image-compressor",
    featured: true,
    trending: true,
    tags: ["image", "compress", "optimize", "reduce", "size"],
    publishedAt: "2026-01-01",
  },
  {
    id: "image-resizer",
    name: "Image Resizer",
    description: "Resize images to exact dimensions. Maintain aspect ratio or crop to fit.",
    category: "image",
    icon: "crop",
    path: "/tools/image-resizer",
    tags: ["image", "resize", "dimensions", "crop", "scale"],
    publishedAt: "2026-01-01",
  },
  {
    id: "color-picker",
    name: "Color Picker",
    description: "Pick colors from anywhere. Get HEX, RGB, HSL, and OKLCH values instantly.",
    category: "color",
    icon: "palette",
    path: "/tools/color-picker",
    featured: true,
    tags: ["color", "picker", "hex", "rgb", "hsl", "palette"],
    publishedAt: "2026-01-01",
  },
  {
    id: "gradient-generator",
    name: "Gradient Generator",
    description: "Create beautiful CSS gradients with multiple color stops and angle controls.",
    category: "color",
    icon: "gradient",
    path: "/tools/gradient-generator",
    tags: ["gradient", "css", "color", "generator", "design"],
    publishedAt: "2026-01-01",
  },
  {
    id: "password-generator",
    name: "Password Generator",
    description: "Generate strong, secure passwords with customizable options and strength meter.",
    category: "generator",
    icon: "lock",
    path: "/tools/password-generator",
    featured: true,
    trending: true,
    tags: ["password", "security", "generator", "strong", "random"],
    publishedAt: "2026-01-01",
  },
  {
    id: "invoice-generator",
    name: "Invoice Generator",
    description: "Create professional invoices with customizable fields. Download as PDF.",
    category: "business",
    icon: "file-text",
    path: "/tools/invoice-generator",
    tags: ["invoice", "business", "pdf", "generator", "billing"],
    publishedAt: "2026-01-01",
  },
  {
    id: "emi-calculator",
    name: "EMI Calculator",
    description: "Calculate monthly EMI, total interest, and payment schedule for loans.",
    category: "finance",
    icon: "calculator",
    path: "/tools/emi-calculator",
    tags: ["emi", "loan", "calculator", "interest", "finance"],
    publishedAt: "2026-01-01",
  },
  {
    id: "age-calculator",
    name: "Age Calculator",
    description: "Calculate exact age in years, months, days, hours, minutes, and seconds.",
    category: "calculator",
    icon: "calendar",
    path: "/tools/age-calculator",
    tags: ["age", "calculator", "birthday", "date", "time"],
    publishedAt: "2026-01-01",
  },
  {
    id: "bmi-calculator",
    name: "BMI Calculator",
    description: "Calculate your Body Mass Index and get health category insights.",
    category: "calculator",
    icon: "activity",
    path: "/tools/bmi-calculator",
    tags: ["bmi", "health", "calculator", "weight", "fitness"],
    publishedAt: "2026-01-01",
  },
  {
    id: "percentage-calculator",
    name: "Percentage Calculator",
    description: "Calculate percentages, discounts, tips, and ratios with ease.",
    category: "calculator",
    icon: "percent",
    path: "/tools/percentage-calculator",
    tags: ["percentage", "calculator", "discount", "ratio", "math"],
    publishedAt: "2026-01-01",
  },
  {
    id: "base64-encoder",
    name: "Base64 Encoder",
    description: "Encode and decode text or files to and from Base64 format instantly.",
    category: "developer",
    icon: "binary",
    path: "/tools/base64-encoder",
    tags: ["base64", "encode", "decode", "binary", "text"],
    publishedAt: "2026-01-01",
  },
  {
    id: "timestamp-converter",
    name: "Timestamp Converter",
    description: "Convert Unix timestamps to readable dates and vice versa in multiple formats.",
    category: "developer",
    icon: "clock",
    path: "/tools/timestamp-converter",
    tags: ["timestamp", "unix", "date", "converter", "time"],
    publishedAt: "2026-01-01",
  },
  {
    id: "jwt-decoder",
    name: "JWT Decoder",
    description: "Decode and inspect JSON Web Tokens. View header, payload, and signature.",
    category: "developer",
    icon: "shield",
    path: "/tools/jwt-decoder",
    tags: ["jwt", "token", "decode", "json", "auth"],
    publishedAt: "2026-01-01",
  },
  {
    id: "regex-tester",
    name: "Regex Tester",
    description: "Test and debug regular expressions with real-time matching and explanation.",
    category: "developer",
    icon: "search-code",
    path: "/tools/regex-tester",
    tags: ["regex", "regular expression", "tester", "pattern", "match"],
    publishedAt: "2026-01-01",
  },
]

export const featuredTools = tools.filter(t => t.featured)
export const trendingTools = tools.filter(t => t.trending)
export const newTools = tools.filter(t => t.new)

export function getToolById(id: string) {
  return tools.find(t => t.id === id)
}

export function getToolByPath(path: string) {
  return tools.find(t => t.path === path)
}

export function getToolsByCategory(category: string) {
  return tools.filter(t => t.category === category)
}

export function searchTools(query: string) {
  const q = query.toLowerCase()
  return tools.filter(
    t =>
      t.name.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.tags.some(tag => tag.toLowerCase().includes(q))
  )
}
