/**
 * 설치사례 갤러리 — 제목은 `title`, 분류는 `categoryId`, 지역 묶음은 `regionKey`만 맞추면 됩니다.
 * (이미지 파일: public/images/installations/install-01.jpg …)
 *
 * 헬스·PT 등: 표기를 「시·도 + 구(또는 시/군) + 센터명」 정도로 맞춥니다. 동·읍 이름은 길어지지 않게 넣지 않습니다.
 */

/** 갤러리 맨 위 고정 노출 순서 (올라잇짐 → 프렌드짐 → 진천 국가대표 선수촌) — `전체` 탭에서만 사용 */
export const INSTALLATION_FEATURED_IDS = ['18', '10', '19'] as const

/** 지역 섹션 정렬 순서 (목록에 없는 키는 맨 뒤, 한글 가나다 순 보조) */
export const INSTALLATION_REGION_SECTION_ORDER = [
  '서울',
  '경기',
  '인천',
  '강원',
  '충북',
  '충남',
  '대전',
  '세종',
  '대구',
  '부산',
  '울산',
  '광주',
  '전북',
  '전남',
  '경북',
  '경남',
  '제주',
  '기타',
] as const

export function installationRegionSortIndex(key: string): number {
  const i = (INSTALLATION_REGION_SECTION_ORDER as readonly string[]).indexOf(key)
  return i === -1 ? 1000 : i
}

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
  title: string
  alt: string
  categoryId: Exclude<InstallationCategoryId, 'all'>
  /** 지역별 섹션 제목(서울, 경기, …) — 같은 값끼리 한 블록으로 묶음 */
  regionKey: string
}

export const INSTALLATION_GALLERY: InstallationPhoto[] = [
  {
    id: '20',
    src: '/images/installations/install-20.jpg',
    title: '서울 광진구 첼렘피티',
    alt: '세짐 설치 사례 — 서울 광진구 첼렘피티',
    categoryId: 'health',
    regionKey: '서울',
  },
  {
    id: '21',
    src: '/images/installations/install-21.jpg',
    title: '대전 유성구 바디조짐',
    alt: '세짐 설치 사례 — 대전 유성구 바디조짐',
    categoryId: 'health',
    regionKey: '대전',
  },
  {
    id: '18',
    src: '/images/installations/install-18.png',
    title: '수원 영통구 올라잇짐',
    alt: '세짐 설치 사례 — 수원 영통구 올라잇짐',
    categoryId: 'health',
    regionKey: '경기',
  },
  {
    id: '10',
    src: '/images/installations/install-10.jpg',
    title: '경기 시흥 프렌드짐',
    alt: '세짐 설치 사례 — 경기 시흥 프렌드짐',
    categoryId: 'health',
    regionKey: '경기',
  },
  {
    id: '2',
    src: '/images/installations/install-02.jpg',
    title: '강원 홍천 바디짐',
    alt: '세짐 설치 사례 — 강원 홍천 바디짐',
    categoryId: 'health',
    regionKey: '강원',
  },
  {
    id: '9',
    src: '/images/installations/install-09.jpg',
    title: '경기 화성 팀에이치짐',
    alt: '세짐 설치 사례 — 경기 화성 팀에이치짐',
    categoryId: 'health',
    regionKey: '경기',
  },
  {
    id: '1',
    src: '/images/installations/install-01.jpg',
    title: '경기 이천 국가대표 선수촌',
    alt: '세짐 설치 사례 — 경기 이천 국가대표 선수촌',
    categoryId: 'public',
    regionKey: '경기',
  },
  {
    id: '19',
    src: '/images/installations/install-19.png',
    title: '충북 진천 국가대표 선수촌',
    alt: '세짐 설치 사례 — 충북 진천 국가대표 선수촌',
    categoryId: 'public',
    regionKey: '충북',
  },
  {
    id: '3',
    src: '/images/installations/install-03.jpg',
    title: '청주 흥덕구 엠엑스짐',
    alt: '세짐 설치 사례 — 청주 흥덕구 엠엑스짐',
    categoryId: 'health',
    regionKey: '충북',
  },
  {
    id: '4',
    src: '/images/installations/install-04.jpg',
    title: '부산 부산진구 부광체육관',
    alt: '세짐 설치 사례 — 부산 부산진구 부광체육관',
    categoryId: 'health',
    regionKey: '부산',
  },
  {
    id: '5',
    src: '/images/installations/install-05.jpg',
    title: '경기 화성 향남 올어바웃피트니스',
    alt: '세짐 설치 사례 — 경기 화성 향남 올어바웃피트니스',
    categoryId: 'health',
    regionKey: '경기',
  },
  {
    id: '6',
    src: '/images/installations/install-06.jpg',
    title: '충남 서산 링크핏',
    alt: '세짐 설치 사례 — 충남 서산 링크핏',
    categoryId: 'health',
    regionKey: '충남',
  },
  {
    id: '7',
    src: '/images/installations/install-07.jpg',
    title: '대전 유성구 에이프로짐',
    alt: '세짐 설치 사례 — 대전 유성구 에이프로짐',
    categoryId: 'health',
    regionKey: '대전',
  },
  {
    id: '8',
    src: '/images/installations/install-08.jpg',
    title: '경기 과천시 AMG휘트니스',
    alt: '세짐 설치 사례 — 경기 과천시 AMG휘트니스',
    categoryId: 'health',
    regionKey: '경기',
  },
  {
    id: '11',
    src: '/images/installations/install-11.jpg',
    title: '서울 강남구 JW GYM',
    alt: '세짐 설치 사례 — 서울 강남구 JW GYM',
    categoryId: 'health',
    regionKey: '서울',
  },
  {
    id: '12',
    src: '/images/installations/install-12.jpg',
    title: '대구 수성구 KSPO',
    alt: '세짐 설치 사례 — 대구 수성구 KSPO',
    categoryId: 'public',
    regionKey: '대구',
  },
  {
    id: '13',
    src: '/images/installations/install-13.jpg',
    title: '크로스핏 졸리',
    alt: '세짐 설치 사례 — 크로스핏 졸리',
    categoryId: 'crossfit',
    regionKey: '기타',
  },
  {
    id: '14',
    src: '/images/installations/install-14.jpg',
    title: '인천 연수구 SSG 랜더스',
    alt: '세짐 설치 사례 — 인천 연수구 SSG 랜더스',
    categoryId: 'pro',
    regionKey: '인천',
  },
  {
    id: '15',
    src: '/images/installations/install-15.jpg',
    title: '경기 의왕 우디핏',
    alt: '세짐 설치 사례 — 경기 의왕 우디핏',
    categoryId: 'health',
    regionKey: '경기',
  },
  {
    id: '16',
    src: '/images/installations/install-16.jpg',
    title: '서울 중구 피트니스 101',
    alt: '세짐 설치 사례 — 서울 중구 피트니스 101',
    categoryId: 'health',
    regionKey: '서울',
  },
  {
    id: '17',
    src: '/images/installations/install-17.jpg',
    title: '서울 서초구 소웰 PT 필라테스',
    alt: '세짐 설치 사례 — 서울 서초구 소웰 PT 필라테스',
    categoryId: 'pt',
    regionKey: '서울',
  },
]
