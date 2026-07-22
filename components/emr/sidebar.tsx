'use client'

import { cn } from '@/lib/utils'
import { NAV_ITEMS } from '@/lib/demo-data'
import { useDemo } from './demo-context'
import { NavIcon } from './nav-icon'
import { X } from 'lucide-react'
import Image from 'next/image'

export function Sidebar({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const { role, view, navigate } = useDemo()

  const items = NAV_ITEMS.filter(
    (item) => item.roles === 'all' || item.roles.includes(role),
  )

  return (
    <>
      {open ? (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      ) : null}

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-sidebar text-sidebar-foreground transition-transform duration-300 lg:sticky lg:top-0 lg:z-0 lg:h-svh lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full',
        )}
        aria-label="Main navigation"
      >
        {/* Logo placeholder */}
        <div className="flex items-center justify-between gap-3 border-b border-sidebar-border px-5 py-4">
          <div className="flex items-center gap-3">
            <Image src="/phoenix-s.png" alt="Sentient Connect Phoenix S" width={42} height={42} className="rounded-xl" />
            <div className="leading-tight">
              <p className="text-sm font-semibold text-sidebar-foreground">
                Sentient Continuum™
              </p>
              <p className="text-[11px] text-sidebar-foreground/60">
                Sentient Connect™ · SentientOS™
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-sidebar-foreground/70 hover:bg-sidebar-accent lg:hidden"
            aria-label="Close navigation"
          >
            <X className="size-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="flex flex-col gap-1">
            {items.map((item) => {
              const active = view === item.key
              return (
                <li key={item.key}>
                  <button
                    onClick={() => {
                      navigate(item.key)
                      onClose()
                    }}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                      active
                        ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                        : 'text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                    )}
                  >
                    <NavIcon name={item.icon} className="size-[18px] shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="border-t border-sidebar-border px-5 py-3">
          <p className="text-[11px] leading-relaxed text-sidebar-foreground/50">
            Demo environment — realistic mock data only. Designed to support
            HIPAA-compliant workflows.
          </p>
        </div>
      </aside>
    </>
  )
}
