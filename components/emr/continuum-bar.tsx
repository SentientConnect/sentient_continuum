'use client'

import { cn } from '@/lib/utils'
import { CONTINUUM, CURRENT_STAGE_INDEX } from '@/lib/demo-data'
import { Check } from 'lucide-react'
import { useDemo } from './demo-context'

export function ContinuumBar() {
  const { transfer, clientStatus } = useDemo()

  // Advance the marker based on demo progress.
  let currentIndex = CURRENT_STAGE_INDEX // IOP
  if (transfer.complete) currentIndex = 6 // Outpatient
  if (transfer.accepted) currentIndex = 7 // Community Reintegration
  if (clientStatus === 'Recovered') currentIndex = 8 // Recovered

  return (
    <div className="w-full overflow-x-auto pb-1">
      <ol className="flex min-w-max items-center gap-1">
        {CONTINUUM.map((stage, i) => {
          const done = i < currentIndex
          const current = i === currentIndex
          return (
            <li key={stage} className="flex items-center gap-1">
              <div className="flex flex-col items-center gap-1.5">
                <div
                  className={cn(
                    'flex size-8 items-center justify-center rounded-full border text-xs font-semibold transition-colors',
                    done && 'border-success bg-success text-success-foreground',
                    current && 'border-gold bg-gold text-gold-foreground ring-4 ring-gold/20',
                    !done && !current && 'border-border bg-muted text-muted-foreground',
                  )}
                >
                  {done ? <Check className="size-4" /> : i + 1}
                </div>
                <span
                  className={cn(
                    'max-w-[5.5rem] text-center text-[10px] font-medium leading-tight',
                    current ? 'text-gold-foreground' : 'text-muted-foreground',
                    current && 'font-semibold text-card-foreground',
                  )}
                >
                  {stage}
                </span>
              </div>
              {i < CONTINUUM.length - 1 ? (
                <div
                  className={cn(
                    'mb-5 h-0.5 w-6 rounded-full sm:w-10',
                    i < currentIndex ? 'bg-success' : 'bg-border',
                  )}
                />
              ) : null}
            </li>
          )
        })}
      </ol>
    </div>
  )
}
