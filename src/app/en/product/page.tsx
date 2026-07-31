import type { Metadata } from 'next'
import Link from 'next/link'
import { OpenInquiryButton } from '@/components/inquiry/OpenInquiryButton'
import { EN_NAV } from '@/data/en/site'

export const metadata: Metadata = {
  title: 'SEGYM Product — AI Smart Fitness Robot | Humanics',
  description:
    'Discover the SEGYM Smith Robot — precision digital loading, robotic training, and AI-powered insight from Humanics.',
}

export default function EnProductPage() {
  return (
    <main className="bg-white">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3">Product</p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
          SEGYM Smith Robot
        </h1>
        <p className="mt-5 text-lg text-gray-600 max-w-2xl leading-relaxed">
          An AI smart fitness robot that replaces plate changes with precision digital load control —
          capturing force, speed, and balance while members train.
        </p>

        <div className="mt-10 rounded-2xl overflow-hidden border border-gray-200 shadow-lg">
          <img src="/images/segym_new.png" alt="SEGYM Smith Robot" className="w-full h-auto" />
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'Digital load control',
              body: 'Set resistance with a touch — no plates, no interruptions between sets.',
            },
            {
              title: 'Robotic assistance',
              body: 'Adaptive resistance that supports safer, more controlled training and rehab.',
            },
            {
              title: 'Performance data',
              body: 'Automatic session logging and imbalance insight for coaches and members.',
            },
          ].map((card) => (
            <article key={card.title} className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-2">{card.title}</h2>
              <p className="text-gray-600 text-sm leading-relaxed">{card.body}</p>
            </article>
          ))}
        </div>

        <div className="mt-12 flex flex-col sm:flex-row gap-3">
          <OpenInquiryButton className="inline-flex justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-dark">
            {EN_NAV.inquire}
          </OpenInquiryButton>
          <Link
            href="/en/scan-and-score"
            className="inline-flex justify-center rounded-lg border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50"
          >
            Explore Scan &amp; Score
          </Link>
        </div>
      </section>
    </main>
  )
}
