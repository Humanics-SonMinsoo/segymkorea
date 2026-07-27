'use client'

import { SEGYM_DAY_VENUES, isSegymDayVenueSelectable, type SegymDayVenue } from '@/data/segym-day'

type Props = {
  selectedId: string
  onSelect: (id: string) => void
}

function venueAppearance(venue: SegymDayVenue): 'closed' | 'comingSoon' | 'active' {
  if (venue.appearance) return venue.appearance
  if (venue.selectable) return 'active'
  if (venue.comingSoonLabel === '모집마감') return 'closed'
  return 'comingSoon'
}

export function SegymDayVenuePicker({ selectedId, onSelect }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {SEGYM_DAY_VENUES.map((venue) => {
        const selectable = isSegymDayVenueSelectable(venue)
        const selected = selectedId === venue.id
        const appearance = venueAppearance(venue)

        const base =
          'relative text-left rounded-xl border px-4 py-4 transition-all duration-200'

        let tone = ''
        if (appearance === 'closed') {
          tone =
            'border-gray-200/60 bg-gray-100/70 text-gray-400 cursor-not-allowed opacity-40 grayscale blur-[1.5px] scale-[0.98]'
        } else if (appearance === 'comingSoon') {
          tone =
            'border-dashed border-slate-300 bg-slate-50 cursor-not-allowed opacity-90'
        } else if (selected) {
          tone =
            'border-amber-400 bg-amber-50 ring-2 ring-amber-300/60 shadow-md shadow-amber-200/40'
        } else {
          tone = 'border-amber-200/80 bg-white hover:border-amber-400 hover:bg-amber-50/60'
        }

        return (
          <button
            key={venue.id}
            type="button"
            disabled={!selectable}
            onClick={() => selectable && onSelect(venue.id)}
            className={`${base} ${tone}`}
            aria-pressed={selected}
          >
            <span
              className={`block font-semibold ko-modal-copy ${
                appearance === 'closed'
                  ? 'text-gray-500'
                  : appearance === 'comingSoon'
                    ? 'text-slate-600'
                    : selected
                      ? 'text-amber-950'
                      : 'text-gray-900'
              }`}
            >
              {venue.title}
            </span>
            <span
              className={`block mt-1 text-sm ko-modal-copy ${
                appearance === 'closed'
                  ? 'text-gray-400'
                  : appearance === 'comingSoon'
                    ? 'text-slate-500'
                    : selected
                      ? 'text-amber-800'
                      : 'text-gray-500'
              }`}
            >
              {venue.schedule}
            </span>
            {venue.comingSoonLabel ? (
              <span
                className={`mt-2 inline-block rounded-md px-2 py-0.5 text-[11px] font-bold tracking-wide ${
                  appearance === 'closed'
                    ? 'bg-gray-300/80 text-gray-600'
                    : appearance === 'comingSoon'
                      ? 'bg-slate-800 text-white'
                      : 'bg-gray-200 text-gray-700'
                }`}
              >
                {venue.comingSoonLabel}
              </span>
            ) : selected ? (
              <span className="mt-2 inline-block rounded-md bg-amber-400 px-2 py-0.5 text-[11px] font-bold text-amber-950">
                신청 가능
              </span>
            ) : null}
          </button>
        )
      })}
    </div>
  )
}
