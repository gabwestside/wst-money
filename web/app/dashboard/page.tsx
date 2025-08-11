import { redirect } from 'next/navigation'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { createClient } from '@/lib/supabase/server'
import { InfoIcon } from 'lucide-react'

export default async function DashboardPage() {
  const data = {
    incomes: 5693.61,
    essential: 1481.74,
    nonEssential: 352.15,
    investments: 948.2,
  }

  const supabase = await createClient()

  const { data: result, error } = await supabase.auth.getClaims()
  if (error || !result?.claims) {
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

      <h1 className='text-2xl font-bold'>Olá, Gabriel 👋</h1>
      <p className='text-muted-foreground'>Resumo financeiro do mês</p>

      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        <Card>
          <CardHeader>
            <CardTitle>Total de Entradas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-2xl font-semibold text-green-600'>
              R$ {data.incomes.toLocaleString('pt-BR')}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Essenciais (50%)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-2xl font-semibold text-red-600'>
              R$ {data.essential.toLocaleString('pt-BR')}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Não Essenciais (30%)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-2xl font-semibold text-yellow-600'>
              R$ {data.nonEssential.toLocaleString('pt-BR')}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Investimentos (20%)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-2xl font-semibold text-blue-600'>
              R$ {data.investments.toLocaleString('pt-BR')}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
