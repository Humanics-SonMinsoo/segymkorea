'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  INSTALLATION_CATEGORIES,
  INSTALLATION_GALLERY,
  type InstallationCategoryId,
  type InstallationPhoto,
} from '@/data/installation-gallery'
import { useModalEnterAnimation } from '@/hooks/useModalEnterAnimation'

function Lightbox({ photo, onClose }: { photo: InstallationPhoto; onClose: () => void }) {
  const entered = useModalEnterAnimation()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={photo.title}
    >
      <button
        type="button"
        className={`absolute inset-0 bg-black/75 transition-opacity duration-300 ease-out motion-reduce:transition-none ${
          entered ? 'opacity-100' : 'opacity-0'
        }`}
        aria-label="닫기"
        onClick={onClose}
      />
      <div
        className={`relative z-10 max-h-[92vh] w-full max-w-6xl overflow-hidden rounded-xl bg-white shadow-2xl transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:scale-100 ${
          entered ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.98]'
        }`}
      >
        <div className="flex items-center justify-between gap-3 border-b border-gray-100 px-4 py-3 sm:px-6">
          <h2 className="text-base sm:text-xl font-bold text-gray-900 ko-modal-copy min-w-0 pr-2">{photo.title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-800"
            aria-label="닫기"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="max-h-[calc(92vh-3.75rem)] overflow-y-auto bg-black/5">
          <img
            src={photo.src}
            alt={photo.alt}
            className="w-full h-auto object-contain max-h-[min(85vh,1200px)] mx-auto block"
          />
        </div>
      </div>
    </div>
  )
}

function categoryChipClass(active: boolean) {
  const base =
    'rounded-full px-4 py-2 text-sm sm:text-[0.9375rem] font-medium border transition-colors ko-modal-copy whitespace-nowrap shrink-0'
  if (active) {
    return `${base} border-primary bg-primary text-white shadow-sm`
  }
  return `${base} border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50`
}

export function InstallationGallery() {
  const [active, setActive] = useState<InstallationPhoto | null>(null)
  const [category, setCategory] = useState<InstallationCategoryId>('all')
  const close = useCallback(() => setActive(null), [])

  const filtered = useMemo(() => {
    if (category === 'all') return INSTALLATION_GALLERY
    return INSTALLATION_GALLERY.filter((p) => p.categoryId === category)
  }, [category])

  return (
    <>
      <div
        className="flex flex-wrap items-center gap-2 sm:gap-2.5 mb-6 sm:mb-10"
        role="tablist"
        aria-label="설치 사례 카테고리"
      >
        <button
          type="button"
          role="tab"
          aria-selected={category === 'all'}
          onClick={() => setCategory('all')}
          className={categoryChipClass(category === 'all')}
        >
          전체
        </button>
        {INSTALLATION_CATEGORIES.map((c) => (
          <button
            key={c.id}
            type="button"
            role="tab"
            aria-selected={category === c.id}
            onClick={() => setCategory(c.id)}
            className={categoryChipClass(category === c.id)}
          >
            {c.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-gray-600 ko-modal-copy text-sm sm:text-base py-8 text-center">
          해당 카테고리에 등록된 사례가 없습니다.
        </p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-6 sm:gap-7 lg:gap-9 list-none p-0 m-0">
          {filtered.map((photo) => (
            <li key={photo.id}>
              <button
                type="button"
                onClick={() => setActive(photo)}
                className="group w-full text-left rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm transition hover:border-primary/30 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                <div className="aspect-[4/3] sm:aspect-[4/3] bg-gray-100 overflow-hidden">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                </div>
                <p className="px-4 py-3.5 sm:px-5 sm:py-4 text-sm sm:text-base font-medium text-gray-800 ko-modal-copy line-clamp-2 border-t border-gray-50">
                  {photo.title}
                </p>
              </button>
            </li>
          ))}
        </ul>
      )}
      {active ? <Lightbox photo={active} onClose={close} /> : null}
    </>
  )
}
