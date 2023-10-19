import { Redis } from '@upstash/redis'

export const redis = Redis.fromEnv()

export function prefix(value: string) {
  if (process.env.DB_PREFIX) {
    return process.env.DB_PREFIX + '-' + value
  }
  return value
}
