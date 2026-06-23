'use client'

import { DEMO_CENTERS, isDemoCenterSelectable } from '@/data/demo-centers'

type Props = {
  selectedId: string
  onSelect: (id: string) => void
  variant?: 'compact' | 'page'
}

export function DemoCenterPicker({ selectedId, onSelect, variant = 'compact' }: Props) {
  const isPage = variant === 'page'

  return (
    <div className={isPage ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5' : 'grid grid-cols-1 sm:grid-cols-2 gap-2'}>
      {DEMO_CENTERS.map((center) => {
        const selectable = isDemoCenterSelectable(center)
        const selected = selectedId === center.id
        return (
          <button
            key={center.id}
            type="button"
            disabled={!selectable}
            onClick={() => selectable && onSelect(center.id)}
            className={`relative text-left rounded-xl border transition-colors overflow-hidden ${
              !selectable
                ? 'border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed'
                : selected
                  ? 'border-primary bg-primary-muted ring-2 ring-primary/20'
                  : center.featured
                    ? 'border-primary/40 bg-white hover:border-primary hover:bg-primary-muted/30'
                    : 'border-gray-200 bg-white hover:border-primary/40 hover:bg-gray-50'
            } ${isPage ? 'shadow-sm hover:shadow-md' : ''}`}
            aria-pressed={selected}
            aria-disabled={!selectable}
          >
            {isPage && center.imageSrc ? (
              <div className="aspect-[16/10] bg-gray-100 overflow-hidden">
                <img
                  src={center.imageSrc}
                  alt={`${center.name} 시연 센터`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ) : null}
            <div className={isPage ? 'p-4' : 'px-3 py-3'}>
              {center.featured ? (
                <span
                  className={`absolute ${isPage ? 'left-3 top-3' : 'right-2 top-2'} rounded-md bg-red-500 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white`}
                >
                  HOT
                </span>
              ) : null}
              <span className={`block font-semibold text-gray-900 ko-modal-copy ${isPage ? 'text-base pr-12' : 'text-sm pr-10'}`}>
                {center.name}
                {center.location ? (
                  <span className="font-normal text-gray-400 text-xs sm:text-[13px]"> - {center.location}</span>
                ) : null}
              </span>
              {isPage && center.address ? (
                <p className="mt-2 text-xs text-gray-500 ko-modal-copy leading-relaxed">{center.address}</p>
              ) : null}
              {center.comingSoon ? (
                <span className="mt-2 inline-block rounded-md bg-amber-100 px-1.5 py-0.5 text-[11px] font-semibold text-amber-800">
                  {center.comingSoonLabel ?? '오픈 예정'}
                </span>
              ) : null}
            </div>
          </button>
        )
      })}
    </div>
  )
}
