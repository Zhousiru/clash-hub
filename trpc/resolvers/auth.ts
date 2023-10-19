import { authedProcedure } from '../server'

export const auth = authedProcedure.query(() => {
  return { pass: true }
})
