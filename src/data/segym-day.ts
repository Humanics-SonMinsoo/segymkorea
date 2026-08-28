export type SegymDayVenue = {
  id: string
  title: string
  schedule: string
  selectable: boolean
  comingSoonLabel?: string
  /** 카드 UI 톤 — closed: 종료 흐림 / comingSoon: 커밍순 / active: 선택 가능 */
  appearance?: 'closed' | 'comingSoon' | 'active'
}

/** 홈 접속 시 SEGYM DAY 팝업 노출 여부 (신청 기간에만 true) */
export const SEGYM_DAY_HOME_POPUP_ENABLED = false

/** 참가 신청 폼·API 접수 허용 여부 */
export const SEGYM_DAY_APPLY_ENABLED = false

export const SEGYM_DAY_HERO_IMAGE = '/images/segym-day/segym-day-hero.png'
/** 카카오 공유·링크 미리보기용 VIP 초대장 이미지 */
export const SEGYM_DAY_SHARE_IMAGE = '/images/segym-day/segym-day-vip-share.png'

/** 이벤트 안내 상단 이미지 */
export const SEGYM_DAY_EVENT_IMAGE = '/images/segym-day/segym-day-gundam.png'

/** 홈 팝업·신청 페이지 배너 */
export const SEGYM_DAY_POPUP_IMAGE = '/images/segym-day/segym-day-gundam.png'

/** @deprecated 단일 이미지로 대체됨 — 기존 참조 호환용 */
export const SEGYM_DAY_CAROUSEL_IMAGES = [SEGYM_DAY_EVENT_IMAGE] as const

export const SEGYM_DAY_VENUES: SegymDayVenue[] = [
  {
    id: 'suwon-allright',
    title: '수원 올라잇짐',
    schedule: '7월 15일 오후 2시',
    selectable: false,
    comingSoonLabel: '모집마감',
    appearance: 'closed',
  },
  {
    id: 'wonju-hawk-eye',
    title: '원주 호크아이짐 2호점',
    schedule: '7월 22일 오후 2시',
    selectable: false,
    comingSoonLabel: '모집마감',
    appearance: 'closed',
  },
  {
    id: 'busan-gundam',
    title: '부산 건담짐',
    schedule: '8월 27일 오후 12시',
    selectable: false,
    comingSoonLabel: '모집마감',
    appearance: 'closed',
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
  pageTitle: '8월 27일 부산 건담짐 SEGYM DAY',
  pageDescription: '',
  applyButton: 'SEGYM DAY 신청하기',
  aboutButton: '이벤트 알아보기',
  popupStorageKey: 'segym-day-popup-dismissed-v7',
  popupHideTodayKey: 'segym-day-popup-hide-today-v7',
  popupHeadline: '8월 27일 오후 12시, SEGYM DAY in 부산 건담짐',
  popupSubline: '오직 운동시설 대표님들을 위한 이벤트',
  popupHideToday: '오늘 하루 종일 보지 않기',
  popupClose: '닫기',
  urgencyHeadline: '지금 신청하지 않으면 자리가 없어질 수 있습니다',
  urgencySubline:
    '4차 부산 건담짐 SEGYM DAY는 사전 신청제로 진행됩니다. 마감 시 예약 창은 즉시 닫힙니다.',
  deadlineLabel: '8월 26일(수)',
  shareCardTitle: 'SEGYM DAY VIP 초대장',
  shareOgDescription: '당신을 초대합니다.\n8월 27일 오후 12시, 부산 건담짐',
  shareInviteLine: '당신을 초대합니다.',
  shareEventWhen: '8월 27일 오후 12시, 부산 건담짐',
  shareInviteBody: '',
  shareKakaoDescription: '당신을 초대합니다.\n8월 27일 오후 12시, 부산 건담짐',
  kakaoShareButton: '참여 신청하기',
  sharePanelHint:
    '카카오톡으로 초대 카드를 보내거나, 초대 문구를 복사해 대표님께 전달해 보세요.',
} as const
