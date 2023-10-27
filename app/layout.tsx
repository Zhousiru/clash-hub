import Navbar from '@/components/Navbar'
import TrpcProvider from '@/components/TrpcProvider'
import { cn } from '@/lib/utils'
import type { Metadata } from 'next'
import { Noto_Sans_SC } from 'next/font/google'
import './globals.css'

export const metadata: Metadata = {
  title: 'Clash Hub',
}

const notoSans = Noto_Sans_SC({ weight: '400', subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className={cn('bg-gray-100', notoSans.className)}>
        <TrpcProvider>
          <Navbar />
          <div className="max-w-screen-xl px-2 box-content mx-auto mt-12">{children}</div>
        </TrpcProvider>
      </body>
    </html>
  )
}
