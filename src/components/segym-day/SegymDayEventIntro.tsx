'use client'

import { SEGYM_DAY_CAROUSEL_IMAGES } from '@/data/segym-day'

export function SegymDayEventIntro() {
  return (
    <div className="space-y-6 text-sm sm:text-[15px] text-gray-700 ko-modal-copy leading-relaxed">
      <p className="text-base sm:text-lg font-bold text-gray-900">
        SEGYM DAY에 운동시설 대표님들을 초대합니다.
      </p>

      <p className="text-primary font-semibold text-base sm:text-lg">
        &ldquo;체성분은 인바디로, 체성능은 세짐으로!&rdquo;
      </p>

      <div className="space-y-4">
        <p>안녕하세요. 운동시설 대표님! 세짐 팀입니다.</p>
        <p>
          세짐 하반기 대규모 신기능 업데이트 소식과 함께
          <strong className="text-gray-900"> 스미스로봇 정가 200만 원 인상</strong>이 최종 확정되었습니다.
        </p>
        <p>
          가격이 오르기 전, 현재 최저가로 세짐을 가장 빠르게 선점하고
          하반기 대규모 신기능까지 <strong className="text-gray-900">추가 비용 없이 평생 무료 업데이트</strong>로
          묶어둘 수 있는 마지막 기회, <strong className="text-primary">&lsquo;SEGYM DAY&rsquo;</strong>에
          대표님들을 초대합니다!
        </p>
        <p>
          이번 <strong className="text-gray-900">2차 행사</strong>는{' '}
          <strong className="text-gray-900">&lsquo;원주 호크아이짐 2호점&rsquo;</strong>에서 오직 운동시설
          경영자분들만 모시고 프라이빗하게 진행됩니다.
        </p>
        <p>
          현장에 오셔서 세짐을 직접 사용해 보시고, 이야기를 나누며 진짜 센터 매출을 올리는 비즈니스 솔루션을
          밀도 있게 검증해 보세요!
        </p>
      </div>

      <div className="rounded-xl border border-primary/20 bg-primary-muted/30 p-4 sm:p-5 space-y-4">
        <p className="font-bold text-gray-900">💡 이번 SEGYM DAY에서 최초로 예고될 메인 기능 2가지</p>
        <div className="space-y-3">
          <div>
            <p className="font-semibold text-gray-900">1. 운동능력 측정하기 기능</p>
            <p className="mt-1 text-gray-600">
              &ldquo;말주변이 부족한 초보 트레이너도 단번에 고단가 PT 계약을 이끌어냅니다.&rdquo;
              <br />
              회원들의 운동 능력을 인바디처럼 정밀하게 측정하고 기록하여 눈에 보이는 데이터 세일즈를 가능하게
              만듭니다.
            </p>
          </div>
          <div>
            <p className="font-semibold text-gray-900">2. 로보틱 전자식 네거티브 트레이닝 기능</p>
            <p className="mt-1 text-gray-600">
              &ldquo;근육 성장을 더욱 빠르게 만들어 줄 세짐만의 핵심 독점 기능!&rdquo;
              <br />
              바벨 움직임 방향에 따라 로봇 엔진이 무게를 다르게 제어하여, 보디빌딩 상급자들이 열광하는 완벽한
              신장성 수축 시스템을 선사합니다. (하반기 정식 출시 로드맵 최초 공개)
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-gray-50/80 p-4 sm:p-5 space-y-3">
        <p className="font-bold text-gray-900">📅 2차 SEGYM DAY 상세 안내 (원주 호크아이짐 2호점)</p>
        <ul className="space-y-1.5 text-gray-700">
          <li>
            <span className="font-medium text-gray-900">일시</span> : 7월 22일(수) 오후 2시
          </li>
          <li>
            <span className="font-medium text-gray-900">장소</span> : 원주 호크아이짐 2호점
          </li>
          <li>
            <span className="font-medium text-gray-900">참여 대상</span> : 피트니스 센터, PT샵 등 운동시설을 운영하고
            계시는 대표님 및 관장님
          </li>
          <li>
            <span className="font-medium text-gray-900">참여 인원</span> : 선착순 20명
          </li>
          <li>
            <span className="font-medium text-gray-900">신청 기간</span> : 7월 13일(월) ~ 7월 20일(월)
          </li>
        </ul>
      </div>

      <div className="space-y-3">
        <p className="font-bold text-gray-900">📋 당일 쇼케이스 행사 순서</p>
        <ol className="list-decimal list-inside space-y-1.5 text-gray-700">
          <li>호크아이짐 2호점의 생생한 세짐 도입 및 운영 후기</li>
          <li>세짐 대표님이 직접 들려주는 세짐의 미래 방향성과 비전</li>
          <li>하반기 출시 예정 프리미엄 NEW 기능 소개</li>
          <li>세짐 영업 담당자와 함께하는 1:1 머신 집중 체험 및 비즈니스 상담</li>
          <li>참석 대표님 전원 프리미엄 웰컴 굿즈(텀블러 &amp; 스포츠 양말 세트) 전달식</li>
        </ol>
      </div>

      <div className="space-y-4 border-t border-gray-100 pt-5">
        <p>
          이번 행사는 <strong className="text-gray-900">딱 일주일 동안만</strong> 신청을 받으며, 선착순 20명이
          마감되면 예약 창은 즉시 닫힙니다.
        </p>
        <p>
          오직 현장 방문 대표님들께만 <strong className="text-gray-900">역대급 인상 전 최저가 혜택</strong>이
          보장되오니, 지금 바로 신청하여 소중한 좌석을 선점해 보세요.
        </p>
        <p>
          전국의 열정 가득한 관장님들과 함께 피트니스의 미래를 이야기할 생각에 저희도 벌써 마음이 설레고
          뜨거워집니다. 현장에서 기쁜 마음으로 기다리고 있겠습니다.
        </p>
        <p className="font-medium text-gray-900">
          감사합니다. 원주 호크아이짐 2호점에서 뵙겠습니다! ❤️❤️❤️
        </p>
      </div>

      <div className="sr-only" aria-hidden>
        {SEGYM_DAY_CAROUSEL_IMAGES.map((src, i) => (
          <span key={src}>슬라이드 {i + 1}</span>
        ))}
      </div>
    </div>
  )
}
