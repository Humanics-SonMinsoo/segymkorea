'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import Link from 'next/link'
import { useModalEnterAnimation } from '@/hooks/useModalEnterAnimation'

type BrochureModalContextValue = {
  openBrochureModal: () => void
  closeBrochureModal: () => void
}

const BrochureModalContext = createContext<BrochureModalContextValue | null>(null)

export function useBrochureModal() {
  const ctx = useContext(BrochureModalContext)
  if (!ctx) {
    throw new Error('useBrochureModal은 BrochureModalProvider 안에서만 사용할 수 있습니다.')
  }
  return ctx
}

function BrochureModalDialog({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState('')
  const [centerName, setCenterName] = useState('')
  const [phone, setPhone] = useState('')
  const [privacyAgreed, setPrivacyAgreed] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!email.trim() || !centerName.trim() || !phone.trim()) {
      setError('필수 항목을 모두 입력해 주세요.')
      return
    }
    if (!privacyAgreed) {
      setError('개인정보처리방침에 동의해 주세요.')
      return
    }
    setSubmitting(true)
    try {
      const res = await fetch('/api/brochure-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          centerName: centerName.trim(),
          phone: phone.trim(),
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(typeof data.error === 'string' ? data.error : '접수에 실패했습니다. 잠시 후 다시 시도해 주세요.')
        return
      }
      setSubmitted(true)
    } catch {
      setError('네트워크 오류가 발생했습니다.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleClose = () => {
    setSubmitted(false)
    setEmail('')
    setCenterName('')
    setPhone('')
    setPrivacyAgreed(false)
    setError(null)
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="brochure-modal-title"
    >
      <button
        type="button"
        className={`absolute inset-0 bg-black/50 backdrop-blur-[1px] transition-opacity duration-300 ease-out motion-reduce:transition-none ${
          entered ? 'opacity-100' : 'opacity-0'
        }`}
        aria-label="닫기"
        onClick={handleClose}
      />
      <div
        className={`relative z-10 w-full max-w-lg sm:max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl border border-gray-100 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:scale-100 ${
          entered ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-[0.97] translate-y-3'
        }`}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-gray-100 bg-white px-5 py-3.5 sm:py-4 rounded-t-2xl">
          <h2 id="brochure-modal-title" className="text-lg sm:text-xl font-bold text-gray-900 min-w-0 pr-2">
            소개서 받기
          </h2>
          <button
            type="button"
            onClick={handleClose}
            className="shrink-0 rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-800 -mr-1"
            aria-label="모달 닫기"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {!submitted && (
          <div className="px-5 py-3.5 sm:py-4 bg-gray-50/90 border-b border-gray-100">
            <p className="ko-modal-copy text-sm sm:text-[15px] text-gray-600 leading-[1.65]">
              아래 정보를 남겨 주시면, 등록하신 이메일로 세짐 소개서(PDF)를 보내 드립니다.
            </p>
          </div>
        )}

        {submitted ? (
          <div className="px-5 py-10 text-center">
            <p className="text-lg font-semibold text-gray-900 mb-2">접수되었습니다</p>
            <p className="ko-modal-copy text-sm sm:text-[15px] text-gray-600 mb-6 leading-[1.65] max-w-md mx-auto">
              확인 후 소개서를 이메일로 발송해 드리겠습니다.
            </p>
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary-dark transition-colors"
            >
              확인
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-5 py-5 sm:py-6 space-y-4">
            <div>
              <label htmlFor="brochure-email" className="block text-sm font-medium text-gray-700 mb-1">
                이메일 <span className="text-red-500">*</span>
              </label>
              <input
                id="brochure-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-shadow"
                placeholder="name@example.com"
                autoComplete="email"
              />
            </div>
            <div>
              <label htmlFor="brochure-center" className="block text-sm font-medium text-gray-700 mb-1">
                센터명 <span className="text-red-500">*</span>
              </label>
              <input
                id="brochure-center"
                type="text"
                value={centerName}
                onChange={(e) => setCenterName(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-shadow"
                placeholder="헬스장 또는 센터 이름"
                autoComplete="organization"
              />
            </div>
            <div>
              <label htmlFor="brochure-phone" className="block text-sm font-medium text-gray-700 mb-1">
                연락처 <span className="text-red-500">*</span>
              </label>
              <input
                id="brochure-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-shadow"
                placeholder="010-0000-0000"
                autoComplete="tel"
              />
            </div>
            <div className="flex items-start gap-3 pt-1 min-w-0">
              <input
                id="brochure-privacy"
                type="checkbox"
                checked={privacyAgreed}
                onChange={(e) => setPrivacyAgreed(e.target.checked)}
                className="mt-1 h-4 w-4 shrink-0 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <label
                htmlFor="brochure-privacy"
                className="ko-modal-copy min-w-0 text-sm sm:text-[15px] text-gray-700 leading-relaxed"
              >
                <Link
                  href="/privacy"
                  className="text-primary font-medium underline underline-offset-2 hover:text-primary-dark"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  개인정보처리방침
                </Link>
                에 동의합니다. <span className="text-red-500">*</span>
              </label>
            </div>
            {error && (
              <p className="text-sm text-red-600" role="alert">
                {error}
              </p>
            )}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 py-3 rounded-lg border-2 border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
              >
                취소
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary-dark transition-colors disabled:opacity-60"
              >
                {submitting ? '전송 중…' : '신청하기'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export function BrochureModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const openBrochureModal = useCallback(() => setOpen(true), [])
  const closeBrochureModal = useCallback(() => setOpen(false), [])

  return (
    <BrochureModalContext.Provider value={{ openBrochureModal, closeBrochureModal }}>
      {children}
      {open && <BrochureModalDialog onClose={closeBrochureModal} />}
    </BrochureModalContext.Provider>
  )
}
