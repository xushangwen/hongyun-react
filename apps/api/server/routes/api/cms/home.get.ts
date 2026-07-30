import { defineEventHandler } from 'h3'
import { cached, normalizeCms, parseLocale, strapiFetch } from '~/utils/cms'

const mediaFields = ['url', 'alternativeText', 'width', 'height', 'mime']

export default defineEventHandler(async (event) => {
  const locale = parseLocale(event)
  return cached(event, `home:${locale}`, 45_000, async () => {
    const [pageResponse, partnerResponse] = await Promise.all([
      strapiFetch<any>('/home-page', {
        query: {
          locale,
          status: 'published',
          populate: {
            heroSlides: {
              populate: {
                media: { fields: mediaFields },
                mobileMedia: { fields: mediaFields },
              },
            },
            newsSection: { populate: '*' },
            aboutSection: { populate: { stats: { populate: { icon: { fields: mediaFields } } } } },
            researchSection: {
              populate: {
                stats: { populate: { icon: { fields: mediaFields } } },
                certifications: { populate: { media: { fields: mediaFields } } },
                certificateGallery: { populate: { media: { fields: mediaFields } } },
              },
            },
            partnerSection: { populate: '*' },
            contactSection: {
              populate: {
                descriptionLines: '*',
                image: { fields: mediaFields },
              },
            },
            seo: { populate: { ogImage: { fields: mediaFields } } },
          },
        },
      }),
      strapiFetch<any>('/partners', {
        query: {
          locale,
          filters: { visible: { $eq: true } },
          sort: ['order:asc'],
          pagination: { pageSize: 100 },
          populate: { logo: { fields: mediaFields } },
        },
      }),
    ])

    return {
      ...normalizeCms(pageResponse.data ?? {}),
      partners: normalizeCms(partnerResponse.data ?? []),
    }
  })
})
