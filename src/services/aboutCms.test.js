import { describe, expect, it } from 'vitest'
import {
  filterAboutMedia,
  getAboutDatasetRows,
  getAboutRichTextRange,
  groupAboutPartners,
} from './aboutCms'

describe('about CMS mapping', () => {
  it('读取关于我们专属数据集并保留本地回退', () => {
    const detail = { datasets: { 'about:dataset:timelineData': { rows: [{ year: '2026' }] } } }
    expect(getAboutDatasetRows(detail, 'timelineData', [])).toEqual([{ year: '2026' }])
    expect(getAboutDatasetRows(detail, 'missing', [{ year: '1993' }])).toEqual([{ year: '1993' }])
  })

  it('按标题边界读取迁移后的富文本段落', () => {
    const detail = {
      sections: [{
        __component: 'content.rich-text',
        visible: true,
        body: [
          { children: [{ text: '公司简介' }] },
          { children: [{ text: '第一段' }] },
          { children: [{ text: '第二段' }] },
          { children: [{ text: '企业宣传片' }] },
        ],
      }],
    }
    expect(getAboutRichTextRange(detail, '公司简介', '企业宣传片')).toEqual(['第一段', '第二段'])
  })

  it('使用 sourcePath 识别后台上传后的媒体', () => {
    const items = [
      { sourcePath: '/assets/images/rnd/a.webp', src: '/api/cms/media/a.webp', alt: 'A' },
      { sourcePath: '/assets/images/history/b.webp', src: '/api/cms/media/b.webp', alt: 'B' },
    ]
    expect(filterAboutMedia(items, /\/rnd\//)).toEqual([
      { src: '/api/cms/media/a.webp', alt: 'A', label: 'A' },
    ])
  })

  it('通过 legacyKey 恢复合作伙伴行业分组', () => {
    const groups = [{ id: 'chemical', label: '化工行业', items: [] }]
    const partners = [{
      name: '巴斯夫',
      legacyKey: 'partner:chemical:巴斯夫',
      logo: { url: '/logo.svg', alt: 'BASF' },
    }]
    expect(groupAboutPartners(partners, groups)[0].items[0]).toMatchObject({
      name: '巴斯夫',
      logo: '/logo.svg',
      textOnly: false,
    })
  })
})
