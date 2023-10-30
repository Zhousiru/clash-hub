'use client'

import { cn } from '@/lib/utils'
import { trpc } from '@/trpc/client'
import { BeforeMount, Editor } from '@monaco-editor/react'
import { CheckIcon, ResetIcon } from '@radix-ui/react-icons'
import { useDeferredValue, useEffect, useMemo, useState } from 'react'
import { Button } from './ui/button'

export function CommonConfigEditor() {
  const handleEditorBeforeMount: BeforeMount = (monaco) => {
    monaco.editor.defineTheme('vs-gray', {
      base: 'vs',
      inherit: true,
      rules: [],
      colors: {
        'editorGutter.background': '#f8fafc',
      },
    })
  }

  const [editorIsLoading, setEditorIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [editorValue, setEditorValue] = useState('')
  const query = trpc.getCommonConfig.useQuery()
  const saveConfigMutation = trpc.setCommonConfig.useMutation()
  const isLoading = useMemo(
    () => editorIsLoading || query.isLoading,
    [editorIsLoading, query.isLoading],
  )
  const lastConfigData = useDeferredValue(query.data)

  useEffect(() => {
    if (query.data && (!lastConfigData || lastConfigData === editorValue)) {
      setEditorValue(query.data)
    }
  }, [editorValue, lastConfigData, query.data])

  async function handleSave() {
    setIsSaving(true)
    await saveConfigMutation.mutateAsync({ config: editorValue })
    await query.refetch()
    setIsSaving(false)
  }

  return (
    <>
      <div className="rounded-md overflow-hidden border relative">
        {isLoading && (
          <div className="flex justify-center items-center absolute inset-0 bg-opacity-50 bg-white">
            Loading...
          </div>
        )}
        <Editor
          className={cn({ invisible: isLoading })}
          loading=""
          height="50vh"
          language="yaml"
          beforeMount={handleEditorBeforeMount}
          onMount={() => {
            setEditorIsLoading(false)
          }}
          theme="vs-gray"
          options={{ tabSize: 2, scrollbar: { useShadows: false }, minimap: { enabled: false } }}
          value={editorValue}
          onChange={(value) => setEditorValue(value ?? '')}
        />
      </div>
      <div className="flex gap-2 mt-4 justify-end">
        <Button
          variant="outline"
          onClick={() => setEditorValue(query.data ?? '')}
          disabled={isSaving || isLoading || query.data === editorValue}
        >
          <ResetIcon className="mr-2 h-4 w-4" /> 放弃更改
        </Button>
        <Button
          isLoading={saveConfigMutation.isLoading}
          onClick={handleSave}
          disabled={isSaving || isLoading || query.data === editorValue}
        >
          <CheckIcon className="mr-2 h-4 w-4" /> 保存
        </Button>
      </div>
    </>
  )
}
