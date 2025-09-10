'use client'

import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

interface LogoutButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  title?: string
  children?: React.ReactNode
  variant?: 'ghost' | 'outline' | 'default'
}

export const LogoutButton = ({
  title = 'Logout',
  children,
  variant = 'ghost',
  ...props
}: LogoutButtonProps) => {
  const router = useRouter()

  const logout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/auth/login')
  }

  return (
    <Button onClick={logout} variant={variant} {...props}>
      {children}
      {title}
    </Button>
  )
}
