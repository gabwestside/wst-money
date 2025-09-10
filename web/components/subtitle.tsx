import React, { useMemo } from 'react'
import { MonthNavigator } from './month-navigator'

interface SubtitleProps extends React.HTMLAttributes<HTMLDivElement> {
  monthValue: string
}

export const Subtitle = ({ monthValue, ...props }: SubtitleProps) => {
  const monthLabel = useMemo(() => {
    const [y, m] = (monthValue ?? '').split('-').map(Number)
    if (!y || !m) return ''
    const MONTHS = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]
    return `${MONTHS[m - 1]} ${y}`
  }, [monthValue])

  return (
    <div className='flex flex-col md:flex-row items-center gap-4' {...props}>
      <p className='text-center md:text-start text-muted-foreground w-full'>
        Financial summary for {monthLabel}
      </p>
      <MonthNavigator monthValue={monthValue} isNavigator />
    </div>
  )
}
