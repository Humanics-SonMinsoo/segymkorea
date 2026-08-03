import { OpenInquiryButton } from '@/components/inquiry/OpenInquiryButton'
import { OpenBrochureButton } from '@/components/brochure/OpenBrochureButton'
import { EN_NAV } from '@/data/en/site'

export function EnCTA() {
  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-primary to-primary-dark text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-white tracking-tight [text-shadow:0_2px_12px_rgba(0,0,0,0.35)]">
          Ready to bring SEGYM to your facility?
        </h2>
        <p className="text-base md:text-lg mb-8 max-w-xl mx-auto leading-relaxed font-medium text-white/90 [text-shadow:0_1px_6px_rgba(0,0,0,0.25)]">
          Request a consultation with our team — discuss specs, installation, and deployment for your gym or studio
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <OpenBrochureButton className="px-8 py-4 bg-white text-primary rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-md">
            {EN_NAV.getBrochure}
          </OpenBrochureButton>
          <OpenInquiryButton className="px-8 py-4 bg-white/15 backdrop-blur-sm border-2 border-white/90 text-white rounded-lg font-semibold hover:bg-white/25 transition-colors">
            {EN_NAV.inquire}
          </OpenInquiryButton>
        </div>
        <p className="mt-8 text-sm text-white/80">
          Or email us at{' '}
          <a href="mailto:contact@humanics.kr" className="font-semibold text-white underline underline-offset-2 hover:text-white">
            contact@humanics.kr
          </a>
        </p>
      </div>
    </section>
  )
}
