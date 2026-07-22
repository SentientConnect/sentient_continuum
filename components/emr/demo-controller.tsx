'use client'

import {
  useMemo,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from 'react'
import {
  Activity,
  ArrowRight,
  Bot,
  Brain,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  HeartHandshake,
  Maximize2,
  MessageSquareText,
  Minimize2,
  Route,
  Send,
  ShieldCheck,
  Sparkles,
  Target,
  X,
} from 'lucide-react'

import { cn } from '@/lib/utils'
import type {
  ClientStatus,
  NavKey,
  Role,
} from '@/lib/demo-data'
import { useDemo } from './demo-context'

interface AuraAction {
  label: string
  description: string
  view: NavKey
  role?: Role
  status?: ClientStatus
}

interface AuraMessage {
  id: string
  sender: 'aura' | 'user'
  text: string
  actions?: AuraAction[]
}

interface AuraContext {
  role: Role
  view: NavKey
  clientStatus: ClientStatus
  transferComplete: boolean
  consentSigned: boolean
}

const QUICK_ACTIONS: AuraAction[] = [
  {
    label: 'Review MBS Triangulation',
    description:
      'Open Jordan’s DISC style, baseline, scores, barriers, goals, identity work, and AURA recommendations.',
    view: 'mbs',
    role: 'Clinician',
  },
  {
    label: 'Build next care transition',
    description:
      'Review readiness for IOP, outpatient, sober living, and community reintegration.',
    view: 'pathway',
    role: 'Clinician',
  },
  {
    label: 'Create ROI transfer',
    description:
      'Prepare Jordan’s complete authorized longitudinal record for Company B.',
    view: 'roi',
    role: 'Case Manager',
  },
  {
    label: 'Resolve case barriers',
    description:
      'Review housing, transportation, employment, insurance, and support barriers.',
    view: 'case',
    role: 'Case Manager',
  },
  {
    label: 'Review MAT pathway',
    description:
      'Review medication stability, risk, readiness, and medically supervised options.',
    view: 'mat',
    role: 'Medical Provider',
  },
  {
    label: 'Check care-team alignment',
    description:
      'Identify conflicting recommendations, missing follow-up, and unresolved responsibilities.',
    view: 'team',
    role: 'Clinician',
  },
  {
    label: 'Review discharge readiness',
    description:
      'Verify every support needed before Jordan transitions toward long-term recovery.',
    view: 'discharge',
    role: 'Clinician',
  },
]

const SUGGESTED_PROMPTS = [
  'What is holding Jordan back?',
  'How should I communicate with Jordan?',
  'What should the care team do today?',
  'Is Jordan ready for outpatient care?',
  'What must happen before discharge?',
  'Show Jordan’s MBS progress.',
]

function createMessageId(): string {
  if (
    typeof crypto !== 'undefined' &&
    typeof crypto.randomUUID === 'function'
  ) {
    return crypto.randomUUID()
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`
}

function buildAuraResponse(
  prompt: string,
  context: AuraContext,
): AuraMessage {
  const normalized = prompt.toLowerCase()

  if (
    normalized.includes('holding') ||
    normalized.includes('barrier') ||
    normalized.includes('back')
  ) {
    return {
      id: createMessageId(),
      sender: 'aura',
      text:
        'Jordan’s strongest current barriers are housing uncertainty, inconsistent transportation, fear of failing after discharge, and difficulty asking for support. The care team should stabilize those practical barriers before reducing structure.',
      actions: [
        {
          label: 'Open case-management pathway',
          description:
            'Assign ownership for housing, transportation, employment, and external support.',
          view: 'case',
          role: 'Case Manager',
        },
        {
          label: 'Open MBS clinician view',
          description:
            'Review the identity statements and clinician interventions connected to these barriers.',
          view: 'mbs',
          role: 'Clinician',
        },
      ],
    }
  }

  if (
    normalized.includes('communicate') ||
    normalized.includes('disc') ||
    normalized.includes('approach') ||
    normalized.includes('information')
  ) {
    return {
      id: createMessageId(),
      sender: 'aura',
      text:
        'Jordan presents as a Steady-Conscientious DISC style. Use a calm tone, explain the reason behind each recommendation, provide written steps, limit the conversation to one priority at a time, and allow processing time. Avoid pressure, confrontation, sudden changes, or conflicting instructions.',
      actions: [
        {
          label: 'Review DISC communication plan',
          description:
            'Open the full clinician approach, preferred communication style, and behaviors to avoid.',
          view: 'mbs',
          role: 'Clinician',
        },
      ],
    }
  }

  if (
    normalized.includes('today') ||
    normalized.includes('action') ||
    normalized.includes('do next')
  ) {
    return {
      id: createMessageId(),
      sender: 'aura',
      text:
        'Today’s highest-priority actions are to confirm Jordan’s seven-day transportation plan, assign one case-management owner for housing, present only two written transition options, complete the MAT review, and prepare the ROI for Company B.',
      actions: [
        {
          label: 'Review AURA action plan',
          description:
            'Open the recommended MBS actions and clinician responsibilities.',
          view: 'mbs',
          role: 'Clinician',
        },
        {
          label: 'Start ROI workflow',
          description:
            'Prepare the complete authorized record for the receiving facility.',
          view: 'roi',
          role: 'Case Manager',
        },
      ],
    }
  }

  if (
    normalized.includes('outpatient') ||
    normalized.includes('ready') ||
    normalized.includes('transition')
  ) {
    return {
      id: createMessageId(),
      sender: 'aura',
      text:
        'Jordan is clinically approaching outpatient readiness, but the transition should not occur until housing, transportation, medication continuity, receiving-provider confirmation, and client agreement are documented. Continue IOP while those risks are resolved.',
      actions: [
        {
          label: 'Open personalized pathway',
          description:
            'Review readiness scoring and transition guardrails.',
          view: 'pathway',
          role: 'Clinician',
        },
        {
          label: 'Review receiving-facility transfer',
          description:
            'Confirm authorization and continuity with Company B.',
          view: 'roi',
          role: 'Case Manager',
        },
      ],
    }
  }

  if (
    normalized.includes('discharge') ||
    normalized.includes('recovered') ||
    normalized.includes('final')
  ) {
    return {
      id: createMessageId(),
      sender: 'aura',
      text:
        'Jordan should not reach final discharge until stable housing, medication continuity, outpatient care, transportation, peer support, employment or education planning, crisis planning, and client-approved recovery goals are verified. Recovered is a long-term stability milestone, not the removal of voluntary support.',
      actions: [
        {
          label: 'Review discharge safeguards',
          description:
            'Open the final discharge checklist and Recovered milestone criteria.',
          view: 'discharge',
          role: 'Clinician',
        },
      ],
    }
  }

  if (
    normalized.includes('mbs') ||
    normalized.includes('score') ||
    normalized.includes('progress')
  ) {
    return {
      id: createMessageId(),
      sender: 'aura',
      text:
        'Jordan started with an average MBS score of 3.5 and is currently near 6.7 toward a target of 8.0. Mind improved from 3.4 to 6.8, Body from 4.1 to 7.1, and Spirit from 2.9 to 6.2. The largest remaining gap is Spirit, primarily because of shame, isolation, and difficulty receiving support.',
      actions: [
        {
          label: 'Open complete MBS view',
          description:
            'Review the 30-day baseline, current scoring, target percentage, and identity work.',
          view: 'mbs',
          role: 'Clinician',
        },
      ],
    }
  }

  if (
    normalized.includes('roi') ||
    normalized.includes('transfer') ||
    normalized.includes('company b')
  ) {
    const transferStatus = context.transferComplete
      ? 'The authorized transfer to Company B is already complete.'
      : context.consentSigned
        ? 'Jordan’s authorization is signed and the record is ready for secure delivery.'
        : 'Jordan’s authorization must be reviewed and signed before the record is transferred.'

    return {
      id: createMessageId(),
      sender: 'aura',
      text:
        `${transferStatus} The package includes the complete longitudinal record, prior ROI history, MBS progression, medications, MAT documentation, treatment plans, clinical notes, case-management records, and transition recommendations.`,
      actions: [
        {
          label: 'Open ROI transfer center',
          description:
            'Review consent, records, receiving facility, delivery, and audit trail.',
          view: 'roi',
          role: 'Case Manager',
        },
      ],
    }
  }

  if (
    normalized.includes('mat') ||
    normalized.includes('medication') ||
    normalized.includes('taper')
  ) {
    return {
      id: createMessageId(),
      sender: 'aura',
      text:
        'Jordan’s current medication plan appears stable. A taper should not define recovery and should only be considered through client choice, medical assessment, stability, reduced risk, and provider supervision. Housing and support stability should improve before any major medication transition.',
      actions: [
        {
          label: 'Open MAT clinical pathway',
          description:
            'Review stability indicators and medically supervised options.',
          view: 'mat',
          role: 'Medical Provider',
        },
      ],
    }
  }

  return {
    id: createMessageId(),
    sender: 'aura',
    text:
      `I reviewed Jordan’s current record from the perspective of the ${context.role}. The primary goal is stable recovery, housing, employment, and community reintegration. The immediate priority is resolving practical transition barriers while preserving clinical structure, medication continuity, and one aligned care-team plan.`,
    actions: [
      {
        label: 'Open Jordan’s MBS view',
        description:
          'See DISC communication, progress scoring, barriers, identity work, and recommended actions.',
        view: 'mbs',
        role: 'Clinician',
      },
      {
        label: 'Open continuum pathway',
        description:
          'Review the current level of care and safest next transition.',
        view: 'pathway',
        role: 'Clinician',
      },
    ],
  }
}

export function DemoController() {
  const {
    role,
    view,
    clientStatus,
    transfer,
    navigate,
    setRole,
    setClientStatus,
    showToast,
  } = useDemo()

  const [open, setOpen] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [showQuickActions, setShowQuickActions] = useState(true)
  const [input, setInput] = useState('')

  const [messages, setMessages] = useState<AuraMessage[]>([
    {
      id: 'welcome',
      sender: 'aura',
      text:
        'I am AURA Genesis™. I help the care team understand Jordan’s continuum, identify risks, coordinate internal and external providers, recommend actions, prepare transfers, and keep the client’s goals at the center of every decision.',
      actions: [
        {
          label: 'Review Jordan’s current priorities',
          description:
            'Open the personalized MBS clinician view and recommended action plan.',
          view: 'mbs',
          role: 'Clinician',
        },
      ],
    },
  ])

  const currentContext = useMemo<AuraContext>(
    () => ({
      role,
      view,
      clientStatus,
      transferComplete: transfer.complete,
      consentSigned: transfer.consentSigned,
    }),
    [
      role,
      view,
      clientStatus,
      transfer.complete,
      transfer.consentSigned,
    ],
  )

  const runAction = (action: AuraAction) => {
    if (action.role) {
      setRole(action.role)
    }

    if (action.status) {
      setClientStatus(action.status)
    }

    navigate(action.view)
    showToast(`AURA opened: ${action.label}`)
  }

  const sendMessage = (value?: string) => {
    const messageText = (value ?? input).trim()

    if (!messageText) {
      return
    }

    const userMessage: AuraMessage = {
      id: createMessageId(),
      sender: 'user',
      text: messageText,
    }

    const auraResponse = buildAuraResponse(
      messageText,
      currentContext,
    )

    setMessages((current) => [
      ...current,
      userMessage,
      auraResponse,
    ])

    setInput('')
    setShowQuickActions(false)
  }

  const handleInputKeyDown = (
    event: KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="fixed bottom-4 right-4 z-50 flex h-12 items-center gap-2 rounded-full border border-gold/40 bg-gold px-4 text-sm font-bold text-black shadow-xl shadow-black/40 transition hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold sm:bottom-5 sm:right-5"
        aria-expanded={open}
        aria-label="Open AURA Genesis"
      >
        {open ? (
          <X className="size-4" />
        ) : (
          <Sparkles className="size-4" />
        )}

        <span>AURA Genesis™</span>
      </button>

      {open ? (
        <section
          className={cn(
            'fixed z-50 overflow-hidden border border-gold/30 bg-[#08090b] text-white shadow-2xl shadow-black/70 transition-all duration-300',
            expanded
              ? 'inset-3 rounded-2xl sm:inset-5'
              : 'bottom-20 right-3 h-[min(610px,calc(100dvh-6rem))] w-[min(410px,calc(100vw-1.5rem))] rounded-2xl sm:bottom-24 sm:right-5',
          )}
          aria-label="AURA Genesis care-team assistant"
        >
          <header className="flex h-[72px] items-center justify-between gap-3 border-b border-white/10 bg-gradient-to-r from-gold/20 to-transparent px-4">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gold text-black">
                <Bot className="size-5" />
              </div>

              <div className="min-w-0">
                <div className="flex min-w-0 items-center gap-2">
                  <h2 className="truncate text-base font-bold sm:text-lg">
                    AURA Genesis™
                  </h2>

                  <span className="shrink-0 rounded-full bg-success/15 px-2 py-0.5 text-[10px] font-semibold text-success">
                    ACTIVE
                  </span>
                </div>

                <p className="truncate text-xs text-white/45">
                  Continuum orchestration for Jordan Mitchell
                </p>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-1">
              <button
                type="button"
                onClick={() =>
                  setExpanded((current) => !current)
                }
                className="rounded-lg p-2 text-white/55 transition hover:bg-white/10 hover:text-white"
                aria-label={
                  expanded
                    ? 'Minimize AURA'
                    : 'Maximize AURA'
                }
              >
                {expanded ? (
                  <Minimize2 className="size-4" />
                ) : (
                  <Maximize2 className="size-4" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg p-2 text-white/55 transition hover:bg-white/10 hover:text-white"
                aria-label="Close AURA"
              >
                <X className="size-4" />
              </button>
            </div>
          </header>

          <div
            className={cn(
              'grid h-[calc(100%-72px)] min-h-0',
              expanded
                ? 'lg:grid-cols-[260px_minmax(0,1fr)_280px]'
                : 'grid-rows-[auto_minmax(0,1fr)]',
            )}
          >
            {expanded ? (
              <aside className="min-h-0 overflow-y-auto border-r border-white/10 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">
                  Client context
                </p>

                <div className="mt-4 space-y-3">
                  <ContextCard
                    icon={<Target />}
                    label="Primary goal"
                    value="Stable recovery, housing, employment, and reintegration"
                  />

                  <ContextCard
                    icon={<Activity />}
                    label="Current care level"
                    value="Intensive Outpatient Program"
                  />

                  <ContextCard
                    icon={<Brain />}
                    label="DISC style"
                    value="S/C · Steady and Conscientious"
                  />

                  <ContextCard
                    icon={<HeartHandshake />}
                    label="Current status"
                    value={clientStatus}
                  />

                  <ContextCard
                    icon={<ShieldCheck />}
                    label="ROI status"
                    value={
                      transfer.complete
                        ? 'Transfer complete'
                        : transfer.consentSigned
                          ? 'Authorized'
                          : 'Signature pending'
                    }
                  />
                </div>

                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-gold">
                  Navigate with AURA
                </p>

                <div className="mt-3 space-y-2">
                  {QUICK_ACTIONS.map((action) => (
                    <button
                      key={action.label}
                      type="button"
                      onClick={() => runAction(action)}
                      className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-left transition hover:border-gold/40 hover:bg-gold/10"
                    >
                      <p className="text-sm font-semibold">
                        {action.label}
                      </p>

                      <p className="mt-1 text-xs leading-5 text-white/45">
                        {action.description}
                      </p>
                    </button>
                  ))}
                </div>
              </aside>
            ) : (
              <button
                type="button"
                onClick={() =>
                  setShowQuickActions((current) => !current)
                }
                className="flex min-h-[62px] items-center justify-between border-b border-white/10 px-4 py-3 text-left"
              >
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">
                    Current context
                  </p>

                  <p className="mt-1 truncate text-xs text-white/45">
                    {role} · {clientStatus}
                  </p>
                </div>

                {showQuickActions ? (
                  <ChevronUp className="size-4 shrink-0 text-white/45" />
                ) : (
                  <ChevronDown className="size-4 shrink-0 text-white/45" />
                )}
              </button>
            )}

            <main className="flex min-h-0 min-w-0 flex-col">
              <div
                className="flex-1 space-y-3 overflow-y-auto overscroll-contain p-3 sm:p-4"
                aria-live="polite"
              >
                {!expanded && showQuickActions ? (
                  <div className="grid grid-cols-2 gap-2">
                    {QUICK_ACTIONS.slice(0, 4).map(
                      (action) => (
                        <button
                          key={action.label}
                          type="button"
                          onClick={() => runAction(action)}
                          className="flex min-h-[76px] min-w-0 flex-col justify-between rounded-xl border border-gold/20 bg-gold/5 p-3 text-left transition hover:border-gold/50 hover:bg-gold/10"
                        >
                          <p className="text-sm font-semibold leading-5">
                            {action.label}
                          </p>

                          <ArrowRight className="mt-2 size-4 text-gold" />
                        </button>
                      ),
                    )}
                  </div>
                ) : null}

                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={
                      message.sender === 'user'
                        ? 'ml-auto max-w-[88%]'
                        : 'mr-auto max-w-[94%]'
                    }
                  >
                    <div
                      className={
                        message.sender === 'user'
                          ? 'rounded-2xl rounded-br-md bg-gold px-4 py-3 text-sm leading-6 text-black'
                          : 'rounded-2xl rounded-bl-md border border-white/10 bg-white/5 px-4 py-3 text-sm leading-6 text-white/80'
                      }
                    >
                      {message.sender === 'aura' ? (
                        <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-gold">
                          <Sparkles className="size-3.5" />
                          AURA Genesis™
                        </div>
                      ) : null}

                      <p className="break-words">
                        {message.text}
                      </p>
                    </div>

                    {message.actions?.length ? (
                      <div className="mt-2 space-y-2">
                        {message.actions.map((action) => (
                          <button
                            key={action.label}
                            type="button"
                            onClick={() => runAction(action)}
                            className="flex w-full min-w-0 items-center justify-between gap-3 rounded-xl border border-gold/25 bg-gold/5 p-3 text-left transition hover:border-gold hover:bg-gold/10"
                          >
                            <div className="min-w-0">
                              <p className="text-sm font-semibold text-white">
                                {action.label}
                              </p>

                              <p className="mt-1 text-xs leading-5 text-white/45">
                                {action.description}
                              </p>
                            </div>

                            <ArrowRight className="size-4 shrink-0 text-gold" />
                          </button>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>

              <div className="shrink-0 border-t border-white/10 bg-[#08090b] p-3">
                <div className="mb-2 flex gap-2 overflow-x-auto pb-1">
                  {SUGGESTED_PROMPTS.slice(0, 4).map(
                    (prompt) => (
                      <button
                        key={prompt}
                        type="button"
                        onClick={() => sendMessage(prompt)}
                        className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/60 transition hover:border-gold/40 hover:text-white"
                      >
                        {prompt}
                      </button>
                    ),
                  )}
                </div>

                <div className="flex items-end gap-2 rounded-xl border border-white/15 bg-white/5 p-2 focus-within:border-gold/60">
                  <textarea
                    value={input}
                    onChange={(event) =>
                      setInput(event.target.value)
                    }
                    onKeyDown={handleInputKeyDown}
                    placeholder="Ask AURA about Jordan..."
                    rows={1}
                    className="max-h-20 min-h-[42px] min-w-0 flex-1 resize-none bg-transparent px-2 py-2 text-sm text-white outline-none placeholder:text-white/30"
                  />

                  <button
                    type="button"
                    onClick={() => sendMessage()}
                    disabled={!input.trim()}
                    className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gold text-black transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label="Send message to AURA"
                  >
                    <Send className="size-4" />
                  </button>
                </div>

                <p className="mt-2 truncate text-[10px] text-white/30">
                  Decision support only. The care team retains clinical judgment.
                </p>
              </div>
            </main>

            {expanded ? (
              <aside className="min-h-0 overflow-y-auto border-l border-white/10 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">
                  AURA priority monitor
                </p>

                <div className="mt-4 space-y-3">
                  <PriorityCard
                    icon={<Route />}
                    title="Housing"
                    status="High priority"
                    description="Placement must be confirmed before step-down."
                    tone="danger"
                  />

                  <PriorityCard
                    icon={<MessageSquareText />}
                    title="Communication"
                    status="Guardrail"
                    description="Use one trusted messenger and two clear options."
                    tone="gold"
                  />

                  <PriorityCard
                    icon={<CheckCircle2 />}
                    title="Medication"
                    status="Stable"
                    description="Continue the current plan pending medical review."
                    tone="success"
                  />

                  <PriorityCard
                    icon={<ShieldCheck />}
                    title="ROI transfer"
                    status={
                      transfer.complete
                        ? 'Complete'
                        : transfer.consentSigned
                          ? 'Authorized'
                          : 'Pending'
                    }
                    description="The complete authorized record follows Jordan to Company B."
                    tone={
                      transfer.complete
                        ? 'success'
                        : 'gold'
                    }
                  />
                </div>

                <button
                  type="button"
                  onClick={() =>
                    runAction({
                      label: 'Open complete MBS action plan',
                      description:
                        'View Jordan’s clinician recommendations.',
                      view: 'mbs',
                      role: 'Clinician',
                    })
                  }
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gold px-4 py-3 text-sm font-bold text-black"
                >
                  Open AURA action plan
                  <ArrowRight className="size-4" />
                </button>
              </aside>
            ) : null}
          </div>
        </section>
      ) : null}
    </>
  )
}

function ContextCard({
  icon,
  label,
  value,
}: {
  icon: ReactNode
  label: string
  value: string
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
      <div className="flex items-center gap-2 text-gold [&_svg]:size-4">
        {icon}

        <span className="text-xs font-semibold">
          {label}
        </span>
      </div>

      <p className="mt-2 text-sm leading-5 text-white/65">
        {value}
      </p>
    </div>
  )
}

function PriorityCard({
  icon,
  title,
  status,
  description,
  tone,
}: {
  icon: ReactNode
  title: string
  status: string
  description: string
  tone: 'success' | 'gold' | 'danger'
}) {
  const toneClasses = {
    success:
      'border-success/25 bg-success/5 text-success',
    gold:
      'border-gold/30 bg-gold/10 text-gold',
    danger:
      'border-destructive/25 bg-destructive/5 text-destructive',
  }

  return (
    <div
      className={cn(
        'rounded-xl border p-3',
        toneClasses[tone],
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2 [&_svg]:size-4">
          {icon}

          <p className="truncate text-sm font-semibold text-white">
            {title}
          </p>
        </div>

        <span className="shrink-0 text-[10px] font-bold uppercase tracking-wide">
          {status}
        </span>
      </div>

      <p className="mt-2 text-xs leading-5 text-white/45">
        {description}
      </p>
    </div>
  )
}

export function Toast() {
  const { toast } = useDemo()

  if (!toast) {
    return null
  }

  return (
    <div
      role="status"
      className="fixed bottom-4 left-1/2 z-[70] flex max-w-[calc(100vw-2rem)] -translate-x-1/2 items-center gap-2 rounded-full border border-gold/40 bg-[#111214] px-4 py-2 text-sm font-medium text-white shadow-xl sm:bottom-5"
    >
      <CheckCircle2 className="size-4 shrink-0 text-success" />
      <span className="truncate">{toast}</span>
    </div>
  )
}
