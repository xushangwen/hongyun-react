import { createError, defineEventHandler } from 'h3'
import {
  cached,
  detailPopulate,
  normalizeCms,
  parseLocale,
  strapiFetch,
} from '~/utils/cms'

const mediaFields = ['url', 'alternativeText', 'width', 'height', 'mime']

export default defineEventHandler(async (event) => {
  const locale = parseLocale(event)

  return cached(event, `contact:${locale}`, 180_000, async () => {
    const response = await strapiFetch<any>('/contact-page', {
      query: {
        locale,
        status: 'published',
        populate: {
          hero: detailPopulate.hero,
          inquiryPanel: {
            populate: {
              items: true,
              background: { fields: mediaFields },
            },
          },
          industryOptions: true,
          contactCards: { populate: { items: true } },
          offices: true,
          talentValues: { populate: { image: { fields: mediaFields } } },
          jobListings: {
            populate: '*',
          },
          recruitmentPanel: {
            populate: {
              items: true,
              background: { fields: mediaFields },
            },
          },
          seo: detailPopulate.seo,
        },
      },
    })

    if (!response.data) {
      throw createError({ statusCode: 404, statusMessage: 'contact page not found' })
    }

    const page = normalizeCms(response.data)
    return {
      kind: 'page',
      ...page,
      jobListings: (page.jobListings ?? [])
        .filter((job: any) => job.visible !== false)
        .sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0)),
      industryOptions: (page.industryOptions ?? [])
        .sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0)),
      canonicalPath: '/contact',
      locale,
    }
  })
})
