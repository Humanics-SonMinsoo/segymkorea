'use client'

import { SEGYM_DAY_VENUES, isSegymDayVenueSelectable } from '@/data/segym-day'

type Props = {
  selectedId: string
  onSelect: (id: string) => void
}

export function SegymDayVenuePicker({ selectedId, onSelect }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {SEGYM_DAY_VENUES.map((venue) => {
        const selectable = isSegymDayVenueSelectable(venue)
        const selected = selectedId === venue.id
        return (
          <button
            key={venue.id}
            type="button"
            disabled={!selectable}
            onClick={() => selectable && onSelect(venue.id)}
            className={`relative text-left rounded-xl border px-4 py-4 transition-colors ${
              !selectable
                ? 'border-gray-200 bg-gray-100 cursor-not-allowed'
                : selected
                  ? 'border-primary bg-primary-muted ring-2 ring-primary/20'
                  : 'border-gray-200 bg-white hover:border-primary/40 hover:bg-gray-50'
            }`}
            aria-pressed={selected}
          >
            <span className={`block font-semibold ko-modal-copy ${selectable ? 'text-gray-900' : 'text-gray-700'}`}>
              {venue.title}
            </span>
            <span className={`block mt-1 text-sm ko-modal-copy ${selectable ? 'text-gray-500' : 'text-gray-500'}`}>
              {venue.schedule}
            </span>
            {venue.comingSoonLabel ? (
              <span
                className={`mt-2 inline-block rounded-md px-2 py-0.5 text-[11px] font-semibold ${
                  venue.comingSoonLabel === '모집마감'
                    ? 'bg-gray-200 text-gray-700'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                {venue.comingSoonLabel}
              </span>
            ) : null}
          </button>
        )
      })}
    </div>
  )
}
