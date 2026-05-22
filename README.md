# 세짐 SEGYM 웹사이트

Next.js 14 기반 공식 사이트입니다.

## 로컬 실행

```bash
npm install
npm run dev
```

- **`npm run dev`** → **Webpack** (`next dev`) — `app-build-manifest` / `icon.png` 라우트 등 **Turbopack 조합에서 ENOENT**가 날 때가 있어 기본은 Webpack입니다.
- 더 빠른 빌드가 필요하면: **`npm run dev:turbo`** (`next dev --turbo`)

브라우저는 **`http://localhost:3000`** 만 사용하세요.

## `EADDRINUSE: address already in use :::3000`

**3000 포트를 예전 `dev` / `start` 프로세스가 아직 잡고 있는 상태**입니다. `npm run clean`만 하면 포트는 그대로라 `dev`가 실패합니다.

```bash
npm run dev:fix
```

위 한 줄이 **포트 3000~3010 정리 → 캐시 삭제 → dev 재시작**까지 합니다.  
(또는 3000 쓰는 터미널에서 **Ctrl+C** 로 끈 뒤 `npm run dev`)

**명령 프롬프트(cmd)** 에서 `Remove-Item` 은 안 됩니다. 캐시 삭제는 `npm run clean` 을 쓰세요.

## 화면이 안 보이거나 500 / ENOENT / `Cannot find module './xxx.js'` 가 날 때

코드 오류가 아니라 **개발 캐시(.next) 불일치**이거나 **Turbopack 매니페스트 버그**인 경우가 많습니다.

1. **`npm run dev:fix`** (포트 비우기 + clean + Webpack dev)
2. 여전히 Turbopack을 쓰고 싶다면: **`npm run dev:turbo`** 는 캐시 깨끗할 때만 시도
3. 브라우저 **강력 새로고침** (Ctrl+Shift+R)

### `app-build-manifest.json` / `app-paths-manifest.json` ENOENT (Turbopack)

- **`npm run dev:fix`** 후 **기본 `npm run dev`(Webpack)** 로 쓰는 것을 권장합니다.

### `Cannot find module './682.js'` (숫자 청크, Webpack)

캐시 꼬임입니다 → **`npm run dev:fix`** 또는 `npm run clean` 후 dev 재시작.

### `missing required error components, refreshing...`

Next가 내부 `/_error` 번들을 못 찾을 때입니다. **`npm run dev:fix`** 로 캐시를 지운 뒤 다시 시도해 보세요.

### 스크립트 요약

| 명령 | 설명 |
|------|------|
| `npm run dev` | **Webpack** 개발 서버 (포트 3000, **기본, 안정**) |
| `npm run dev:turbo` | Turbopack dev (빠르지만 환경에 따라 불안정할 수 있음) |
| `npm run dev:webpack` | `dev`와 동일 |
| `npm run dev:clean` | clean 후 Webpack dev |
| `npm run dev:fix` | **3000~3010 포트 정리** + clean + Webpack dev (**문제 날 때 1순위**) |
| `npm run ports:free` | 포트만 정리 |
| `npm run clean` | `.next` + `node_modules/.cache` 삭제 |
| `npm run build` | 프로덕션 빌드 |

## 빌드

```bash
npm run build
npm run start
```

## Vercel 배포 및 도메인 (segymkorea.com)

단계별 안내는 **[docs/VERCEL_DEPLOY.md](./docs/VERCEL_DEPLOY.md)** 를 참고하세요.

- Vercel에 Git 연결 → 환경 변수 등록 → **Domains**에서 `segymkorea.com` 추가 → DNS 설정
- 운영 시 **`NEXT_PUBLIC_SITE_URL=https://segymkorea.com`** 권장
- 문의 데이터는 현재 로컬 JSON 파일 저장 구조라 **Vercel만으로는 영구 저장에 한계**가 있을 수 있음 → 문서의 「문의 데이터 저장」 절 참고
