import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { tools, getToolById } from "@/data/tools"
import { getCategoryById } from "@/data/categories"
import ToolLayout from "@/components/tools/tool-layout"
import ToolWrapper from "@/components/tools/tool-wrapper"
import JsonFormatter from "@/components/tools/json-formatter"
import UuidGenerator from "@/components/tools/uuid-generator"
import QrGenerator from "@/components/tools/qr-generator"
import WordCounter from "@/components/tools/word-counter"
import CaseConverter from "@/components/tools/case-converter"
import SlugGenerator from "@/components/tools/slug-generator"
import ImageCompressor from "@/components/tools/image-compressor"
import ImageResizer from "@/components/tools/image-resizer"
import ColorPicker from "@/components/tools/color-picker"
import GradientGenerator from "@/components/tools/gradient-generator"
import PasswordGenerator from "@/components/tools/password-generator"
import InvoiceGenerator from "@/components/tools/invoice-generator"
import EmiCalculator from "@/components/tools/emi-calculator"
import AgeCalculator from "@/components/tools/age-calculator"
import BmiCalculator from "@/components/tools/bmi-calculator"
import PercentageCalculator from "@/components/tools/percentage-calculator"
import Base64Encoder from "@/components/tools/base64-encoder"
import TimestampConverter from "@/components/tools/timestamp-converter"
import JwtDecoder from "@/components/tools/jwt-decoder"
import RegexTester from "@/components/tools/regex-tester"

const toolComponents: Record<string, React.ComponentType> = {
  "json-formatter": JsonFormatter,
  "uuid-generator": UuidGenerator,
  "qr-generator": QrGenerator,
  "word-counter": WordCounter,
  "case-converter": CaseConverter,
  "slug-generator": SlugGenerator,
  "image-compressor": ImageCompressor,
  "image-resizer": ImageResizer,
  "color-picker": ColorPicker,
  "gradient-generator": GradientGenerator,
  "password-generator": PasswordGenerator,
  "invoice-generator": InvoiceGenerator,
  "emi-calculator": EmiCalculator,
  "age-calculator": AgeCalculator,
  "bmi-calculator": BmiCalculator,
  "percentage-calculator": PercentageCalculator,
  "base64-encoder": Base64Encoder,
  "timestamp-converter": TimestampConverter,
  "jwt-decoder": JwtDecoder,
  "regex-tester": RegexTester,
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.id }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const tool = getToolById(slug)
  if (!tool) return {}

  const category = getCategoryById(tool.category)

  return {
    title: `${tool.name} - Free Online Tool`,
    description: tool.description,
    openGraph: {
      title: `${tool.name} - Free Online Tool`,
      description: tool.description,
      type: "website",
      url: `https://paperhouse.com${tool.path}`,
      siteName: "PaperHouse Tools",
    },
    twitter: {
      card: "summary_large_image",
      title: `${tool.name} - Free Online Tool`,
      description: tool.description,
    },
    alternates: {
      canonical: `https://paperhouse.com${tool.path}`,
    },
  }
}

export default async function ToolPage({ params }: PageProps) {
  const { slug } = await params
  const tool = getToolById(slug)
  if (!tool) notFound()

  const Component = toolComponents[slug]
  if (!Component) notFound()

  const category = getCategoryById(tool.category)

  const breadcrumbItems = [
    { label: "Tools", href: "/tools" },
    ...(category ? [{ label: category.name, href: `/categories/${category.slug}` }] : []),
    { label: tool.name },
  ]

  const sameCategoryToolIds = tools
    .filter((t) => t.category === tool.category && t.id !== tool.id)
    .slice(0, 4)
    .map((t) => t.id)

  const faqItems = [
    {
      question: `What is ${tool.name}?`,
      answer: `${tool.name} is a free online tool that helps you ${tool.description.toLowerCase()} It's completely free to use with no registration required.`,
    },
    {
      question: `How does ${tool.name} work?`,
      answer: `Simply enter your input in the provided field and the tool processes it instantly in your browser. Your data is never sent to any server - everything is processed locally for maximum privacy and speed.`,
    },
    {
      question: `Is ${tool.name} free to use?`,
      answer: `Yes, ${tool.name} is completely free to use. There are no hidden charges, premium tiers, or usage limits.`,
    },
    {
      question: `Is my data safe when using ${tool.name}?`,
      answer: `Absolutely. All processing happens directly in your browser using client-side JavaScript. Your data never leaves your device, ensuring complete privacy and security.`,
    },
  ]

  return (
    <ToolWrapper>
      <ToolLayout
        title={tool.name}
        description={tool.description}
        breadcrumbItems={breadcrumbItems}
        faqItems={faqItems}
        relatedTools={sameCategoryToolIds}
        publishedAt={tool.publishedAt}
        tags={tool.tags}
      >
        <Component />
      </ToolLayout>
    </ToolWrapper>
  )
}
