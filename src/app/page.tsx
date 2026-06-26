import { Hero } from "@/components/home/hero"
import { Stats } from "@/components/home/stats"
import { CategoriesSection } from "@/components/home/categories-section"
import { FeaturedTools } from "@/components/home/featured-tools"
import { TrendingTools } from "@/components/home/trending-tools"
import { Benefits } from "@/components/home/benefits"
import { FaqSection } from "@/components/home/faq-section"
import { Newsletter } from "@/components/home/newsletter"
import { PopularSearches } from "@/components/home/popular-searches"

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <CategoriesSection />
      <FeaturedTools />
      <TrendingTools />
      <Benefits />
      <PopularSearches />
      <FaqSection />
      <Newsletter />
    </>
  )
}
