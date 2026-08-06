/** 2026 하반기 SEGYM 업데이트 프로모션 카피 */

/** false면 한글 사이트에서 띠배너·네비·푸터 링크를 숨김 (/update 경로는 유지) */
export const UPDATE_2026_PUBLIC_ENABLED = true

/** 띠배너 노출 여부에 따른 고정 헤더 오프셋 */
export const KO_HEADER_OFFSET_CLASS = UPDATE_2026_PUBLIC_ENABLED
  ? 'pt-[6.5rem] sm:pt-[6.25rem]'
  : 'pt-16'

export const UPDATE_2026_PATH = '/update'

export const UPDATE_2026_COPY = {
  navLabel: '업데이트',
  pageTitle: '2026년 하반기 업데이트 소식',
  pageDescription:
    '내릴 때 100kg, 올릴 때 60kg — 세짐 네거티브 기능과 체성능 측정이 2026 하반기에 업데이트됩니다.',
  /** 상단 띠배너 */
  bannerHook: '내릴 때 100kg, 올릴 때 60kg?',
  bannerTitle: '세짐 네거티브 기능 출시된다!',
  bannerSchedule: '26년 하반기 업데이트 일정',
  /** /update 히어로 */
  heroTitle: '2026년 하반기 업데이트 소식',
  priceTitle: '9월 업데이트 전, 지금이 도입 타이밍',
  priceBody:
    '업데이트 이후 세짐 가격이 상승합니다. 네거티브·체성능 신기능이 적용되기 전, 9월 업데이트 전에 미리 도입하세요.',
  priceCta: '도입 상담 신청',
  /** 홈 중간 띠 섹션 */
  homeBandEyebrow: '2026 하반기 업데이트',
  homeBandTitle: '내릴 때 100kg, 올릴 때 60kg?',
  homeBandBody: '세짐 네거티브 기능 출시예정! 보디빌딩 선수, 헬스장 대표님들이 원하셨던 그 기능!',
  homeBandCta: '업데이트 소식 미리보기',
} as const

export const UPDATE_NEGATIVE = {
  id: 'negative',
  overviewTitle: '네거티브 트레이닝 기능',
  overviewBody: '바벨이 움직이는 방향에 따라 무게를 다르게 설정할 수 있습니다.',
  title: '로보틱 네거티브 트레이닝',
  subtitle: 'Robotic Negative Training',
  hook: '내릴 때 100kg, 올릴 때 60kg 방향에 따른 무게 자동변환',
  intro:
    '바벨의 움직임 방향에 따라 무게 설정을 다르게 할 수 있습니다. 신장성 수축(네거티브)을 더 무겁게, 반대로 수축 구간을 더 무겁게도 가능합니다.',
  points: [
    {
      title: '방향별 무게 설정',
      body: '내리는 구간과 올리는 구간에 서로 다른 무게를 걸 수 있습니다. 예: 내릴 때 100kg · 올릴 때 60kg.',
    },
    {
      title: '수축을 무겁게도',
      body: '네거티브만 강조하는 게 아닙니다. 수축(컨센트릭) 구간을 더 무겁게 설정하는 것도 가능합니다.',
    },
    {
      title: '세짐만의 핵심기술',
      body: '세짐으로만 구현 가능한 운동이 됩니다. 일반 기구로는 만들기 어려운 방향별 부하를 로봇이 자동으로 제어합니다.',
    },
  ],
} as const

/** 체성능 — 영문 Scan & Score를 짧게 요약한 버전 */
export const UPDATE_BODY_PERF = {
  id: 'body-performance',
  badge: '2. 체성능 측정 기능',
  overviewTitle: '체성능 측정 기능',
  overviewBody: '체성분뿐 아니라 회원의 체성능·운동능력까지 확인하고 분석할 수 있습니다.',
  title: '체성능 측정',
  subtitle: 'Scan & Score',
  hook: '체성분만으로는 부족합니다. 체성능까지.',
  intro:
    '회원들의 체성분뿐만 아니라 체성능(운동능력)까지 확인하고 분석할 수 있습니다. 가이드 테스트로 측정하고, 결과는 SEGYM Score로 한눈에 확인하세요.',
  heroImage: '/images/scan-score/launch-hero-ko.png',
  measures: [
    { title: '힘', body: '얼마나 힘을 낼 수 있는지', icon: '💪' },
    { title: '속도', body: '리프팅 중 움직임 속도', icon: '⚡' },
    { title: '가동범위', body: '부하 하에서의 가동성', icon: '📐' },
    { title: '밸런스', body: '좌우 대칭·안정성', icon: '⚖️' },
  ],
  flowSummary: [
    '측정할 항목 선택',
    '가이드 테스트 진행',
    'SEGYM Score로 결과 확인',
  ],
  resultPoints: [
    '체성분 너머의 실제 운동능력 데이터',
    '힘·속도·가동범위·밸런스를 한눈에',
    'PT 상담·세일즈에 바로 활용 가능한 점수',
  ],
} as const
