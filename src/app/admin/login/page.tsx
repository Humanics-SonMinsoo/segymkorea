'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AdminLoginPage() {
  const router = useRouter()
  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, password }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(typeof data.error === 'string' ? data.error : '로그인에 실패했습니다.')
        return
      }
      router.push('/admin')
      router.refresh()
    } catch {
      setError('네트워크 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-gradient-to-br from-slate-950 via-primary-dark to-slate-900">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M0%200h60v60H0z%22%20fill%3D%22none%22%2F%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22%20fill%3D%22%23fff%22%20opacity%3D%22.06%22%2F%3E%3C%2Fsvg%3E')] opacity-40 pointer-events-none" />

      <div className="relative w-full max-w-md">
        <div className="rounded-2xl bg-white/95 backdrop-blur-sm shadow-2xl shadow-primary/30 border border-white/20 overflow-hidden">
          <div className="bg-gradient-to-r from-primary to-primary-dark px-8 py-6 text-white">
            <p
              className="text-2xl font-bold italic tracking-tight"
              style={{ fontFamily: 'var(--font-segym)' }}
            >
              SEGYM
            </p>
            <p className="text-sm text-white/90 mt-1 font-medium">관리자 콘솔</p>
            <p className="text-xs text-white/70 mt-2">도입 문의, 소개서 요청을 확인합니다.</p>
          </div>

          <form onSubmit={handleSubmit} className="px-8 py-8 space-y-5" autoComplete="off">
            <div>
              <label htmlFor="admin-id" className="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1.5">
                아이디
              </label>
              <input
                id="admin-id"
                name="segym-admin-credential-id"
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50/80 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                placeholder="직접 입력"
                autoComplete="off"
                spellCheck={false}
                data-1p-ignore
                data-lpignore="true"
                data-form-type="other"
                required
              />
            </div>
            <div>
              <label htmlFor="admin-pw" className="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1.5">
                비밀번호
              </label>
              <input
                id="admin-pw"
                name="segym-admin-credential-secret"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50/80 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                placeholder="직접 입력"
                autoComplete="off"
                spellCheck={false}
                data-1p-ignore
                data-lpignore="true"
                data-form-type="other"
                required
              />
            </div>

            {error && (
              <div className="rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-700" role="alert">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary to-primary-dark text-white font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/35 hover:opacity-[0.98] disabled:opacity-50 disabled:shadow-none transition-all"
            >
              {loading ? '로그인 중…' : '로그인'}
            </button>
          </form>

          <div className="px-8 pb-8 -mt-2">
            <Link
              href="/"
              className="flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors"
            >
              <span aria-hidden>←</span> 공식 사이트로 돌아가기
            </Link>
          </div>
        </div>

        <p className="text-center text-xs text-slate-500 mt-6 px-4">
          계정은 <code className="text-slate-400">.env.local</code>에만 두고, 위 칸에는 자동 입력 없이 직접 입력하세요.
        </p>
      </div>
    </main>
  )
}
