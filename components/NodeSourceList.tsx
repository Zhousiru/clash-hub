import { Pencil2Icon, ReloadIcon } from '@radix-ui/react-icons'
import { Button } from './ui/button'

function NodeSourceItem() {
  let status = 'success'

  return (
    <div className="p-4 border rounded-md flex flex-col gap-2">
      <div className="flex gap-2 items-baseline">
        <div className="font-bold text-lg">CreamData</div>
        <div className="overflow-hidden whitespace-nowrap text-ellipsis opacity-50 text-sm">
          ConfigUrl
        </div>
      </div>
      <div>
        <div className="flex items-center gap-2">
          {status === 'loading' && (
            <>
              <div className="w-1 h-12 rounded-full bg-slate-400"></div>
              <div>
                <div>正在测试</div>
                <div className="opacity-50">稍等</div>
              </div>
            </>
          )}
          {status === 'success' && (
            <>
              <div className="w-1 h-12 rounded-full bg-green-400"></div>
              <div>
                <div>正常</div>
                <div className="opacity-50">解析了 120 个节点</div>
              </div>
            </>
          )}
          {status === 'error' && (
            <>
              <div className="w-1 h-12 rounded-full bg-red-400"></div>
              <div>
                <div>错误</div>
                <div className="opacity-50">来源返回 404</div>
              </div>
            </>
          )}
          <div className="ml-auto flex gap-2">
            <Button variant="outline" size="icon">
              <ReloadIcon />
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

export function NodeSourceList() {
  return (
    <>
      <div className="grid gap-2 grid-cols-1 sm:grid-cols-2">
        <NodeSourceItem />
        <NodeSourceItem />
        <NodeSourceItem />
      </div>
      <div className="mt-4 opacity-50">共 3 个来源，解析了 360 个节点</div>
    </>
  )
}
