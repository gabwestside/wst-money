'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ThemeSwitcher } from './theme-switcher'

const links = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/entries/new', label: 'New Entry' },
  { href: '/expenses/new', label: 'New Spending' },
  { href: '/history', label: 'History' },
  { href: '/settings', label: 'Settings' },
]

export const Sidebar = () => {
  const pathname = usePathname()

  return (
    <aside className='w-64 p-4 bg-card border-r shadow-sm'>
      <h2 className='text-lg font-bold mb-4'>Personal Finance</h2>
      <nav className='space-y-2'>
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              'block px-3 py-2 rounded hover:bg-primary-foreground',
              pathname === href && 'bg-secondary font-semibold'
            )}
          >
            {label}
          </Link>
        ))}
        <ThemeSwitcher />
      </nav>
    </aside>
  )
}
