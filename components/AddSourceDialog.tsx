'use client'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { UrlSourceConfig } from '@/lib/types/source'
import { trpc } from '@/trpc/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { PlusIcon } from '@radix-ui/react-icons'
import { useQueryClient } from '@tanstack/react-query'
import { getQueryKey } from '@trpc/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export function AddSourceDialog() {
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false)
  const sourceConfigMutation = trpc.setSourceConfig.useMutation({
    onSuccess() {
      setOpen(false)
      baseForm.reset()
      urlForm.reset()
      queryClient.invalidateQueries(getQueryKey(trpc.getSources))
    },
  })

  const baseFormSchema = z.object({
    id: z.string().min(1),
    type: z.union([z.literal('url'), z.literal('text')]),
  })

  const urlFormSchema = z.object({
    url: z.string().url(),
    removeRule: z.string(),
    nameReplaceRule: z.tuple([z.string(), z.string()]),
  })

  const baseForm = useForm<z.infer<typeof baseFormSchema>>({
    resolver: zodResolver(baseFormSchema),
    defaultValues: {
      id: '',
      type: 'url',
    },
  })

  const urlForm = useForm<z.infer<typeof urlFormSchema>>({
    resolver: zodResolver(urlFormSchema),
    defaultValues: {
      url: '',
      removeRule: '',
      nameReplaceRule: ['', ''],
    },
  })

  const sourceType = baseForm.watch('type')

  async function handleSetSource() {
    baseForm.handleSubmit((baseData) => {
      // TODO: Handle submit text source.
      if (baseData.type === 'url') {
        urlForm.handleSubmit(async (urlData) => {
          const config: UrlSourceConfig = { ...baseData, ...urlData, type: 'url' }
          sourceConfigMutation.mutateAsync({ config })
        })()
      }
    })()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" /> 新增
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>新增来源</DialogTitle>
        </DialogHeader>

        <div className="space-y-2">
          <Form {...baseForm}>
            <form>
              <div className="space-y-2">
                <FormField
                  control={baseForm.control}
                  name="id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ID</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={baseForm.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>类型</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger className="w-[150px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="url">URL</SelectItem>
                            <SelectItem value="text">文本</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>

          {sourceType === 'url' && (
            <Form {...urlForm}>
              <form>
                <div className="space-y-2">
                  <FormField
                    control={urlForm.control}
                    name="url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>URL</FormLabel>
                        <FormControl>
                          <Input type="text" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={urlForm.control}
                    name="removeRule"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>移除节点名匹配</FormLabel>
                        <FormControl>
                          <Input type="text" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex gap-2">
                    <FormField
                      control={urlForm.control}
                      name="nameReplaceRule.0"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>节点名替换匹配</FormLabel>
                          <FormControl>
                            <Input type="text" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={urlForm.control}
                      name="nameReplaceRule.1"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>节点名替换模板</FormLabel>
                          <FormControl>
                            <Input type="text" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </form>
            </Form>
          )}
        </div>

        <DialogFooter>
          <Button
            type="submit"
            onClick={handleSetSource}
            isLoading={sourceConfigMutation.isLoading}
          >
            保存
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
