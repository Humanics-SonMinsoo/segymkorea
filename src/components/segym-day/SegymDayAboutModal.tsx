'use client'

import { useEffect } from 'react'
import { useModalEnterAnimation } from '@/hooks/useModalEnterAnimation'
import { SEGYM_DAY_EVENT_IMAGE } from '@/data/segym-day'
import { SegymDayEventIntro } from '@/components/segym-day/SegymDayEventIntro'

type Props = {
  open: boolean
  onClose: () => void
}

export function SegymDayAboutModal({ open, onClose }: Props) {
  const entered = useModalEnterAnimation()

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

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

        <div className="relative w-full bg-black overflow-hidden shrink-0">
          <img
            src={SEGYM_DAY_EVENT_IMAGE}
            alt="대전 원퍼센트피트니스 SEGYM DAY"
            className="block w-full h-auto object-contain"
          />
        </div>

        <div className="overflow-y-auto px-4 sm:px-6 py-5 sm:py-6">
          <SegymDayEventIntro />
        </div>
      </div>
    </div>
  )
}
