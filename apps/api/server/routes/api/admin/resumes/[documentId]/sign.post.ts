import { createError, defineEventHandler, getRouterParam } from 'h3'
import { strapiFetch } from '~/utils/cms'
import { requireRecruiter, signResumeDownload } from '~/utils/recruiter'

export default defineEventHandler(async (event) => {
  requireRecruiter(event)
  const documentId = getRouterParam(event, 'documentId') || ''
  if (!/^[a-z0-9]{20,32}$/i.test(documentId)) {
    throw createError({ statusCode: 400, statusMessage: 'invalid resume id' })
  }
  const response = await strapiFetch<any>(`/resume-submissions/${documentId}`, {
    query: { fields: ['documentId', 'scanStatus', 'status', 'expiresAt'] },
  })
  const resume = response.data
  if (!resume) throw createError({ statusCode: 404, statusMessage: 'resume not found' })
  if (resume.scanStatus !== 'clean') throw createError({ statusCode: 409, statusMessage: 'resume scan is not clean' })
  if (resume.status === 'deleted' || new Date(resume.expiresAt).getTime() <= Date.now()) {
    throw createError({ statusCode: 410, statusMessage: 'resume expired' })
  }
  const expires = Date.now() + 5 * 60_000
  const signature = signResumeDownload(documentId, expires)
  return {
    url: `/api/admin/resumes/download?documentId=${encodeURIComponent(documentId)}&expires=${expires}&signature=${signature}`,
    expiresAt: new Date(expires).toISOString(),
  }
})
