'use client'

import { useCallback, useState } from 'react'
import { SEGYM_DAY_CAROUSEL_IMAGES } from '@/data/segym-day'
import { SegymDayEventIntro } from '@/components/segym-day/SegymDayEventIntro'

export function SegymDayEventSection() {
  const [slide, setSlide] = useState(0)

  const goPrev = useCallback(() => {
    setSlide((s) => (s > 0 ? s - 1 : SEGYM_DAY_CAROUSEL_IMAGES.length - 1))
  }, [])

  const goNext = useCallback(() => {
    setSlide((s) => (s < SEGYM_DAY_CAROUSEL_IMAGES.length - 1 ? s + 1 : 0))
  }, [])

  return (
    <section className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm">
      <div className="border-b border-gray-100 px-4 sm:px-6 py-3.5">
        <h2 className="text-lg font-bold text-gray-900">SEGYM DAY 이벤트 안내</h2>
      </div>

      <div className="relative bg-black">
        <div className="aspect-[16/10] sm:aspect-[16/9] relative">
          <img
            src={SEGYM_DAY_CAROUSEL_IMAGES[slide]}
            alt={`SEGYM DAY 소개 이미지 ${slide + 1}`}
            className="w-full h-full object-contain bg-black"
          />
        </div>
        <button
          type="button"
          onClick={goPrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 text-white p-2 hover:bg-black/70"
          aria-label="이전 이미지"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={goNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 text-white p-2 hover:bg-black/70"
          aria-label="다음 이미지"
        >
          ›
        </button>
        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5">
          {SEGYM_DAY_CAROUSEL_IMAGES.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setSlide(i)}
              className={`h-1.5 rounded-full transition-all ${i === slide ? 'w-5 bg-white' : 'w-1.5 bg-white/50'}`}
              aria-label={`${i + 1}번째 이미지`}
            />
          ))}
        </div>
      </div>

      <div className="px-4 sm:px-6 py-5 sm:py-6">
        <SegymDayEventIntro />
      </div>
    </section>
  )
}
