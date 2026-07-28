import { afterEach, describe, expect, it, vi } from 'vitest'
import { FormSubmissionError, submitInquiry, submitResume } from './formsApi'

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('forms API', () => {
  it('only resolves inquiry submission after a successful response', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ ok: true }),
    })
    vi.stubGlobal('fetch', fetchMock)

    await submitInquiry({
      name: ' 张三 ',
      phone: ' 13800000000 ',
      company: ' 红运 ',
      email: '',
      industry: '新能源行业 / 锂电池',
      needs: ' 技术咨询 ',
    })

    const [, request] = fetchMock.mock.calls[0]
    expect(JSON.parse(request.body)).toMatchObject({
      name: '张三',
      phone: '13800000000',
      company: '红运',
      message: '技术咨询',
    })
  })

  it('maps rate limiting to a useful error', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: false,
      status: 429,
      json: () => Promise.resolve(null),
    }))

    await expect(submitInquiry({
      name: '张三',
      phone: '13800000000',
      company: '红运',
      email: '',
      industry: '',
      needs: '咨询',
    })).rejects.toEqual(expect.objectContaining({
      message: '提交过于频繁，请稍后再试',
      status: 429,
    }))
  })

  it('uploads resume as multipart form data', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ code: 0 }),
    })
    vi.stubGlobal('fetch', fetchMock)
    const file = new Blob(['resume'], { type: 'application/pdf' })

    await submitResume({ file, name: '李四', phone: '13900000000', position: '机械工程师' })

    const [, request] = fetchMock.mock.calls[0]
    expect(request.body).toBeInstanceOf(FormData)
    expect(request.body.get('position')).toBe('机械工程师')
    expect(request.headers['Content-Type']).toBeUndefined()
  })

  it('rejects backend application errors', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: () => Promise.resolve({ ok: false, message: '校验失败' }),
    }))

    await expect(submitInquiry({
      name: '张三',
      phone: '13800000000',
      company: '红运',
      email: '',
      industry: '',
      needs: '咨询',
    })).rejects.toBeInstanceOf(FormSubmissionError)
  })
})
