import { prefix, redis } from '@/lib/api/db'
import { TRPCError, initTRPC } from '@trpc/server'
import { z } from 'zod'

const t = initTRPC.create()

export const middleware = t.middleware
export const router = t.router

export const publicProcedure = t.procedure
export const authedProcedure = publicProcedure
  .input(z.object({ token: z.string() }))
  .use(async (opts) => {
    const { token } = opts.input
    if ((await redis.get<string>(prefix('token'))) !== token) {
      throw new TRPCError({ code: 'UNAUTHORIZED' })
    }
    return opts.next()
  })
