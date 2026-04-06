'use client'

import './globals.css'

/**
 * 루트 레이아웃까지 실패할 때 표시 — html/body 포함 필수
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="ko">
      <body className="antialiased bg-gray-50 text-gray-900">
        <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
          <div className="max-w-md w-full rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
            <p className="text-sm font-semibold text-[#4B149B] uppercase tracking-wide">SEGYM</p>
            <h1 className="mt-2 text-xl font-bold ko-modal-copy">심각한 오류가 발생했습니다</h1>
            <p className="mt-3 text-sm text-gray-600 leading-relaxed">
              앱을 다시 불러오려면 아래를 눌러 주세요.
            </p>
            <button
              type="button"
              onClick={() => reset()}
              className="mt-6 rounded-xl bg-[#4B149B] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#3a0f78] transition-colors"
            >
              다시 시도
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}
