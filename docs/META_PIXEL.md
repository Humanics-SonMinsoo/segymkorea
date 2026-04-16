# Meta 픽셀 이벤트 (SEGYM)

`NEXT_PUBLIC_META_PIXEL_ID` 가 설정되어 있을 때만 `fbq` 가 로드되고, 아래 이벤트가 **클라이언트**에서 전송됩니다.

## 표준 이벤트

| 이벤트 | 발생 시점 | 파라미터 예시 |
|--------|------------|----------------|
| **PageView** | 모든 페이지 (기존 `MetaPixel` 스크립트) | — |
| **ViewContent** | 제품 상세 `/product/smith` 진입 | `content_type: product`, `content_ids: smith` |
| **ViewContent** | 가격 상세 `/pricing/[slug]` 진입 | `content_type: pricing`, `content_ids`, `content_name` |
| **Lead** | 도입 문의 폼 **전송 성공** | `content_name: 도입 문의`, `content_category: segym_inquiry` |
| **Lead** | 소개서 받기 폼 **전송 성공** | `content_name: 소개서 받기`, `content_category: segym_brochure` |

## 커스텀 이벤트

광고 매니저에서 **커스텀 전환**으로 규칙을 만들 수 있습니다.

| 이름 | 발생 시점 |
|------|------------|
| `OpenInquiryModal` | 도입 문의 모달을 여는 CTA 클릭 |
| `OpenBrochureModal` | 소개서 모달을 여는 CTA 클릭 |

공통 파라미터: `placement: cta` (필요 시 버튼별로 확장 가능)

## 코드 위치

- 헬퍼: `src/lib/meta-pixel.ts`
- 픽셀 로드: `src/components/analytics/MetaPixel.tsx`
- 전환·모달: `InquiryModalContext`, `BrochureModalContext`, `OpenInquiryButton`, `OpenBrochureButton`, `PricingProductDetailContent`, `MetaProductViewBeacon`

## 광고 세팅 팁

1. 이벤트 관리자 → **데이터 소스** → 해당 픽셀 → **테스트 이벤트** 로 실시간 수신 확인  
2. 캠페인 전환 목표: **리드** 또는 **맞춤 전환**에서 `Lead` / 커스텀 이벤트 선택  
3. (선택) 서버에서도내려면 **Conversions API** 를 추가하면 중복·누락이 줄어듭니다.
