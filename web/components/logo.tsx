import Image from 'next/image'
import Link from 'next/link'

type LogoProps = {
  href?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
  markOnly?: boolean // use only the icon (square) if you want
}

const sizes = {
  sm: { h: 48 },
  md: { h: 64 },
  lg: { h: 80 },
}

export const Logo = ({
  href = '/',
  size = 'md',
  className = '',
  markOnly = false,
}: LogoProps) => {
  const h = sizes[size].h

  // choose asset set
  const lightSrc = '/brand/logo-light.png'
  const darkSrc = '/brand/logo-dark.png'

  return (
    <Link href={href} className={`inline-flex items-center ${className}`}>
      {/* Light theme */}
      <Image
        src={lightSrc}
        alt='wst finances'
        width={markOnly ? h : sizes[size].h}
        height={h}
        className={`block dark:hidden h-[${h}px] w-auto`}
        priority
      />
      {/* Dark theme */}
      <Image
        src={darkSrc}
        alt='wst finances'
        width={markOnly ? h : sizes[size].h}
        height={h}
        className={`hidden dark:block h-[${h}px] w-auto`}
        priority
      />
      <span className='sr-only'>wst finances</span>
    </Link>
  )
}
