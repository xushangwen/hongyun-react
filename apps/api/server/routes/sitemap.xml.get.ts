import { defineEventHandler, setResponseHeader } from 'h3'
import { strapiFetch } from '~/utils/cms'

const escapeXml = (value: string) => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')

export default defineEventHandler(async (event) => {
  const response = await strapiFetch<any>('/url-aliases', {
    query: {
      filters: { localeCode: { $eq: 'zh' }, active: { $eq: true }, canonical: { $eq: true } },
      sort: ['path:asc'],
      pagination: { pageSize: 100 },
      fields: ['path'],
    },
  })
  const origin = process.env.PUBLIC_SITE_URL || 'https://www.hongyun.com'
  const urls = (response.data ?? []).map((item: any) =>
    `  <url><loc>${escapeXml(`${origin}${item.path}`)}</loc></url>`).join('\n')
  setResponseHeader(event, 'Content-Type', 'application/xml; charset=utf-8')
  setResponseHeader(event, 'Cache-Control', 'public, max-age=300')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
})
