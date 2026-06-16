'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  INSTALLATION_FEATURED_IDS,
  INSTALLATION_GALLERY,
  INSTALLATION_CATEGORIES,
  INSTALLATION_NEW_IDS,
  installationRegionSortIndex,
  type InstallationCategoryId,
  type InstallationPhoto,
} from '@/data/installation-gallery'
import { useModalEnterAnimation } from '@/hooks/useModalEnterAnimation'

/** 같은 지역끼리 묶이도록 정렬. 지역 안 순서는 `INSTALLATION_GALLERY` 배열 순서 유지 */
const GALLERY_ORDER_INDEX = new Map(INSTALLATION_GALLERY.map((p, i) => [p.id, i]))

function sortPhotosByRegion(photos: InstallationPhoto[]): InstallationPhoto[] {
  return [...photos].sort((a, b) => {
    const ra = installationRegionSortIndex(a.regionKey || '기타')
    const rb = installationRegionSortIndex(b.regionKey || '기타')
    if (ra !== rb) return ra - rb
    return (GALLERY_ORDER_INDEX.get(a.id) ?? 0) - (GALLERY_ORDER_INDEX.get(b.id) ?? 0)
  })
}

function Lightbox({ photo, onClose }: { photo: InstallationPhoto; onClose: () => void }) {
  const entered = useModalEnterAnimation()
  const images = photo.gallery?.length ? photo.gallery : [photo.src]
  const [index, setIndex] = useState(0)
  const hasMultiple = images.length > 1
  const currentSrc = images[index] ?? photo.src

  const goPrev = useCallback(() => {
    setIndex((i) => (i <= 0 ? images.length - 1 : i - 1))
  }, [images.length])

  const goNext = useCallback(() => {
    setIndex((i) => (i >= images.length - 1 ? 0 : i + 1))
  }, [images.length])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (hasMultiple && e.key === 'ArrowLeft') goPrev()
      if (hasMultiple && e.key === 'ArrowRight') goNext()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, hasMultiple, goPrev, goNext])

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
          <div className="min-w-0">
            <h2 className="text-base sm:text-xl font-bold text-gray-900 ko-modal-copy pr-2">{photo.title}</h2>
            {hasMultiple ? (
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                {index + 1} / {images.length}
              </p>
            ) : null}
          </div>
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
        <div className="relative max-h-[calc(92vh-3.75rem)] overflow-y-auto bg-black/5">
          <img
            key={currentSrc}
            src={currentSrc}
            alt={photo.alt}
            className="w-full h-auto object-contain max-h-[min(85vh,1200px)] mx-auto block"
          />
          {hasMultiple ? (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  goPrev()
                }}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-white/95 text-gray-800 shadow-lg border border-gray-200 hover:bg-white transition-colors"
                aria-label="이전 사진"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  goNext()
                }}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-white/95 text-gray-800 shadow-lg border border-gray-200 hover:bg-white transition-colors"
                aria-label="다음 사진"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          ) : null}
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

const gridClass =
  'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-6 sm:gap-7 lg:gap-9 list-none p-0 m-0'

function PhotoCard({
  photo,
  onOpen,
  isNew,
}: {
  photo: InstallationPhoto
  onOpen: (p: InstallationPhoto) => void
  isNew?: boolean
}) {
  return (
    <li>
      <button
        type="button"
        onClick={() => onOpen(photo)}
        className="group relative w-full text-left rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm transition hover:border-primary/30 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      >
        {isNew ? (
          <span className="absolute left-3 top-3 z-10 rounded-md bg-primary px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-white shadow-sm">
            NEW
          </span>
        ) : null}
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
          {photo.gallery && photo.gallery.length > 1 ? (
            <span className="ml-1.5 text-xs font-normal text-gray-400">· 사진 {photo.gallery.length}장</span>
          ) : null}
        </p>
      </button>
    </li>
  )
}

export function InstallationGallery() {
  const [active, setActive] = useState<InstallationPhoto | null>(null)
  const [category, setCategory] = useState<InstallationCategoryId>('all')
  const close = useCallback(() => setActive(null), [])

  const { newRow, featuredRow, mainRow, isEmpty } = useMemo(() => {
    const newIdSet = new Set<string>(INSTALLATION_NEW_IDS)

    const filtered =
      category === 'all'
        ? INSTALLATION_GALLERY
        : INSTALLATION_GALLERY.filter((p) => p.categoryId === category)

    if (filtered.length === 0) {
      return {
        newRow: [] as InstallationPhoto[],
        featuredRow: [] as InstallationPhoto[],
        mainRow: [] as InstallationPhoto[],
        isEmpty: true,
      }
    }

    const newRow = INSTALLATION_NEW_IDS.map((id) => INSTALLATION_GALLERY.find((p) => p.id === id)).filter(
      (p): p is InstallationPhoto => p != null && filtered.some((f) => f.id === p.id),
    )

    const isPinnedOrNew = (id: string) =>
      (INSTALLATION_NEW_IDS as readonly string[]).includes(id) ||
      (INSTALLATION_FEATURED_IDS as readonly string[]).includes(id)

    if (category === 'all') {
      const featuredRow = INSTALLATION_FEATURED_IDS.map((id) => INSTALLATION_GALLERY.find((p) => p.id === id)).filter(
        (p): p is InstallationPhoto => p != null,
      )
      const rest = filtered.filter((p) => !isPinnedOrNew(p.id))
      return {
        newRow,
        featuredRow,
        mainRow: sortPhotosByRegion(rest),
        isEmpty: false,
      }
    }

    const rest = filtered.filter((p) => !newIdSet.has(p.id))
    return {
      newRow,
      featuredRow: [],
      mainRow: sortPhotosByRegion(rest),
      isEmpty: false,
    }
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

      {isEmpty ? (
        <p className="text-gray-600 ko-modal-copy text-sm sm:text-base py-8 text-center">
          해당 카테고리에 등록된 사례가 없습니다.
        </p>
      ) : (
        <>
          {newRow.length > 0 ? (
            <section className="mb-8 sm:mb-10" aria-labelledby="install-new-heading">
              <h2
                id="install-new-heading"
                className="text-lg sm:text-xl font-bold text-gray-900 ko-modal-copy mb-1 sm:mb-2"
              >
                NEW 센터
              </h2>
              <p className="text-sm text-gray-600 ko-modal-copy mb-4 sm:mb-6">새롭게 세짐을 도입한 센터입니다.</p>
              <ul className={gridClass}>
                {newRow.map((photo) => (
                  <PhotoCard key={photo.id} photo={photo} onOpen={setActive} isNew />
                ))}
              </ul>
            </section>
          ) : null}

          {featuredRow.length > 0 ? (
            <section className="mb-8 sm:mb-10" aria-labelledby="install-featured-heading">
              <h2
                id="install-featured-heading"
                className="text-lg sm:text-xl font-bold text-gray-900 ko-modal-copy mb-4 sm:mb-6"
              >
                대표 사례
              </h2>
              <p className="sr-only">올라잇짐, 프렌드짐, 진천 국가대표 선수촌 순으로 고정 노출됩니다.</p>
              <ul className={gridClass}>
                {featuredRow.map((photo) => (
                  <PhotoCard key={photo.id} photo={photo} onOpen={setActive} />
                ))}
              </ul>
            </section>
          ) : null}

          <ul className={gridClass}>
            {mainRow.map((photo) => (
              <PhotoCard key={photo.id} photo={photo} onOpen={setActive} />
            ))}
          </ul>
        </>
      )}
      {active ? <Lightbox key={active.id} photo={active} onClose={close} /> : null}
    </>
  )
}
