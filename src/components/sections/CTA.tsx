import { OpenInquiryButton } from '@/components/inquiry/OpenInquiryButton'
import { OpenBrochureButton } from '@/components/brochure/OpenBrochureButton'

export default function CTA() {
  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-primary to-primary-dark text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* section-title/section-subtitle은 text-gray-*라 보라 배경과 겹침 → CTA 전용 색상 */}
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-white tracking-tight [text-shadow:0_2px_12px_rgba(0,0,0,0.35)]">
          세짐을 직접 체험해보세요
        </h2>
        <p className="text-base md:text-lg mb-8 max-w-xl mx-auto leading-relaxed font-medium text-white/90 [text-shadow:0_1px_6px_rgba(0,0,0,0.25)]">
          전국 체험 센터에서 담당자와 함께 직접 체험하고 도입 상담도 받아보세요
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <OpenBrochureButton className="px-8 py-4 bg-white text-primary rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-md">
            소개서 받기
          </OpenBrochureButton>
          <OpenInquiryButton className="px-8 py-4 bg-white/15 backdrop-blur-sm border-2 border-white/90 text-white rounded-lg font-semibold hover:bg-white/25 transition-colors [text-shadow:0_1px_2px_rgba(0,0,0,0.2)]">
            도입 문의하기
          </OpenInquiryButton>
        </div>
      </div>
    </section>
  )
}
