import { createError, defineEventHandler, getQuery } from 'h3'
import { cached, normalizeCms, parseLocale, parsePagination, strapiFetch } from '~/utils/cms'

export default defineEventHandler(async (event) => {
  const locale = parseLocale(event)
  const { page, pageSize } = parsePagination(event)
  const raw = String(getQuery(event).q ?? '').trim()
  if (raw.length < 1 || raw.length > 80) throw createError({ statusCode: 400, statusMessage: 'invalid search query' })
  const types = String(getQuery(event).types ?? 'product,solution,article')
    .split(',')
    .filter((type) => ['product', 'solution', 'article'].includes(type))
  if (!types.length) throw createError({ statusCode: 400, statusMessage: 'invalid search types' })
  return cached(event, `search:${locale}:${types.join(',')}:${raw}:${page}:${pageSize}`, 30_000, async () => {
    const offset = (page - 1) * pageSize
    const load = async (type: string) => {
      const config = {
        product: { endpoint: '/products', title: 'name', summary: 'summary', path: '/products/new-energy/' },
        solution: { endpoint: '/solutions', title: 'name', summary: 'summary', path: '/solutions/new-energy/' },
        article: { endpoint: '/articles', title: 'title', summary: 'excerpt', path: '/news/' },
      }[type]!
      const response = await strapiFetch<any>(config.endpoint, {
        query: {
          locale,
          status: 'published',
          filters: {
            $or: [
              { [config.title]: { $containsi: raw } },
              { [config.summary]: { $containsi: raw } },
            ],
          },
          pagination: { pageSize: 100 },
          fields: ['documentId', config.title, 'slug', config.summary, 'updatedAt'],
          populate: { cover: true },
        },
      })
      return normalizeCms(response.data ?? []).map((item: any) => ({
        type,
        documentId: item.documentId,
        title: item[config.title],
        summary: item[config.summary] ?? '',
        slug: item.slug,
        cover: item.cover ?? null,
        path: `${config.path}${item.slug}`,
      }))
    }
    const [loaded, aliasResponse] = await Promise.all([
      Promise.all(types.map(load)),
      strapiFetch<any>('/url-aliases', {
        query: {
          locale,
          filters: { localeCode: { $eq: locale }, active: { $eq: true }, canonical: { $eq: true } },
          pagination: { pageSize: 100 },
          fields: ['path', 'targetType'],
          populate: { product: true, solution: true, article: true },
        },
      }),
    ])
    const paths = new Map<string, string>()
    for (const alias of normalizeCms(aliasResponse.data ?? [])) {
      const target = alias.product || alias.solution || alias.article
      if (target?.documentId) paths.set(target.documentId, alias.path)
    }
    const all = loaded.flat().map((item) => ({
      ...item,
      path: paths.get(item.documentId) || item.path,
    }))
    return {
      list: all.slice(offset, offset + pageSize),
      pagination: { page, pageSize, pageCount: Math.ceil(all.length / pageSize), total: all.length },
    }
  })
})
