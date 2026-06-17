/** 세짐 시연 가능 센터 — 도입 문의 모달 「현장 시연 신청」에서 선택 */
export type DemoCenter = {
  id: string
  name: string
  /** 지역·동네 (예: 서울 명동) — 카드에 작은 글씨로 표시 */
  location?: string
  /** 시·도 포함 전체 주소 — 신청 완료 화면에 표시 */
  address?: string
  /** 상단 HOT 강조 */
  featured?: boolean
  /** 선택 불가 (오픈 예정 등) */
  disabled?: boolean
  comingSoon?: boolean
  comingSoonLabel?: string
}

export const DEMO_TIME_SLOTS = [
  '09:00~10:00',
  '10:00~11:00',
  '11:00~12:00',
  '12:00~13:00',
  '13:00~14:00',
  '14:00~15:00',
  '15:00~16:00',
  '16:00~17:00',
  '17:00~18:00',
  '18:00~19:00',
  '19:00~20:00',
] as const

/** 노출 순서: HOT → 이용 가능 → 오픈 예정(비활성) */
export const DEMO_CENTERS: DemoCenter[] = [
  {
    id: 'allright',
    name: '올라잇짐',
    location: '경기 수원 영통',
    address: '경기도 수원시 영통구 영통로 136 지하1층 B01, B02호',
    featured: true,
  },
  {
    id: 'fitness101',
    name: '피트니스 101',
    location: '서울 명동',
    address: '서울특별시 중구 삼일대로 343 대신파이낸스센터 지하2층',
  },
  {
    id: 'hawk-eye',
    name: '호크아이짐 2호점',
    location: '강원 원주',
    address: '강원특별자치도 원주시 오리현길 36',
  },
  {
    id: 'friend-1',
    name: '프렌드짐 1호점',
    location: '경기 시흥',
    address: '경기도 시흥시 중심상가2길 20-5 JUJ빌딩 5층',
  },
  {
    id: 'team-h',
    name: '팀에이치짐',
    location: '경기 화성 병점',
    address: '경기도 화성시 병점구 효행로 1069 메디피아 9층',
  },
  {
    id: 'all-in',
    name: '올인짐 본점',
    location: '경기 의정부',
    address: '경기도 의정부시 충의로 25 5층 501~508호',
  },
  {
    id: 'one-percent',
    name: '원퍼센트피트니스',
    location: '대전 대덕구',
    comingSoon: true,
    comingSoonLabel: '7월 예정',
    disabled: true,
  },
  {
    id: 'gundam',
    name: '건담짐',
    location: '부산 동래구',
    comingSoon: true,
    comingSoonLabel: '7월 예정',
    disabled: true,
  },
]

export function getDemoCenterById(id: string): DemoCenter | undefined {
  return DEMO_CENTERS.find((c) => c.id === id)
}

export function isDemoCenterSelectable(center: DemoCenter): boolean {
  return !center.disabled
}
