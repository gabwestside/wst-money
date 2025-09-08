import { useMemo } from 'react'
import NewTransactionDialog from './new-transaction-dialog'
import { ThemeSwitcher } from './theme-switcher'

interface ActionSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  monthValue: string
}

export const ActionSection = ({ monthValue, ...props }: ActionSectionProps) => {
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
    <div className='flex items-center  gap-4' {...props}>
      <p className='text-muted-foreground'>
        Financial summary for {monthLabel}{' '}
      </p>

      <div className='ml-auto w-full md:max-w-40'>
        <NewTransactionDialog />
        <ThemeSwitcher />
      </div>
    </div>
  )
}
