/** 세짐 시연 가능 센터 — 도입 문의 모달 「시연 신청」에서 선택 */
export type DemoCenter = {
  id: string
  name: string
  /** true면 선택 가능하나 오픈 예정 안내 표시 */
  comingSoon?: boolean
  comingSoonLabel?: string
}

export const DEMO_CENTERS: DemoCenter[] = [
  { id: 'hawk-eye', name: '호크아이짐' },
  { id: 'fitness101', name: '피트니스101' },
  { id: 'allright', name: '올라잇짐' },
  { id: 'friend-1', name: '프렌드짐 1호점' },
  { id: 'all-about', name: '올어바웃피트니스' },
  { id: 'one-percent', name: '원퍼센트피트니스', comingSoon: true, comingSoonLabel: '7월 예정' },
  { id: 'gundam', name: '건담짐', comingSoon: true, comingSoonLabel: '7월 예정' },
  { id: 'all-in', name: '올인짐' },
]

export function getDemoCenterById(id: string): DemoCenter | undefined {
  return DEMO_CENTERS.find((c) => c.id === id)
}
