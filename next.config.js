/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
  },
  /**
   * Windows 개발 시 Webpack 디스크 캐시가 .next/server 청크와 어긋나
   * `Cannot find module './276.js'` 등이 나는 경우가 있어, dev에서만 캐시 끔.
   * (빌드 `next build`에는 적용되지 않음)
   */
  /** Webpack dev 전용: 디스크 캐시 끔 → `./682.js` 등 청크 불일치 완화 (Turbo 미사용 시) */
  webpack: (config, { dev }) => {
    if (dev) {
      config.cache = false
    }
    return config
  },
  async redirects() {
    return [
      { source: '/specs', destination: '/product#specs', permanent: true },
      { source: '/product/specs', destination: '/product#specs', permanent: true },
      { source: '/pricing/cycle', destination: '/pricing', permanent: false },
    ]
  },
  /**
   * 네이버 소유 확인 HTML — public 정적 파일보다 먼저 매칭되도록 beforeFiles.
   * (배포 후에도 404 나는 환경에서 동일 URL로 200 응답 보장)
   */
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/naver603a069df921dcb5566c6df25e62567d.html',
          destination: '/api/naver-site-verification',
        },
      ],
    }
  },
}

module.exports = nextConfig
