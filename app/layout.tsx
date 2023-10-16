import Navbar from '@/components/Navbar'
import { cn } from '@/lib/utils'
import type { Metadata } from 'next'
import { Noto_Sans_SC } from 'next/font/google'
import './globals.css'

export const metadata: Metadata = {
  title: 'Clash Hub',
}

const notoSans = Noto_Sans_SC({ weight: 'variable', subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className={cn('bg-gray-100', notoSans.className)}>
        <Navbar />
        <div className="max-w-screen-xl mx-auto mt-12">{children}</div>
      </body>
    </html>
  )
}
