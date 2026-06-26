"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Icon } from "@/components/ui/icon"
import { cn } from "@/lib/utils"

const faqItems = [
  {
    question: "Is ToolNova really free?",
    answer: "Yes! ToolNova is 100% free. All 500+ tools are available without any payment, subscription, or hidden charges. We believe powerful tools should be accessible to everyone.",
  },
  {
    question: "Do I need to create an account?",
    answer: "No sign-up is required. You can start using any tool instantly without creating an account or providing any personal information.",
  },
  {
    question: "How does ToolNova protect my privacy?",
    answer: "Your privacy is our priority. All tools run entirely in your browser. We never store, upload, or share your data. Files you process stay on your device and are never sent to our servers.",
  },
  {
    question: "Are there any usage limits?",
    answer: "There are no limits. Use any tool as many times as you want. No daily caps, no rate limiting, and no premium tiers — just unlimited access to every tool.",
  },
  {
    question: "Do you have an API or developer tools?",
    answer: "Not yet, but we are exploring developer APIs. In the meantime, you can use our tools directly in your browser or bookmark them for quick access. Stay tuned for updates!",
  },
  {
    question: "How often are new tools added?",
    answer: "We add new tools every week. Follow us on social media or check the homepage regularly to discover the latest additions to our toolkit.",
  },
]

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-16">
      <div className="mx-auto max-w-3xl px-4">
        <div className="mb-10 text-center">
          <h2 className="mb-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="mx-auto max-w-lg text-muted-foreground">
            Everything you need to know about ToolNova.
          </p>
        </div>

        <div className="space-y-3">
          {faqItems.map((item, i) => (
            <div
              key={i}
              className={cn(
                "rounded-xl border border-border/50 overflow-hidden transition-colors",
                "bg-card hover:border-border"
              )}
            >
              <button
                onClick={() => toggleFaq(i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left"
              >
                <span className="text-sm font-medium text-foreground sm:text-base">{item.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="shrink-0 text-muted-foreground"
                >
                  <Icon name="chevron-down" size={18} />
                </motion.div>
              </button>
              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-border/50 px-6 py-4">
                      <p className="text-sm leading-relaxed text-muted-foreground">{item.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqItems.map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: item.answer,
                },
              })),
            }),
          }}
        />
      </div>
    </section>
  )
}
