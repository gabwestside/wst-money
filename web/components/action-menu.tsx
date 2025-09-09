import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import NewTransactionDialog from './new-transaction-dialog'
import { ThemeSwitcher } from './theme-switcher'
import { useRouter } from 'next/navigation'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import MonthSelect from './month-select'

interface ActionMenuProps extends React.HTMLAttributes<HTMLElement> {
  monthValue: string
}

export const ActionMenu = ({ monthValue, ...props }: ActionMenuProps) => {
  const router = useRouter()

  function shift(value: string, delta: number) {
    const y = Number(value.slice(0, 4))
    const m = Number(value.slice(5, 7)) - 1
    const d = new Date(y, m + delta, 1)
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline'>Menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' align='start' {...props}>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem>
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem>
            <div className='flex items-center justify-end gap-2'>
              <Button
                variant='outline'
                size='icon'
                onClick={() =>
                  router.push(`/dashboard?m=${shift(monthValue, -1)}`)
                }
                aria-label='Previous month'
              >
                <ChevronLeft className='h-4 w-4' />
              </Button>

              <MonthSelect value={monthValue} />

              <Button
                variant='outline'
                size='icon'
                onClick={() =>
                  router.push(`/dashboard?m=${shift(monthValue, +1)}`)
                }
                aria-label='Next month'
              >
                <ChevronRight className='h-4 w-4' />
              </Button>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <NewTransactionDialog />
          </DropdownMenuItem>
          <DropdownMenuItem>
            Theme
            <ThemeSwitcher />
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
