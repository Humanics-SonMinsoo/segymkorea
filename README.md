# 세짐 SEGYM 웹사이트

Next.js 14 기반 공식 사이트입니다.

## 로컬 실행

```bash
npm install
npm run dev
```

- **`npm run dev`** → **Turbopack** (`next dev --turbo`) — Webpack 청크 `./682.js` 류 오류를 피하기 위해 **기본값**입니다.
- Webpack으로 돌리려면: **`npm run dev:webpack`**

브라우저는 **`http://localhost:3000`** 만 사용하세요.

## 화면이 안 보이거나 500 / `Cannot find module './xxx.js'` 가 날 때

코드 오류가 아니라 **개발 캐시(.next / node_modules/.cache) 불일치**인 경우가 많습니다.

1. dev 서버 **종료** (Ctrl+C)
2. 한 번에 정리 후 재시작:

   ```bash
   npm run dev:fix
   ```

   (`3000~3010` 포트 정리 → `.next` + `node_modules/.cache` 삭제 → **Turbopack**으로 dev)

3. 브라우저 **강력 새로고침** (Ctrl+Shift+R)

### `Cannot find module './682.js'` (숫자 청크)

**Webpack** 개발 서버에서 자주 납니다. 이 저장소는 **`npm run dev` = Turbopack** 이라 기본적으로 이 경로를 쓰지 않습니다.

- 실수로 **`npm run dev:webpack`** 쓰다가 났다면 → **`npm run clean`** 후 **`npm run dev`** (Turbo) 로 다시 띄우세요.

### `missing required error components, refreshing...`

Next가 내부 `/_error` 번들을 못 찾을 때입니다. **`src/pages/_app.tsx` + `src/pages/_error.tsx`** 가 있고, **`npm run dev:fix`** 로 캐시를 지운 뒤 다시 시도해 보세요.

### 스크립트 요약

| 명령 | 설명 |
|------|------|
| `npm run dev` | **Turbopack** 개발 서버 (포트 3000, **권장**) |
| `npm run dev:webpack` | Webpack dev (필요할 때만) |
| `npm run dev:turbo` | `dev`와 동일 |
| `npm run dev:clean` | clean 후 Turbopack |
| `npm run dev:fix` | 포트 정리 + clean + Turbopack |
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
