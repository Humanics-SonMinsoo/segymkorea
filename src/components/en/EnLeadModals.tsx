'use client'

import { useEffect, useState, type ReactNode } from 'react'
import Link from 'next/link'
import { EN_BROCHURE_COPY, EN_INQUIRY_COPY } from '@/data/en/forms'
import { trackGa4GenerateLead } from '@/lib/ga4'
import { trackMetaStandard } from '@/lib/meta-pixel'
import { useModalEnterAnimation } from '@/hooks/useModalEnterAnimation'

function ModalShell({
  title,
  onClose,
  children,
}: {
  title: string
  onClose: () => void
  children: ReactNode
}) {
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

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true">
      <button
        type="button"
        className={`absolute inset-0 bg-black/50 backdrop-blur-[1px] transition-opacity duration-300 ${
          entered ? 'opacity-100' : 'opacity-0'
        }`}
        aria-label="Close"
        onClick={onClose}
      />
      <div
        className={`relative z-10 w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl border border-gray-100 transition-[opacity,transform] duration-300 ${
          entered ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.97]'
        }`}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-gray-100 bg-white px-5 py-3.5 rounded-t-2xl">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
            aria-label="Close"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

export function EnInquiryDialog({ onClose }: { onClose: () => void }) {
  const C = EN_INQUIRY_COPY
  const [centerName, setCenterName] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [availableTime, setAvailableTime] = useState('')
  const [additionalNote, setAdditionalNote] = useState('')
  const [privacyAgreed, setPrivacyAgreed] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!centerName.trim() || !name.trim() || !phone.trim() || !availableTime.trim()) {
      setError(C.requiredError)
      return
    }
    if (!privacyAgreed) {
      setError(C.privacyError)
      return
    }
    setSubmitting(true)
    try {
      const noteParts = ['[EN site inquiry]']
      if (additionalNote.trim()) noteParts.push(additionalNote.trim())
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          inquiryType: 'general',
          centerName: `[EN] ${centerName.trim()}`,
          name: name.trim(),
          phone: phone.trim(),
          availableTime: availableTime.trim(),
          additionalNote: noteParts.join('\n'),
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(typeof data.error === 'string' ? data.error : C.networkError)
        return
      }
      setSubmitted(true)
      trackGa4GenerateLead({ form_id: 'segym_inquiry_en', form_name: 'EN Inquiry' })
      trackMetaStandard('Lead', { content_name: 'EN Inquiry', content_category: 'segym_inquiry_en' })
    } catch {
      setError(C.networkError)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <ModalShell title={C.inquireTitle} onClose={onClose}>
      {submitted ? (
        <div className="px-5 py-10 text-center">
          <p className="text-lg font-semibold text-gray-900 mb-2">{C.successTitle}</p>
          <p className="text-sm text-gray-600 mb-6">{C.successBody}</p>
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary-dark"
          >
            Close
          </button>
        </div>
      ) : (
        <>
          <div className="px-5 py-3.5 bg-gray-50/90 border-b border-gray-100">
            <p className="text-sm text-gray-600 leading-relaxed">{C.generalIntro}</p>
          </div>
          <form onSubmit={handleSubmit} className="px-5 py-5 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {C.centerName} <span className="text-red-500">*</span>
              </label>
              <input
                value={centerName}
                onChange={(e) => setCenterName(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                placeholder={C.centerPlaceholder}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {C.name} <span className="text-red-500">*</span>
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder={C.namePlaceholder}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {C.phone} <span className="text-red-500">*</span>
                </label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder={C.phonePlaceholder}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {C.availableTime} <span className="text-red-500">*</span>
              </label>
              <input
                value={availableTime}
                onChange={(e) => setAvailableTime(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                placeholder={C.availableTimePlaceholder}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{C.additionalNoteOptional}</label>
              <textarea
                value={additionalNote}
                onChange={(e) => setAdditionalNote(e.target.value)}
                rows={3}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-y"
                placeholder={C.additionalNotePlaceholder}
              />
            </div>
            <div className="flex items-start gap-3">
              <input
                id="en-inquiry-privacy"
                type="checkbox"
                checked={privacyAgreed}
                onChange={(e) => setPrivacyAgreed(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-gray-300 text-primary"
              />
              <label htmlFor="en-inquiry-privacy" className="text-sm text-gray-700">
                {C.privacyAgreePrefix}{' '}
                <Link href="/privacy" target="_blank" className="text-primary font-medium underline underline-offset-2">
                  {C.privacyLink}
                </Link>
                <span className="text-red-500"> *</span>
              </label>
            </div>
            {error ? (
              <p className="text-sm text-red-600" role="alert">
                {error}
              </p>
            ) : null}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary-dark disabled:opacity-60"
            >
              {submitting ? C.submitting : C.submit}
            </button>
          </form>
        </>
      )}
    </ModalShell>
  )
}

export function EnBrochureDialog({ onClose }: { onClose: () => void }) {
  const C = EN_BROCHURE_COPY
  const [email, setEmail] = useState('')
  const [centerName, setCenterName] = useState('')
  const [phone, setPhone] = useState('')
  const [privacyAgreed, setPrivacyAgreed] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!email.trim() || !centerName.trim() || !phone.trim()) {
      setError(C.requiredError)
      return
    }
    if (!privacyAgreed) {
      setError(C.privacyError)
      return
    }
    setSubmitting(true)
    try {
      const res = await fetch('/api/brochure-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          centerName: `[EN] ${centerName.trim()}`,
          phone: phone.trim(),
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(typeof data.error === 'string' ? data.error : C.networkError)
        return
      }
      setSubmitted(true)
      trackGa4GenerateLead({ form_id: 'segym_brochure_en', form_name: 'EN Brochure' })
      trackMetaStandard('Lead', { content_name: 'EN Brochure', content_category: 'segym_brochure_en' })
    } catch {
      setError(C.networkError)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <ModalShell title={C.formTitle} onClose={onClose}>
      {submitted ? (
        <div className="px-5 py-10 text-center">
          <p className="text-lg font-semibold text-gray-900 mb-2">{C.successTitle}</p>
          <p className="text-sm text-gray-600 mb-6">{C.successBody}</p>
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary-dark"
          >
            Close
          </button>
        </div>
      ) : (
        <>
          <div className="px-5 py-3.5 bg-gray-50/90 border-b border-gray-100">
            <p className="text-sm text-gray-600 leading-relaxed">{C.formIntro}</p>
          </div>
          <form onSubmit={handleSubmit} className="px-5 py-5 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {C.email} <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                placeholder={C.emailPlaceholder}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {C.centerName} <span className="text-red-500">*</span>
              </label>
              <input
                value={centerName}
                onChange={(e) => setCenterName(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                placeholder={C.centerPlaceholder}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {C.phone} <span className="text-red-500">*</span>
              </label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                placeholder={C.phonePlaceholder}
              />
            </div>
            <div className="flex items-start gap-3">
              <input
                id="en-brochure-privacy"
                type="checkbox"
                checked={privacyAgreed}
                onChange={(e) => setPrivacyAgreed(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-gray-300 text-primary"
              />
              <label htmlFor="en-brochure-privacy" className="text-sm text-gray-700">
                {C.privacyAgreePrefix}{' '}
                <Link href="/privacy" target="_blank" className="text-primary font-medium underline underline-offset-2">
                  {C.privacyLink}
                </Link>
                <span className="text-red-500"> *</span>
              </label>
            </div>
            {error ? (
              <p className="text-sm text-red-600" role="alert">
                {error}
              </p>
            ) : null}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary-dark disabled:opacity-60"
            >
              {submitting ? C.submitting : C.submit}
            </button>
          </form>
        </>
      )}
    </ModalShell>
  )
}
