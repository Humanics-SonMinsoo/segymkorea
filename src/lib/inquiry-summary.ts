import type { DemoScheduleEntry, LeadInquiryType } from '@/types/lead'
import { getDemoCenterById, type DemoCenter } from '@/data/demo-centers'

export type InquirySubmissionSnapshot = {
  inquiryType: LeadInquiryType
  centerName: string
  name: string
  phone: string
  availableTime: string
  additionalNote: string
  demoCenterId: string
  demoCenterName: string
  demoCenterAddress: string
  demoSchedules: DemoScheduleEntry[]
  visitorCenterName: string
}

const SITE_URL = 'https://segymkorea.com'

function formatSchedules(schedules: DemoScheduleEntry[]): string {
  return schedules
    .filter((s) => s.date.trim() && s.timeSlot.trim())
    .map((s, i) => `  ${i + 1}. ${s.date}  ${s.timeSlot}`)
    .join('\n')
}

export function buildInquirySubmissionSnapshot(input: {
  inquiryType: LeadInquiryType
  centerName: string
  name: string
  phone: string
  availableTime: string
  additionalNote: string
  demoCenterId: string
  demoSchedules: DemoScheduleEntry[]
  visitorCenterName: string
}): InquirySubmissionSnapshot {
  const center = input.demoCenterId ? getDemoCenterById(input.demoCenterId) : undefined
  return {
    inquiryType: input.inquiryType,
    centerName: input.centerName.trim(),
    name: input.name.trim(),
    phone: input.phone.trim(),
    availableTime: input.availableTime.trim(),
    additionalNote: input.additionalNote.trim(),
    demoCenterId: input.demoCenterId,
    demoCenterName: center?.name ?? '',
    demoCenterAddress: center?.address ?? '',
    demoSchedules: input.demoSchedules.filter((s) => s.date.trim() && s.timeSlot.trim()),
    visitorCenterName: input.visitorCenterName.trim(),
  }
}

export function buildInquirySummaryText(snapshot: InquirySubmissionSnapshot): string {
  const lines: string[] = ['[세짐 SEGYM 신청 내역]', '']

  if (snapshot.inquiryType === 'demo') {
    lines.push('■ 세짐 현장 시연 신청', '')
    lines.push(`시연 센터: ${snapshot.demoCenterName}`)
    if (snapshot.demoCenterAddress) {
      lines.push(`주소: ${snapshot.demoCenterAddress}`)
    }
    if (snapshot.visitorCenterName) {
      lines.push(`운영 센터: ${snapshot.visitorCenterName}`)
    }
    lines.push(`성함: ${snapshot.name}`)
    lines.push(`연락처: ${snapshot.phone}`)
    lines.push('희망 일정:')
    lines.push(formatSchedules(snapshot.demoSchedules) || '  (없음)')
    if (snapshot.additionalNote) {
      lines.push(`궁금한 점: ${snapshot.additionalNote}`)
    }
  } else {
    lines.push('■ 도입 상담 신청', '')
    lines.push(`센터명: ${snapshot.centerName}`)
    lines.push(`성함: ${snapshot.name}`)
    lines.push(`연락처: ${snapshot.phone}`)
    lines.push(`상담 가능 시간: ${snapshot.availableTime}`)
    if (snapshot.additionalNote) {
      lines.push(`추가 문의: ${snapshot.additionalNote}`)
    }
  }

  lines.push('', `세짐 공식 사이트: ${SITE_URL}`)
  return lines.join('\n')
}

export function getDemoCenterForSnapshot(centerId: string): DemoCenter | undefined {
  return getDemoCenterById(centerId)
}
