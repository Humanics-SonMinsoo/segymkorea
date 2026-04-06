/**
 * 설치사례 갤러리 — 제목은 `title`, 분류는 `categoryId`만 수정하면 됩니다.
 * (이미지 파일: public/images/installations/install-01.jpg …)
 */
export const INSTALLATION_CATEGORY_IDS = [
  'all',
  'public',
  'pro',
  'health',
  'pt',
  'crossfit',
] as const

export type InstallationCategoryId = (typeof INSTALLATION_CATEGORY_IDS)[number]

/** 필터 칩에 표시되는 라벨 (전체 제외) */
export const INSTALLATION_CATEGORIES: { id: Exclude<InstallationCategoryId, 'all'>; label: string }[] = [
  { id: 'public', label: '공공기관 헬스장' },
  { id: 'pro', label: '프로 / 구단' },
  { id: 'health', label: '헬스 / 피트니스' },
  { id: 'pt', label: 'PT, 필라테스' },
  { id: 'crossfit', label: '크로스핏' },
]

export type InstallationPhoto = {
  id: string
  src: string
  /** 카드, 라이트박스 제목 */
  title: string
  alt: string
  /** INSTALLATION_CATEGORIES 중 하나 (`all`은 필터용으로만 사용, 사진에는 부여하지 않음) */
  categoryId: Exclude<InstallationCategoryId, 'all'>
}

export const INSTALLATION_GALLERY: InstallationPhoto[] = [
  {
    id: '18',
    src: '/images/installations/install-18.png',
    title: '수원 망포동 올라잇짐',
    alt: '세짐 설치 사례 — 수원 망포동 올라잇짐',
    categoryId: 'health',
  },
  {
    id: '10',
    src: '/images/installations/install-10.jpg',
    title: '시흥 정왕동 프렌드짐',
    alt: '세짐 설치 사례 — 시흥 정왕동 프렌드짐',
    categoryId: 'health',
  },
  {
    id: '2',
    src: '/images/installations/install-02.jpg',
    title: '홍천 바디짐',
    alt: '세짐 설치 사례 — 홍천 바디짐',
    categoryId: 'health',
  },
  {
    id: '9',
    src: '/images/installations/install-09.jpg',
    title: '수원 병점동 팀에이치짐',
    alt: '세짐 설치 사례 — 수원 병점동 팀에이치짐',
    categoryId: 'health',
  },
  {
    id: '1',
    src: '/images/installations/install-01.jpg',
    title: '이천 국가대표 선수촌',
    alt: '세짐 설치 사례 — 이천 국가대표 선수촌',
    categoryId: 'public',
  },
  {
    id: '19',
    src: '/images/installations/install-19.png',
    title: '진천 국가대표 선수촌',
    alt: '세짐 설치 사례 — 진천 국가대표 선수촌',
    categoryId: 'public',
  },
  {
    id: '3',
    src: '/images/installations/install-03.jpg',
    title: '대전 엠엑스짐',
    alt: '세짐 설치 사례 — 대전 엠엑스짐',
    categoryId: 'health',
  },
  {
    id: '4',
    src: '/images/installations/install-04.jpg',
    title: '부산 부광체육관',
    alt: '세짐 설치 사례 — 부산 부광체육관',
    categoryId: 'health',
  },
  {
    id: '5',
    src: '/images/installations/install-05.jpg',
    title: '향남 올어바웃피트니스',
    alt: '세짐 설치 사례 — 향남 올어바웃피트니스',
    categoryId: 'health',
  },
  {
    id: '6',
    src: '/images/installations/install-06.jpg',
    title: '서산 링크핏',
    alt: '세짐 설치 사례 — 서산 링크핏',
    categoryId: 'health',
  },
  {
    id: '7',
    src: '/images/installations/install-07.jpg',
    title: '대전 에이프로짐',
    alt: '세짐 설치 사례 — 대전 에이프로짐',
    categoryId: 'health',
  },
  {
    id: '8',
    src: '/images/installations/install-08.jpg',
    title: 'AMG휘트니스',
    alt: '세짐 설치 사례 — AMG휘트니스',
    categoryId: 'health',
  },
  {
    id: '11',
    src: '/images/installations/install-11.jpg',
    title: '서울 압구정동 JW GYM',
    alt: '세짐 설치 사례 — 서울 압구정동 JW GYM',
    categoryId: 'health',
  },
  {
    id: '12',
    src: '/images/installations/install-12.jpg',
    title: '대구 KSPO',
    alt: '세짐 설치 사례 — 대구 KSPO',
    categoryId: 'public',
  },
  {
    id: '13',
    src: '/images/installations/install-13.jpg',
    title: '크로스핏 졸리',
    alt: '세짐 설치 사례 — 크로스핏 졸리',
    categoryId: 'crossfit',
  },
  {
    id: '14',
    src: '/images/installations/install-14.jpg',
    title: 'SSG 랜더스',
    alt: '세짐 설치 사례 — SSG 랜더스',
    categoryId: 'pro',
  },
  {
    id: '15',
    src: '/images/installations/install-15.jpg',
    title: '의왕 우디핏',
    alt: '세짐 설치 사례 — 의왕 우디핏',
    categoryId: 'health',
  },
  {
    id: '16',
    src: '/images/installations/install-16.jpg',
    title: '명동 피트니스 101',
    alt: '세짐 설치 사례 — 명동 피트니스 101',
    categoryId: 'health',
  },
  {
    id: '17',
    src: '/images/installations/install-17.jpg',
    title: '소웰 PT 필라테스',
    alt: '세짐 설치 사례 — 소웰 PT 필라테스',
    categoryId: 'pt',
  },
]
