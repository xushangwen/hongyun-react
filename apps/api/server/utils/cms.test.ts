import { describe, expect, it } from 'vitest'
import { normalizeCms } from './cms'

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
})
