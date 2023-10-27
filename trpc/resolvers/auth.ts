import { authedProcedure } from '../server'

export const auth = authedProcedure.mutation(() => {
  return { pass: true }
})
