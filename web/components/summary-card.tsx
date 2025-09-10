import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

interface SummaryCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  value: number
  color: string
}
export const SummaryCard = ({
  title,
  value,
  color,
  ...props
}: SummaryCardProps) => (
  <Card {...props} className={`${color} w-full min-w-[12rem]`}>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className='text-2xl font-semibold'>
        R$ {value.toLocaleString('pt-BR')}
      </p>
    </CardContent>
  </Card>
)
