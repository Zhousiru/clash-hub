import { cn } from '@/lib/utils'
import { Caveat } from 'next/font/google'

const caveat = Caveat({ weight: ['700'], subsets: ['latin'] })

export default function Navbar() {
  return (
    <nav className="bg-white h-24 flex items-center">
      <div className={cn('text-4xl text-amber-400 ml-8 font-bold', caveat.className)}>
        Clash Hub
      </div>
    </nav>
  )
}
