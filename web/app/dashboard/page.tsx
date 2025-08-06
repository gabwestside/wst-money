import { redirect } from 'next/navigation'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { createClient } from '@/lib/supabase/server'
import { InfoIcon } from 'lucide-react'

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getClaims()
  if (error || !data?.claims) {
    redirect('/auth/login')
  }

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()
  if (userError || !user) {
    redirect('/auth/login')
  }
  return (
    <div className='space-y-6'>
      <InfoIcon size='16' strokeWidth={2} />
      <h1 className='text-2xl font-bold'>Olá, {user?.email} 👋</h1>
      <p className='text-muted-foreground'>Resumo financeiro de agosto</p>

      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        <Card>
          <CardHeader>
            <CardTitle>Total de Entradas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-2xl font-semibold text-green-600'>R$ 5.693,61</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Essenciais (50%)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-2xl font-semibold text-red-600'>R$ 1.481,74</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Não Essenciais (30%)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-2xl font-semibold text-yellow-600'>R$ 352,15</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Investimentos (20%)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-2xl font-semibold text-blue-600'>R$ 948,20</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
