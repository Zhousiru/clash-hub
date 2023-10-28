import { cn } from '@/lib/utils'
import { trpc } from '@/trpc/client'
import { Pencil2Icon, ReloadIcon } from '@radix-ui/react-icons'
import { Button } from './ui/button'

function NodeSourceItem({ source }: { source: string }) {
  const {
    data: testResolveData,
    isFetching: testResolveIsFetching,
    isError: testResolveIsError,
    refetch: testResolveRefetch,
  } = trpc.testResolve.useQuery({ source }, { refetchOnWindowFocus: false })

  return (
    <div className="p-4 border rounded-md flex flex-col gap-2">
      <div className="flex gap-2 items-baseline">
        <div className="font-bold text-lg">{source}</div>
      </div>
      <div>
        <div className="flex items-center gap-2">
          {testResolveIsFetching && (
            <>
              <div className="w-1 h-12 rounded-full bg-slate-400"></div>
              <div>
                <div>正在测试</div>
                <div className="opacity-50">稍等</div>
              </div>
            </>
          )}
          {!testResolveIsFetching && testResolveData && (
            <>
              <div className="w-1 h-12 rounded-full bg-green-400"></div>
              <div>
                <div>正常</div>
                <div className="opacity-50">解析了 {testResolveData.length} 个节点</div>
              </div>
            </>
          )}
          {testResolveIsError && (
            <>
              <div className="w-1 h-12 rounded-full bg-red-400"></div>
              <div>
                <div>错误</div>
                <div className="opacity-50">解析失败</div>
              </div>
            </>
          )}
          <div className="ml-auto flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => testResolveRefetch()}
              disabled={testResolveIsFetching}
            >
              <ReloadIcon className={cn({ 'animate-spin': testResolveIsFetching })} />
            </Button>
            <Button variant="outline" size="icon">
              <Pencil2Icon />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function SourceList() {
  const { data, isLoading, isError, error } = trpc.getSources.useQuery()

  if (isLoading) {
    return 'Loading...'
  }

  if (isError) {
    return `Failed to load sources: ${error.message}`
  }

  return (
    <>
      {data.length === 0 && <div className="italic">还没有添加来源</div>}
      <div className="grid gap-2 grid-cols-1 sm:grid-cols-2">
        {data.map((source) => (
          <NodeSourceItem key={source} source={source} />
        ))}
      </div>
      <div className="mt-4 opacity-50">共 {data.length} 个来源</div>
    </>
  )
}
