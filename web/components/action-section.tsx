import { useMemo } from 'react'
import { NewTransactionDialog } from './new-transaction-dialog'
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
    <div className='flex flex-col items-center md:flex-row gap-4' {...props}>
      <p className='text-center md:text-start text-muted-foreground w-full'>
        Financial summary for {monthLabel}{' '}
      </p>

      <div className='flex flex-col ml-auto w-full items-center  md:flex-row md:gap-2'>
        <NewTransactionDialog className='ml-auto' />
        <ThemeSwitcher className='hidden md:flex' />
      </div>
      {/* <div className='ml-auto'>
        <ActionMenu monthValue={monthValue} />
      </div> */}
    </div>
  )
}
