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
}

module.exports = nextConfig
