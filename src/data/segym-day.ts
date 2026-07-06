export type SegymDayVenue = {
  id: string
  title: string
  schedule: string
  selectable: boolean
  comingSoonLabel?: string
}

export const SEGYM_DAY_HERO_IMAGE = '/images/segym-day/segym-day-hero.png'

export const SEGYM_DAY_CAROUSEL_IMAGES = [
  '/images/segym-day/segym-day-1.png',
  '/images/segym-day/segym-day-2.png',
  '/images/segym-day/segym-day-3.png',
  '/images/segym-day/segym-day-4.png',
  '/images/segym-day/segym-day-5.png',
  '/images/segym-day/segym-day-6.png',
  '/images/segym-day/segym-day-7.png',
] as const

export const SEGYM_DAY_VENUES: SegymDayVenue[] = [
  {
    id: 'suwon-allright',
    title: '수원 올라잇짐',
    schedule: '7월 15일 오후 2시',
    selectable: true,
  },
  {
    id: 'gangwon',
    title: '강원도',
    schedule: '7월 중순 예정',
    selectable: false,
    comingSoonLabel: '일정 확정 중',
  },
  {
    id: 'busan',
    title: '부산',
    schedule: '7월 말 예정',
    selectable: false,
    comingSoonLabel: '일정 확정 중',
  },
  {
    id: 'daejeon',
    title: '대전',
    schedule: '8월 초 예정',
    selectable: false,
    comingSoonLabel: '일정 확정 중',
  },
]

export function getSegymDayVenueById(id: string): SegymDayVenue | undefined {
  return SEGYM_DAY_VENUES.find((v) => v.id === id)
}

export function isSegymDayVenueSelectable(venue: SegymDayVenue): boolean {
  return venue.selectable
}

export const SEGYM_DAY_COPY = {
  navLabel: 'SEGYM DAY',
  pageTitle: 'SEGYM DAY 신청',
  pageDescription:
    '가격 인상 전 최저가로 세짐을 선점할 수 있는 마지막 기회. 수원 올라잇짐에서 진행되는 프라이빗 SEGYM DAY에 참여해 보세요.',
  applyButton: 'SEGYM DAY 신청하기',
  aboutButton: '이벤트 알아보기',
  popupStorageKey: 'segym-day-popup-dismissed-v1',
} as const
