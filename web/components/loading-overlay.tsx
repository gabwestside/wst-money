'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Loader2 } from 'lucide-react'

type Props = {
  active: boolean
  message?: string
}

export default function LoadingOverlay({
  active,
  message = 'Syncing with Supabase...',
}: Props) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted || !active) return null

  return createPortal(
    <div className='fixed inset-0 z-[9999] flex items-center justify-center bg-background/60 backdrop-blur-sm'>
      <div className='flex items-center gap-3 rounded-2xl border bg-card p-6 text-card-foreground shadow-lg'>
        <Loader2 className='h-5 w-5 animate-spin text-primary' />
        <div className='text-sm'>
          <p className='font-medium'>Please wait…</p>
          <p className='text-muted-foreground'>{message}</p>
        </div>
      </div>
    </div>,
    document.body
  )
}
