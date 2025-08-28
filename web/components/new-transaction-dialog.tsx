'use client'

import { ButtonHTMLAttributes, useState, useTransition } from 'react'
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
import { useRouter } from 'next/navigation'

export default function NewTransactionDialog({...props}: ButtonHTMLAttributes<HTMLButtonElement>) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [pending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button {...props}>+ Transaction</Button>
      </DialogTrigger>

      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Add transaction</DialogTitle>
        </DialogHeader>

        <form
          action={(fd) => {
            setError(null)
            startTransition(async () => {
              const res = await createTransaction(fd)
              if (!res.ok) {
                setError(res.error ?? 'Save failed')
                return
              }
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
              placeholder='E.g. Salary, Rent, Market'
              required
            />
          </div>

          <div className='grid gap-2'>
            <Label htmlFor='amount'>Value</Label>
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
                <SelectValue placeholder='Selecione' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='income'>Income</SelectItem>
                <SelectItem value='expense'>Outcome</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className='grid gap-2'>
            <Label>Category</Label>
            <Select name='category' defaultValue='essential'>
              <SelectTrigger>
                <SelectValue placeholder='Categoria' />
              </SelectTrigger>
              <SelectContent>
                {/* presets 50/30/20 */}
                <SelectItem value='essential'>Essential (50%)</SelectItem>
                <SelectItem value='non-essential'>
                  Non-Essential (30%)
                </SelectItem>
                <SelectItem value='investment'>Investment (20%)</SelectItem>
                {/* Pode digitar livre usando o input abaixo se você preferir um campo texto.
                    Mantive Select para seu método 50/30/20. */}
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
