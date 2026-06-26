import { Hero } from "@/components/home/hero"
import { Stats } from "@/components/home/stats"
import { CategoriesSection } from "@/components/home/categories-section"
import { FeaturedTools } from "@/components/home/featured-tools"
import { TrendingTools } from "@/components/home/trending-tools"
import { Benefits } from "@/components/home/benefits"
import { FaqSection } from "@/components/home/faq-section"
import { PopularSearches } from "@/components/home/popular-searches"
import { AdBanner, AdInline, AdPopup } from "@/components/ui/ad"

export default function HomePage() {
  return (
    <>
      <AdPopup />
      <Hero />
      <Stats />
      <AdBanner />
      <CategoriesSection />
      <FeaturedTools />
      <AdInline />
      <TrendingTools />
      <Benefits />
      <PopularSearches />
      <FaqSection />
    </>
  )
}
