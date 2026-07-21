'use client'

import { useState } from 'react'
import Link from 'next/link'
import { SEGYM_DAY_COPY } from '@/data/segym-day'
import { SegymDayVenuePicker } from '@/components/segym-day/SegymDayVenuePicker'
import { useSegymDayModal } from '@/components/segym-day/SegymDayContext'
import { trackGa4GenerateLead } from '@/lib/ga4'
import { trackMetaStandard } from '@/lib/meta-pixel'

export function SegymDayApplyContent() {
  const { openAboutModal } = useSegymDayModal()
  const [venueId, setVenueId] = useState('daejeon-one-percent')
  const [centerName, setCenterName] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [additionalNote, setAdditionalNote] = useState('')
  const [privacyAgreed, setPrivacyAgreed] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!venueId) {
      setError('참여 장소를 선택해 주세요.')
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
          venueId,
          centerName: centerName.trim(),
          name: name.trim(),
          phone: phone.trim(),
          additionalNote: additionalNote.trim(),
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(typeof data.error === 'string' ? data.error : '접수에 실패했습니다.')
        return
      }
      setSubmitted(true)
      trackGa4GenerateLead({ form_id: 'segym_day', form_name: 'SEGYM DAY 신청' })
      trackMetaStandard('Lead', { content_name: 'SEGYM DAY 신청', content_category: 'segym_day' })
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch {
      setError('네트워크 오류가 발생했습니다.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-8 sm:p-10 text-center">
        <p className="text-xl font-bold text-gray-900 mb-2">신청이 접수되었습니다</p>
        <p className="text-sm text-gray-600 ko-modal-copy leading-relaxed mb-6">
          담당자가 확인 후 연락드리겠습니다. 조기 마감 시 예약이 종료될 수 있습니다.
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false)
            setVenueId('')
            setCenterName('')
            setName('')
            setPhone('')
            setAdditionalNote('')
            setPrivacyAgreed(false)
          }}
          className="px-6 py-3 rounded-lg border-2 border-gray-200 text-gray-700 font-semibold hover:bg-gray-50"
        >
          추가 신청하기
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <p className="text-sm text-gray-600 ko-modal-copy leading-relaxed">
          참여를 희망하시는 장소를 선택하고 정보를 남겨 주세요.
        </p>
        <button
          type="button"
          onClick={openAboutModal}
          className="shrink-0 px-5 py-2.5 rounded-lg border-2 border-primary/30 text-primary font-semibold hover:bg-primary-muted/40 transition-colors text-sm"
        >
          {SEGYM_DAY_COPY.aboutButton}
        </button>
      </div>

      <section>
        <h2 className="text-lg font-bold text-gray-900 ko-modal-copy mb-3">참여 장소 선택</h2>
        <SegymDayVenuePicker selectedId={venueId} onSelect={setVenueId} />
      </section>

      <section className="rounded-2xl border border-gray-200 bg-gray-50/50 p-5 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-6">
          <div>
            <h2 className="text-lg font-bold text-gray-900 ko-modal-copy">신청 정보 입력</h2>
            <p className="mt-1 text-xs sm:text-sm text-red-600 font-semibold ko-modal-copy">
              ⚡ 신청 기간 7월 21일(화) ~ 8월 10일(월)
            </p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
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
    </div>
  )
}
