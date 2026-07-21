/**
 * 블로그 — 글을 추가할 때는 `BLOG_POSTS`에 항목만 추가하면 됩니다.
 * (썸네일 파일: public/images/blog/…)
 *
 * - 네이버 블로그 등 외부 글: `href`에 전체 URL → 새 탭으로 열림
 * - 나중에 자체 글을 쓰면: `href`에 `/blog/슬러그` 같은 내부 경로를 넣으면 됨
 * - `featured: true` 인 글은 홈(전체) 탭 상단에 크게 노출됩니다 (1개 권장)
 */

export const BLOG_CATEGORIES = [
  { id: 'review', label: '도입 후기' },
  { id: 'news', label: '세짐 소식' },
  { id: 'insight', label: '운영 인사이트' },
] as const

export type BlogCategoryId = (typeof BLOG_CATEGORIES)[number]['id']

/** 사이드바 하단 외부 링크 — 세짐 공식 네이버 블로그 */
export const BLOG_NAVER_URL = 'https://blog.naver.com/humanics23'

export type BlogPost = {
  id: string
  categoryId: BlogCategoryId
  /** 글 제목 */
  title: string
  /** 카드, 대표 영역에 보이는 요약 */
  excerpt: string
  /** 대표(상단) 글에서만 보여줄 한 줄 티저 — 말끝을 흐려서 클릭을 유도 */
  teaser?: string
  /** `[도입 후기] 첼렘피티` 처럼 제목 아래 붙는 대상 표기 */
  subjectLabel?: string
  /** 썸네일 경로 (public 기준) */
  thumbnail: string
  /** 표기용 날짜 */
  dateLabel: string
  /** 작성 주체 표기 */
  author?: string
  /** 외부 URL(https://…) 또는 내부 경로(/blog/…) */
  href: string
  /** true면 홈 탭 상단에 크게 노출 */
  featured?: boolean
  /** true면 NEW 배지 표시 (최신 콘텐츠) */
  isNew?: boolean
}

export function isExternalPost(post: BlogPost): boolean {
  return /^https?:\/\//i.test(post.href)
}

export function blogCategoryLabel(id: BlogCategoryId): string {
  return BLOG_CATEGORIES.find((c) => c.id === id)?.label ?? ''
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'tryfit-pt-review',
    categoryId: 'review',
    featured: true,
    isNew: true,
    title: '"머신 여러 대보다, 세짐 한 대가 확실한 무기였어요." 강남 트라이핏 대표님이 세짐 스미스로봇을 선택한 이유',
    excerpt: '경쟁이 가장 치열한 강남에서 프리미엄 PT샵이 세짐 스미스로봇을 시그니처 장비로 선택한 이유를 인터뷰로 정리했습니다.',
    teaser: '"0.1kg 단위 초정밀 조절부터 양방향 로보틱 트레이닝까지…" 대표님이 꼽은 도입 이유는?',
    subjectLabel: '강남 트라이핏',
    thumbnail: '/images/blog/tryfit-pt-review.jpg',
    dateLabel: '2026년 7월 21일',
    author: '세짐',
    href: 'https://blog.naver.com/humanics23/224353084887',
  },
  {
    id: 'chelem-pt-review',
    categoryId: 'review',
    title: '"세짐을 선택하는 게 가장 효율적이었어요." PT샵 대표님이 세짐 스미스로봇을 도입한 이유',
    excerpt: '우리 PT샵에 세짐을 도입해야 하는 진짜 이유 3가지를 인터뷰로 정리했습니다.',
    teaser: '"공간은 하나인데, 기구 여러 대 효과가 나니까…" 대표님이 꼽은 나머지 두 가지 이유는?',
    subjectLabel: '첼렘피티',
    thumbnail: '/images/blog/chelem-pt-review.jpg',
    dateLabel: '2026년 5월 8일',
    author: '세짐',
    href: 'https://blog.naver.com/humanics23/224299164766',
  },
]
