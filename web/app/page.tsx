import { ThemeSwitcher } from '@/components/theme-switcher'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Home() {
  return (
    <div className='min-h-screen bg-background text-foreground flex flex-col items-center justify-between px-6 py-12'>
      <div className='w-full flex justify-end'>
        <span className='text-sm '>
          <ThemeSwitcher />
        </span>
      </div>

      <div className='text-center max-w-md mt-10'>
        <h1 className='text-4xl font-bold mb-4'>
          Easy for Beginners,
          <br />
          Powerful for All
        </h1>
        <p className=' text-sm mb-8'>
          Effortless investing for everyone: Discover how simple steps can make
          financial growth easy
        </p>
      </div>

      <div className='w-full max-w-sm flex justify-center gap-4'>
        <Link href='/auth/login'>
          <Button variant='outline' className='w-36'>
            Log In
          </Button>
        </Link>
        <Link href='/auth/register'>
          <Button className='w-36'>Create Account</Button>
        </Link>
      </div>
    </div>
  )
}
