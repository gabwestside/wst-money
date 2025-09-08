import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import MonthSelect from './month-select'
import { Button } from './ui/button'

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  userName: string
  monthValue: string
}

export const Header = ({ userName, monthValue, ...props }: HeaderProps) => {
  const router = useRouter()

  function shift(value: string, delta: number) {
    const y = Number(value.slice(0, 4))
    const m = Number(value.slice(5, 7)) - 1
    const d = new Date(y, m + delta, 1)
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
  }

  return (
    <div className='grid gap-4 md:grid-cols-2' {...props}>
      <div className='flex items-center gap-2'>
        <h1 className='text-xl font-bold'>Hello, {userName}</h1>
      </div>
      <div className='flex items-center justify-end gap-2'>
        <Button
          variant='outline'
          size='icon'
          onClick={() => router.push(`/dashboard?m=${shift(monthValue, -1)}`)}
          aria-label='Previous month'
        >
          <ChevronLeft className='h-4 w-4' />
        </Button>

        <MonthSelect value={monthValue} />

        <Button
          variant='outline'
          size='icon'
          onClick={() => router.push(`/dashboard?m=${shift(monthValue, +1)}`)}
          aria-label='Next month'
        >
          <ChevronRight className='h-4 w-4' />
        </Button>
      </div>
    </div>
  )
}
