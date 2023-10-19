import { appRouter } from '@/trpc/router'
import { fetchRequestHandler } from '@trpc/server/adapters/fetch'

function handler(req: Request) {
  return fetchRequestHandler({
    endpoint: '/api/trpc',
    router: appRouter,
    createContext: () => ({}),
    req,
  })
}

export { handler as GET, handler as POST }
