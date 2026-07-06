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
  additionalNote: string
  assignee?: LeadAssignee
  quality?: LeadQuality
}
