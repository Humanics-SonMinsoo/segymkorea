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
    '선착순 20명 한정 · 7월 13일(월) 마감. 가격 인상 전 최저가로 세짐을 선점할 수 있는 마지막 기회, 수원 올라잇짐 SEGYM DAY에 참여해 보세요.',
  applyButton: 'SEGYM DAY 신청하기',
  aboutButton: '이벤트 알아보기',
  popupStorageKey: 'segym-day-popup-dismissed-v1',
  urgencyLimited: '선착순 20명',
  urgencyHeadline: '지금 신청하지 않으면 자리가 없어질 수 있습니다',
  urgencySubline:
    '1차 수원 올라잇짐 SEGYM DAY는 선착순 20명만 참여 가능합니다. 20명 마감 시 예약 창은 즉시 닫힙니다.',
  deadlineLabel: '7월 13일(월)',
  shareCardTitle: 'SEGYM DAY',
  shareOgDescription: '헬스장 대표님, SEGYM DAY에 당신을 초대합니다. 선착순 20명 · 7월 13일(월) 마감',
  shareInviteLine: '헬스장 대표님, SEGYM DAY에 당신을 초대합니다.',
  shareEventWhen: '수원 올라잇짐 · 7월 15일(수) 오후 2시',
  shareInviteBody:
    '가격 인상 전, 최저가로 세짐을 선점하고 하반기 신기능까지 묶어둘 수 있는 마지막 기회입니다.',
  shareKakaoDescription:
    '당신을 초대합니다.\n선착순 20명 · 7월 13일(월) 마감\n수원 올라잇짐 1차 쇼케이스',
  kakaoShareButton: '세짐데이 참여신청',
  sharePanelHint:
    '카카오톡으로 초대 카드를 보내거나, 초대 문구를 복사해 대표님께 전달해 보세요.',
} as const
