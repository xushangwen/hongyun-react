import { describe, expect, it } from 'vitest'
import {
  contactPayloadSchema,
  localeSchema,
  paginationSchema,
  pathSchema,
  technicalDatasetSchema,
} from './index'

describe('public contracts', () => {
  it('只接受 zh/en 与安全站内路径', () => {
    expect(localeSchema.parse('zh')).toBe('zh')
    expect(() => localeSchema.parse('fr')).toThrow()
    expect(pathSchema.parse('/products/new-energy')).toBe('/products/new-energy')
    expect(() => pathSchema.parse('//evil.example')).toThrow()
  })

  it('限制分页和联系表单', () => {
    expect(paginationSchema.parse({ page: '2', pageSize: '30' })).toEqual({ page: 2, pageSize: 30 })
    expect(() => contactPayloadSchema.parse({
      name: '测试',
      phone: 'abc',
      message: '需求',
      contextPath: '/contact',
    })).toThrow()
  })

  it('拒绝重复技术数据列', () => {
    expect(() => technicalDatasetSchema.parse({
      title: '表格',
      kind: 'spec-table',
      schemaVersion: 1,
      columns: [
        { id: 'model', label: '型号' },
        { id: 'model', label: '重复型号' },
      ],
      rows: [],
    })).toThrow()
  })
})
