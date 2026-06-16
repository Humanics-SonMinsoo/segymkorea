'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import Link from 'next/link'
import { DEMO_CENTERS, DEMO_TIME_SLOTS, isDemoCenterSelectable } from '@/data/demo-centers'
import { trackGa4GenerateLead } from '@/lib/ga4'
import { trackMetaStandard } from '@/lib/meta-pixel'
import { useModalEnterAnimation } from '@/hooks/useModalEnterAnimation'
import type { DemoScheduleEntry, LeadInquiryType } from '@/types/lead'

type InquiryModalContextValue = {
  openInquiryModal: () => void
  closeInquiryModal: () => void
}

type ModalStep = 'choose' | 'form'

const MAX_DEMO_SCHEDULES = 5

const EMPTY_SCHEDULE = (): DemoScheduleEntry => ({ date: '', timeSlot: '' })

const InquiryModalContext = createContext<InquiryModalContextValue | null>(null)

export function useInquiryModal() {
  const ctx = useContext(InquiryModalContext)
  if (!ctx) {
    throw new Error('useInquiryModal은 InquiryModalProvider 안에서만 사용할 수 있습니다.')
  }
  return ctx
}

function todayDateInputValue(): string {
  return new Date().toLocaleDateString('sv-SE', { timeZone: 'Asia/Seoul' })
}

function InquiryModalDialog({ onClose }: { onClose: () => void }) {
  const [modalStep, setModalStep] = useState<ModalStep>('choose')
  const [inquiryType, setInquiryType] = useState<LeadInquiryType>('general')
  const [centerName, setCenterName] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [availableTime, setAvailableTime] = useState('')
  const [additionalNote, setAdditionalNote] = useState('')
  const [demoCenterId, setDemoCenterId] = useState('')
  const [demoSchedules, setDemoSchedules] = useState<DemoScheduleEntry[]>([EMPTY_SCHEDULE()])
  const [visitorCenterName, setVisitorCenterName] = useState('')
  const [privacyAgreed, setPrivacyAgreed] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const entered = useModalEnterAnimation()

  const minDemoDate = useMemo(() => todayDateInputValue(), [])

  const modalTitle =
    modalStep === 'choose'
      ? '문의 · 시연'
      : inquiryType === 'demo'
        ? '시연 신청'
        : '도입 상담 신청'

  const introCopy =
    inquiryType === 'general'
      ? '아래 정보를 남겨 주시면, 세짐 영업 담당자가 확인 후 빠르게 연락드립니다.'
      : '시연 센터를 선택하고 희망 일정을 남겨 주시면, 담당자가 확인 후 연락드립니다.'

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

  const resetForm = () => {
    setModalStep('choose')
    setInquiryType('general')
    setCenterName('')
    setName('')
    setPhone('')
    setAvailableTime('')
    setAdditionalNote('')
    setDemoCenterId('')
    setDemoSchedules([EMPTY_SCHEDULE()])
    setVisitorCenterName('')
    setPrivacyAgreed(false)
    setError(null)
    setSubmitted(false)
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  const goToChoose = () => {
    setModalStep('choose')
    setError(null)
  }

  const pickInquiryType = (type: LeadInquiryType) => {
    setInquiryType(type)
    setModalStep('form')
    setError(null)
  }

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

    if (!name.trim() || !phone.trim()) {
      setError('필수 항목을 모두 입력해 주세요.')
      return
    }
    if (!privacyAgreed) {
      setError('개인정보처리방침에 동의해 주세요.')
      return
    }

    if (inquiryType === 'general') {
      if (!centerName.trim() || !availableTime.trim()) {
        setError('필수 항목을 모두 입력해 주세요.')
        return
      }
    } else {
      if (!demoCenterId) {
        setError('시연 센터를 선택해 주세요.')
        return
      }
      const filledSchedules = demoSchedules.filter((s) => s.date.trim() && s.timeSlot.trim())
      if (filledSchedules.length === 0) {
        setError('시연 희망 날짜와 시간대를 입력해 주세요.')
        return
      }
      const hasPartial = demoSchedules.some(
        (s) => (s.date.trim() && !s.timeSlot.trim()) || (!s.date.trim() && s.timeSlot.trim()),
      )
      if (hasPartial) {
        setError('입력 중인 일정의 날짜와 시간대를 모두 선택해 주세요.')
        return
      }
    }

    setSubmitting(true)
    try {
      const body =
        inquiryType === 'general'
          ? {
              inquiryType: 'general',
              centerName: centerName.trim(),
              name: name.trim(),
              phone: phone.trim(),
              availableTime: availableTime.trim(),
              additionalNote: additionalNote.trim(),
            }
          : {
              inquiryType: 'demo',
              centerName: visitorCenterName.trim(),
              name: name.trim(),
              phone: phone.trim(),
              demoCenterId,
              demoSchedules: demoSchedules.filter((s) => s.date.trim() && s.timeSlot.trim()),
              additionalNote: additionalNote.trim(),
            }

      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(typeof data.error === 'string' ? data.error : '접수에 실패했습니다. 잠시 후 다시 시도해 주세요.')
        return
      }
      setSubmitted(true)
      const formName = inquiryType === 'demo' ? '시연 신청' : '도입 문의'
      const formId = inquiryType === 'demo' ? 'segym_demo' : 'segym_inquiry'
      trackGa4GenerateLead({ form_id: formId, form_name: formName })
      trackMetaStandard('Lead', {
        content_name: formName,
        content_category: formId,
      })
    } catch {
      setError('네트워크 오류가 발생했습니다.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="inquiry-modal-title"
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
        <div className="sticky top-0 z-10 flex items-center gap-2 border-b border-gray-100 bg-white px-5 py-3.5 sm:py-4 rounded-t-2xl">
          {modalStep === 'form' && !submitted ? (
            <button
              type="button"
              onClick={goToChoose}
              className="shrink-0 rounded-lg p-2 -ml-1 text-gray-500 hover:bg-gray-100 hover:text-gray-800"
              aria-label="이전으로"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          ) : null}
          <h2 id="inquiry-modal-title" className="text-lg sm:text-xl font-bold text-gray-900 min-w-0 flex-1 pr-2">
            {modalTitle}
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

        {submitted ? (
          <div className="px-5 py-10 text-center">
            <p className="text-lg font-semibold text-gray-900 mb-2">신청이 접수되었습니다</p>
            <p className="ko-modal-copy text-sm sm:text-[15px] text-gray-600 mb-6 leading-[1.65] max-w-md mx-auto">
              {inquiryType === 'demo'
                ? '시연 일정 확인 후 빠른 시일 내에 연락드리겠습니다.'
                : '빠른 시일 내에 연락드리겠습니다.'}
            </p>
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary-dark transition-colors"
            >
              확인
            </button>
          </div>
        ) : modalStep === 'choose' ? (
          <div className="px-5 py-8 sm:py-10">
            <p className="ko-modal-copy text-sm sm:text-[15px] text-gray-600 text-center leading-[1.65] mb-8">
              원하시는 항목을 선택해 주세요.
            </p>
            <div className="flex flex-col gap-3 sm:gap-4 max-w-sm mx-auto">
              <button
                type="button"
                onClick={() => pickInquiryType('general')}
                className="w-full rounded-2xl border-2 border-primary bg-primary px-5 py-4 sm:py-5 text-center text-white shadow-brand hover:bg-primary-dark transition-colors"
              >
                <span className="block font-bold text-base sm:text-lg ko-modal-copy">도입 상담 신청</span>
                <span className="block mt-1 text-xs sm:text-sm font-normal text-white/85 ko-modal-copy">
                  담당자가 연락드려 도입을 안내해 드립니다
                </span>
              </button>
              <button
                type="button"
                onClick={() => pickInquiryType('demo')}
                className="w-full rounded-2xl border-2 border-primary/30 bg-white px-5 py-4 sm:py-5 text-center text-primary hover:border-primary hover:bg-primary-muted/40 transition-colors"
              >
                <span className="block font-bold text-base sm:text-lg ko-modal-copy">시연 신청</span>
                <span className="block mt-1 text-xs sm:text-sm font-normal text-gray-500 ko-modal-copy">
                  시연 센터에서 세짐을 직접 체험해 보세요
                </span>
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="px-5 py-3.5 sm:py-4 bg-gray-50/90 border-b border-gray-100">
              <p className="ko-modal-copy text-sm sm:text-[15px] text-gray-600 leading-[1.65]">{introCopy}</p>
            </div>
            <form onSubmit={handleSubmit} className="px-5 py-5 sm:py-6 space-y-4">
              {inquiryType === 'demo' ? (
                <>
                  <div>
                    <p className="block text-sm font-medium text-gray-700 mb-2">
                      시연 센터 선택 <span className="text-red-500">*</span>
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {DEMO_CENTERS.map((center) => {
                        const selectable = isDemoCenterSelectable(center)
                        const selected = demoCenterId === center.id
                        return (
                          <button
                            key={center.id}
                            type="button"
                            disabled={!selectable}
                            onClick={() => selectable && setDemoCenterId(center.id)}
                            className={`relative rounded-xl border px-3 py-3 text-left transition-colors ${
                              !selectable
                                ? 'border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed'
                                : selected
                                  ? 'border-primary bg-primary-muted ring-2 ring-primary/20'
                                  : center.featured
                                    ? 'border-primary/40 bg-white hover:border-primary hover:bg-primary-muted/30'
                                    : 'border-gray-200 bg-white hover:border-primary/40 hover:bg-gray-50'
                            }`}
                            aria-pressed={selected}
                            aria-disabled={!selectable}
                          >
                            {center.featured ? (
                              <span className="absolute right-2 top-2 rounded-md bg-red-500 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                                HOT
                              </span>
                            ) : null}
                            <span className="block text-sm font-semibold text-gray-900 ko-modal-copy pr-10">
                              {center.name}
                              {center.location ? (
                                <span className="font-normal text-gray-400 text-xs sm:text-[13px]">
                                  {' '}
                                  - {center.location}
                                </span>
                              ) : null}
                            </span>
                            {center.comingSoon ? (
                              <span className="mt-1.5 inline-block rounded-md bg-amber-100 px-1.5 py-0.5 text-[11px] font-semibold text-amber-800">
                                {center.comingSoonLabel ?? '오픈 예정'}
                              </span>
                            ) : null}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="demo-visitor-center" className="block text-sm font-medium text-gray-700 mb-1">
                      운영 센터명 <span className="text-gray-400 font-normal">(선택)</span>
                    </label>
                    <input
                      id="demo-visitor-center"
                      type="text"
                      value={visitorCenterName}
                      onChange={(e) => setVisitorCenterName(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-shadow"
                      placeholder="운영 중인 센터가 있다면 입력"
                      autoComplete="organization"
                    />
                  </div>
                </>
              ) : (
                <div>
                  <label htmlFor="inquiry-center" className="block text-sm font-medium text-gray-700 mb-1">
                    센터명 <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="inquiry-center"
                    type="text"
                    value={centerName}
                    onChange={(e) => setCenterName(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-shadow"
                    placeholder="헬스장 또는 센터 이름"
                    autoComplete="organization"
                  />
                </div>
              )}

              <div>
                <label htmlFor="inquiry-name" className="block text-sm font-medium text-gray-700 mb-1">
                  성함 <span className="text-red-500">*</span>
                </label>
                <input
                  id="inquiry-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-shadow"
                  placeholder="담당자 성함"
                  autoComplete="name"
                />
              </div>
              <div>
                <label htmlFor="inquiry-phone" className="block text-sm font-medium text-gray-700 mb-1">
                  연락처 <span className="text-red-500">*</span>
                </label>
                <input
                  id="inquiry-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-shadow"
                  placeholder="010-0000-0000"
                  autoComplete="tel"
                />
              </div>

              {inquiryType === 'general' ? (
                <div>
                  <label htmlFor="inquiry-time" className="block text-sm font-medium text-gray-700 mb-1">
                    상담 가능한 시간 <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="inquiry-time"
                    value={availableTime}
                    onChange={(e) => setAvailableTime(e.target.value)}
                    rows={3}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-shadow resize-y min-h-[88px]"
                    placeholder="예: 평일 14:00~18:00, 주말 10:00~12:00"
                  />
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-sm font-medium text-gray-700">
                    시연 희망 일정 <span className="text-red-500">*</span>
                  </p>
                  {demoSchedules.map((schedule, index) => (
                    <div
                      key={index}
                      className="rounded-xl border border-gray-200 bg-gray-50/50 p-3 space-y-2"
                    >
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
                        <div>
                          <label htmlFor={`demo-date-${index}`} className="sr-only">
                            시연 희망 날짜
                          </label>
                          <input
                            id={`demo-date-${index}`}
                            type="date"
                            value={schedule.date}
                            min={minDemoDate}
                            onChange={(e) => updateSchedule(index, { date: e.target.value })}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-shadow"
                          />
                        </div>
                        <div>
                          <label htmlFor={`demo-time-${index}`} className="sr-only">
                            시연 희망 시간대
                          </label>
                          <select
                            id={`demo-time-${index}`}
                            value={schedule.timeSlot}
                            onChange={(e) => updateSchedule(index, { timeSlot: e.target.value })}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-shadow"
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
                    </div>
                  ))}
                  {demoSchedules.length < MAX_DEMO_SCHEDULES ? (
                    <button
                      type="button"
                      onClick={addScheduleRow}
                      className="w-full rounded-lg border-2 border-dashed border-gray-300 py-2.5 text-sm font-semibold text-gray-600 hover:border-primary/50 hover:text-primary hover:bg-primary-muted/20 transition-colors"
                    >
                      + 스케줄 추가하기
                    </button>
                  ) : (
                    <p className="text-xs text-gray-400 text-center">최대 {MAX_DEMO_SCHEDULES}개까지 추가할 수 있습니다.</p>
                  )}
                </div>
              )}

              <div>
                <label htmlFor="inquiry-note" className="block text-sm font-medium text-gray-700 mb-1">
                  {inquiryType === 'demo' ? '궁금한 점' : '추가 문의사항'}{' '}
                  <span className="text-gray-400 font-normal">(선택)</span>
                </label>
                <textarea
                  id="inquiry-note"
                  value={additionalNote}
                  onChange={(e) => setAdditionalNote(e.target.value)}
                  rows={3}
                  maxLength={2000}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-shadow resize-y min-h-[80px]"
                  placeholder={
                    inquiryType === 'demo'
                      ? '예: 시연 시 확인하고 싶은 운동, 센터 규모, 도입 검토 단계 등'
                      : '예: 도입 희망 시기, 센터 규모, 문의하고 싶은 제품 등'
                  }
                />
              </div>

              <div className="flex items-start gap-3 pt-1 min-w-0">
                <input
                  id="inquiry-privacy"
                  type="checkbox"
                  checked={privacyAgreed}
                  onChange={(e) => setPrivacyAgreed(e.target.checked)}
                  className="mt-1 h-4 w-4 shrink-0 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <label
                  htmlFor="inquiry-privacy"
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
                  onClick={goToChoose}
                  className="flex-1 py-3 rounded-lg border-2 border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
                >
                  이전
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary-dark transition-colors disabled:opacity-60"
                >
                  {submitting ? '전송 중…' : inquiryType === 'demo' ? '시연 신청하기' : '신청하기'}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

export function InquiryModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const openInquiryModal = useCallback(() => setOpen(true), [])
  const closeInquiryModal = useCallback(() => setOpen(false), [])

  return (
    <InquiryModalContext.Provider value={{ openInquiryModal, closeInquiryModal }}>
      {children}
      {open && <InquiryModalDialog onClose={closeInquiryModal} />}
    </InquiryModalContext.Provider>
  )
}
