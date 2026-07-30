import { defineEventHandler } from 'h3'
import { cached, normalizeCms, parseLocale, strapiFetch } from '~/utils/cms'

const mediaFields = ['url', 'alternativeText', 'width', 'height', 'mime']

export default defineEventHandler(async (event) => {
  const locale = parseLocale(event)
  return cached(event, `site:${locale}`, 45_000, async () => {
    const response = await strapiFetch<any>('/site-setting', {
      query: {
        locale,
        populate: {
          logo: { fields: mediaFields },
          headerLogo: { fields: mediaFields },
          footerLogo: { fields: mediaFields },
          addresses: '*',
          defaultSeo: { populate: { ogImage: { fields: mediaFields } } },
        },
      },
    })
    return normalizeCms(response.data ?? {})
  })
})
