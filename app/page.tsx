'use client'

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

function GroupCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h1 className="pl-2 text-7xl font-bold italic opacity-20 relative -z-10">{title}</h1>
      <Card className="-mt-2 p-6">{children}</Card>
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
    <div className="flex flex-col gap-10">
      <GroupCard title="节点来源">
        <div className="flex mb-4">
          <AddSourceDialog />
          <Button
            className="ml-2"
            variant="outline"
            onClick={() => queryClient.invalidateQueries(getQueryKey(trpc.testResolve))}
          >
            <ReloadIcon className="mr-2 h-4 w-4" /> 测试全部
          </Button>
        </div>
        <SourceList />
      </GroupCard>

      <GroupCard title="全局配置">114514</GroupCard>
    </div>
  )
}
