// app/dashboard/loading.tsx
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='grid gap-4 md:grid-cols-2'>
        <div className='flex items-center gap-3'>
          <Skeleton className='h-7 w-56' />
        </div>
        <div className='flex justify-end gap-2'>
          <Skeleton className='h-9 w-10' />
          <Skeleton className='h-9 w-[220px]' />
          <Skeleton className='h-9 w-10' />
        </div>
      </div>

      <Skeleton className='h-5 w-64' />

      {/* Summary cards */}
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        {[...Array(4)].map((_, i) => (
          <div key={i} className='rounded-xl border bg-card p-4'>
            <Skeleton className='mb-3 h-4 w-28' />
            <Skeleton className='h-8 w-32' />
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className='grid gap-4 md:grid-cols-2'>
        <div className='rounded-xl border bg-card p-4'>
          <Skeleton className='mb-4 h-5 w-48' />
          <Skeleton className='h-[220px] w-full' />
        </div>
        <div className='rounded-xl border bg-card p-4'>
          <Skeleton className='mb-4 h-5 w-60' />
          <div className='flex items-center justify-center'>
            <Skeleton className='h-48 w-48 rounded-full' />
          </div>
        </div>
      </div>

      {/* Latest transactions */}
      <div className='rounded-xl border bg-card p-4'>
        <Skeleton className='mb-4 h-5 w-44' />
        <div className='space-y-3'>
          {[...Array(5)].map((_, i) => (
            <div key={i} className='flex items-center justify-between'>
              <Skeleton className='h-4 w-56' />
              <Skeleton className='h-4 w-24' />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
