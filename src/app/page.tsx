import Hero from '@/components/sections/Hero'
import BestFitnessCenters from '@/components/sections/BestFitnessCenters'
import CustomerLogos from '@/components/sections/CustomerLogos'
import SegymIntro from '@/components/sections/SegymIntro'
import ProductLineup from '@/components/sections/ProductLineup'
import SegymStrengths from '@/components/sections/SegymStrengths'
import RoboticTraining from '@/components/sections/RoboticTraining'
import AppShowcase from '@/components/sections/AppShowcase'
import PTSales from '@/components/sections/PTSales'
import CustomerStories from '@/components/sections/CustomerStories'
import AmbassadorReason from '@/components/sections/AmbassadorReason'
import TrustHighlights from '@/components/sections/TrustHighlights'
import BenefitsGuide from '@/components/sections/BenefitsGuide'
import CTA from '@/components/sections/CTA'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { UpdateHomePromoBand } from '@/components/update/UpdateHomePromoBand'
import { KO_HEADER_OFFSET_CLASS, UPDATE_2026_PUBLIC_ENABLED } from '@/data/update-2026'

export default function Home() {
  return (
    <main className={`min-h-screen ${KO_HEADER_OFFSET_CLASS}`}>
      <Header />
      <Hero />
      <BestFitnessCenters />
      <SegymIntro />
      <SegymStrengths />
      {UPDATE_2026_PUBLIC_ENABLED ? <UpdateHomePromoBand /> : null}
      <RoboticTraining />
      <AppShowcase />
      <PTSales />
      <CustomerStories />
      <AmbassadorReason />
      <TrustHighlights />
      <BenefitsGuide />
      <CustomerLogos />
      <CTA />
      <ProductLineup />
      <Footer />
    </main>
  )
}
