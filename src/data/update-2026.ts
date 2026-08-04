/** 2026 하반기 SEGYM 업데이트 프로모션 카피 */

/** false면 한글 사이트에서 띠배너·네비·푸터 링크를 숨김 (/update 경로는 유지) */
export const UPDATE_2026_PUBLIC_ENABLED = false

/** 띠배너 노출 여부에 따른 고정 헤더 오프셋 */
export const KO_HEADER_OFFSET_CLASS = UPDATE_2026_PUBLIC_ENABLED
  ? 'pt-[6.5rem] sm:pt-[6.25rem]'
  : 'pt-16'

export const UPDATE_2026_PATH = '/update'

export const UPDATE_2026_COPY = {
  navLabel: '업데이트',
  pageTitle: '26년 하반기 업데이트 예고',
  pageDescription:
    '세짐에 두 가지 핵심 기능이 업데이트됩니다. 체성능 측정과 로보틱 네거티브 트레이닝 — 가격 인상 전, 지금 선점하세요.',
  bannerLabel: '26년 하반기 업데이트 예고',
  bannerFeatures: '체성능 측정 · 네거티브 트레이닝',
  bannerCta: '자세히 보기',
  heroEyebrow: 'Coming soon · 2026 하반기',
  heroTitle: '세짐, 하반기 핵심 업데이트 2가지',
  heroBody:
    '회원 운동능력을 점수로 보여주는 체성능 측정, 그리고 근육 성장을 가속하는 로보틱 네거티브 트레이닝. 하반기 정식 업데이트를 미리 확인하세요.',
  overviewTitle: '업데이트 예정 기능',
  priceTitle: '가격 인상 전, 지금이 가장 유리합니다',
  priceBody:
    '스미스로봇 정가 인상 일정이 확정되었습니다. 하반기 신기능은 추가 비용 없이 업데이트로 제공될 예정입니다. 최저가 시점에 세짐을 선점하고, 체성능·네거티브까지 함께 확보하세요.',
  priceCta: '도입 상담 신청',
  pricePricing: '가격 안내 보기',
} as const

export const UPDATE_BODY_PERF = {
  id: 'body-performance',
  badge: '기능 01',
  title: '체성능 측정',
  subtitle: 'Scan & Score',
  quote: '말주변이 부족한 초보 트레이너도 단번에 고단가 PT 계약을 이끌어냅니다.',
  intro:
    '회원들의 운동 능력을 인바디처럼 정밀하게 측정하고 기록하여, 눈에 보이는 데이터 세일즈를 가능하게 만듭니다. 가이드 테스트로 측정하고, 결과는 점수로 확인합니다.',
  heroImage: '/images/scan-score/launch-hero-ko.png',
  measures: [
    {
      title: '힘',
      body: '얼마나 힘을 낼 수 있는지, 좌우와 반복에서 어떻게 나타나는지 확인합니다.',
      icon: '💪',
    },
    {
      title: '속도',
      body: '리프팅 중 움직임 속도 — 파워와 동작 품질을 파악하는 데 유용합니다.',
      icon: '⚡',
    },
    {
      title: '가동범위',
      body: '움직임이 얼마나 멀리 가는지 — 부하 하에서의 가동성을 보여줍니다.',
      icon: '📐',
    },
    {
      title: '밸런스',
      body: '테스트 중 좌우 대칭과 안정성 신호를 분석합니다.',
      icon: '⚖️',
    },
  ],
  flow: [
    {
      step: '01',
      title: '측정할 항목 선택',
      body: '빠른 균형 체크부터 부위별 정밀 측정까지, 원하는 측정 방식과 부위를 선택합니다.',
      image: '/images/scan-score/select-measure.png',
    },
    {
      step: '02',
      title: '테스트 운동 진행',
      body: '세짐에서 가이드 테스트를 따릅니다. 준비 → 속도 → 힘 순으로 진행되어 측정이 일관됩니다.',
      image: '/images/scan-score/measure-live.png',
    },
    {
      step: '03',
      title: '점수와 통계 확인',
      body: '결과는 직관적인 SEGYM Score로 나오고, 힘·속도·가동범위·밸런스 통계가 함께 제공됩니다.',
      image: '/images/scan-score/result-score.png',
    },
  ],
  resultTitle: '점수로 이해할 수 있는 측정',
  resultBody:
    '평가를 진행한 뒤 수행 능력을 점수로 보고, 비교·이해가 쉬운 통계로 뒷받침합니다.',
  resultPoints: [
    '테스트마다 명확한 SEGYM Score',
    '힘·속도·가동범위·밸런스를 한눈에',
    '점수와 함께 움직임 품질 통계 제공',
  ],
} as const

export const UPDATE_NEGATIVE = {
  id: 'negative',
  badge: '기능 02',
  title: '로보틱 전자식 네거티브 트레이닝',
  subtitle: 'Robotic Negative Training',
  quote: '근육 성장을 더욱 빠르게 만들어 줄 세짐만의 핵심 독점 기능!',
  intro:
    '바벨 움직임 방향에 따라 로봇 엔진이 무게를 다르게 제어하여, 보디빌딩 상급자들이 열광하는 완벽한 신장성 수축 시스템을 선사합니다.',
  points: [
    {
      title: '방향에 따라 달라지는 저항',
      body: '올리는 구간과 내리는 구간에 로봇 엔진이 무게를 다르게 제어합니다. 네거티브에 최적화된 부하를 자동으로 만듭니다.',
    },
    {
      title: '신장성 수축에 집중',
      body: '근육 성장에 중요한 네거티브(신장성 수축) 구간을 더 정밀하고 안전하게 수행할 수 있습니다.',
    },
    {
      title: '세짐만의 독점 로드맵',
      body: '하반기 정식 출시 예정인 프리미엄 기능으로, 기존 세짐 도입 센터에도 업데이트로 제공될 예정입니다.',
    },
  ],
} as const
