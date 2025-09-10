import { deleteTransaction } from '@/app/actions/transactions'
import { Button } from '@/components/ui/button'
import { DashboardData } from '@/lib/dashboard'
import { Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import { LoadingOverlay } from './loading-overlay'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

interface LatestTransactionsProps {
  data: DashboardData
}

export const LatestTransactions = ({
  data: { lastTransactions },
}: LatestTransactionsProps) => {
  const router = useRouter()
  const [deleting, setDeleting] = useState(false)

  const onDelete = async (fd: FormData) => {
    setDeleting(true)
    try {
      const res = await deleteTransaction(fd)
      if (res?.ok) {
        toast.success('Transaction excluded', {
          description: 'The transaction was successfully removed.',
        })
      } else {
        toast.error('Error when deleting', {
          description: res?.error ?? 'Try again in a moment.',
        })
      }
    } catch {
      toast.error('Unexpected error', {
        description: 'Could not delete. Check your connection.',
      })
    } finally {
      setDeleting(false)
      router.refresh()
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Latest Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className='divide-y divide-gray-200'>
          {lastTransactions.map((t) => (
            <li
              key={t.id}
              className='flex items-center justify-between py-2 gap-4'
            >
              <div className='min-w-0 flex-1'>
                <span className='block truncate font-medium'>{t.title}</span>
                <span className='text-xs text-muted-foreground'>
                  {new Date(t.created_at).toLocaleString('pt-BR')} •{' '}
                  {t.category} • {t.type}
                </span>
              </div>

              <div className='flex items-center gap-2'>
                <span
                  className={`font-semibold ${
                    t.type === 'income' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {t.type === 'income' ? '+' : '-'} R${' '}
                  {Math.abs(Number(t.amount)).toLocaleString('pt-BR')}
                </span>

                {/* Botão de excluir com confirmação */}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant='ghost'
                      size='icon'
                      className='text-muted-foreground hover:text-red-600'
                      aria-label={`Excluir ${t.title}`}
                    >
                      <Trash2 className='h-4 w-4' />
                    </Button>
                  </AlertDialogTrigger>

                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete transaction?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. You are about to delete “
                        {t.title}”.
                      </AlertDialogDescription>
                    </AlertDialogHeader>

                    {/* Form que dispara a Server Action via wrapper */}
                    <form action={onDelete} id={`delete-${t.id}`}>
                      <input type='hidden' name='id' value={t.id} />
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          type='submit'
                          className='bg-red-600 text-white hover:bg-red-700'
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </form>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </li>
          ))}

          {lastTransactions.length === 0 && (
            <li className='py-4 text-sm text-muted-foreground'>
              No transactions this month.
            </li>
          )}
        </ul>
      </CardContent>

      <LoadingOverlay active={deleting} message='Deleting transaction…' />
    </Card>
  )
}
