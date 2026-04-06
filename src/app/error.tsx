'use client'

import { useEffect } from 'react'

/**
 * 세그먼트 오류 시 표시 (Next.js App Router 필수 오류 UI)
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-16 bg-gray-50">
      <div className="max-w-md w-full rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
        <p className="text-sm font-semibold text-primary uppercase tracking-wide">SEGYM</p>
        <h1 className="mt-2 text-xl font-bold text-gray-900 ko-modal-copy">일시적인 오류가 발생했습니다</h1>
        <p className="mt-3 text-sm text-gray-600 leading-relaxed ko-modal-copy">
          페이지를 불러오는 중 문제가 생겼습니다.
          <br />
          아래 버튼으로 다시 시도하거나, 잠시 후 새로고침 해 주세요.
        </p>
        {process.env.NODE_ENV === 'development' && error.message ? (
          <p className="mt-4 rounded-lg bg-gray-100 p-3 text-left text-xs text-gray-500 font-mono break-all">
            {error.message}
          </p>
        ) : null}
        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={() => reset()}
            className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark transition-colors"
          >
            다시 시도
          </button>
          <a
            href="/"
            className="rounded-xl border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-800 hover:bg-gray-50 transition-colors inline-flex items-center justify-center"
          >
            홈으로
          </a>
        </div>
      </div>
    </main>
  )
}
