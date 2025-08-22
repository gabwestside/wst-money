'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { InfoIcon } from 'lucide-react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar, Doughnut } from 'react-chartjs-2'
import type { DashboardData } from '@/lib/dashboard'

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

const SummaryCard = ({
  title,
  value,
  color,
}: {
  title: string
  value: number
  color: string
}) => (
  <Card>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className={`text-2xl font-semibold ${color}`}>
        R$ {value.toLocaleString('pt-BR')}
      </p>
    </CardContent>
  </Card>
)

export default function DashboardClient({ userName, data }: Props) {
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
      {/* Header */}
      <div className='flex items-center gap-2'>
        <InfoIcon size={16} strokeWidth={2} />
        <h1 className='text-2xl font-bold'>Olá, {userName} 👋</h1>
      </div>
      <p className='text-muted-foreground'>Resumo financeiro do mês</p>

      {/* Cards resumo */}
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        <SummaryCard
          title='Saldo Atual'
          value={balance}
          color={balance >= 0 ? 'text-green-600' : 'text-red-600'}
        />
        <SummaryCard
          title='Total de Entradas'
          value={data.incomesTotal}
          color='text-green-600'
        />
        <SummaryCard
          title='Total de Despesas'
          value={data.expensesTotal}
          color='text-red-600'
        />
        <SummaryCard
          title='Investimentos (20%)'
          value={data.bucket20}
          color='text-blue-600'
        />
      </div>

      {/* Gráfico de barras (por dia) */}
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

      {/* Últimas transações */}
      <Card>
        <CardHeader>
          <CardTitle>Últimas Transações</CardTitle>
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
    </div>
  )
}
