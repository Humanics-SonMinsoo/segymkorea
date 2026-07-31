import type { Metadata } from 'next'
import Link from 'next/link'
import { OpenInquiryButton } from '@/components/inquiry/OpenInquiryButton'
import { ProductSpecSheet } from '@/components/product/ProductSpecSheet'
import { EN_NAV } from '@/data/en/site'

export const metadata: Metadata = {
  title: 'SEGYM Smith Robot (SR) | Humanics',
  description:
    'SEGYM Smith Robot — AI smart fitness robot with precision digital loading, robotic training, and performance insight from Humanics.',
}

export default function EnProductSmithPage() {
  return (
    <main className="bg-white">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3">Product</p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
          SEGYM Smith Robot (SR)
        </h1>
        <p className="mt-5 text-lg text-gray-600 max-w-2xl leading-relaxed">
          An AI smart fitness robot for full-body training — from squats to lat pulldowns — with precision digital
          loading and real-time performance insight.
        </p>

        <div className="mt-10 rounded-2xl border border-gray-100 overflow-hidden bg-gray-50 shadow-md">
          <div className="aspect-[16/10] bg-gray-200">
            <img src="/images/segym_new.png" alt="SEGYM Smith Robot SR" className="w-full h-full object-cover" />
          </div>
          <div className="p-6 sm:p-8 bg-white border-t border-gray-100">
            <p className="section-body text-gray-600">
              Train safer and smarter without plate changes. SEGYM captures force, speed, and balance while members
              work — so coaches get usable data from every session.
            </p>
          </div>
        </div>

        <section id="specs" className="mt-14 scroll-mt-28">
          <h2 className="section-title text-gray-900 mb-2">Spec sheet</h2>
          <p className="text-sm text-gray-500 mb-6">Technical specifications (same sheet as the Korean product page).</p>
          <ProductSpecSheet />
        </section>

        <div className="mt-12 flex flex-col sm:flex-row gap-3">
          <OpenInquiryButton className="inline-flex justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-dark">
            {EN_NAV.inquire}
          </OpenInquiryButton>
          <Link
            href="/en/product"
            className="inline-flex justify-center rounded-lg border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50"
          >
            Back to products
          </Link>
        </div>
      </section>
    </main>
  )
}
