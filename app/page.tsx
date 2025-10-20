import { HeroSection } from "@/components/hero-section"
import { FeaturesOverview } from "@/components/features-overview"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-background/95">
      <HeroSection />
      <FeaturesOverview />
      <Footer />
    </main>
  )
}
