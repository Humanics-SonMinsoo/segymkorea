'use client'

import { useEffect, useRef, useState } from 'react'

const STRENGTHS = [
  {
    name: 'Change load with a touch — no plates',
    description:
      'Set resistance up to 260 kg with a single touch.\nNo plate changes. Just train.',
    image: '/images/strengths/touch.png',
    icon: '⚖️',
  },
  {
    name: 'Auto drop sets & pyramid sets',
    description:
      'SEGYM adjusts load set by set — automatically.\nKeep intensity high without stopping to re-rack.',
    image: '/images/strengths/drop2.png',
    icon: '📉',
  },
  {
    name: 'Train like royalty — focus on intensity',
    description:
      'No wasted effort changing weights. No fear of being pinned.\nPut every rep into maximum quality work.',
    image: '/images/strengths/king_spot3.png',
    icon: '👑',
  },
  {
    name: 'Imbalance checks & automatic logging',
    description:
      'AI analyzes form in real time and records every session.\nLeft–right balance insights help you train safer and smarter.',
    image: '/images/strengths/tracking2.png',
    icon: '📊',
  },
  {
    name: 'Squats and lat pulldowns on one machine',
    description:
      'Digital load technology that can reverse resistance direction\nenables full-body training — from squats to lat pulldowns.',
    image: '/images/strengths/squat_pulldown.png',
    icon: '🏋️',
  },
]

export function EnSegymStrengths() {
  const [activeStrength, setActiveStrength] = useState(0)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [imageLoadFailed, setImageLoadFailed] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const current = STRENGTHS[activeStrength]

  useEffect(() => {
    setImageLoadFailed(false)
  }, [activeStrength])

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title mb-4">Training feels effortless with SEGYM</h2>
          <p className="section-subtitle max-w-2xl mx-auto">See what makes SEGYM different at a glance</p>
        </div>

        <div className="hidden lg:flex gap-8">
          <div className="flex-1 bg-gray-50 rounded-xl p-8 min-h-[500px]">
            <div className="w-full h-72 bg-white rounded-lg mb-6 overflow-hidden shadow-sm">
              {imageLoadFailed ? (
                <div className="w-full h-full flex items-center justify-center text-gray-400">Image coming soon</div>
              ) : (
                <div className="relative w-full h-full bg-gray-100">
                  {STRENGTHS.map((strength, index) => (
                    <img
                      key={strength.image}
                      src={strength.image}
                      alt={activeStrength === index ? strength.name : ''}
                      loading={index === activeStrength ? 'eager' : 'lazy'}
                      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
                        activeStrength === index ? 'z-[1] opacity-100' : 'z-0 opacity-0 pointer-events-none'
                      }`}
                      onError={() => {
                        if (index === activeStrength) setImageLoadFailed(true)
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
            <h3 className="card-title text-xl md:text-2xl font-bold mb-4 flex items-center gap-2">
              <span className="text-xl md:text-2xl">{current.icon}</span>
              {current.name}
            </h3>
            <p className="section-body lg:whitespace-pre-line">{current.description}</p>
          </div>

          <div className="w-80 space-y-3">
            {STRENGTHS.map((strength, index) => (
              <button
                key={strength.name}
                type="button"
                onClick={() => setActiveStrength(index)}
                className={`w-full text-left p-4 rounded-xl transition-all duration-200 border-0 ${
                  activeStrength === index
                    ? 'bg-primary-muted text-primary shadow-md'
                    : 'bg-white text-gray-700 hover:bg-primary-muted/70 hover:text-primary hover:shadow-md'
                }`}
              >
                <div className="card-title font-semibold flex items-center gap-2">
                  <span className="text-lg">{strength.icon}</span>
                  {strength.name}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="lg:hidden">
          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 -mx-4 pl-4 pr-2 mb-6"
            style={{ scrollSnapType: 'x mandatory' }}
            onScroll={(e) => {
              const container = e.currentTarget
              const first = container.firstElementChild as HTMLElement
              const cardWidth = first ? first.offsetWidth : 320
              const gap = 16
              const slide = Math.round(container.scrollLeft / (cardWidth + gap))
              setCurrentSlide(Math.min(slide, STRENGTHS.length - 1))
            }}
          >
            {STRENGTHS.map((strength) => (
              <div
                key={strength.name}
                className="flex-shrink-0 w-[calc(100vw-56px)] max-w-[380px] bg-gray-50 rounded-xl p-6"
                style={{ scrollSnapAlign: 'start' }}
              >
                <div className="w-full h-52 bg-white rounded-lg mb-4 overflow-hidden shadow-sm">
                  <img src={strength.image} alt={strength.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="card-title font-bold mb-2 flex items-center gap-2">
                  <span>{strength.icon}</span>
                  {strength.name}
                </h3>
                <p className="section-body text-sm md:text-base leading-relaxed whitespace-pre-line">
                  {strength.description}
                </p>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-2">
            {STRENGTHS.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => {
                  if (scrollContainerRef.current) {
                    const first = scrollContainerRef.current.firstElementChild as HTMLElement
                    const cardWidth = first ? first.offsetWidth : 320
                    const gap = 16
                    scrollContainerRef.current.scrollTo({
                      left: index * (cardWidth + gap),
                      behavior: 'smooth',
                    })
                    setCurrentSlide(index)
                  }
                }}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  currentSlide === index ? 'bg-primary w-6' : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
