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
export const SEGYM_DAY_HOME_POPUP_ENABLED = true

export const SEGYM_DAY_HERO_IMAGE = '/images/segym-day/segym-day-hero.png'
/** 카카오 공유·링크 미리보기용 VIP 초대장 이미지 */
export const SEGYM_DAY_SHARE_IMAGE = '/images/segym-day/segym-day-vip-share.png'

/** 이벤트 안내 상단 이미지 (단일, 화면 꽉 채움) */
export const SEGYM_DAY_EVENT_IMAGE = '/images/segym-day/segym-day-oneper.png'

/** 홈 팝업·신청 페이지 배너 */
export const SEGYM_DAY_POPUP_IMAGE = '/images/segym-day/segym-day-apply-banner.png'

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
    id: 'daejeon-one-percent',
    title: '대전 원퍼센트 피트니스',
    schedule: '8월 12일 오후 1시',
    selectable: true,
    appearance: 'active',
  },
  {
    id: 'busan-gundam',
    title: '부산 건담짐',
    schedule: '일정 추후 공개',
    selectable: false,
    comingSoonLabel: 'COMING SOON',
    appearance: 'comingSoon',
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
  pageTitle: '8월 12일 대전 원퍼센트 피트니스 SEGYM DAY 참가신청',
  pageDescription: '',
  applyButton: 'SEGYM DAY 신청하기',
  aboutButton: '이벤트 알아보기',
  popupStorageKey: 'segym-day-popup-dismissed-v4',
  popupHideTodayKey: 'segym-day-popup-hide-today-v4',
  popupHeadline: '8월 12일, 대전에 세짐이 찾아갑니다!',
  popupSubline: '대전 원퍼센트 피트니스 · 오후 1시 · 신청 마감 8월 11일(화)',
  popupHideToday: '오늘 하루 종일 보지 않기',
  popupClose: '닫기',
  urgencyHeadline: '지금 신청하지 않으면 자리가 없어질 수 있습니다',
  urgencySubline:
    '3차 대전 원퍼센트 피트니스 SEGYM DAY는 사전 신청제로 진행됩니다. 마감 시 예약 창은 즉시 닫힙니다.',
  deadlineLabel: '8월 11일(화)',
  shareCardTitle: 'SEGYM DAY VIP 초대장',
  shareOgDescription: '당신을 초대합니다.\n8월 12일 오후 1시, 대전 원퍼센트 피트니스',
  shareInviteLine: '당신을 초대합니다.',
  shareEventWhen: '8월 12일 오후 1시, 대전 원퍼센트 피트니스',
  shareInviteBody: '',
  shareKakaoDescription: '당신을 초대합니다.\n8월 12일 오후 1시, 대전 원퍼센트 피트니스',
  kakaoShareButton: '참여 신청하기',
  sharePanelHint:
    '카카오톡으로 초대 카드를 보내거나, 초대 문구를 복사해 대표님께 전달해 보세요.',
} as const
