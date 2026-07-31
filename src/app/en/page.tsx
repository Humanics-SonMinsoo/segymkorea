import { EnHero } from '@/components/en/sections/EnHero'
import { EnBestFitnessCenters } from '@/components/en/sections/EnBestFitnessCenters'
import { EnSegymIntro } from '@/components/en/sections/EnSegymIntro'
import { EnSegymStrengths } from '@/components/en/sections/EnSegymStrengths'
import { EnRoboticTraining } from '@/components/en/sections/EnRoboticTraining'
import { EnAppShowcase } from '@/components/en/sections/EnAppShowcase'
import { EnTrustHighlights } from '@/components/en/sections/EnTrustHighlights'
import { EnScanScoreTeaser } from '@/components/en/sections/EnScanScoreTeaser'
import { EnCTA } from '@/components/en/sections/EnCTA'
import { EnScanScoreBanner } from '@/components/en/EnScanScoreBanner'
import { EnHumanicsIntro } from '@/components/en/sections/EnHumanicsIntro'

export default function EnHomePage() {
  return (
    <main>
      <EnHumanicsIntro />
      <EnHero />
      <EnBestFitnessCenters />
      <EnSegymIntro />
      <EnSegymStrengths />
      <EnRoboticTraining />
      <EnAppShowcase />
      <EnTrustHighlights />
      <EnScanScoreTeaser />
      <EnCTA />
      <EnScanScoreBanner />
    </main>
  )
}
