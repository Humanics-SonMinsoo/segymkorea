'use client'

import Script from 'next/script'
import { getKakaoJsKey } from '@/lib/kakao-share'

const KAKAO_SDK_SRC = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js'

export function KakaoSdk() {
  const key = getKakaoJsKey()
  if (!key) return null

  return (
    <Script
      id="kakao-js-sdk"
      src={KAKAO_SDK_SRC}
      strategy="afterInteractive"
      onLoad={() => {
        if (window.Kakao && !window.Kakao.isInitialized()) {
          window.Kakao.init(key)
        }
      }}
    />
  )
}
