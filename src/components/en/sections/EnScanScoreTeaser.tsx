import Link from 'next/link'
import { OpenInquiryButton } from '@/components/inquiry/OpenInquiryButton'
import { EN_NAV } from '@/data/en/site'

export function EnScanScoreTeaser() {
  return (
    <section className="relative overflow-hidden bg-neutral-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/30 via-neutral-950 to-neutral-950" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary-light mb-4">Coming soon</p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight max-w-3xl leading-tight">
          SEGYM Scan &amp; Score
        </h2>
        <p className="mt-5 text-base sm:text-lg text-neutral-300 max-w-2xl leading-relaxed">
          Measure body performance through guided tests — force, speed, range of motion, and balance — then see the
          result as a clear score with supporting stats.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Link
            href="/en/scan-and-score"
            className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-sm font-semibold text-neutral-950 hover:bg-neutral-100 transition-colors"
          >
            Explore the experience
          </Link>
          <OpenInquiryButton className="inline-flex items-center justify-center rounded-lg border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors">
            {EN_NAV.inquire}
          </OpenInquiryButton>
        </div>
      </div>
    </section>
  )
}
