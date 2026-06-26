import type { Metadata } from "next"
import { Poppins, JetBrains_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { SearchProvider } from "@/components/layout/search-provider"
import "./globals.css"

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
})

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    default: "ToolNova - The Modern Toolkit for Everyone",
    template: "%s | ToolNova",
  },
  description:
    "500+ free online tools for developers, designers, marketers, students, and businesses. JSON formatter, QR generator, password generator, calculators, and more.",
  keywords: [
    "online tools",
    "free tools",
    "developer tools",
    "json formatter",
    "qr generator",
    "password generator",
    "bmi calculator",
    "color picker",
    "text tools",
    "image tools",
    "seo tools",
    "productivity tools",
  ],
  authors: [{ name: "ToolNova" }],
  creator: "ToolNova",
  publisher: "ToolNova",
  metadataBase: new URL("https://toolnova.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://toolnova.app",
    siteName: "ToolNova",
    title: "ToolNova - The Modern Toolkit for Everyone",
    description:
      "500+ free online tools for developers, designers, marketers, students, and businesses. All tools are 100% free, no sign-up required.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ToolNova",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ToolNova - The Modern Toolkit for Everyone",
    description:
      "500+ free online tools for developers, designers, marketers, students, and businesses.",
    images: ["/og-image.png"],
    creator: "@toolnova",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/Gemini_Generated_Image_l8kes8l8kes8l8ke-removebg-preview.png",
    shortcut: "/Gemini_Generated_Image_l8kes8l8kes8l8ke-removebg-preview.png",
    apple: "/Gemini_Generated_Image_l8kes8l8kes8l8ke-removebg-preview.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${poppins.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" href="/Gemini_Generated_Image_l8kes8l8kes8l8ke-removebg-preview.png" sizes="any" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "ToolNova",
              url: "https://toolnova.app",
              description:
                "500+ free online tools for developers, designers, marketers, students, and businesses.",
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: "https://toolnova.app/search?q={search_term_string}",
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col overflow-x-hidden">
          <ThemeProvider>
          <SearchProvider>
            <Navbar />
            <main className="flex-1 pt-16 overflow-x-hidden">{children}</main>
            <Footer />
          </SearchProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
