'use client'

import { useEffect, useState } from 'react'

type Props = {
  src: string
  alt: string
  caption?: string
}

export function ZoomableImage({ src, alt, caption }: Props) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group block w-full text-left rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      >
        <span className="block overflow-hidden rounded-2xl border border-primary/10 bg-white shadow-sm">
          <img src={src} alt={alt} className="w-full h-auto block" />
        </span>
        <span className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-500 ko-modal-copy">
          {caption ? <span className="font-medium text-gray-700">{caption}</span> : null}
          <span>눌러서 크게 보기</span>
        </span>
      </button>

      {open ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6" role="dialog" aria-modal="true" aria-label={alt}>
          <button
            type="button"
            className="absolute inset-0 bg-black/80"
            aria-label="닫기"
            onClick={() => setOpen(false)}
          />
          <div className="relative z-10 max-h-[92vh] w-full max-w-5xl overflow-auto rounded-xl bg-white">
            <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-gray-100 bg-white px-4 py-3">
              <p className="text-sm font-semibold text-gray-900 ko-modal-copy">{caption || alt}</p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="shrink-0 rounded-lg px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100"
              >
                닫기
              </button>
            </div>
            <img src={src} alt={alt} className="w-full h-auto block" />
          </div>
        </div>
      ) : null}
    </>
  )
}
