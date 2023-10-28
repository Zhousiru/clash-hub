import { ClashConfig, ClashNode } from '@/lib/types/clash'
import { parse } from 'yaml'
import { SourceConfig } from '../types/source'
import { prefix, redis } from './db'

export async function resolveNodes(config: SourceConfig) {
  if (config.type === 'url') {
    const resp = await (await fetch(config.url)).text()
    const parsed: ClashConfig = parse(resp)
    const proxies = parsed.proxies
    const processedProxies: ClashNode[] = []

    for (const proxy of proxies) {
      if (config.removeRule && new RegExp(config.removeRule).test(proxy.name)) {
        continue
      }

      proxy.name = proxy.name.replaceAll(...config.nameReplaceRule)
      processedProxies.push(proxy)
    }

    return processedProxies
  }

  return [] as ClashNode[]
}

export function getSources() {
  return redis.zrange<string[]>(prefix('sources'), 0, -1)
}

export async function getSourceConfig(source: string) {
  const sourceConfig = await redis.get<SourceConfig>(prefix(`source-${source}`))
  if (!sourceConfig) {
    throw new Error('Specified source does not exist')
  }

  return sourceConfig
}
