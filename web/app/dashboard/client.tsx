'use client'

import { LatestTransactions } from '@/components/last-transactions'
import MonthSelect from '@/components/month-select'
import NewTransactionDialog from '@/components/new-transaction-dialog'
import { SummaryCard } from '@/components/summary-card'
import { ThemeSwitcher } from '@/components/theme-switcher'
import { Button } from '@/components/ui/button'
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
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'
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
  monthValue: string
}

export default function DashboardClient({ userName, data, monthValue }: Props) {
  const router = useRouter()

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
        data: data.monthlyByType.expense.map((v) => -Math.abs(v)),
        backgroundColor: 'rgba(239,68,68,0.8)',
      },
    ],
  }

  const doughnutData = {
    labels: ['Essenciais (50%)', 'Não Essenciais (30%)', 'Investimentos (20%)'],
    datasets: [
      {
        data: [data.bucket50, data.bucket30, data.bucket20],
        backgroundColor: ['#ef4444', '#f59e0b', '#3b82f6'],
      },
    ],
  }

  const monthLabel = useMemo(() => {
    const [y, m] = (monthValue ?? '').split('-').map(Number)
    if (!y || !m) return ''
    const MONTHS = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]
    return `${MONTHS[m - 1]} ${y}`
  }, [monthValue])

  function shift(value: string, delta: number) {
    const y = Number(value.slice(0, 4))
    const m = Number(value.slice(5, 7)) - 1
    const d = new Date(y, m + delta, 1)
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
  }

  return (
    <div className='space-y-6'>
      <div className='grid gap-4 md:grid-cols-2'>
        <div className='flex items-center gap-2'>
          <h1 className='text-xl font-bold'>Hello, {userName}</h1>
        </div>
        <div className='flex items-center justify-end gap-2'>
          <Button
            variant='outline'
            size='icon'
            onClick={() => router.push(`/dashboard?m=${shift(monthValue, -1)}`)}
            aria-label='Previous month'
          >
            <ChevronLeft className='h-4 w-4' />
          </Button>

          <MonthSelect value={monthValue} />

          <Button
            variant='outline'
            size='icon'
            onClick={() => router.push(`/dashboard?m=${shift(monthValue, +1)}`)}
            aria-label='Next month'
          >
            <ChevronRight className='h-4 w-4' />
          </Button>
        </div>
      </div>

      <p className='text-muted-foreground'>
        Financial summary for {monthLabel}
      </p>

      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        <SummaryCard
          title='Current Balance'
          value={balance}
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

      <LatestTransactions data={data} />

      <div className='grid gap-4 md:grid-cols-2'>
        <Card>
          <CardHeader>
            <CardTitle>Visão diária do mês</CardTitle>
          </CardHeader>
          <CardContent>
            <Bar data={barData} />
          </CardContent>
        </Card>

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
