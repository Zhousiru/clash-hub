import { prefix, redis } from './db'

export function getCommonConfig() {
  return redis.get<string>(prefix('common-config'))
}

export function setCommonConfig(config: string) {
  return redis.set(prefix('common-config'), config)
}
