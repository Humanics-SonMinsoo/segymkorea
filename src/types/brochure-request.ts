import type { LeadAssignee, LeadQuality } from '@/types/lead'

export type BrochureRequest = {
  id: string
  createdAt: string
  email: string
  centerName: string
  phone: string
  /** 리드 관리자 — 기존 데이터에는 없을 수 있어 optional */
  assignee?: LeadAssignee
  /** 유효/무효 리드 — 기존 데이터에는 없을 수 있어 optional */
  quality?: LeadQuality
  /** 소개서 전달 완료 여부 */
  delivered?: boolean
}
