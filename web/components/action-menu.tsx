import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Calendar, LogOut, MenuSquare, Settings, Sun, User } from 'lucide-react'
import { LogoutButton } from './logout-button'
import { MonthNavigator } from './month-navigator'

interface ActionMenuProps extends React.HTMLAttributes<HTMLElement> {
  monthValue: string
}

export const ActionMenu = ({ monthValue, ...props }: ActionMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline'>
          <MenuSquare /> Menu
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' align='start' {...props}>
        {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
        <DropdownMenuGroup>
          <DropdownMenuItem disabled>
            <User />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem disabled>
            <Settings />
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem disabled>
            <Sun />
            Light
            {/* <ThemeSwitcher /> */}
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Calendar />
            <MonthNavigator monthValue={monthValue} className='-ml-3 -m-px' />
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <LogoutButton
            title='Logout'
            variant='ghost'
            className='w-full justify-start -ml-3'
          >
            <LogOut />
          </LogoutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
