declare function useRuntimeConfig(): {
  strapiUrl: string
  strapiPublicUrl: string
  strapiReadToken: string
  strapiWriteToken: string
  cmsWebhookSecret: string
  formEncryptionKey: string
  privateUploadDir: string
  resumeRetentionDays: number
  recruiterToken: string
}
