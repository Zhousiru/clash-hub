'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { setToken } from '@/lib/storage'
import { trpc } from '@/trpc/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  token: z.string().min(1, { message: '不能为空' }),
})

export default function Login() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      token: '',
    },
  })

  const router = useRouter()
  const mutation = trpc.auth.useMutation()

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await mutation.mutateAsync({ ...values })
    } catch (error) {
      form.setError('token', { message: '验证失败' })
      return
    }
    setToken(values.token)
    router.replace('/')
  }

  return (
    <main className="max-w-xs mx-auto mt-[20vh]">
      <Card>
        <CardHeader>
          <CardTitle>登录 Clash Hub</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="token"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Token</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="text-right">
                <Button type="submit" className="mt-8" isLoading={mutation.isLoading}>
                  登录
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  )
}
