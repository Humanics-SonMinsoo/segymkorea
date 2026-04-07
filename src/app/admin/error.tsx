'use client'

import { useEffect } from 'react'
import Link from 'next/link'

/**
 * /admin 전용 오류 UI — 루트 error.tsx보다 구체적인 안내
 */
export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('[admin]', error)
  }, [error])

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-slate-100">
      <div className="max-w-md w-full rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <p className="text-sm font-semibold text-primary uppercase tracking-wide">SEGYM Admin</p>
        <h1 className="mt-2 text-xl font-bold text-gray-900">관리자 화면을 불러오지 못했습니다</h1>
        <p className="mt-3 text-sm text-gray-600 leading-relaxed">
          배포 직후라면 <strong className="text-gray-800">강력 새로고침</strong>(Ctrl+Shift+R) 또는 시크릿 창에서 다시 시도해 보세요.
          <br />
          문제가 계속되면 브라우저 개발자 도구(F12) → Console 탭의 빨간 오류 메시지를 확인해 주세요.
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
          <Link
            href="/admin/login"
            className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-800 hover:bg-slate-50 transition-colors inline-flex items-center justify-center"
          >
            로그인으로
          </Link>
        </div>
      </div>
    </main>
  )
}
