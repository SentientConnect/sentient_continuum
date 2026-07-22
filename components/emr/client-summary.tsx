'use client'

import { CLIENT } from '@/lib/demo-data'
import { Card, CardBody, Badge } from './ui'
import { useDemo } from './demo-context'
import { Target, Activity, ShieldAlert, Pill } from 'lucide-react'

export function ClientGoalBanner() {
  return (
    <div className="rounded-2xl border border-gold/30 bg-gold/10 p-4 sm:p-5">
      <div className="flex items-start gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-gold text-gold-foreground">
          <Target className="size-5" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-gold-foreground/80">
            Client Goal
          </p>
          <p className="text-pretty text-sm font-medium text-card-foreground sm:text-base">
            {CLIENT.goal}
          </p>
        </div>
      </div>
    </div>
  )
}

export function ClientSummaryCard() {
  const { clientStatus } = useDemo()
  return (
    <Card>
      <CardBody className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div
          className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-sidebar text-lg font-semibold text-gold"
          aria-hidden="true"
        >
          JM
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-lg font-semibold text-card-foreground">{CLIENT.name}</h2>
            <Badge tone="gold">{CLIENT.id}</Badge>
            <Badge tone={clientStatus === 'Recovered' ? 'success' : 'info'}>{clientStatus}</Badge>
          </div>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Age {CLIENT.age} · {CLIENT.pronouns} · {CLIENT.primaryConcern}
          </p>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {CLIENT.organization}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <MiniStat icon={<Activity className="size-4" />} label="Level" value={CLIENT.levelOfCare} />
          <MiniStat icon={<Target className="size-4" />} label="Recovery day" value={`Day ${CLIENT.recoveryDay}`} />
          <MiniStat icon={<ShieldAlert className="size-4" />} label="Risk" value={CLIENT.riskLevel} />
          <MiniStat icon={<Pill className="size-4" />} label="MAT" value="Taper" />
        </div>
      </CardBody>
    </Card>
  )
}

function MiniStat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="rounded-xl border border-border bg-muted/50 px-3 py-2">
      <div className="flex items-center gap-1.5 text-gold-foreground">
        {icon}
        <span className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </span>
      </div>
      <p className="mt-0.5 text-sm font-semibold text-card-foreground">{value}</p>
    </div>
  )
}
