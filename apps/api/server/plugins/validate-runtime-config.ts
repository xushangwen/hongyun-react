import type { NitroAppPlugin } from 'nitropack/types'

const PLACEHOLDER = /^(replace-|your_|change-me|example)/i

const validateRuntimeConfig: NitroAppPlugin = () => {
  if (process.env.NODE_ENV !== 'production') return

  const config = useRuntimeConfig()
  const required = {
    NITRO_STRAPI_READ_TOKEN: config.strapiReadToken,
    NITRO_STRAPI_WRITE_TOKEN: config.strapiWriteToken,
    NITRO_CMS_WEBHOOK_SECRET: config.cmsWebhookSecret,
    NITRO_FORM_ENCRYPTION_KEY: config.formEncryptionKey,
    NITRO_RECRUITER_TOKEN: config.recruiterToken,
  }
  const invalid = Object.entries(required)
    .filter(([, value]) => typeof value !== 'string' || !value || PLACEHOLDER.test(value))
    .map(([name]) => name)

  if (!/^[a-f0-9]{64}$/i.test(config.formEncryptionKey)) {
    invalid.push('NITRO_FORM_ENCRYPTION_KEY(64 hex chars)')
  }
  if (!/^https:\/\//.test(process.env.PUBLIC_SITE_URL || '')) {
    invalid.push('PUBLIC_SITE_URL(https URL)')
  }
  if (invalid.length) {
    throw new Error(`Production configuration is missing or invalid: ${[...new Set(invalid)].join(', ')}`)
  }
}

export default validateRuntimeConfig
