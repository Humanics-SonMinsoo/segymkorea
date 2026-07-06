'use client'

import { useCallback, useEffect, useState } from 'react'
import { useModalEnterAnimation } from '@/hooks/useModalEnterAnimation'
import { SEGYM_DAY_CAROUSEL_IMAGES } from '@/data/segym-day'
import { SegymDayEventIntro } from '@/components/segym-day/SegymDayEventIntro'

type Props = {
  open: boolean
  onClose: () => void
}

export function SegymDayAboutModal({ open, onClose }: Props) {
  const entered = useModalEnterAnimation()
  const [slide, setSlide] = useState(0)

  useEffect(() => {
    if (!open) return
    setSlide(0)
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') setSlide((s) => (s > 0 ? s - 1 : SEGYM_DAY_CAROUSEL_IMAGES.length - 1))
      if (e.key === 'ArrowRight') setSlide((s) => (s < SEGYM_DAY_CAROUSEL_IMAGES.length - 1 ? s + 1 : 0))
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  const goPrev = useCallback(() => {
    setSlide((s) => (s > 0 ? s - 1 : SEGYM_DAY_CAROUSEL_IMAGES.length - 1))
  }, [])

  const goNext = useCallback(() => {
    setSlide((s) => (s < SEGYM_DAY_CAROUSEL_IMAGES.length - 1 ? s + 1 : 0))
  }, [])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-3 sm:p-6" role="dialog" aria-modal="true">
      <button
        type="button"
        className={`absolute inset-0 bg-black/60 backdrop-blur-[2px] transition-opacity duration-300 ${
          entered ? 'opacity-100' : 'opacity-0'
        }`}
        aria-label="닫기"
        onClick={onClose}
      />
      <div
        className={`relative z-10 w-full max-w-2xl max-h-[92vh] overflow-hidden rounded-2xl bg-white shadow-2xl border border-gray-100 flex flex-col transition-[opacity,transform] duration-300 ${
          entered ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.98]'
        }`}
      >
        <div className="flex items-center justify-between gap-3 border-b border-gray-100 px-4 sm:px-5 py-3.5 shrink-0">
          <h2 className="text-lg font-bold text-gray-900">SEGYM DAY 이벤트 안내</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
            aria-label="모달 닫기"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="relative bg-black shrink-0">
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

        <div className="overflow-y-auto px-4 sm:px-6 py-5 sm:py-6">
          <SegymDayEventIntro />
        </div>
      </div>
    </div>
  )
}
