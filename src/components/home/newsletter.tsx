"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Icon } from "@/components/ui/icon"
import { cn } from "@/lib/utils"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setEmail("")
    }
  }

  return (
    <section className="py-16">
      <div className="mx-auto max-w-3xl px-4">
        <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 p-8 sm:p-12">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-accent/10 blur-3xl" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="mx-auto max-w-lg text-center">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary shadow-sm">
                <Icon name="mail" className="text-white" size={22} />
              </div>
              <h2 className="mb-2 text-2xl font-bold tracking-tight sm:text-3xl">Stay Updated</h2>
              <p className="mb-6 text-sm text-muted-foreground">
                Get notified when we add new tools and features. No spam, unsubscribe anytime.
              </p>

              {submitted ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex items-center justify-center gap-2 text-sm font-medium text-success"
                >
                  <Icon name="check" size={18} />
                  <span>Thanks for subscribing!</span>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className={cn(
                      "h-11 w-full rounded-xl border border-border bg-card px-4 text-sm text-foreground outline-none transition-colors",
                      "placeholder:text-muted-foreground focus:border-primary sm:w-72"
                    )}
                  />
                  <button
                    type="submit"
                    className="gradient-primary h-11 rounded-xl px-6 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
