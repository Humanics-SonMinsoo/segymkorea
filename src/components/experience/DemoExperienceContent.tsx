'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { DEMO_TIME_SLOTS, getDemoCenterById } from '@/data/demo-centers'
import { DEMO_EXPERIENCE_COPY } from '@/lib/demo-experience-copy'
import { DemoCenterPicker } from '@/components/experience/DemoCenterPicker'
import { DemoExperienceGuide } from '@/components/experience/DemoExperienceGuide'
import { InquirySuccessPanel } from '@/components/inquiry/InquirySuccessPanel'
import { buildInquirySubmissionSnapshot, type InquirySubmissionSnapshot } from '@/lib/inquiry-summary'
import { trackGa4GenerateLead } from '@/lib/ga4'
import { trackMetaStandard } from '@/lib/meta-pixel'
import type { DemoScheduleEntry } from '@/types/lead'

const MAX_DEMO_SCHEDULES = 5
const EMPTY_SCHEDULE = (): DemoScheduleEntry => ({ date: '', timeSlot: '' })

function todayDateInputValue(): string {
  return new Date().toLocaleDateString('sv-SE', { timeZone: 'Asia/Seoul' })
}

export function DemoExperienceContent() {
  const [demoCenterId, setDemoCenterId] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [visitorCenterName, setVisitorCenterName] = useState('')
  const [demoSchedules, setDemoSchedules] = useState<DemoScheduleEntry[]>([EMPTY_SCHEDULE()])
  const [additionalNote, setAdditionalNote] = useState('')
  const [privacyAgreed, setPrivacyAgreed] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [submissionSnapshot, setSubmissionSnapshot] = useState<InquirySubmissionSnapshot | null>(null)

  const minDemoDate = useMemo(() => todayDateInputValue(), [])
  const selectedCenter = demoCenterId ? getDemoCenterById(demoCenterId) : undefined

  const updateSchedule = (index: number, patch: Partial<DemoScheduleEntry>) => {
    setDemoSchedules((prev) => prev.map((row, i) => (i === index ? { ...row, ...patch } : row)))
  }

  const addScheduleRow = () => {
    setDemoSchedules((prev) => (prev.length >= MAX_DEMO_SCHEDULES ? prev : [...prev, EMPTY_SCHEDULE()]))
  }

  const removeScheduleRow = (index: number) => {
    setDemoSchedules((prev) => (prev.length <= 1 ? prev : prev.filter((_, i) => i !== index)))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!demoCenterId) {
      setError('체험 센터를 선택해 주세요.')
      return
    }
    if (!name.trim() || !phone.trim()) {
      setError('필수 항목을 모두 입력해 주세요.')
      return
    }
    const filledSchedules = demoSchedules.filter((s) => s.date.trim() && s.timeSlot.trim())
    if (filledSchedules.length === 0) {
      setError('체험 희망 날짜와 시간대를 입력해 주세요.')
      return
    }
    if (!privacyAgreed) {
      setError('개인정보처리방침에 동의해 주세요.')
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          inquiryType: 'demo',
          centerName: visitorCenterName.trim(),
          name: name.trim(),
          phone: phone.trim(),
          demoCenterId,
          demoSchedules: filledSchedules,
          additionalNote: additionalNote.trim(),
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(typeof data.error === 'string' ? data.error : '접수에 실패했습니다. 잠시 후 다시 시도해 주세요.')
        return
      }
      const snapshot = buildInquirySubmissionSnapshot({
        inquiryType: 'demo',
        centerName: '',
        name,
        phone,
        availableTime: '',
        additionalNote,
        demoCenterId,
        demoSchedules,
        visitorCenterName,
      })
      setSubmissionSnapshot(snapshot)
      trackGa4GenerateLead({ form_id: 'segym_demo', form_name: DEMO_EXPERIENCE_COPY.analyticsFormName })
      trackMetaStandard('Lead', {
        content_name: DEMO_EXPERIENCE_COPY.analyticsFormName,
        content_category: 'segym_demo',
      })
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch {
      setError('네트워크 오류가 발생했습니다.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submissionSnapshot) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <InquirySuccessPanel
          snapshot={submissionSnapshot}
          onClose={() => {
            setSubmissionSnapshot(null)
            setDemoCenterId('')
            setName('')
            setPhone('')
            setVisitorCenterName('')
            setDemoSchedules([EMPTY_SCHEDULE()])
            setAdditionalNote('')
            setPrivacyAgreed(false)
          }}
        />
      </div>
    )
  }

  return (
    <div className="space-y-10">
      <DemoExperienceGuide variant="page" />

      <section>
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 ko-modal-copy mb-2">
          {DEMO_EXPERIENCE_COPY.centerSectionTitle}
        </h2>
        <p className="text-sm text-gray-600 ko-modal-copy mb-5 leading-relaxed">
          {DEMO_EXPERIENCE_COPY.centerSectionHint}
        </p>
        <DemoCenterPicker selectedId={demoCenterId} onSelect={setDemoCenterId} variant="page" />
        {selectedCenter?.comingSoon ? (
          <p className="mt-3 text-xs text-amber-700 ko-modal-copy">
            선택하신 센터는 {selectedCenter.comingSoonLabel ?? '오픈 예정'}입니다. 일정 조율 후 연락드립니다.
          </p>
        ) : null}
      </section>

      <section className="rounded-2xl border border-gray-200 bg-gray-50/50 p-5 sm:p-8">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 ko-modal-copy mb-2">신청 정보 입력</h2>
        <p className="text-sm text-gray-600 ko-modal-copy mb-6 leading-relaxed">
          {DEMO_EXPERIENCE_COPY.formIntro}
        </p>
        <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
          <div>
            <label htmlFor="exp-visitor-center" className="block text-sm font-medium text-gray-700 mb-1">
              운영 센터명 <span className="text-gray-400 font-normal">(선택)</span>
            </label>
            <input
              id="exp-visitor-center"
              type="text"
              value={visitorCenterName}
              onChange={(e) => setVisitorCenterName(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
              placeholder="운영 중인 센터가 있다면 입력"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="exp-name" className="block text-sm font-medium text-gray-700 mb-1">
                성함 <span className="text-red-500">*</span>
              </label>
              <input
                id="exp-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                placeholder="담당자 성함"
              />
            </div>
            <div>
              <label htmlFor="exp-phone" className="block text-sm font-medium text-gray-700 mb-1">
                연락처 <span className="text-red-500">*</span>
              </label>
              <input
                id="exp-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                placeholder="010-0000-0000"
              />
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-medium text-gray-700">
              {DEMO_EXPERIENCE_COPY.scheduleLabel} <span className="text-red-500">*</span>
            </p>
            {demoSchedules.map((schedule, index) => (
              <div key={index} className="rounded-xl border border-gray-200 bg-white p-3 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-gray-500">일정 {index + 1}</span>
                  {demoSchedules.length > 1 ? (
                    <button
                      type="button"
                      onClick={() => removeScheduleRow(index)}
                      className="text-xs text-gray-500 hover:text-red-600 font-medium"
                    >
                      삭제
                    </button>
                  ) : null}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="date"
                    value={schedule.date}
                    min={minDemoDate}
                    onChange={(e) => updateSchedule(index, { date: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                  />
                  <select
                    value={schedule.timeSlot}
                    onChange={(e) => updateSchedule(index, { timeSlot: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                  >
                    <option value="">시간대 선택</option>
                    {DEMO_TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
            {demoSchedules.length < MAX_DEMO_SCHEDULES ? (
              <button
                type="button"
                onClick={addScheduleRow}
                className="w-full rounded-lg border-2 border-dashed border-gray-300 py-2.5 text-sm font-semibold text-gray-600 hover:border-primary/50 hover:text-primary transition-colors"
              >
                + 스케줄 추가하기
              </button>
            ) : null}
          </div>

          <div>
            <label htmlFor="exp-note" className="block text-sm font-medium text-gray-700 mb-1">
              궁금한 점 <span className="text-gray-400 font-normal">(선택)</span>
            </label>
            <textarea
              id="exp-note"
              value={additionalNote}
              onChange={(e) => setAdditionalNote(e.target.value)}
              rows={3}
              maxLength={2000}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none resize-y min-h-[80px]"
              placeholder="예: 체험 시 확인하고 싶은 운동, 센터 규모, 도입 검토 단계 등"
            />
          </div>

          <div className="flex items-start gap-3">
            <input
              id="exp-privacy"
              type="checkbox"
              checked={privacyAgreed}
              onChange={(e) => setPrivacyAgreed(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <label htmlFor="exp-privacy" className="text-sm text-gray-700 ko-modal-copy leading-relaxed">
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
            className="w-full sm:w-auto min-w-[200px] py-3.5 px-8 rounded-xl bg-primary text-white font-semibold hover:bg-primary-dark transition-colors disabled:opacity-60"
          >
            {submitting ? '전송 중…' : DEMO_EXPERIENCE_COPY.submitButton}
          </button>
        </form>
      </section>
    </div>
  )
}
