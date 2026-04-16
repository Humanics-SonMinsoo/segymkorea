# Google Analytics 4 (GA4)

## 1. 측정 ID 발급

1. [Google Analytics](https://analytics.google.com/) 접속 → **관리**(톱니바퀴)
2. **속성 만들기** 또는 기존 속성 선택 → **데이터 스트림** → **웹** 스트림 추가
3. 사이트 URL 입력 후 스트림 생성 → **측정 ID** (`G-XXXXXXXXXX`) 복사

## 2. 이 프로젝트에 연결

코드에 **기본 측정 ID `G-C0L5MZ19K0`** 가 들어 있어, 환경 변수 없이도 GA가 동작합니다.

| 위치 | 값 |
|------|-----|
| (선택) 로컬 | `.env.local` 에 `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-...` 로 **다른 ID**로 덮어쓰기 |
| (선택) Vercel | 동일 변수로 덮어쓰기 후 **Redeploy** |

구글이 안내한 `<script>` 두 덩어리는 `src/components/analytics/GoogleAnalytics.tsx` 와 동일 역할입니다. **HTML에 직접 붙일 필요 없습니다.**

## 3. 동작 방식

- `src/components/analytics/GoogleAnalytics.tsx` 가 `gtag.js` 로드
- `send_page_view: false` 로 자동 중복을 막고, **페이지 경로가 바뀔 때마다** `page_view` 이벤트를 보냅니다 (Next App Router 클라이언트 네비게이션 포함).

## 4. 확인

- GA4 **보고서** → **실시간** — 본인 접속이 잡히는지 (몇 분 지연될 수 있음)
- 브라우저 **광고 차단** 끄고 테스트

## 5. (선택) BigQuery / 전환 이벤트

- 속성 설정에서 **BigQuery 연결**, **전환 이벤트** 표시 등은 GA 콘솔에서 별도 설정합니다.
