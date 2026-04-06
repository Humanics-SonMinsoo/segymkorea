import Link from 'next/link'
import type { ReactNode } from 'react'

/**
 * 제품소개 페이지 내 스펙 — 기본 사양은 표, 선택 사항은 항목별 안내 (가격 미표기)
 */
export function ProductSpecSheet() {
  return (
    <div className="space-y-8 sm:space-y-10">
      <div className="rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-sm">
        <div className="px-5 sm:px-8 py-5 sm:py-6 border-b border-gray-100 bg-gray-50/80">
          <p
            className="text-xl sm:text-2xl font-bold italic tracking-tight text-primary mb-1"
            style={{ fontFamily: 'var(--font-segym)' }}
          >
            SEGYM
          </p>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">기본 사양</h3>
          <p className="mt-2 text-sm text-gray-600 max-w-2xl ko-modal-copy leading-relaxed">
            스탠다드 기본 구성(와이드, 블랙 프레임, 2D 바벨) 기준으로 기본 제원은 아래 표에 정리했습니다.
            <br />
            측면 커버, 퍼포먼스 레벨 업그레이드, 높이 옵션 등 표에 없는 항목은 표 아래 선택 옵션에서 안내합니다.
          </p>
        </div>

        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full min-w-[320px] text-left text-sm border-collapse">
            <thead>
              <tr className="bg-primary-muted/60 border-b border-gray-200">
                <th scope="col" className="px-4 sm:px-6 py-3 font-semibold text-gray-800 w-[32%] sm:w-[30%]">
                  항목
                </th>
                <th scope="col" className="px-4 sm:px-6 py-3 font-semibold text-gray-900">
                  기본 사양
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <BaseRow label="최대 하중" value="170kg" />
              <BaseRow label="최대 속도" value="2.4m/s" />
              <BaseRow
                label="제품 크기"
                value={
                  <>
                    W 2,200 × D 1,600 × H 2,100 mm
                    <span className="block text-xs text-gray-500 mt-1 ko-modal-copy">와이드 타입 기본 전고</span>
                  </>
                }
              />
              <BaseRow
                label="바벨 (탄력봉)"
                value={
                  <span className="ko-modal-copy">
                    <strong className="text-gray-900">2D</strong>: 좌우 탄력봉이{' '}
                    <strong className="text-gray-900">각각 독립</strong>으로 레일을 따라 위아래 방향으로 움직입니다.
                    <br />
                    양쪽이 항상 같은 높이에 묶이지 않아, 한쪽만 더 올리거나 내리는 동작과 좌우 근력 차 반영이 가능합니다.
                  </span>
                }
              />
              <BaseRow label="프레임 색상" value="블랙" />
              <BaseRow label="터치 디스플레이" value="21.5″ 터치 모니터 (스탠드형) 기본 제공" />
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-gray-50/50 p-6 sm:p-8 space-y-6">
        <h4 className="card-title text-lg sm:text-xl text-gray-900">선택 옵션 안내</h4>
        <p className="text-sm text-gray-600 ko-modal-copy leading-relaxed">
          아래는 기본 사양 외에 도입 시 선택하실 수 있는 항목입니다.
          <br />
          적용 조건과 상세 사양은 도입 문의 시 안내드립니다.
        </p>

        <ul className="space-y-5 text-sm text-gray-700">
          <li className="ko-modal-copy leading-relaxed">
            <span className="font-semibold text-primary block mb-1">측면 커버</span>
            투명 또는 시그니처 퍼플 중 선택 가능합니다.
            <br />
            두 옵션은 동일 조건으로 안내합니다.
          </li>
          <li className="ko-modal-copy leading-relaxed">
            <span className="font-semibold text-primary block mb-1">퍼포먼스 레벨 업그레이드</span>
            기본 사양(최대 <strong className="text-gray-900">170kg</strong>)에서 한 단계 올려,{' '}
            <strong className="text-gray-900">퍼포먼스 레벨</strong>로 업그레이드할 수 있습니다.
            <br />
            적용 시 최대 하중은 <strong className="text-gray-900">260kg</strong> 수준까지 확장됩니다.
          </li>
          <li className="ko-modal-copy leading-relaxed">
            <span className="font-semibold text-primary block mb-1">전고(높이), 자이언트 높이</span>
            자이언트 높이 옵션을 적용하면 전고를 <strong className="text-gray-900">2,400mm</strong>까지 높일 수 있습니다.
            <br />
            폭과 깊이는 와이드 기본과 동일한 규격을 유지하면서, 천장 높이나 현장 여건에 맞춰 전고를 넉넉히 잡을 수 있습니다.
          </li>
        </ul>
      </div>

      <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary-muted/40 to-white p-6 sm:p-8 text-center">
        <p className="text-sm sm:text-base text-gray-700 ko-modal-copy leading-relaxed max-w-xl mx-auto mb-5">
          사양을 보시다 보면 <strong className="text-gray-900">도입 비용이나 월 부담</strong>이 궁금하실 수 있습니다.
          <br />
          스미스 로봇(SR) 기준 가격과 납입 구조는 가격 안내 페이지에서 정리해 두었습니다.
        </p>
        <Link
          href="/pricing/smith"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-white text-sm sm:text-base font-semibold hover:bg-primary-dark transition-colors shadow-md hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          가격 안내 보기
          <span aria-hidden className="text-lg leading-none">
            →
          </span>
        </Link>
      </div>
    </div>
  )
}

function BaseRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <tr className="hover:bg-gray-50/80 transition-colors">
      <th
        scope="row"
        className="px-4 sm:px-6 py-3.5 align-top font-medium text-gray-600 border-r border-gray-100 bg-white"
      >
        {label}
      </th>
      <td className="px-4 sm:px-6 py-3.5 align-top text-gray-900 bg-white">{value}</td>
    </tr>
  )
}
