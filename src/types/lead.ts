export type LeadAssignee = '홍창용' | '윤경준' | ''

export type LeadQuality = '유효리드' | '무효리드' | ''

export type LeadInquiryType = 'general' | 'demo'

export type Lead = {
  id: string
  createdAt: string
  /** 도입 문의(기본) / 시연 신청 */
  inquiryType: LeadInquiryType
  centerName: string
  name: string
  phone: string
  /** 일반 도입 문의: 상담 가능 시간 */
  availableTime: string
  /** 선택 입력: 추가 문의, 요청 사항 */
  additionalNote: string
  /** 시연 신청: 선택한 시연 센터명 */
  demoCenter?: string
  /** 시연 신청: 희망 날짜 (YYYY-MM-DD) */
  demoDate?: string
  /** 시연 신청: 희망 시간대 */
  demoTimeSlot?: string
  assignee: LeadAssignee
  quality: LeadQuality
}

export const LEAD_ASSIGNEES: Exclude<LeadAssignee, ''>[] = ['홍창용', '윤경준']

export const LEAD_QUALITIES: Exclude<LeadQuality, ''>[] = ['유효리드', '무효리드']
