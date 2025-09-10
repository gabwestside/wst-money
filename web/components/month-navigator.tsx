import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { MonthSelect } from './month-select'
import { Button } from './ui/button'

interface MonthNavigatorProps extends React.HTMLAttributes<HTMLElement> {
  monthValue: string
  isNavigator?: boolean
}

export const MonthNavigator = ({
  monthValue,
  isNavigator,
  ...props
}: MonthNavigatorProps) => {
  const router = useRouter()

  function shift(value: string, delta: number) {
    const y = Number(value.slice(0, 4))
    const m = Number(value.slice(5, 7)) - 1
    const d = new Date(y, m + delta, 1)
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
  }

  return (
    <div className='flex items-center justify-end gap-2' {...props}>
      {isNavigator && (
        <Button
          variant='ghost'
          size='icon'
          onClick={() => router.push(`/dashboard?m=${shift(monthValue, -1)}`)}
          aria-label='Previous month'
        >
          <ChevronLeft className='h-4 w-4' />
        </Button>
      )}

      <MonthSelect value={monthValue} className='border-none' />

      {isNavigator && (
        <Button
          variant='ghost'
          size='icon'
          onClick={() => router.push(`/dashboard?m=${shift(monthValue, +1)}`)}
          aria-label='Next month'
        >
          <ChevronRight className='h-4 w-4' />
        </Button>
      )}
    </div>
  )
}
