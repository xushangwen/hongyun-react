import { createError, defineEventHandler, getQuery } from 'h3'
import { pathSchema } from '@hongyun/contracts'
import { cached, normalizeCms, parseLocale, strapiFetch } from '~/utils/cms'

export default defineEventHandler(async (event) => {
  const locale = parseLocale(event)
  const parsed = pathSchema.safeParse(getQuery(event).path)
  if (!parsed.success) throw createError({ statusCode: 400, statusMessage: 'invalid path' })
  return cached(event, `resolve:${locale}:${parsed.data}`, 120_000, async () => {
    const response = await strapiFetch<any>('/url-aliases', {
      query: {
        locale,
        filters: {
          path: { $eq: parsed.data },
          localeCode: { $eq: locale },
          active: { $eq: true },
        },
        pagination: { pageSize: 1 },
        populate: { product: true, solution: true, article: true },
      },
    })
    const alias = response.data?.[0]
    if (!alias) throw createError({ statusCode: 404, statusMessage: 'path not found' })
    return normalizeCms(alias)
  })
})
