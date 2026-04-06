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

로컬 `.env.local`에 있는 값을 **그대로 복사**해도 되고, 운영용으로 **새로 강한 비밀번호**를 쓰는 것을 권장합니다.

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

## 5. 배포 후 확인

- `https://segymkorea.com` (또는 임시 `*.vercel.app`) 접속
- 문의/소개서 요청 폼이 **동작하는지** 확인
- `/admin/login` 로그인 후 어드민 화면 확인

## 6. 중요: 문의 데이터 저장 (반드시 읽기)

현재 도입 문의·소개서 요청은 서버의 **`data/leads.json`**, **`data/brochure-requests.json`** 파일에 저장됩니다.

**Vercel 서버리스 환경에서는 이 파일이 배포 단위마다 초기화되거나, 인스턴스 간에 공유되지 않습니다.**  
즉, **운영에서 문의가 영구 저장되지 않을 수 있습니다.**

장기 운영 시에는 아래 중 하나로 옮기는 것을 권장합니다.

- Vercel Postgres / Neon / Supabase 등 **DB**
- Vercel KV / Upstash Redis
- 이메일 전송(SendGrid, Resend 등) 또는 슬랙 웹훅으로 **즉시 알림만** 받기

(원하시면 이후 단계에서 저장소 연동 설계를 도와드릴 수 있습니다.)

## 7. 체크리스트

- [ ] Git 원격 저장소에 푸시됨
- [ ] Vercel에 환경 변수 등록 (`NEXT_PUBLIC_SITE_URL` = `https://segymkorea.com`)
- [ ] 도메인 DNS를 Vercel 안내대로 설정
- [ ] `https://segymkorea.com`으로 접속 및 폼 테스트
- [ ] 문의 데이터 영구 저장 필요 시 DB 등 마이그레이션 계획
