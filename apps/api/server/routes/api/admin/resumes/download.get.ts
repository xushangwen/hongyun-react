import { createReadStream } from 'node:fs'
import { stat } from 'node:fs/promises'
import { basename, resolve } from 'node:path'
import {
  createError,
  defineEventHandler,
  getQuery,
  setResponseHeader,
  sendStream,
} from 'h3'
import { strapiFetch } from '~/utils/cms'
import { requireRecruiter, verifyResumeDownload } from '~/utils/recruiter'

export default defineEventHandler(async (event) => {
  const actor = requireRecruiter(event)
  const query = getQuery(event)
  const documentId = String(query.documentId || '')
  const expires = Number(query.expires)
  const signature = String(query.signature || '')
  if (!/^[a-z0-9]{20,32}$/i.test(documentId) ||
      !verifyResumeDownload(documentId, expires, signature)) {
    throw createError({ statusCode: 401, statusMessage: 'invalid or expired download signature' })
  }
  const response = await strapiFetch<any>(`/resume-submissions/${documentId}`, {
    query: {
      fields: ['documentId', 'privateFileKey', 'originalFilename', 'mime', 'scanStatus', 'status', 'expiresAt'],
    },
  })
  const resume = response.data
  if (!resume || resume.scanStatus !== 'clean' || resume.status === 'deleted') {
    throw createError({ statusCode: 404, statusMessage: 'resume not available' })
  }
  const config = useRuntimeConfig()
  const privateRoot = resolve(process.cwd(), config.privateUploadDir)
  const file = resolve(privateRoot, resume.privateFileKey)
  if (!file.startsWith(`${privateRoot}/`)) throw createError({ statusCode: 400, statusMessage: 'invalid file key' })
  const fileStat = await stat(file).catch(() => null)
  if (!fileStat?.isFile()) throw createError({ statusCode: 404, statusMessage: 'resume file missing' })
  await strapiFetch('/access-audit-logs', {
    method: 'POST',
    write: true,
    body: {
      data: {
        actor,
        action: 'download',
        targetType: 'resume',
        targetDocumentId: documentId,
        occurredAt: new Date().toISOString(),
      },
    },
  })
  const filename = basename(resume.originalFilename || `resume${basename(file)}`)
  setResponseHeader(event, 'Content-Type', resume.mime || 'application/octet-stream')
  setResponseHeader(event, 'Content-Length', fileStat.size)
  setResponseHeader(event, 'Content-Disposition', `attachment; filename*=UTF-8''${encodeURIComponent(filename)}`)
  setResponseHeader(event, 'Cache-Control', 'private, no-store')
  return sendStream(event, createReadStream(file))
})
