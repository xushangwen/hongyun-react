import { afterEach, describe, expect, it, vi } from 'vitest'
import { clearCmsCache, isCmsCacheBypassed, normalizeCms } from './cms'

afterEach(() => {
  vi.useRealTimers()
})

describe('normalizeCms media paths', () => {
  it('rewrites uploaded media paths inside JSON datasets through the BFF media route', () => {
    expect(normalizeCms({
      rows: [
        { img: '/uploads/timeline.webp', title: '发展历程' },
        { video: '/uploads/company.webm' },
      ],
    })).toEqual({
      rows: [
        { img: '/api/cms/media/timeline.webp', title: '发展历程' },
        { video: '/api/cms/media/company.webm' },
      ],
    })
  })

  it('keeps existing public asset paths unchanged for compatibility', () => {
    expect(normalizeCms({ img: '/assets/images/history/1990.webp' })).toEqual({
      img: '/assets/images/history/1990.webp',
    })
  })

  it('bypasses cache while a published CMS change is propagating', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-07-31T00:00:00+08:00'))

    clearCmsCache()

    expect(isCmsCacheBypassed()).toBe(true)
    vi.advanceTimersByTime(90_001)
    expect(isCmsCacheBypassed()).toBe(false)
  })
})
