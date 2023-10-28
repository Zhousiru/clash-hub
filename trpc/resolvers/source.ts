import { prefix, redis } from '@/lib/api/db'
import * as db from '@/lib/api/source'
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
  return db.getSources()
})

export const getSourceConfig = publicProcedure
  .input(z.object({ source: z.string() }))
  .query(async ({ input }) => {
    return db.getSourceConfig(input.source)
  })

export const testResolve = publicProcedure
  .input(
    z.object({
      source: z.string(),
    }),
  )
  .query(async ({ input }) => {
    const config = await db.getSourceConfig(input.source)
    return db.resolveNodes(config)
  })
