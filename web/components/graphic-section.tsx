import { DashboardData } from '@/lib/dashboard'
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from 'chart.js'
import React from 'react'
import { Bar, Doughnut } from 'react-chartjs-2'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
)

interface GraphicSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  data: DashboardData
}

export const GraphicSection = ({ data, ...props }: GraphicSectionProps) => {
  const barData = {
    labels: data.monthlyByType.labels.map((l) =>
      new Date(l).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
      })
    ),
    datasets: [
      {
        label: 'Income',
        data: data.monthlyByType.income,
        backgroundColor: 'rgba(34,197,94,0.8)',
      },
      {
        label: 'Outcome',
        data: data.monthlyByType.expense.map((v) => -Math.abs(v)),
        backgroundColor: 'rgba(239,68,68,0.8)',
      },
    ],
  }

  const doughnutData = {
    labels: ['Essential (50%)', 'Non-essential (30%)', 'Investments (20%)'],
    datasets: [
      {
        data: [data.bucket50, data.bucket30, data.bucket20],
        backgroundColor: ['#ef4444', '#f59e0b', '#3b82f6'],
      },
    ],
  }
  
  return (
    <div className='grid gap-4 md:grid-cols-2' {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Daily overview of the month</CardTitle>
        </CardHeader>
        <CardContent>
          <Bar data={barData} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>50/30/20 Distribution (Expenses)</CardTitle>
        </CardHeader>
        <CardContent className='max-w-md'>
          <Doughnut data={doughnutData} />
        </CardContent>
      </Card>
    </div>
  )
}
