'use client'

import { trpc } from '@/trpc/client'

export default function Home() {
  const isAuthed = trpc.auth.useQuery({ token: 'testtoken' })

  if (!isAuthed.data) {
    return <div>Loading...</div>
  }
  return (
    <div>
      <p>{JSON.stringify(isAuthed.data)}</p>
    </div>
  )
}
