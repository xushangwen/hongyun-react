const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '')
const REQUEST_TIMEOUT_MS = 10000

export class FormSubmissionError extends Error {
  constructor(message, status = 0) {
    super(message)
    this.name = 'FormSubmissionError'
    this.status = status
  }
}

async function request(path, options) {
  const controller = new AbortController()
  const timeoutId = globalThis.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
        ...options.headers,
      },
    })
    const data = await response.json().catch(() => null)

    if (!response.ok || data?.ok === false || (typeof data?.code === 'number' && data.code !== 0)) {
      if (response.status === 429) {
        throw new FormSubmissionError('提交过于频繁，请稍后再试', response.status)
      }
      throw new FormSubmissionError(data?.message || '提交失败，请稍后重试', response.status)
    }

    return data
  } catch (error) {
    if (error instanceof FormSubmissionError) throw error
    if (error.name === 'AbortError') {
      throw new FormSubmissionError('请求超时，请检查网络后重试')
    }
    throw new FormSubmissionError('网络连接失败，请检查网络后重试')
  } finally {
    globalThis.clearTimeout(timeoutId)
  }
}

export function submitInquiry(formData, source = 'website') {
  const contextPath = globalThis.location?.pathname || '/contact'
  const contextType = contextPath.startsWith('/products/')
    ? 'product'
    : contextPath.startsWith('/solutions/')
      ? 'solution'
      : 'page'
  return request('/api/cms/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      company: formData.company.trim(),
      email: formData.email.trim(),
      industry: formData.industry,
      message: formData.needs.trim(),
      contextType,
      contextDocumentId: formData.contentDocumentId || undefined,
      contextPath,
      referrer: globalThis.document?.referrer || '',
      utm: { source },
      website: '',
    }),
  })
}

export function submitResume({ file, name = '', phone = '', email = '', position }) {
  const body = new FormData()
  body.append('file', file)
  body.append('name', name.trim())
  body.append('phone', phone.trim())
  body.append('email', email.trim())
  body.append('position', position)
  body.append('source', 'website')

  return request('/api/cms/resume', {
    method: 'POST',
    body,
  })
}
