'use client'

import { useCallback, useMemo, useState } from 'react'
import {
  buildInquirySummaryText,
  type InquirySubmissionSnapshot,
} from '@/lib/inquiry-summary'

type Props = {
  snapshot: InquirySubmissionSnapshot
  onClose: () => void
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  if (!value.trim()) return null
  return (
    <div className="flex gap-3 text-sm ko-modal-copy">
      <dt className="shrink-0 w-24 sm:w-28 text-gray-500 font-medium">{label}</dt>
      <dd className="text-gray-900 whitespace-pre-wrap break-words min-w-0 flex-1">{value}</dd>
    </div>
  )
}

export function InquirySuccessPanel({ snapshot, onClose }: Props) {
  const [copyDone, setCopyDone] = useState(false)
  const [shareError, setShareError] = useState<string | null>(null)

  const summaryText = useMemo(() => buildInquirySummaryText(snapshot), [snapshot])

  const scheduleText = snapshot.demoSchedules
    .map((s, i) => `${i + 1}. ${s.date}  ${s.timeSlot}`)
    .join('\n')

  const copySummary = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(summaryText)
      setCopyDone(true)
      setShareError(null)
      window.setTimeout(() => setCopyDone(false), 2500)
    } catch {
      setShareError('복사에 실패했습니다. 아래 내용을 직접 선택해 복사해 주세요.')
    }
  }, [summaryText])

  const shareSummary = useCallback(async () => {
    setShareError(null)
    const title =
      snapshot.inquiryType === 'demo' ? '세짐 시연 신청 내역' : '세짐 도입 상담 신청 내역'
    if (typeof navigator.share === 'function') {
      try {
        await navigator.share({ title, text: summaryText })
        return
      } catch (e) {
        if (e instanceof Error && e.name === 'AbortError') return
      }
    }
    await copySummary()
    setShareError('카카오톡 등에 붙여넣기 할 수 있도록 내용이 복사되었습니다.')
  }, [copySummary, snapshot.inquiryType, summaryText])

  return (
    <div className="px-5 py-6 sm:py-8">
      <p className="text-lg font-semibold text-gray-900 text-center mb-1">신청이 접수되었습니다</p>
      <p className="ko-modal-copy text-sm text-gray-600 text-center mb-5 leading-relaxed">
        {snapshot.inquiryType === 'demo'
          ? '아래 내용을 저장하거나 공유해 두시면 방문 시 편리합니다.'
          : '아래 내용을 저장하거나 공유해 두실 수 있습니다.'}
      </p>

      <div className="rounded-xl border border-gray-200 bg-gray-50/80 p-4 sm:p-5 space-y-3 mb-5 text-left max-h-[min(50vh,360px)] overflow-y-auto">
        <p className="text-xs font-bold uppercase tracking-wide text-primary">
          {snapshot.inquiryType === 'demo' ? '시연 신청 내역' : '도입 상담 신청 내역'}
        </p>
        {snapshot.inquiryType === 'demo' ? (
          <>
            <SummaryRow label="시연 센터" value={snapshot.demoCenterName} />
            <SummaryRow label="주소" value={snapshot.demoCenterAddress} />
            <SummaryRow label="운영 센터" value={snapshot.visitorCenterName} />
            <SummaryRow label="성함" value={snapshot.name} />
            <SummaryRow label="연락처" value={snapshot.phone} />
            <SummaryRow label="희망 일정" value={scheduleText} />
            <SummaryRow label="궁금한 점" value={snapshot.additionalNote} />
          </>
        ) : (
          <>
            <SummaryRow label="센터명" value={snapshot.centerName} />
            <SummaryRow label="성함" value={snapshot.name} />
            <SummaryRow label="연락처" value={snapshot.phone} />
            <SummaryRow label="상담 시간" value={snapshot.availableTime} />
            <SummaryRow label="추가 문의" value={snapshot.additionalNote} />
          </>
        )}
      </div>

      {shareError ? (
        <p className="text-xs text-center text-gray-600 mb-3 ko-modal-copy" role="status">
          {shareError}
        </p>
      ) : null}
      {copyDone ? (
        <p className="text-xs text-center text-green-600 mb-3 font-medium" role="status">
          클립보드에 복사되었습니다
        </p>
      ) : null}

      <div className="flex flex-col sm:flex-row gap-2.5">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 py-3 rounded-lg border-2 border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
        >
          닫기
        </button>
        <button
          type="button"
          onClick={shareSummary}
          className="flex-1 py-3 rounded-lg bg-[#FEE500] text-[#191919] font-semibold hover:bg-[#f5dc00] transition-colors"
        >
          공유하기
        </button>
        <button
          type="button"
          onClick={copySummary}
          className="flex-1 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary-dark transition-colors"
        >
          내용 복사
        </button>
      </div>
      <p className="mt-3 text-[11px] text-gray-400 text-center ko-modal-copy leading-relaxed">
        공유하기는 휴대폰에서 카카오톡 등으로 보낼 수 있습니다. PC에서는 내용 복사를 이용해 주세요.
      </p>
    </div>
  )
}
