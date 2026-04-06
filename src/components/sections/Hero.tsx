import { OpenInquiryButton } from '@/components/inquiry/OpenInquiryButton'
import { OpenBrochureButton } from '@/components/brochure/OpenBrochureButton'

export default function Hero() {
  return (
    <section className="relative w-full block mt-0 pt-0 bg-black hero-section">
      {/* Full-width Hero Video */}
      <div className="relative w-full aspect-video bg-black block overflow-hidden">
        <iframe
          src="https://www.youtube.com/embed/QPpL670lsk8?autoplay=1&mute=1&loop=1&playlist=QPpL670lsk8&controls=0&showinfo=0&rel=0"
          title="세짐 소개 영상"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none block align-top"
          style={{ border: 0 }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        {/* 어두운 그라데이션 - 카피, 버튼 가독용 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" aria-hidden />
        {/* Text Overlay - PC만 표시 (영상 중앙) */}
        <div className="hidden lg:flex absolute inset-0 px-4 sm:px-6 lg:px-8 pointer-events-none">
          <div className="max-w-7xl mx-auto w-full h-full flex items-center justify-center pointer-events-auto">
            <div className="flex flex-col items-center text-center gap-8">
              <div>
                <p className="text-lg lg:text-xl xl:text-2xl text-white font-medium mb-3 drop-shadow-lg ko-modal-copy">
                  대한민국 1등 보디빌더 박재훈의 선택
                </p>
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight drop-shadow-2xl ko-modal-copy">
                  AI 스마트 운동로봇{' '}
                  <span
                    className="italic"
                    style={{ fontFamily: 'var(--font-segym)', fontWeight: 'bold' }}
                  >
                    SEGYM
                  </span>
                </h1>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <OpenBrochureButton className="px-8 py-4 bg-white text-gray-900 font-semibold rounded-lg shadow-lg hover:bg-gray-50 transition-all duration-200 hover:shadow-xl hover:scale-105">
                  소개서 받기
                </OpenBrochureButton>
                <OpenInquiryButton className="px-8 py-4 bg-primary text-white font-semibold rounded-lg shadow-lg hover:bg-primary-dark transition-all duration-200 hover:shadow-xl hover:scale-105">
                  도입 문의하기
                </OpenInquiryButton>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 모바일: 이미지 밑에 텍스트 (검정색) */}
      <div className="lg:hidden bg-white px-4 py-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-gray-700 font-medium mb-2 ko-modal-copy">
            대한민국 1등 보디빌더 박재훈의 선택
          </p>
          <h1 className="text-2xl font-bold text-gray-900 leading-tight mb-6 ko-modal-copy">
            AI 스마트 운동로봇{' '}
            <span
              className="italic"
              style={{ fontFamily: 'var(--font-segym)', fontWeight: 'bold' }}
            >
              SEGYM
            </span>
          </h1>
          {/* 모바일 버튼 - 카피 아래 */}
          <div className="flex flex-col gap-3">
            <OpenBrochureButton className="w-full px-6 py-3 bg-white border-2 border-gray-300 text-gray-900 font-semibold rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200">
              소개서 받기
            </OpenBrochureButton>
            <OpenInquiryButton className="w-full px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-all duration-200 shadow-md">
              도입 문의하기
            </OpenInquiryButton>
          </div>
        </div>
      </div>
    </section>
  )
}
