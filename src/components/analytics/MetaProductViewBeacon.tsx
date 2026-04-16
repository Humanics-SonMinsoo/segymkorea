'use client'

import { useEffect } from 'react'
import { trackMetaStandard } from '@/lib/meta-pixel'

/** 제품 상세(스미스) 진입 시 ViewContent 1회 */
export function MetaProductViewBeacon() {
  useEffect(() => {
    trackMetaStandard('ViewContent', {
      content_ids: 'smith',
      content_type: 'product',
      content_name: 'SEGYM 스미스 SR',
    })
  }, [])
  return null
}
