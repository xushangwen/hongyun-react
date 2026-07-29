import { describe, expect, it } from 'vitest'
import { maskEmail, maskPhone, verifyResumeSignature } from './security'

describe('form security', () => {
  it('掩码手机号与邮箱', () => {
    expect(maskPhone('13812345678')).toBe('138****5678')
    expect(maskEmail('hello@example.com')).toBe('h***@example.com')
  })

  it('按扩展名、MIME 和文件签名校验简历', () => {
    expect(verifyResumeSignature('resume.pdf', 'application/pdf', Buffer.from('%PDF-1.7'))).toBe(true)
    expect(verifyResumeSignature('resume.pdf', 'application/pdf', Buffer.from('MZ'))).toBe(false)
  })
})
