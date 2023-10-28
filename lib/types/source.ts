import { z } from 'zod'

export const UrlSourceConfigSchema = z.object({
  id: z.string().min(1),
  type: z.literal('url'),
  url: z.string().url(),
  removeRule: z.string(),
  nameReplaceRule: z.tuple([z.string(), z.string()]),
})

export type UrlSourceConfig = z.infer<typeof UrlSourceConfigSchema>

export const TextSourceConfigSchema = z.object({
  id: z.string().min(1),
  type: z.literal('text'),
  text: z.string(),
})

export type TextSourceConfig = z.infer<typeof TextSourceConfigSchema>

export const SourceConfigSchema = z.union([UrlSourceConfigSchema, TextSourceConfigSchema])

export type SourceConfig = z.infer<typeof SourceConfigSchema>
