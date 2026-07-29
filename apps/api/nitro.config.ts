import { defineNitroConfig } from 'nitropack/config'

export default defineNitroConfig({
  compatibilityDate: '2026-07-28',
  srcDir: 'server',
  preset: 'node-server',
  runtimeConfig: {
    strapiUrl: 'http://127.0.0.1:1337',
    strapiPublicUrl: 'http://127.0.0.1:1337',
    strapiReadToken: '',
    strapiWriteToken: '',
    cmsWebhookSecret: '',
    formEncryptionKey: '',
    privateUploadDir: '.private-uploads',
    resumeRetentionDays: 180,
    recruiterToken: '',
  },
  routeRules: {
    '/api/cms/**': { cors: false },
  },
})
