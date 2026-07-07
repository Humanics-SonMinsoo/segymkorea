import { SEGYM_DAY_COPY, SEGYM_DAY_HERO_IMAGE } from '@/data/segym-day'
import { getSiteUrl } from '@/lib/site-url'

export const SEGYM_DAY_PATH = '/segym-day'

export function getSegymDayPageUrl(): string {
  return `${getSiteUrl()}${SEGYM_DAY_PATH}`
}

export function getSegymDayOgImageUrl(): string {
  return `${getSiteUrl()}${SEGYM_DAY_HERO_IMAGE}`
}

/** 카카오·OG 미리보기 설명 */
export function getSegymDayOgDescription(): string {
  return SEGYM_DAY_COPY.shareOgDescription
}

/** 카톡에 붙여넣기용 초대 문구 */
export function buildSegymDayInviteText(): string {
  const url = getSegymDayPageUrl()
  return [
    `[${SEGYM_DAY_COPY.shareCardTitle}]`,
    '',
    SEGYM_DAY_COPY.shareInviteLine,
    '',
    `📅 ${SEGYM_DAY_COPY.shareEventWhen}`,
    `⏰ 신청 마감: ${SEGYM_DAY_COPY.deadlineLabel}`,
    `👥 ${SEGYM_DAY_COPY.urgencyLimited}`,
    '',
    SEGYM_DAY_COPY.shareInviteBody,
    '',
    `▶ 참여 신청: ${url}`,
  ].join('\n')
}

export type SegymDayKakaoFeed = {
  title: string
  description: string
  imageUrl: string
  pageUrl: string
  buttonTitle: string
}

export function getSegymDayKakaoFeed(): SegymDayKakaoFeed {
  const pageUrl = getSegymDayPageUrl()
  return {
    title: SEGYM_DAY_COPY.shareCardTitle,
    description: SEGYM_DAY_COPY.shareKakaoDescription,
    imageUrl: getSegymDayOgImageUrl(),
    pageUrl,
    buttonTitle: SEGYM_DAY_COPY.kakaoShareButton,
  }
}
