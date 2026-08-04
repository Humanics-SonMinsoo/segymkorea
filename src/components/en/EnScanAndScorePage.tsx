import Link from 'next/link'
import { OpenInquiryButton } from '@/components/inquiry/OpenInquiryButton'
import { EN_NAV } from '@/data/en/site'

const MEASURES = [
  {
    title: 'Force',
    body: 'How much strength you can produce — and how it shows up across sides and reps.',
    icon: '💪',
  },
  {
    title: 'Speed',
    body: 'Movement velocity through the lift — useful for power and quality of output.',
    icon: '⚡',
  },
  {
    title: 'Range of motion',
    body: 'How far the movement travels — a clear view of mobility under load.',
    icon: '📐',
  },
  {
    title: 'Balance',
    body: 'Left–right symmetry and stability signals captured during the test.',
    icon: '⚖️',
  },
]

const FLOW = [
  {
    step: '01',
    title: 'Select what to measure',
    body: 'Choose the measurement style and body region you want to assess — from a quick balance check to a detailed performance test by part.',
    image: '/images/scan-score/select-measure.png',
    imageAlt: 'Select what to measure on Scan and Score',
  },
  {
    step: '02',
    title: 'Perform the test movements',
    body: 'Follow guided test exercises on SEGYM. The protocol walks you through readiness, speed, and force so the assessment stays clear and consistent.',
    image: '/images/scan-score/measure-live.png',
    imageAlt: 'Live measurement screen during Scan and Score test',
  },
  {
    step: '03',
    title: 'See your score and stats',
    body: 'Results appear as an intuitive SEGYM Score, paired with supporting statistics for force, speed, range of motion, and balance.',
    image: '/images/scan-score/result-score.png',
    imageAlt: 'Scan and Score result with SEGYM Score card',
  },
]

function PhoneShot({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/10 bg-white aspect-[9/16] max-h-[560px] mx-auto w-full max-w-[320px] sm:max-w-[360px]">
      <img src={src} alt={alt} className="h-full w-full object-contain object-top" />
    </div>
  )
}

export function EnScanAndScorePage() {
  return (
    <div className="bg-black text-white">
      {/* Hero */}
      <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/segym_new.png" alt="" className="h-full w-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/55 to-black" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-12 items-center">
            <div className="text-center lg:text-left">
              <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-primary-light mb-6">
                Coming soon · Humanics
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
                SEGYM
                <br />
                Scan &amp; Score
              </h1>
              <p className="mt-6 text-base sm:text-lg md:text-xl text-neutral-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Measure your body&apos;s athletic ability through guided tests — then see the result as a clear score.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <OpenInquiryButton className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-semibold text-black hover:bg-neutral-100 transition-colors">
                  Get launch updates
                </OpenInquiryButton>
                <a
                  href="#what"
                  className="inline-flex items-center justify-center rounded-full border border-white/40 px-7 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
                >
                  See how it works
                </a>
              </div>
            </div>
            <div className="hidden sm:block">
              <PhoneShot
                src="/images/scan-score/result-score.png"
                alt="SEGYM Scan and Score result card"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What it is */}
      <section id="what" className="border-t border-white/10 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <p className="text-sm font-bold tracking-[0.2em] text-primary mb-3">WHAT IT IS</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight">
                Body performance assessment, built as a test
              </h2>
              <p className="mt-6 text-neutral-400 text-base sm:text-lg leading-relaxed">
                SEGYM Scan &amp; Score evaluates athletic ability through structured test movements — then presents the
                outcome as readable results.
              </p>
              <p className="mt-4 text-neutral-400 text-base sm:text-lg leading-relaxed">
                Instead of guessing how someone moves, you can analyze signals like{' '}
                <strong className="text-white">force, speed, range of motion, and balance</strong> from the session
                itself.
              </p>
            </div>
            <PhoneShot
              src="/images/scan-score/measure-transition.png"
              alt="Guided resistance change during Scan and Score measurement"
            />
          </div>

          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {MEASURES.map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-neutral-950/80 p-5 sm:p-6">
                <p className="text-2xl mb-3" aria-hidden>
                  {item.icon}
                </p>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="flow" className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-24 pb-6">
          <p className="text-sm font-bold tracking-[0.2em] text-primary mb-3">HOW IT WORKS</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight max-w-3xl leading-tight">
            From measurement selection to score — in three steps
          </h2>
          <p className="mt-5 text-neutral-400 text-base sm:text-lg max-w-2xl leading-relaxed">
            A simple sequence designed around real use: choose what to test, complete the protocol, then read the
            result.
          </p>
        </div>

        {FLOW.map((item, i) => (
          <div
            key={item.step}
            className={`border-t border-white/10 ${i % 2 === 0 ? 'bg-neutral-950' : 'bg-black'}`}
          >
            <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-14 md:py-20 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div className={i % 2 === 1 ? 'lg:order-2' : undefined}>
                <p className="text-sm font-bold tracking-[0.2em] text-primary mb-3">{item.step}</p>
                <h3 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight">{item.title}</h3>
                <p className="mt-5 text-neutral-400 text-base sm:text-lg leading-relaxed max-w-xl">{item.body}</p>
              </div>
              <div className={i % 2 === 1 ? 'lg:order-1' : undefined}>
                <PhoneShot src={item.image} alt={item.imageAlt} />
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Score highlight */}
      <section className="border-t border-white/10 py-20 md:py-28 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <p className="text-sm font-bold tracking-[0.2em] text-primary mb-3">THE RESULT</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight">
                Measurement you can understand as a score
              </h2>
              <p className="mt-6 text-neutral-400 text-base sm:text-lg leading-relaxed">
                The core of Scan &amp; Score is simple: run the assessment, then see performance as a score —
                supported by statistics that make the result easy to read and compare.
              </p>
              <ul className="mt-8 space-y-4 text-neutral-300">
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>Clear SEGYM Score after each test session</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>Force, speed, range of motion, and balance in one view</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>Supporting movement-quality stats alongside the score</span>
                </li>
              </ul>
            </div>
            <PhoneShot
              src="/images/scan-score/result-score.png"
              alt="Detailed Scan and Score result with statistics"
            />
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="rounded-2xl border border-white/10 bg-black/50 p-6 sm:p-8">
              <h3 className="text-xl font-bold mb-3">Test what matters</h3>
              <p className="text-neutral-400 leading-relaxed">
                Select a region, complete the guided movements, and capture athletic signals from the session —
                force, speed, range of motion, and balance.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/50 p-6 sm:p-8">
              <h3 className="text-xl font-bold mb-3">Read it as a score</h3>
              <p className="text-neutral-400 leading-relaxed">
                Instead of raw data alone, results are presented as an intuitive score with statistics — so members
                and coaches can understand the outcome right away.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/10 py-20 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Be first when Scan &amp; Score launches
          </h2>
          <p className="mt-4 text-neutral-400 leading-relaxed">
            Reach out for partnership conversations or Scan &amp; Score launch updates.
            SEGYM Scan &amp; Score is developed and operated by Humanics Co., Ltd.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <OpenInquiryButton className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-3 text-sm font-semibold text-white hover:bg-primary-dark transition-colors">
              {EN_NAV.inquire}
            </OpenInquiryButton>
            <a
              href="mailto:contact@humanics.kr"
              className="inline-flex items-center justify-center rounded-full border border-white/30 px-7 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              contact@humanics.kr
            </a>
            <Link
              href="/en"
              className="inline-flex items-center justify-center rounded-full border border-white/30 px-7 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Back to SEGYM home
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
