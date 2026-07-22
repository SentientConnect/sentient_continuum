'use client'

import Image from 'next/image'
import { X } from 'lucide-react'

import { NAV_ITEMS } from '@/lib/demo-data'
import { cn } from '@/lib/utils'
import { useDemo } from './demo-context'
import { NavIcon } from './nav-icon'

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
          className="fixed inset-0 z-40 bg-black/70 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      ) : null}

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-white/10 bg-black text-white transition-transform duration-300 lg:sticky lg:top-0 lg:z-0 lg:h-svh lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full',
        )}
        aria-label="Main navigation"
      >
        <div className="relative flex min-h-28 items-center justify-center border-b border-white/10 px-4 py-4">
          <button
            type="button"
            onClick={() => {
              navigate('dashboard')
              onClose()
            }}
            className="flex w-full items-center justify-center"
            aria-label="Open Sentient Continuum dashboard"
          >
            <Image
              src="/Sentient_Continuum.png"
              alt="Sentient Continuum — Powered by SentientOS"
              width={640}
              height={260}
              priority
              className="mx-auto h-auto max-h-24 w-full max-w-[250px] object-contain object-center"
            />
          </button>

          <button
            type="button"
            onClick={onClose}
            className="absolute right-3 top-3 rounded-lg p-2 text-white/70 transition hover:bg-white/10 hover:text-white lg:hidden"
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
                    type="button"
                    onClick={() => {
                      navigate(item.key)
                      onClose()
                    }}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                      active
                        ? 'bg-[#d6a63a] text-black'
                        : 'text-white/75 hover:bg-white/10 hover:text-white',
                    )}
                  >
                    <NavIcon
                      name={item.icon}
                      className="size-[18px] shrink-0"
                    />
                    <span className="truncate">{item.label}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="border-t border-white/10 px-5 py-4">
          <p className="text-[11px] leading-relaxed text-white/45">
            Demo environment using mock client data. Designed to support
            HIPAA-compliant workflows, consent-controlled sharing, role-based
            access and complete audit tracking.
          </p>
        </div>
      </aside>
    </>
  )
}
