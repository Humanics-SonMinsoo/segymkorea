export type SegymDayVenue = {
  id: string
  title: string
  schedule: string
  selectable: boolean
  comingSoonLabel?: string
}

/** 홈 접속 시 SEGYM DAY 팝업 노출 여부 (신청 기간에만 true) */
export const SEGYM_DAY_HOME_POPUP_ENABLED = false

export const SEGYM_DAY_HERO_IMAGE = '/images/segym-day/segym-day-hero.png'
/** 카카오 공유·링크 미리보기용 VIP 초대장 이미지 */
export const SEGYM_DAY_SHARE_IMAGE = '/images/segym-day/segym-day-vip-share.png'

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
    selectable: false,
    comingSoonLabel: '모집마감',
  },
  {
    id: 'wonju-hawk-eye',
    title: '원주 호크아이짐 2호점',
    schedule: '7월 22일 오후 2시',
    selectable: false,
    comingSoonLabel: '모집종료',
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
    '선착순 20명 한정 · 7월 20일(월) 마감. 가격 인상 전 최저가로 세짐을 선점할 수 있는 마지막 기회, 원주 호크아이짐 2호점 SEGYM DAY에 참여해 보세요.',
  applyButton: 'SEGYM DAY 신청하기',
  aboutButton: '이벤트 알아보기',
  popupStorageKey: 'segym-day-popup-dismissed-v2',
  urgencyLimited: '선착순 20명',
  urgencyHeadline: '지금 신청하지 않으면 자리가 없어질 수 있습니다',
  urgencySubline:
    '2차 원주 호크아이짐 2호점 SEGYM DAY는 선착순 20명만 참여 가능합니다. 20명 마감 시 예약 창은 즉시 닫힙니다.',
  deadlineLabel: '7월 20일(월)',
  shareCardTitle: 'SEGYM DAY VIP 초대장',
  shareOgDescription: '당신을 초대합니다.\n7월 22일 오후 2시, 원주 호크아이짐 2호점',
  shareInviteLine: '당신을 초대합니다.',
  shareEventWhen: '7월 22일 오후 2시, 원주 호크아이짐 2호점',
  shareInviteBody: '',
  shareKakaoDescription: '당신을 초대합니다.\n7월 22일 오후 2시, 원주 호크아이짐 2호점',
  kakaoShareButton: '참여 신청하기',
  sharePanelHint:
    '카카오톡으로 초대 카드를 보내거나, 초대 문구를 복사해 대표님께 전달해 보세요.',
} as const
