'use client'

import { Menu, ChevronDown, UserCog } from 'lucide-react'
import { ROLES, ROLE_DESCRIPTIONS, type Role } from '@/lib/demo-data'
import { useDemo } from './demo-context'

export function Topbar({ onMenu }: { onMenu: () => void }) {
  const { role, setRole } = useDemo()

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur">
      <div className="flex items-center gap-3 px-4 py-3 sm:px-6">
        <button
          onClick={onMenu}
          className="rounded-lg p-2 text-foreground hover:bg-white/10 lg:hidden"
          aria-label="Open navigation"
        >
          <Menu className="size-5" />
        </button>

        <div className="min-w-0 flex-1">
          <h1 className="truncate text-base font-semibold text-foreground sm:text-lg">
            Sentient Continuum™
          </h1>
          <p className="hidden truncate text-xs text-foreground/60 sm:block">
            A Patient-First Behavioral Health EMR
          </p>
        </div>

        {/* Role switcher */}
        <div className="flex items-center gap-2">
          <div className="hidden text-right sm:block">
            <p className="text-[11px] font-medium uppercase tracking-wide text-foreground/50">
              Viewing as
            </p>
            <p className="text-xs text-gold">{role}</p>
          </div>
          <div className="relative">
            <UserCog className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-gold" />
            <select
              aria-label="Switch user role"
              value={role}
              onChange={(e) => setRole(e.target.value as Role)}
              className="h-10 appearance-none rounded-xl border border-border bg-card py-1 pl-8 pr-8 text-sm font-medium text-card-foreground outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              {ROLES.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          </div>
        </div>
      </div>

      <div className="border-t border-border/60 bg-white/[0.03] px-4 py-1.5 sm:px-6">
        <p className="truncate text-[11px] text-foreground/55">
          {ROLE_DESCRIPTIONS[role]}
        </p>
      </div>
    </header>
  )
}
