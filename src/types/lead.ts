export type LeadAssignee = '홍창용' | '윤경준' | ''

export type LeadQuality = '유효리드' | '무효리드' | ''

export type Lead = {
  id: string
  createdAt: string
  centerName: string
  name: string
  phone: string
  availableTime: string
  /** 선택 입력: 추가 문의, 요청 사항 */
  additionalNote: string
  assignee: LeadAssignee
  quality: LeadQuality
}

export const LEAD_ASSIGNEES: Exclude<LeadAssignee, ''>[] = ['홍창용', '윤경준']

export const LEAD_QUALITIES: Exclude<LeadQuality, ''>[] = ['유효리드', '무효리드']
