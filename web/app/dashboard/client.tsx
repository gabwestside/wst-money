'use client'

import NewTransactionDialog from '@/components/new-transaction-dialog'
import { SummaryCard } from '@/components/summary-card'
import { ThemeSwitcher } from '@/components/theme-switcher'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { DashboardData } from '@/lib/dashboard'
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from 'chart.js'
import { Bar, Doughnut } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
)

type Props = {
  userName: string
  data: DashboardData
}

export default function DashboardClient({ userName, data }: Props) {
  // const router = useRouter() //TODO: terminar a implementação do realtime
  //                            // atualiza dados ao receber eventos de mudanças na tabela "transactions"

  // useEffect(() => {
  //   const supabase = createBrowserClient(
  //     process.env.NEXT_PUBLIC_SUPABASE_URL!,
  //     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  //   )

  //   const channel = supabase
  //     .channel('realtime-transactions')
  //     .on(
  //       'postgres_changes',
  //       { event: '*', schema: 'public', table: 'transactions' },
  //       () => router.refresh()
  //     )
  //     .subscribe()

  //   return () => {
  //     supabase.removeChannel(channel)
  //   }
  // }, [router])

  const balance = data.incomesTotal - data.expensesTotal

  const barData = {
    labels: data.monthlyByType.labels.map((l) =>
      new Date(l).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
      })
    ),
    datasets: [
      {
        label: 'Receita',
        data: data.monthlyByType.income,
        backgroundColor: 'rgba(34,197,94,0.8)',
      },
      {
        label: 'Despesa',
        data: data.monthlyByType.expense.map((v) => -Math.abs(v)), // mostra negativas
        backgroundColor: 'rgba(239,68,68,0.8)',
      },
    ],
  }

  const doughnutData = {
    labels: ['Essenciais (50%)', 'Não Essenciais (30%)', 'Investimentos (20%)'],
    datasets: [
      {
        data: [data.bucket50, data.bucket30, data.bucket20],
        // Chart.js escolhe as cores se não for especificado, mas deixei 3 básicas:
        backgroundColor: ['#ef4444', '#f59e0b', '#3b82f6'],
      },
    ],
  }

  return (
    <div className='space-y-6'>
      <div className='grid gap-4 md:grid-cols-2'>
        <div className='flex items-center gap-2'>
          {/* <InfoIcon size={16} strokeWidth={2} /> */}
          <h1 className='text-xl font-bold '>Hello, {userName}</h1>
        </div>
      </div>
      <p className='text-muted-foreground'>Financial summary for the month</p>

      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        <SummaryCard
          title='Current Balance'
          value={balance}
          // color={balance >= 0 ? 'text-green-600' : 'text-red-600'}
          color='bg-purple-300 text-black'
        />
        <SummaryCard
          title='Incomes'
          value={data.incomesTotal}
          color='bg-green-300 text-black'
        />
        <SummaryCard
          title='Outcomes'
          value={data.expensesTotal}
          color='bg-red-300 text-black'
        />
        <SummaryCard
          title='Investments (20%)'
          value={data.bucket20}
          color='bg-blue-300 text-black'
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Latest Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className='divide-y divide-gray-200'>
            {data.lastTransactions.map((t) => (
              <li key={t.id} className='flex items-center justify-between py-2'>
                <div className='flex flex-col'>
                  <span className='font-medium'>{t.title}</span>
                  <span className='text-xs text-muted-foreground'>
                    {new Date(t.created_at).toLocaleString('pt-BR')} •{' '}
                    {t.category} • {t.type}
                  </span>
                </div>
                <span
                  className={`font-semibold ${
                    t.type === 'income' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {t.type === 'income' ? '+' : '-'} R${' '}
                  {Math.abs(Number(t.amount)).toLocaleString('pt-BR')}
                </span>
              </li>
            ))}
            {data.lastTransactions.length === 0 && (
              <li className='py-4 text-sm text-muted-foreground'>
                Nenhuma transação neste mês.
              </li>
            )}
          </ul>
        </CardContent>
      </Card>

      <div className='grid gap-4 md:grid-cols-2'>
        <Card>
          <CardHeader>
            <CardTitle>Visão diária do mês</CardTitle>
          </CardHeader>
          <CardContent>
            <Bar data={barData} />
          </CardContent>
        </Card>

        {/* Gráfico pizza 50/30/20 */}
        <Card>
          <CardHeader>
            <CardTitle>Distribuição 50/30/20 (Despesas)</CardTitle>
          </CardHeader>
          <CardContent className='max-w-md'>
            <Doughnut data={doughnutData} />
          </CardContent>
        </Card>
      </div>

      <footer className='fixed bottom-4 right-14 md:bottom-8 md:right-8 flex items-center gap-4'>
        <NewTransactionDialog className='ml-auto w-full md:max-w-40' />
        <ThemeSwitcher />
      </footer>
    </div>
  )
}
