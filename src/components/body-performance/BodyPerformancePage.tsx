import { OpenInquiryButton } from '@/components/inquiry/OpenInquiryButton'
import { ZoomableImage } from '@/components/body-performance/ZoomableImage'
import { BODY_PERFORMANCE_IMAGES } from '@/data/body-performance'

const STEPS = [
  {
    step: '01',
    title: '측정 선택',
    body: '빠른 측정으로 좌우 균형을 확인하거나, 정밀 측정으로 다리, 가슴, 등, 어깨, 팔 중 원하는 부위의 수행능력을 확인해요.',
    image: BODY_PERFORMANCE_IMAGES.stepSelect,
    alt: '체성능 측정 선택 화면. 빠른 측정과 정밀 측정, 다리, 가슴, 등, 어깨, 팔 부위 선택',
  },
  {
    step: '02',
    title: '운동 준비',
    body: '벤치프레스 정밀 측정 예시에서는 가벼운 무게로 5회, 더 무거운 무게로 5회를 진행해요.',
    image: BODY_PERFORMANCE_IMAGES.stepPrep,
    alt: '벤치프레스 측정 준비 화면. 1세트 가벼운 무게 5회, 2세트 무거운 무게 5회',
  },
  {
    step: '03',
    title: '측정 진행',
    body: '화면이 세트별 동작과 횟수를 안내해요. 운동 중에는 반복 횟수와 바 기울기를 확인할 수 있어요.',
    image: BODY_PERFORMANCE_IMAGES.stepLive,
    alt: '벤치프레스 1세트 측정 진행 화면. 빠르게 5번과 바 기울기',
  },
] as const

const USES = [
  {
    emoji: '👋',
    title: '신규 회원 OT',
    body: '첫 방문에 체성분과 함께 운동 수행능력까지 보여 주세요. 다른 센터와 다른 첫 상담으로, 등록까지 더 설득력 있게 이어갈 수 있어요.',
  },
  {
    emoji: '💬',
    title: '회원 관리와 PT 영업',
    body: '기존 회원의 좌우 차이와 가동범위를 같이 보고 다음 수업을 제안해 보세요. 운동 관리가 구체적이면 PT 상담과 연장으로도 자연스럽게 이어져요.',
  },
  {
    emoji: '🏆',
    title: '센터 챌린지',
    body: '친구와 점수를 겨루거나 지난 기록에 다시 도전하는 이벤트를 열어 보세요. 기존 회원이 다시 찾는 이유가 되고, 센터 만족도도 함께 올라가요.',
  },
] as const

const METRICS = [
  { emoji: '💪', title: '힘', body: '얼마나 강하게 밀어 올리는가?' },
  { emoji: '⚡', title: '속도', body: '얼마나 빠르게 움직이는가?' },
  { emoji: '🔄', title: '가동범위', body: '동작을 어디까지 사용하는가?' },
  { emoji: '⚖️', title: '밸런스', body: '좌우가 얼마나 고르게 힘을 쓰는가?' },
] as const

function PhoneFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="mx-auto w-full max-w-[280px] overflow-hidden rounded-[1.75rem] border border-gray-200 bg-white shadow-sm">
      <img src={src} alt={alt} className="w-full h-auto block" />
    </div>
  )
}

export function BodyPerformancePage() {
  return (
    <div className="bg-white text-gray-900">
      <section className="bg-gradient-to-b from-primary-muted to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-12 sm:pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-primary mb-4 ko-modal-copy">세짐 체성능 측정</p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.4] text-gray-900 ko-modal-copy">
                회원들의 운동 수행능력을
                <br />
                데이터로 관리해 보세요
              </h1>
              <p className="mt-6 text-base sm:text-lg text-gray-700 leading-relaxed ko-modal-copy">
                <span className="font-semibold text-gray-900">우리 몸의 운동 수행능력을 측정할 수 있는 기능!</span>
                <br />
                세짐에서 새롭게 업데이트된 체성능 측정 기능을 소개합니다.
              </p>
            </div>
            <figure className="min-w-0">
              <img
                src={BODY_PERFORMANCE_IMAGES.scoreCard}
                alt="체성능 점수 예시. 어깨 세짐 점수 742점"
                className="w-full h-auto rounded-3xl"
              />
              <figcaption className="mt-4 text-sm text-gray-500 text-center ko-modal-copy">체성능 점수 예시</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 sm:pt-20 pb-16 sm:pb-24">
          <h2 className="section-title ko-modal-copy">체성능 측정이란?</h2>
          <div className="mt-6 max-w-3xl space-y-4 text-base sm:text-lg text-gray-600 leading-relaxed ko-modal-copy">
            <p>
              기존에는 체성분으로 근육량과 체지방량은 알 수 있었지만, 운동 수행능력은 알기 어려웠습니다.
              <br />
              얼마나 힘 있게 미는지, 좌우가 얼마나 밸런스 있게 움직이는지는 수치로 남기기 힘들었어요.
            </p>
            <p>
              이제 세짐 체성능 측정 기능으로 그 수행능력을 데이터로 측정할 수 있어요.
              <br />
              회원이 어떻게 운동하는지를 체성능 측정으로 확인합니다.
            </p>
          </div>
          <h3 className="mt-14 text-xl sm:text-2xl font-bold text-gray-900 ko-modal-copy">주요 데이터</h3>
          <p className="mt-3 max-w-3xl text-base sm:text-lg text-gray-600 leading-relaxed ko-modal-copy">
            측정 결과에서는 힘, 속도, 가동범위, 밸런스를 중심으로 운동을 분석해요.
          </p>
          <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 list-none p-0 m-0">
            {METRICS.map((item) => (
              <li key={item.title} className="rounded-2xl bg-primary-muted px-5 py-6">
                <p className="text-lg font-bold text-gray-900 ko-modal-copy">
                  <span
                    className="mr-1.5"
                    aria-hidden
                    style={{ fontFamily: '"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", emoji, sans-serif' }}
                  >
                    {item.emoji}
                  </span>
                  {item.title}
                </p>
                <p className="mt-2 text-base text-gray-600 leading-relaxed ko-modal-copy">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white border-t border-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <p className="text-sm font-semibold text-primary mb-3 ko-modal-copy">측정 방법</p>
          <h2 className="section-title max-w-3xl ko-modal-copy">측정할 부위를 고르고, 화면 안내를 따라 운동해요</h2>
          <ol className="mt-12 sm:mt-16 grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 list-none p-0 m-0">
            {STEPS.map((item) => (
              <li key={item.step} className="min-w-0">
                <p className="text-sm font-bold text-primary tracking-wide">{item.step}</p>
                <h3 className="mt-2 text-xl font-bold text-gray-900 ko-modal-copy">{item.title}</h3>
                <p className="mt-3 text-base text-gray-600 leading-relaxed ko-modal-copy">{item.body}</p>
                <div className="mt-8">
                  <PhoneFrame src={item.image} alt={item.alt} />
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="results" className="scroll-mt-28 bg-primary-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <h2 className="section-title ko-modal-copy">점수로 한눈에 보고, 데이터로 자세히 살펴봐요</h2>
          <div className="mt-12 sm:mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
            <div className="flex flex-col min-w-0">
              <h3 className="text-xl font-bold text-gray-900 ko-modal-copy">세짐 점수와 운동 총평</h3>
              <p className="mt-3 text-base text-gray-700 leading-relaxed ko-modal-copy lg:min-h-[7.5rem]">
                부위별 세짐 점수로 지금 수준을 확인할 수 있어요. 총평에서는 잘한 점과 부족한 점이 함께 보여서, 다음에
                무엇을 보완할지 바로 알 수 있어요.
              </p>
              <div className="mt-6 flex-1">
                <ZoomableImage
                  src={BODY_PERFORMANCE_IMAGES.resultSummary}
                  alt="정밀 측정 결과. 가슴 세짐 점수 742점과 힘, 운동 템포, 가동범위, 좌우 균형 총평"
                  caption="측정 결과 예시"
                  imageClassName="max-h-[420px] w-full object-contain object-top"
                />
              </div>
            </div>
            <div className="flex flex-col min-w-0">
              <h3 className="text-xl font-bold text-gray-900 ko-modal-copy">운동 상세 분석</h3>
              <p className="mt-3 text-base text-gray-700 leading-relaxed ko-modal-copy lg:min-h-[7.5rem]">
                좌우 균형, 운동 템포, 회차별 휴식 시간, 바 높이에 따른 힘과 속도까지 더 자세한 운동 데이터를 볼 수
                있어요. 회원 운동을 데이터로 관리하는 전문적인 피트니스가 될 수 있어요.
              </p>
              <div className="mt-6 flex-1">
                <ZoomableImage
                  src={BODY_PERFORMANCE_IMAGES.resultDetail}
                  alt="운동 상세 분석. 좌우 균형, 운동 템포, 회차별 휴식 시간, 높이별 힘과 속도"
                  caption="측정 결과 예시"
                  imageClassName="max-h-[420px] w-full object-contain object-top"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <h2 className="section-title ko-modal-copy">우리 센터에서는 이렇게 활용해요</h2>
          <ul className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 list-none p-0 m-0">
            {USES.map((item) => (
              <li key={item.title} className="rounded-2xl bg-primary-muted px-6 py-7">
                <h3 className="text-lg font-bold text-gray-900 ko-modal-copy">
                  <span
                    className="mr-1.5"
                    aria-hidden
                    style={{ fontFamily: '"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", emoji, sans-serif' }}
                  >
                    {item.emoji}
                  </span>
                  {item.title}
                </h3>
                <p className="mt-3 text-base text-gray-600 leading-relaxed ko-modal-copy">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-primary">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white ko-modal-copy">우리 센터에 세짐을 도입하고 싶다면?</h2>
          <p className="mt-4 text-base sm:text-lg text-white/90 leading-relaxed ko-modal-copy">
            신규 회원 OT부터 PT 상담까지, 센터에 맞는 활용 방법과 도입 견적을 상담해 보세요.
          </p>
          <div className="mt-8">
            <OpenInquiryButton className="inline-flex items-center justify-center rounded-lg bg-white px-7 py-3.5 text-sm font-semibold text-primary hover:bg-primary-muted transition-colors">
              도입 상담 및 견적 문의
            </OpenInquiryButton>
          </div>
        </div>
      </section>
    </div>
  )
}
