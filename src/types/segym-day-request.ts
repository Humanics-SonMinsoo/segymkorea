import type { LeadAssignee, LeadQuality } from '@/types/lead'

export type SegymDayRequest = {
  id: string
  createdAt: string
  venueId: string
  venueLabel: string
  venueSchedule: string
  centerName: string
  name: string
  phone: string
  /** 참여 인원 (선택) — 예: "2명" */
  attendeeCount?: string
  additionalNote: string
  assignee?: LeadAssignee
  quality?: LeadQuality
}
