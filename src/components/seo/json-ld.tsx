import Script from "next/script"
import type { BreadcrumbItem, FaqItem } from "@/types"

interface WebSiteSchema {
  type: "WebSite"
  name: string
  description: string
  url: string
}

interface BreadcrumbListSchema {
  type: "BreadcrumbList"
  items: BreadcrumbItem[]
}

interface FAQPageSchema {
  type: "FAQPage"
  items: FaqItem[]
}

interface OrganizationSchema {
  type: "Organization"
  name: string
  url: string
  logo?: string
  description?: string
}

type JsonLdProps = WebSiteSchema | BreadcrumbListSchema | FAQPageSchema | OrganizationSchema

function buildSchema(props: JsonLdProps) {
  switch (props.type) {
    case "WebSite":
      return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: props.name,
        description: props.description,
        url: props.url,
      }

    case "BreadcrumbList":
      return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: props.items.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.label,
          ...(item.href ? { item: item.href } : {}),
        })),
      }

    case "FAQPage":
      return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: props.items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      }

    case "Organization":
      return {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: props.name,
        url: props.url,
        ...(props.logo ? { logo: props.logo } : {}),
        ...(props.description ? { description: props.description } : {}),
      }
  }
}

export function JsonLd(props: JsonLdProps) {
  const schema = buildSchema(props)

  return (
    <Script
      id={`json-ld-${props.type.toLowerCase()}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
