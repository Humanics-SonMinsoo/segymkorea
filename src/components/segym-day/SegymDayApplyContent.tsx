'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { getSegymDayVenueById } from '@/data/segym-day'
import { useModalEnterAnimation } from '@/hooks/useModalEnterAnimation'
import { trackGa4GenerateLead } from '@/lib/ga4'
import { trackMetaStandard } from '@/lib/meta-pixel'

const ATTENDEE_OPTIONS = ['1명', '2명', '3명', '4명', '5명', '6명', '7명', '8명', '9명', '10명'] as const
const FIXED_VENUE_ID = 'busan-gundam'

function SegymDaySuccessModal({
  venueLabel,
  venueSchedule,
  onClose,
  onApplyAgain,
}: {
  venueLabel: string
  venueSchedule: string
  onClose: () => void
  onApplyAgain: () => void
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
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true" aria-labelledby="segym-day-success-title">
      <button
        type="button"
        className={`absolute inset-0 bg-black/60 backdrop-blur-[2px] transition-opacity duration-300 ${
          entered ? 'opacity-100' : 'opacity-0'
        }`}
        aria-label="닫기"
        onClick={onClose}
      />
      <div
        className={`relative z-10 w-full max-w-md rounded-2xl bg-white shadow-2xl border border-gray-100 overflow-hidden transition-[opacity,transform] duration-300 ${
          entered ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-[0.97] translate-y-3'
        }`}
      >
        <div className="bg-gradient-to-br from-primary to-primary-dark px-5 py-6 text-center text-white">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 id="segym-day-success-title" className="text-xl font-bold ko-modal-copy">
            신청이 완료되었습니다
          </h2>
          <p className="mt-1.5 text-sm text-white/90 ko-modal-copy">SEGYM DAY 참가 신청이 접수되었습니다.</p>
        </div>

        <div className="p-5 sm:p-6 space-y-4">
          <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-left">
            <p className="text-sm font-semibold text-amber-950 ko-modal-copy">{venueLabel || '부산 건담짐'}</p>
            <p className="mt-0.5 text-sm text-amber-800 ko-modal-copy">
              {venueSchedule || '8월 27일 오후 12시'}
            </p>
          </div>
          <p className="text-sm text-gray-600 ko-modal-copy leading-relaxed text-center">
            담당자가 확인 후 연락드리겠습니다.
            <br />
            조기 마감 시 예약이 종료될 수 있습니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl bg-primary text-white font-bold hover:bg-primary-dark transition-colors shadow-brand"
            >
              확인
            </button>
            <button
              type="button"
              onClick={onApplyAgain}
              className="flex-1 py-3 rounded-xl border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              추가 신청하기
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function SegymDayApplyContent() {
  const [centerName, setCenterName] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [attendeeCount, setAttendeeCount] = useState('')
  const [additionalNote, setAdditionalNote] = useState('')
  const [privacyAgreed, setPrivacyAgreed] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [successOpen, setSuccessOpen] = useState(false)
  const [submittedVenueLabel, setSubmittedVenueLabel] = useState('')
  const [submittedVenueSchedule, setSubmittedVenueSchedule] = useState('')

  const selectedVenue = useMemo(() => getSegymDayVenueById(FIXED_VENUE_ID), [])

  const resetForm = () => {
    setCenterName('')
    setName('')
    setPhone('')
    setAttendeeCount('')
    setAdditionalNote('')
    setPrivacyAgreed(false)
    setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!selectedVenue) {
      setError('행사 정보를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.')
      return
    }
    if (!centerName.trim() || !name.trim() || !phone.trim()) {
      setError('필수 항목을 모두 입력해 주세요.')
      return
    }
    if (!privacyAgreed) {
      setError('개인정보처리방침에 동의해 주세요.')
      return
    }
    setSubmitting(true)
    try {
      const res = await fetch('/api/segym-day-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          venueId: FIXED_VENUE_ID,
          centerName: centerName.trim(),
          name: name.trim(),
          phone: phone.trim(),
          attendeeCount: attendeeCount.trim(),
          additionalNote: additionalNote.trim(),
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(typeof data.error === 'string' ? data.error : '접수에 실패했습니다.')
        return
      }
      setSubmittedVenueLabel(selectedVenue.title)
      setSubmittedVenueSchedule(selectedVenue.schedule)
      setSuccessOpen(true)
      trackGa4GenerateLead({ form_id: 'segym_day', form_name: 'SEGYM DAY 신청' })
      trackMetaStandard('Lead', { content_name: 'SEGYM DAY 신청', content_category: 'segym_day' })
    } catch {
      setError('네트워크 오류가 발생했습니다.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="space-y-8 pb-28">
      {successOpen ? (
        <SegymDaySuccessModal
          venueLabel={submittedVenueLabel}
          venueSchedule={submittedVenueSchedule}
          onClose={() => setSuccessOpen(false)}
          onApplyAgain={() => {
            setSuccessOpen(false)
            resetForm()
            setSubmittedVenueLabel('')
            setSubmittedVenueSchedule('')
          }}
        />
      ) : null}

      <section className="rounded-2xl border border-gray-200 bg-gray-50/50 p-5 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-6">
          <div>
            <h2 className="text-lg font-bold text-gray-900 ko-modal-copy">신청 정보 입력</h2>
            <p className="mt-1 text-xs sm:text-sm text-red-600 font-semibold ko-modal-copy">
              ⚡ 신청 마감 8월 26일(수) · 행사 8월 27일(목) 오후 12시
            </p>
          </div>
        </div>
        <form id="segym-day-apply-form" onSubmit={handleSubmit} className="space-y-4 max-w-2xl pb-24">
          <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
            <p className="text-sm font-semibold text-amber-950 ko-modal-copy">
              {selectedVenue?.title ?? '부산 건담짐'}
            </p>
            <p className="mt-0.5 text-sm text-amber-800 ko-modal-copy">
              {selectedVenue?.schedule ?? '8월 27일 오후 12시'}
            </p>
          </div>

          <div>
            <label htmlFor="sd-center" className="block text-sm font-medium text-gray-700 mb-1">
              센터명 <span className="text-red-500">*</span>
            </label>
            <input
              id="sd-center"
              type="text"
              value={centerName}
              onChange={(e) => setCenterName(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
              placeholder="운영 중인 센터명"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="sd-name" className="block text-sm font-medium text-gray-700 mb-1">
                성함 <span className="text-red-500">*</span>
              </label>
              <input
                id="sd-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                placeholder="대표님 / 관장님 성함"
              />
            </div>
            <div>
              <label htmlFor="sd-phone" className="block text-sm font-medium text-gray-700 mb-1">
                연락처 <span className="text-red-500">*</span>
              </label>
              <input
                id="sd-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                placeholder="010-0000-0000"
              />
            </div>
          </div>
          <div>
            <label htmlFor="sd-attendees" className="block text-sm font-medium text-gray-700 mb-1">
              참여 인원 <span className="text-gray-400 font-normal">(선택)</span>
            </label>
            <select
              id="sd-attendees"
              value={attendeeCount}
              onChange={(e) => setAttendeeCount(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
            >
              <option value="">선택해 주세요</option>
              {ATTENDEE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="sd-note" className="block text-sm font-medium text-gray-700 mb-1">
              궁금하신 점 <span className="text-gray-400 font-normal">(선택)</span>
            </label>
            <textarea
              id="sd-note"
              value={additionalNote}
              onChange={(e) => setAdditionalNote(e.target.value)}
              rows={4}
              maxLength={2000}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none resize-y min-h-[100px]"
              placeholder="도입 검토 단계, 센터 규모, 궁금한 점 등"
            />
          </div>
          <div className="flex items-start gap-3">
            <input
              id="sd-privacy"
              type="checkbox"
              checked={privacyAgreed}
              onChange={(e) => setPrivacyAgreed(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <label htmlFor="sd-privacy" className="text-sm text-gray-700 ko-modal-copy leading-relaxed">
              <Link href="/privacy" className="text-primary font-medium underline underline-offset-2" target="_blank" rel="noopener noreferrer">
                개인정보처리방침
              </Link>
              에 동의합니다. <span className="text-red-500">*</span>
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
            className="w-full sm:w-auto min-w-[200px] py-3.5 px-8 rounded-xl bg-primary text-white font-bold hover:bg-primary-dark transition-colors disabled:opacity-60 shadow-brand"
          >
            {submitting ? '전송 중…' : '지금 신청하기'}
          </button>
        </form>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-[70] pointer-events-none">
        <div className="pointer-events-auto border-t border-primary/20 bg-white/95 backdrop-blur-md shadow-[0_-8px_30px_rgba(0,0,0,0.12)]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-3.5">
            <button
              type="submit"
              form="segym-day-apply-form"
              disabled={submitting}
              className="w-full py-3.5 sm:py-4 rounded-xl bg-primary text-white text-base sm:text-lg font-bold hover:bg-primary-dark transition-colors disabled:opacity-60 shadow-brand"
            >
              {submitting ? '전송 중…' : '지금 신청하기'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
