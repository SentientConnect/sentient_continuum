'use client'

import { useState } from 'react'
import { Play, X, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useDemo } from './demo-context'
import type { NavKey, Role, ClientStatus } from '@/lib/demo-data'

interface Jump {
  label: string
  view: NavKey
  role?: Role
  status?: ClientStatus
}

const JUMPS: Jump[] = [
  { label: 'New intake', view: 'intake', role: 'Intake Coordinator' },
  { label: 'MBS assessment', view: 'mbs', role: 'Clinician' },
  { label: 'IOP care pathway', view: 'pathway', role: 'Clinician' },
  { label: 'Create ROI', view: 'roi', role: 'Case Manager' },
  { label: 'Transfer to Company B', view: 'roi', role: 'Case Manager' },
  { label: 'Receive transferred record', view: 'roi', role: 'Receiving Facility' },
  { label: 'Return to Company A', view: 'roi', role: 'Facility Administrator' },
  { label: 'MAT pathway', view: 'mat', role: 'Medical Provider' },
  { label: 'Community reintegration', view: 'outcomes', role: 'Case Manager' },
  { label: 'Final discharge', view: 'discharge', role: 'Clinician' },
  { label: 'Recovered milestone', view: 'discharge', role: 'Client View', status: 'Recovered' },
]

export function DemoController() {
  const [open, setOpen] = useState(false)
  const { navigate, setRole, setClientStatus, showToast } = useDemo()

  const run = (jump: Jump) => {
    if (jump.role) setRole(jump.role)
    if (jump.status) setClientStatus(jump.status)
    navigate(jump.view)
    setOpen(false)
    showToast(`Jumped to: ${jump.label}`)
  }

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-5 right-5 z-50 flex h-12 items-center gap-2 rounded-full bg-gold px-4 text-sm font-semibold text-gold-foreground shadow-lg shadow-black/30 transition-transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        aria-expanded={open}
        aria-label="Open demo controller"
      >
        {open ? <X className="size-5" /> : <Play className="size-4" />}
        <span className="hidden sm:inline">Demo</span>
      </button>

      {open ? (
        <div className="fixed bottom-20 right-5 z-50 w-[min(20rem,calc(100vw-2.5rem))] overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-2xl">
          <div className="flex items-center gap-2 border-b border-border bg-gold/10 px-4 py-3">
            <Sparkles className="size-4 text-gold-foreground" />
            <div>
              <p className="text-sm font-semibold">Demo Controller</p>
              <p className="text-[11px] text-muted-foreground">
                Jump to any step of the journey
              </p>
            </div>
          </div>
          <div className="max-h-[60vh] overflow-y-auto p-2">
            {JUMPS.map((jump, i) => (
              <button
                key={jump.label}
                onClick={() => run(jump)}
                className={cn(
                  'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors hover:bg-accent',
                )}
              >
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-gold/15 text-[11px] font-semibold text-gold-foreground">
                  {i + 1}
                </span>
                <span className="font-medium text-card-foreground">{jump.label}</span>
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </>
  )
}

export function Toast() {
  const { toast } = useDemo()
  if (!toast) return null
  return (
    <div
      role="status"
      className="fixed bottom-5 left-1/2 z-[60] -translate-x-1/2 rounded-full border border-gold/40 bg-card px-4 py-2 text-sm font-medium text-card-foreground shadow-lg"
    >
      {toast}
    </div>
  )
}
