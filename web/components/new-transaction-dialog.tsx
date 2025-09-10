'use client'

import { createTransaction } from '@/app/actions/transactions'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { ButtonHTMLAttributes, useState, useTransition } from 'react'
import { toast } from 'sonner'
import { LoadingOverlay } from './loading-overlay'

export default function NewTransactionDialog({
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [pending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <LoadingOverlay active={pending} message='Saving transaction…' />
      <DialogTrigger asChild>
        <Button variant='outline' {...props}>
          <Plus />
          Transaction
        </Button>
      </DialogTrigger>

      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Add transaction</DialogTitle>
        </DialogHeader>

        <form
          id='new-tx-form'
          action={(fd) => {
            setError(null)
            startTransition(async () => {
              const res = await createTransaction(fd)
              if (!res.ok) {
                const msg = res.error ?? 'Save failed. Please try again.'
                setError(msg)
                toast.error('Failed to save', { description: msg })
                return
              }

              toast.success('Transaction created', {
                description: 'Your transaction was added successfully.',
              })
              ;(
                document.getElementById('new-tx-form') as HTMLFormElement
              )?.reset()
              setOpen(false)
              router.refresh()
            })
          }}
          className='space-y-4'
        >
          <div className='grid gap-2'>
            <Label htmlFor='title'>Title</Label>
            <Input
              id='title'
              name='title'
              placeholder='e.g. Salary, Rent, Groceries'
              required
            />
          </div>

          <div className='grid gap-2'>
            <Label htmlFor='amount'>Amount</Label>
            <Input
              id='amount'
              name='amount'
              type='number'
              step='0.01'
              min='0'
              placeholder='0,00'
              required
            />
          </div>

          <div className='grid gap-2'>
            <Label>Type</Label>
            <Select name='type' defaultValue='expense'>
              <SelectTrigger>
                <SelectValue placeholder='Select type' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='income'>Income</SelectItem>
                <SelectItem value='expense'>Expense</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className='grid gap-2'>
            <Label>Category</Label>
            <Select name='category' defaultValue='essential'>
              <SelectTrigger>
                <SelectValue placeholder='Select category' />
              </SelectTrigger>
              <SelectContent>
                {/* 50/30/20 presets */}
                <SelectItem value='essential'>Essential (50%)</SelectItem>
                <SelectItem value='non-essential'>
                  Non-essential (30%)
                </SelectItem>
                <SelectItem value='investment'>Investment (20%)</SelectItem>
                {/* You can later swap this Select for a free-text input if you want fully custom categories. */}
              </SelectContent>
            </Select>
          </div>

          <div className='grid gap-2'>
            <Label htmlFor='date'>Date</Label>
            <Input id='date' name='date' type='date' />
          </div>

          {error && <p className='text-sm text-red-600'>{error}</p>}

          <div className='flex justify-end gap-2 pt-2'>
            <Button
              type='button'
              variant='outline'
              onClick={() => setOpen(false)}
              disabled={pending}
            >
              Cancel
            </Button>
            <Button type='submit' disabled={pending}>
              {pending ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
