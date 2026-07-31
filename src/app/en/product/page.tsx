import type { Metadata } from 'next'
import Link from 'next/link'
import { OpenInquiryButton } from '@/components/inquiry/OpenInquiryButton'
import { ProductComingSoonCard } from '@/components/product/ProductComingSoonCard'
import { EN_NAV } from '@/data/en/site'

export const metadata: Metadata = {
  title: 'SEGYM Product Lineup | Humanics',
  description:
    'Explore the SEGYM Smith Robot and upcoming cardio robot from Humanics — AI smart fitness robotics for gyms and PT studios.',
}

export default function EnProductIndexPage() {
  return (
    <main className="bg-white">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3">Product</p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
          SEGYM product lineup
        </h1>
        <p className="mt-5 text-lg text-gray-600 max-w-2xl leading-relaxed">
          AI smart fitness robots from Humanics — built for premium gyms, PT studios, and rehab facilities.
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl">
          <Link
            href="/en/product/smith"
            className="group block bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-gray-100"
          >
            <div className="aspect-[4/3] bg-gray-100 overflow-hidden">
              <img
                src="/images/segym_new.png"
                alt="SEGYM Smith Robot SR"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </div>
            <div className="p-5">
              <span className="section-caption font-medium text-primary uppercase tracking-wide">SEGYM</span>
              <h2 className="card-title font-bold mt-1 group-hover:text-primary transition-colors">
                Smith Robot (SR)
              </h2>
              <p className="section-body text-sm md:text-base mt-2">
                Full-body AI smart fitness robot. Squats to lat pulldowns — one machine.
              </p>
            </div>
          </Link>
          <ProductComingSoonCard layout="landing" locale="en" />
        </div>

        <div className="mt-12">
          <OpenInquiryButton className="inline-flex justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-dark">
            {EN_NAV.inquire}
          </OpenInquiryButton>
        </div>
      </section>
    </main>
  )
}
