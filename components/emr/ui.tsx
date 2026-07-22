'use client'

import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

export function Card({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-border bg-card text-card-foreground shadow-sm',
        className,
      )}
    >
      {children}
    </div>
  )
}

export function CardBody({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return <div className={cn('p-4 sm:p-5', className)}>{children}</div>
}

export function SectionTitle({
  title,
  subtitle,
  icon,
  action,
}: {
  title: string
  subtitle?: string
  icon?: ReactNode
  action?: ReactNode
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div className="flex items-start gap-3">
        {icon ? (
          <div className="mt-0.5 flex size-9 items-center justify-center rounded-xl bg-gold/15 text-gold-foreground">
            {icon}
          </div>
        ) : null}
        <div>
          <h2 className="text-balance text-lg font-semibold tracking-tight text-card-foreground">
            {title}
          </h2>
          {subtitle ? (
            <p className="mt-0.5 text-pretty text-sm text-muted-foreground">
              {subtitle}
            </p>
          ) : null}
        </div>
      </div>
      {action}
    </div>
  )
}

type Tone = 'gold' | 'neutral' | 'success' | 'warning' | 'danger' | 'info'

const toneClasses: Record<Tone, string> = {
  gold: 'bg-gold/15 text-gold-foreground border-gold/30',
  neutral: 'bg-muted text-muted-foreground border-border',
  success: 'bg-success/12 text-success border-success/25',
  warning: 'bg-warning/15 text-warning-foreground border-warning/30',
  danger: 'bg-destructive/12 text-destructive border-destructive/25',
  info: 'bg-chart-2/12 text-chart-2 border-chart-2/25',
}

export function Badge({
  children,
  tone = 'neutral',
  className,
}: {
  children: ReactNode
  tone?: Tone
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium',
        toneClasses[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}

export function StatCard({
  label,
  value,
  hint,
  icon,
  tone = 'neutral',
  onClick,
}: {
  label: string
  value: ReactNode
  hint?: string
  icon?: ReactNode
  tone?: Tone
  onClick?: () => void
}) {
  const Comp = onClick ? 'button' : 'div'
  return (
    <Comp
      onClick={onClick}
      className={cn(
        'flex flex-col gap-2 rounded-2xl border border-border bg-card p-4 text-left shadow-sm transition-all',
        onClick && 'hover:border-gold/50 hover:shadow-md focus-visible:ring-2 focus-visible:ring-gold outline-none',
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-medium text-muted-foreground">{label}</span>
        {icon ? (
          <span className={cn('flex size-8 items-center justify-center rounded-lg', toneClasses[tone])}>
            {icon}
          </span>
        ) : null}
      </div>
      <span className="text-2xl font-semibold tracking-tight text-card-foreground">
        {value}
      </span>
      {hint ? <span className="text-xs text-muted-foreground">{hint}</span> : null}
    </Comp>
  )
}

export function ProgressBar({
  value,
  className,
  tone = 'gold',
}: {
  value: number
  className?: string
  tone?: 'gold' | 'success'
}) {
  return (
    <div className={cn('h-2 w-full overflow-hidden rounded-full bg-muted', className)}>
      <div
        className={cn(
          'h-full rounded-full transition-all duration-500',
          tone === 'gold' ? 'bg-gold' : 'bg-success',
        )}
        style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
      />
    </div>
  )
}

export function Sparkline({
  data,
  invert = false,
  className,
}: {
  data: number[]
  invert?: boolean
  className?: string
}) {
  const width = 120
  const height = 34
  const max = 10
  const min = 0
  const pts = data.map((d, i) => {
    const x = (i / (data.length - 1)) * width
    const y = height - ((d - min) / (max - min)) * height
    return `${x.toFixed(1)},${y.toFixed(1)}`
  })
  const first = data[0]
  const last = data[data.length - 1]
  const rising = last >= first
  const good = invert ? !rising : rising
  const stroke = good ? 'var(--success)' : 'var(--destructive)'
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={cn('h-9 w-full', className)}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <polyline
        points={pts.join(' ')}
        fill="none"
        stroke={stroke}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ScoreMeter({ score, invert = false }: { score: number; invert?: boolean }) {
  const good = invert ? score <= 4 : score >= 6
  const mid = score >= 4 && score <= 6
  const tone = good ? 'bg-success' : mid ? 'bg-warning' : 'bg-destructive'
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-20 overflow-hidden rounded-full bg-muted">
        <div className={cn('h-full rounded-full', tone)} style={{ width: `${score * 10}%` }} />
      </div>
      <span className="w-8 text-right text-xs font-semibold tabular-nums text-card-foreground">
        {score}/10
      </span>
    </div>
  )
}
