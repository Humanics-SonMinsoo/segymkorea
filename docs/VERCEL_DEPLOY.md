# Vercel 배포 및 도메인 (segymkorea.com)

## 1. 사전 준비

- GitHub(또는 GitLab/Bitbucket)에 이 저장소를 푸시해 두세요.
- 도메인 **segymkorea.com**은 구매처(가비아, 후이즈, Cloudflare 등)에서 **DNS 설정만** 할 수 있으면 됩니다.

## 2. Vercel에 프로젝트 연결

1. [vercel.com](https://vercel.com) 로그인 → **Add New… → Project**
2. Git 저장소 **Import**
3. **Framework Preset**: Next.js (자동 인식)
4. **Build Command**: `npm run build` (기본값)
5. **Output Directory**: 비워 두기 (Next 기본)
6. **Install Command**: `npm install` (기본값)

## 3. 환경 변수 (Project → Settings → Environment Variables)

배포 전에 아래를 **Production**(필요 시 Preview/Development도)에 등록하세요.

| 이름 | 설명 |
|------|------|
| `LEADS_ADMIN_ID` | 어드민 로그인 ID (8자 이상) |
| `LEADS_ADMIN_PASSWORD` | 어드민 비밀번호 (16자 이상) |
| `ADMIN_SESSION_SECRET` | 세션용 긴 임의 문자열 (32자 이상 권장) |
| `NEXT_PUBLIC_SITE_URL` | **`https://segymkorea.com`** (끝에 슬래시 없이) |
| `NEXT_PUBLIC_KAKAO_CHANNEL_URL` | (선택) 카카오 채널 채팅 URL |
| `NEXT_PUBLIC_META_PIXEL_ID` | (선택) Meta 픽셀 ID |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | (선택) Google Analytics 4 측정 ID (`G-…`) |
| `UPSTASH_REDIS_REST_URL` | **(운영 필수)** Upstash Redis REST URL |
| `UPSTASH_REDIS_REST_TOKEN` | **(운영 필수)** Upstash Redis REST TOKEN |
| `NEXT_PUBLIC_NAVER_SITE_VERIFICATION` | (선택) 네이버 서치어드바이저 HTML 태그의 `content` 값만 |

로컬 `.env.local`에 있는 값을 **그대로 복사**해도 되고, 운영용으로 **새로 강한 비밀번호**를 쓰는 것을 권장합니다.

### Upstash Redis (도입 문의·소개서 저장)

Vercel에서는 로컬 파일(`data/*.json`)에 쓸 수 없어 **반드시** Upstash(또는 동일한 Redis)를 연결해야 폼이 저장됩니다.

1. [console.upstash.com](https://console.upstash.com) 가입 → **Redis** → **Create database** (무료 리전 선택 가능)
2. 생성 후 **REST API** 탭에서 **`UPSTASH_REDIS_REST_URL`**, **`UPSTASH_REDIS_REST_TOKEN`** 복사  
   - **Read-Only Token**이 아니라, 기본(읽기·쓰기) **TOKEN**을 써야 `SET` 저장이 됩니다.
3. Vercel **Environment Variables**에 위 두 이름으로 붙여넣기 → **Redeploy**  
   - GitHub 등과 연동한 프로젝트는 **로컬에서 수정만 하고 푸시하지 않으면**, Vercel에 올라가는 코드가 예전 버전일 수 있습니다. **push 후 자동 배포**되게 맞추는 것을 권장합니다.

**Deploy** 버튼으로 첫 배포를 완료합니다.

## 4. 커스텀 도메인 segymkorea.com 연결

1. Vercel 프로젝트 → **Settings → Domains**
2. 입력란에 **`segymkorea.com`** 추가 → Continue  
3. (선택) **`www.segymkorea.com`** 도 추가하면, Vercel에서 **www → 루트(또는 반대) 리다이렉트**를 설정할 수 있습니다.

Vercel이 안내하는 **DNS 레코드**를 도메인 구매처 DNS에 넣습니다.

### 흔한 설정 예시

- **루트 도메인만 쓰는 경우 (`segymkorea.com`)**  
  - 도메인 업체가 **ALIAS/ANAME/flattening**을 지원하면: Vercel이 알려주는 대상(예: `cname.vercel-dns.com`)으로 연결  
  - 또는 Vercel 안내에 따라 **A 레코드** (Vercel이 제시하는 IP)

- **www까지 쓰는 경우**  
  - `www` → **CNAME** → `cname.vercel-dns.com` (Vercel 화면에 표시되는 값 기준)

DNS 반영까지 **몇 분~48시간** 걸릴 수 있습니다. Vercel Domains 화면에서 **Valid Configuration**이 되면 완료입니다.

## 5. 네이버 서치어드바이저 (선택)

1. [서치어드바이저](https://searchadvisor.naver.com/) 로그인 → **사이트 추가** → `https://segymkorea.com` (또는 `https://www.segymkorea.com` 중 실제로 쓰는 주소)
2. **소유 확인** — 아래 중 **하나만** 성공해도 됩니다.
   - **HTML 파일**: `https://segymkorea.com/naver603a069df921dcb5566c6df25e62567d.html` — `src/app/naver603a069df921dcb5566c6df25e62567d.html/route.ts` 에서 응답. **등록한 호스트**(루트/www)와 주소가 같아야 함.
   - **HTML 메타**: 루트 레이아웃에 `naver-site-verification` 메타가 들어가 있음. 값을 바꿀 때만 Vercel **`NEXT_PUBLIC_NAVER_SITE_VERIFICATION`** 에 `content` 값만 넣고 Redeploy.
3. 서치어드바이저에서 **소유 확인** 클릭
4. (선택) **요청 → 사이트맵 제출** — `sitemap.xml`을 만들면 그 URL을 제출하면 수집에 도움이 됩니다. (아직 없으면 이 단계는 건너뛰어도 됩니다.)

### Google Search Console (선택)

- [Search Console](https://search.google.com/search-console) → 속성 추가 → `https://segymkorea.com`
- **HTML 파일** 소유 확인 시: 배포 후 `https://segymkorea.com/googlebe2bab8e331c443b.html` 이 열리는지 확인 → 콘솔에서 검증

## 6. 배포 후 확인

- `https://segymkorea.com` (또는 임시 `*.vercel.app`) 접속
- 문의/소개서 요청 폼이 **동작하는지** 확인
- `/admin/login` 로그인 후 어드민 화면 확인

## 7. 문의 데이터 저장

- **로컬 개발:** `data/leads.json`, `data/brochure-requests.json` 파일에 저장됩니다.
- **Vercel:** 위와 같이 파일에 쓸 수 없으므로 **`UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN`** 이 설정되면 **Upstash Redis**에 JSON으로 저장됩니다. 미설정 시 폼은 **503** 안내 메시지를 반환합니다.

추가로 이메일 알림·DB 이관 등은 필요 시 확장할 수 있습니다.

### 폼이 「저장에 실패했습니다」이고 어드민에 리드가 없을 때

| 증상 | 의미 |
|------|------|
| **503** + 저장소 연결 안내 | 배포에 `UPSTASH_*`가 없거나, Redeploy 전입니다. |
| **500** + 저장 실패 안내 | URL/TOKEN은 인식됐지만 **Redis 요청이 거절**된 경우입니다. Read-Only 토큰 오복사, 토큰 잘림, 잘못된 URL이 흔합니다. |

- Vercel → 해당 배포 → **Functions → Logs**에서 `[api/leads POST]` 로그 확인  
- 임시로 환경 변수 **`LEADS_API_DEBUG=1`** 을 넣고 Redeploy하면, 오류 응답 JSON에 `debug` 필드로 서버 메시지가 붙습니다. **확인 후 반드시 삭제**하세요.

## 8. 체크리스트

- [ ] Git 원격 저장소에 푸시됨
- [ ] Vercel에 환경 변수 등록 (`NEXT_PUBLIC_SITE_URL` = `https://segymkorea.com`)
- [ ] 도메인 DNS를 Vercel 안내대로 설정
- [ ] `https://segymkorea.com`으로 접속 및 폼 테스트
- [ ] **Upstash Redis** 환경 변수 등록 후 도입 문의·소개서 폼 테스트
