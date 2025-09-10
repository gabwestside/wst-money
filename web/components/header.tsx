import { Logo } from '@/components/logo'

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  userName: string
}

export const Header = ({ userName, ...props }: HeaderProps) => {
  return (
    <div
      className='flex flex-col items-center justify-center gap-2 md:grid md:grid-cols-2 md:gap-4'
      {...props}
    >
      <Logo href='/dashboard' size='lg' className='-ml-6' />

      <h1 className='hidden ml-auto md:flex md:justify-end md:font-bold md:w-full'>
        Hello, {userName}
      </h1>
    </div>
  )
}
