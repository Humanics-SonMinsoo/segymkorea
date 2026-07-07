'use client'

import Script from 'next/script'
import { getKakaoJsKey } from '@/lib/kakao-share'

const KAKAO_SDK_SRC = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js'
const KAKAO_SDK_INTEGRITY = 'sha384-DKYJZ8Lli+8Y8jtmz/LHqu5lvvyI8inXWi/5s3edKA50A+IlZ0v/P8vrEYBB6+5v3'

export function KakaoSdk() {
  const key = getKakaoJsKey()
  if (!key) return null

  return (
    <Script
      id="kakao-sdk"
      src={KAKAO_SDK_SRC}
      integrity={KAKAO_SDK_INTEGRITY}
      crossOrigin="anonymous"
      strategy="lazyOnload"
      onLoad={() => {
        if (window.Kakao && !window.Kakao.isInitialized()) {
          window.Kakao.init(key)
        }
      }}
    />
  )
}
