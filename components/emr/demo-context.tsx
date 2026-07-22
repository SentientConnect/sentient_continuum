'use client'

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  AUDIT_LOG,
  RECORD_CATEGORIES,
  type AuditEntry,
  type ClientStatus,
  type NavKey,
  type Role,
} from '@/lib/demo-data'

interface TransferState {
  facilitySelected: boolean
  selectedRecords: string[]
  consentSigned: boolean
  complete: boolean
  accepted: boolean
  returnComplete: boolean
}

interface DemoContextValue {
  role: Role
  setRole: (role: Role) => void
  view: NavKey
  navigate: (view: NavKey) => void
  clientStatus: ClientStatus
  setClientStatus: (status: ClientStatus) => void
  transfer: TransferState
  setTransfer: (patch: Partial<TransferState>) => void
  resetTransfer: () => void
  audit: AuditEntry[]
  addAudit: (entry: Omit<AuditEntry, 'id' | 'date' | 'time'>) => void
  toast: string | null
  showToast: (msg: string) => void
}

const DemoContext = createContext<DemoContextValue | null>(null)

const initialTransfer: TransferState = {
  facilitySelected: false,
  selectedRecords: [...RECORD_CATEGORIES],
  consentSigned: false,
  complete: false,
  accepted: false,
  returnComplete: false,
}

export function DemoProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>('Case Manager')
  const [view, setView] = useState<NavKey>('dashboard')
  const [clientStatus, setClientStatus] = useState<ClientStatus>('Active Treatment')
  const [transfer, setTransferState] = useState<TransferState>(initialTransfer)
  const [audit, setAudit] = useState<AuditEntry[]>(AUDIT_LOG)
  const [toast, setToast] = useState<string | null>(null)

  const navigate = useCallback((next: NavKey) => {
    setView(next)
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [])

  const showToast = useCallback((msg: string) => {
    setToast(msg)
    window.clearTimeout((showToast as unknown as { _t?: number })._t)
    ;(showToast as unknown as { _t?: number })._t = window.setTimeout(
      () => setToast(null),
      3200,
    )
  }, [])

  const setTransfer = useCallback((patch: Partial<TransferState>) => {
    setTransferState((prev) => ({ ...prev, ...patch }))
  }, [])

  const resetTransfer = useCallback(() => {
    setTransferState(initialTransfer)
  }, [])

  const addAudit = useCallback(
    (entry: Omit<AuditEntry, 'id' | 'date' | 'time'>) => {
      const now = new Date()
      const time = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      })
      const date = now.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
      setAudit((prev) => [
        { ...entry, id: `a-${prev.length + 1}-${now.getTime()}`, date, time },
        ...prev,
      ])
    },
    [],
  )

  const value = useMemo<DemoContextValue>(
    () => ({
      role,
      setRole,
      view,
      navigate,
      clientStatus,
      setClientStatus,
      transfer,
      setTransfer,
      resetTransfer,
      audit,
      addAudit,
      toast,
      showToast,
    }),
    [
      role,
      view,
      navigate,
      clientStatus,
      transfer,
      setTransfer,
      resetTransfer,
      audit,
      addAudit,
      toast,
      showToast,
    ],
  )

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>
}

export function useDemo() {
  const ctx = useContext(DemoContext)
  if (!ctx) throw new Error('useDemo must be used within DemoProvider')
  return ctx
}
