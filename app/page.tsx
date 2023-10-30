'use client'

import { CommonConfigEditor } from '@/components/CommonConfigEditor'
import { SourceList } from '@/components/NodeSourceList'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { getToken } from '@/lib/storage'
import { trpc } from '@/trpc/client'
import { ReloadIcon } from '@radix-ui/react-icons'
import { useQueryClient } from '@tanstack/react-query'
import { getQueryKey } from '@trpc/react-query'
import { useRouter } from 'next/navigation'
import { ReactNode, useLayoutEffect } from 'react'
import { AddSourceDialog } from '../components/AddSourceDialog'

function GroupCard({
  title,
  desc,
  children,
}: {
  title: string
  desc: string | ReactNode
  children: ReactNode
}) {
  return (
    <div>
      <div className="ml-2 italic opacity-30">
        <h1 className="text-7xl font-bold">{title}</h1>
        <h2 className="mt-2 pl-8 text-xl opacity-60">{desc}</h2>
      </div>
      <Card className="mt-2 p-6">{children}</Card>
    </div>
  )
}

export default function Home() {
  const router = useRouter()
  const queryClient = useQueryClient()

  useLayoutEffect(() => {
    try {
      getToken()
    } catch (error) {
      router.replace('/login')
    }
  })

  return (
    <div className="flex flex-col gap-16 mb-32">
      <GroupCard title="节点来源" desc="从订阅链接中提取节点">
        <div className="flex gap-2 mb-4">
          <AddSourceDialog />
          <Button
            variant="outline"
            onClick={() => queryClient.invalidateQueries(getQueryKey(trpc.testResolve))}
          >
            <ReloadIcon className="mr-2 h-4 w-4" /> 测试全部
          </Button>
        </div>
        <SourceList />
      </GroupCard>

      <GroupCard title="全局配置" desc="附加在配置顶部">
        <CommonConfigEditor />
      </GroupCard>

      <GroupCard
        title="节点组"
        desc={
          <>
            定义 <code>proxy-groups</code>
          </>
        }
      >
        114514
      </GroupCard>

      <GroupCard
        title="规则来源"
        desc={
          <>
            定义 <code>rule-providers</code>
          </>
        }
      >
        114514
      </GroupCard>

      <GroupCard title="规则编辑" desc="定义代理规则">
        114514
      </GroupCard>
    </div>
  )
}
