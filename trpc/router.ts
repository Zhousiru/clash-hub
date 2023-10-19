import * as resolvers from './resolvers'
import { router } from './server'

export const appRouter = router({
  ...resolvers,
})

export type AppRouter = typeof appRouter
