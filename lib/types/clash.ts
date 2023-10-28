export interface ClashConfig {
  proxies: Array<ClashNode>
  'proxy-groups': any
  rules: Array<string>
  'proxy-providers': any
  'rule-providers': any
}

export interface ClashNode {
  name: string
  type: string
  [key: string]: any
}
