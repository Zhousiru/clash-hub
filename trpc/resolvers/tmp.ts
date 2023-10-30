import * as common from '@/lib/api/common'
import { prefix, redis } from '@/lib/api/db'
import * as source from '@/lib/api/source'
import { SourceConfigSchema } from '@/lib/types/source'
import { z } from 'zod'
import { publicProcedure } from '../server'

// TODO: Move to authed procedure.

export const setSourceConfig = publicProcedure
  .input(z.object({ config: SourceConfigSchema }))
  .mutation(async ({ input }) => {
    const add = redis.zadd(
      prefix('sources'),
      { nx: true },
      { member: input.config.id, score: new Date().getTime() },
    )
    const set = redis.set(prefix(`source-${input.config.id}`), JSON.stringify(input.config))
    await Promise.all([add, set])
  })

export const getSources = publicProcedure.query(() => {
  return source.getSources()
})

export const getSourceConfig = publicProcedure
  .input(z.object({ source: z.string() }))
  .query(async ({ input }) => {
    return source.getSourceConfig(input.source)
  })

export const testResolve = publicProcedure
  .input(
    z.object({
      source: z.string(),
    }),
  )
  .query(async ({ input }) => {
    const config = await source.getSourceConfig(input.source)
    return source.resolveNodes(config)
  })

export const getCommonConfig = publicProcedure.query(() => {
  return common.getCommonConfig()
})

export const setCommonConfig = publicProcedure
  .input(z.object({ config: z.string() }))
  .mutation(({ input }) => {
    return common.setCommonConfig(input.config)
  })
