import Link from 'next/link'
import { OpenInquiryButton } from '@/components/inquiry/OpenInquiryButton'
import { EN_NAV } from '@/data/en/site'

const FLOW = [
  {
    step: '01',
    title: 'Stand in. Start Scan.',
    body: 'The member steps into SEGYM. One guided start begins a structured performance scan — no complicated setup, no guesswork.',
  },
  {
    step: '02',
    title: 'Move through the protocol',
    body: 'A clear on-machine flow walks through key movements. Force, speed, and balance signals are captured as the session unfolds.',
  },
  {
    step: '03',
    title: 'See the Score',
    body: 'Results resolve into an intuitive score and breakdown — athletic insight members understand instantly, and coaches can act on.',
  },
  {
    step: '04',
    title: 'Train with direction',
    body: 'Connect score insights to the next session. SEGYM helps turn assessment into programming — not just another report that sits unused.',
  },
]

export function EnScanAndScorePage() {
  return (
    <div className="bg-black text-white">
      {/* Hero — Tesla-like full viewport statement */}
      <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/segym_new.png"
            alt=""
            className="h-full w-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/55 to-black" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center py-24">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-primary-light mb-6">
            Coming soon · Humanics
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
            SEGYM
            <br />
            Scan &amp; Score
          </h1>
          <p className="mt-6 text-base sm:text-lg md:text-xl text-neutral-300 max-w-2xl mx-auto leading-relaxed">
            Performance assessment built around how people actually move —
            measured on the machine, understood in seconds, ready for the next session.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <OpenInquiryButton className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-semibold text-black hover:bg-neutral-100 transition-colors">
              Request launch updates
            </OpenInquiryButton>
            <a
              href="#flow"
              className="inline-flex items-center justify-center rounded-full border border-white/40 px-7 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              See the flow
            </a>
          </div>
        </div>
      </section>

      {/* Story strip */}
      <section className="border-t border-white/10 py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Not a feature list. A journey.</h2>
          <p className="mt-5 text-neutral-400 text-base sm:text-lg leading-relaxed">
            Scan &amp; Score is designed like a product experience — from first step into SEGYM to a score
            members remember. The following flow mirrors the intended machine and app journey as Humanics
            prepares launch.
          </p>
        </div>
      </section>

      {/* Flow — stacked full-bleed panels */}
      <section id="flow" className="border-t border-white/10">
        {FLOW.map((item, i) => (
          <div
            key={item.step}
            className={`min-h-[70vh] flex items-center border-t border-white/10 ${
              i % 2 === 0 ? 'bg-neutral-950' : 'bg-black'
            }`}
          >
            <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div className={i % 2 === 1 ? 'lg:order-2' : undefined}>
                <p className="text-sm font-bold tracking-[0.2em] text-primary mb-3">{item.step}</p>
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight">
                  {item.title}
                </h3>
                <p className="mt-5 text-neutral-400 text-base sm:text-lg leading-relaxed max-w-xl">
                  {item.body}
                </p>
              </div>
              <div
                className={`rounded-2xl border border-white/10 bg-gradient-to-br from-neutral-900 to-neutral-950 aspect-[4/3] flex items-center justify-center p-8 ${
                  i % 2 === 1 ? 'lg:order-1' : ''
                }`}
              >
                <div className="text-center">
                  <p className="text-xs uppercase tracking-widest text-neutral-500 mb-3">UI preview</p>
                  <p className="text-2xl sm:text-3xl font-bold text-white/90">{item.title}</p>
                  <p className="mt-3 text-sm text-neutral-500 max-w-xs mx-auto">
                    Machine &amp; app screens from the SW team will replace this placeholder.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Why it matters */}
      <section className="border-t border-white/10 py-20 md:py-28 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {[
              {
                title: 'For members',
                body: 'A score they can understand — motivation with substance, not vanity metrics.',
              },
              {
                title: 'For coaches',
                body: 'Assessment that feeds programming. Less talk, more evidence from the floor.',
              },
              {
                title: 'For operators',
                body: 'A differentiator that proves SEGYM is an active platform — not just hardware.',
              },
            ].map((card) => (
              <div key={card.title} className="rounded-2xl border border-white/10 bg-black/40 p-6 sm:p-8">
                <h3 className="text-xl font-bold mb-3">{card.title}</h3>
                <p className="text-neutral-400 leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/10 py-20 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Be first when Scan &amp; Score launches</h2>
          <p className="mt-4 text-neutral-400 leading-relaxed">
            Request a product demo, partnership conversation, or launch notification.
            SEGYM Scan &amp; Score is developed and operated by Humanics Co., Ltd.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <OpenInquiryButton className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-3 text-sm font-semibold text-white hover:bg-primary-dark transition-colors">
              {EN_NAV.inquire}
            </OpenInquiryButton>
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
