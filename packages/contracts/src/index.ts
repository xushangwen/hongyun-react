import { z } from 'zod'

export const localeSchema = z.enum(['zh', 'en'])
export type Locale = z.infer<typeof localeSchema>

export const slugSchema = z.string().trim().min(1).max(120).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
export const pathSchema = z.string().trim().min(1).max(300).regex(/^\/(?!\/)[^?#]*$/)
export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).max(10000).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
})

export const inquiryContextSchema = z.object({
  contextType: z.enum(['product', 'solution', 'page']).default('page'),
  contextDocumentId: z.string().trim().max(120).optional(),
  contextPath: pathSchema,
  referrer: z.string().trim().url().max(1000).optional().or(z.literal('')),
  utm: z.record(z.string().trim().max(200)).optional(),
})

export const contactPayloadSchema = z.object({
  name: z.string().trim().min(1).max(80),
  company: z.string().trim().max(160).optional().default(''),
  industry: z.string().trim().max(160).optional().default(''),
  phone: z.string().trim().min(5).max(30).regex(/^[0-9+\-()\s]+$/),
  email: z.string().trim().email().max(200).optional().or(z.literal('')),
  message: z.string().trim().min(2).max(4000),
  website: z.string().max(0).optional(),
  ...inquiryContextSchema.shape,
})

export const resumeMetadataSchema = z.object({
  name: z.string().trim().min(1).max(80),
  phone: z.string().trim().min(5).max(30).regex(/^[0-9+\-()\s]+$/),
  email: z.string().trim().email().max(200).optional().or(z.literal('')),
  position: z.string().trim().min(1).max(120),
  website: z.string().max(0).optional(),
})

export const technicalDatasetSchema = z.object({
  title: z.string().min(1),
  kind: z.enum(['spec-table', 'experiment-table', 'chart-data', 'eds-data']),
  schemaVersion: z.number().int().min(1),
  columns: z.array(z.object({
    id: z.string().min(1),
    label: z.string().min(1),
    type: z.enum(['text', 'number', 'boolean']).default('text'),
  })).min(1).superRefine((columns, context) => {
    const ids = columns.map((column) => column.id)
    if (new Set(ids).size !== ids.length) {
      context.addIssue({ code: z.ZodIssueCode.custom, message: 'column id must be unique' })
    }
  }),
  rows: z.array(z.record(z.union([z.string(), z.number(), z.boolean(), z.null()]))),
  chartConfig: z.object({
    series: z.array(z.object({
      name: z.string().min(1),
      data: z.array(z.number()),
    })).min(1),
  }).passthrough().optional(),
})

export type ContactPayload = z.infer<typeof contactPayloadSchema>
export type InquiryContext = z.infer<typeof inquiryContextSchema>
export type TechnicalDataset = z.infer<typeof technicalDatasetSchema>

export type MediaDto = {
  url: string
  alt?: string
  width?: number
  height?: number
  mime?: string
}

export type BaseDetailDto = {
  documentId: string
  slug: string
  title: string
  summary?: string
  hero?: unknown
  sections: unknown[]
  seo?: unknown
  canonicalPath: string
  updatedAt: string
  locale: Locale
}
