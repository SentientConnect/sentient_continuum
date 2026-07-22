'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  Activity,
  ArrowRight,
  Bot,
  Building2,
  Check,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  FileCheck2,
  HeartHandshake,
  LockKeyhole,
  MessageSquareText,
  Network,
  Pill,
  Route,
  Send,
  ShieldCheck,
  Sparkles,
  Target,
  UserRoundCheck,
  UsersRound,
  XCircle,
} from 'lucide-react'

import { ClientGoalBanner, ClientSummaryCard } from '@/components/emr/client-summary'
import { ContinuumBar } from '@/components/emr/continuum-bar'
import { DemoController, Toast } from '@/components/emr/demo-controller'
import { DemoProvider, useDemo } from '@/components/emr/demo-context'
import { Sidebar } from '@/components/emr/sidebar'
import { Topbar } from '@/components/emr/topbar'
import {
  Badge,
  Card,
  CardBody,
  ProgressBar,
  ScoreMeter,
} from '@/components/emr/ui'
import {
  CARE_TEAM,
  CASE_ITEMS,
  CLIENT,
  COMPANY_A,
  COMPANY_B,
  DISCHARGE_CHECKLIST,
  MAT_PLAN,
  OUTCOMES,
  RECORD_CATEGORIES,
  RECOVERED_HIGHLIGHTS,
  TIMELINE,
  TIMELINE_COMPANY_B,
  type NavKey,
} from '@/lib/demo-data'

export default function Page() {
  return (
    <DemoProvider>
      <App />
    </DemoProvider>
  )
}

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { view } = useDemo()

  return (
    <div className="min-h-screen bg-background lg:flex">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="min-w-0 flex-1">
        <Topbar onMenu={() => setSidebarOpen(true)} />

        <main className="mx-auto max-w-[1600px] space-y-5 p-4 sm:p-6">
          <ComplianceStrip />
          <ViewRouter view={view} />
        </main>
      </div>

      <DemoController />
      <Toast />
    </div>
  )
}

function ComplianceStrip() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-gold/30 bg-gold/10 px-4 py-3">
      <div className="flex items-center gap-3">
        <Image
          src="/phoenix-s.png"
          alt="Sentient Connect Phoenix S"
          width={38}
          height={38}
          className="rounded-lg object-contain"
        />

        <div>
          <p className="text-sm font-semibold text-white">
            AURA Genesis™ Continuum Orchestration
          </p>

          <p className="text-xs text-white/60">
            Consent-controlled sharing · role-based access · immutable audit
            simulation
          </p>
        </div>
      </div>

      <div className="flex gap-2">
        <Badge tone="success">Mock data only</Badge>
        <Badge tone="gold">HIPAA-ready workflow demo</Badge>
      </div>
    </div>
  )
}

function ViewRouter({ view }: { view: NavKey }) {
  if (view === 'dashboard') return <Dashboard />
  if (view === 'roi') return <TransferCenter />
  if (view === 'mbs') return <MbsView />
  if (view === 'pathway') return <PathwayView />
  if (view === 'mat') return <MatView />
  if (view === 'case') return <CaseView />
  if (view === 'team') return <TeamView />
  if (view === 'outcomes') return <OutcomesView />
  if (view === 'discharge') return <DischargeView />
  if (view === 'audit') return <AuditView />
  if (view === 'intake') return <IntakeView />
  if (view === 'clients') return <ClientRecord />
  if (view === 'notes') return <NotesView />

  return <SettingsView />
}

function Dashboard() {
  const { navigate } = useDemo()

  return (
    <div className="grid gap-5 xl:grid-cols-[1fr_360px]">
      <div className="space-y-5">
        <ClientSummaryCard />
        <ClientGoalBanner />

        <Card>
          <CardBody>
            <h2 className="mb-4 text-lg font-semibold">
              Longitudinal continuum
            </h2>

            <ContinuumBar />
          </CardBody>
        </Card>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Metric
            icon={<UsersRound />}
            value="42"
            label="Active clients"
            detail="Across 4 care levels"
          />

          <Metric
            icon={<Network />}
            value="7"
            label="Transitions pending"
            detail="2 require ROI signature"
          />

          <Metric
            icon={<Clock3 />}
            value="14m"
            label="Median transfer"
            detail="Previously 2–5 days"
          />

          <Metric
            icon={<ClipboardCheck />}
            value="82%"
            label="Intake auto-filled"
            detail="From authorized record"
          />
        </div>

        <Card>
          <CardBody>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">
                AURA Genesis™ priority actions
              </h2>

              <Badge tone="gold">Live demo</Badge>
            </div>

            <div className="mt-4 grid gap-3">
              <AuraAction
                title="Secure receiving placement"
                text="Company B has outpatient and sober-living capacity within 48 hours."
                action="Open transfer"
                onClick={() => navigate('roi')}
              />

              <AuraAction
                title="Resolve housing before step-down"
                text="Housing remains the highest transition risk. Assign Renee Coleman today."
                action="Open case plan"
                onClick={() => navigate('case')}
              />

              <AuraAction
                title="Review MAT plan"
                text="Jordan reports reduced cravings. Medical review is due before any taper change."
                action="Review MAT"
                onClick={() => navigate('mat')}
              />
            </div>
          </CardBody>
        </Card>
      </div>

      <AuraPanel />
    </div>
  )
}

function AuraPanel() {
  type Message = {
    from: 'aura' | 'user'
    text: string
  }

  const [messages, setMessages] = useState<Message[]>([
    {
      from: 'aura',
      text:
        'Jordan is approaching an IOP transition. I identified three unresolved risks: housing, transportation, and receiving-provider confirmation.',
    },
  ])

  const [input, setInput] = useState('')

  const send = () => {
    const cleanInput = input.trim()

    if (!cleanInput) return

    setMessages((current) => [
      ...current,
      {
        from: 'user',
        text: cleanInput,
      },
      {
        from: 'aura',
        text:
          'I reviewed the longitudinal record. The safest next step is to finalize ROI consent, confirm Company B admission, and assign the housing task before discharge.',
      },
    ])

    setInput('')
  }

  return (
    <aside className="h-fit rounded-2xl border border-gold/30 bg-[#0d0d0f] p-4 xl:sticky xl:top-28">
      <div className="flex items-center gap-3 border-b border-white/10 pb-4">
        <div className="flex size-10 items-center justify-center rounded-xl bg-gold text-black">
          <Bot />
        </div>

        <div>
          <p className="font-semibold">AURA Genesis™</p>

          <p className="text-xs text-white/50">
            Care-team orchestration assistant
          </p>
        </div>
      </div>

      <div className="my-4 max-h-[420px] space-y-3 overflow-y-auto">
        {messages.map((message, index) => (
          <div
            key={`${message.from}-${index}`}
            className={
              message.from === 'aura'
                ? 'rounded-xl bg-white/10 p-3 text-sm text-white/85'
                : 'ml-8 rounded-xl bg-gold p-3 text-sm text-black'
            }
          >
            {message.text}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') send()
          }}
          placeholder="Ask AURA about Jordan..."
          className="min-w-0 flex-1 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm outline-none focus:border-gold"
        />

        <button
          type="button"
          onClick={send}
          className="rounded-xl bg-gold p-2 text-black"
          aria-label="Send message to AURA"
        >
          <Send className="size-5" />
        </button>
      </div>

      <p className="mt-3 text-[11px] text-white/40">
        Decision support only. Licensed professionals retain clinical judgment.
      </p>
    </aside>
  )
}

function TransferCenter() {
  const {
    transfer,
    setTransfer,
    addAudit,
    showToast,
  } = useDemo()

  const [step, setStep] = useState(transfer.complete ? 4 : 1)

  const sign = () => {
    setTransfer({
      consentSigned: true,
    })

    addAudit({
      user: 'Jordan Mitchell',
      role: 'Client',
      org: COMPANY_A.short,
      action: 'ROI consent signed',
      reason: 'Continuity of treatment',
      device: 'Client portal · Verified session',
    })

    setStep(4)
    showToast('ROI signed and authorization verified')
  }

  const complete = () => {
    setTransfer({
      complete: true,
    })

    addAudit({
      user: 'Priya Nair, MSW',
      role: 'Case Manager',
      org: COMPANY_A.short,
      action: 'Complete record transferred',
      reason: 'Authorized transition to Company B',
      device: 'Secure transfer service',
    })

    showToast('Encrypted transfer completed')
  }

  return (
    <div className="space-y-5">
      <PageHead
        title="ROI & Secure Transfer Center"
        subtitle="Move the complete authorized longitudinal record without forcing the client to restart."
      />

      <div className="grid gap-4 md:grid-cols-4">
        {[
          'Receiving facility',
          'Record package',
          'Client authorization',
          'Secure delivery',
        ].map((label, index) => (
          <button
            key={label}
            type="button"
            onClick={() => setStep(index + 1)}
            className={
              step === index + 1
                ? 'rounded-2xl border border-gold bg-gold/10 p-4 text-left'
                : 'rounded-2xl border border-white/10 bg-white/5 p-4 text-left'
            }
          >
            <span className="text-xs text-white/50">
              Step {index + 1}
            </span>

            <p className="mt-1 text-sm font-semibold">{label}</p>
          </button>
        ))}
      </div>

      {step === 1 && (
        <Card>
          <CardBody>
            <h3 className="text-lg font-semibold">
              Selected receiving facility
            </h3>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <CompanyCard
                company={COMPANY_A}
                label="Originating record custodian"
              />

              <CompanyCard
                company={COMPANY_B}
                label="Receiving continuum partner"
              />
            </div>

            <button
              type="button"
              onClick={() => {
                setTransfer({
                  facilitySelected: true,
                })

                setStep(2)
              }}
              className="mt-5 rounded-xl bg-gold px-5 py-3 font-semibold text-black"
            >
              Confirm Company B
              <ArrowRight className="ml-2 inline size-4" />
            </button>
          </CardBody>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <CardBody>
            <div className="flex flex-wrap justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold">
                  Complete longitudinal record
                </h3>

                <p className="text-sm text-muted-foreground">
                  All categories are included under the client’s authorization.
                </p>
              </div>

              <Badge tone="success">
                {RECORD_CATEGORIES.length} categories selected
              </Badge>
            </div>

            <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {RECORD_CATEGORIES.map((record) => (
                <div
                  key={record}
                  className="flex items-center gap-2 rounded-xl border bg-muted/40 p-3 text-sm"
                >
                  <CheckCircle2 className="size-4 text-success" />
                  {record}
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setStep(3)}
              className="mt-5 rounded-xl bg-gold px-5 py-3 font-semibold text-black"
            >
              Continue to authorization
            </button>
          </CardBody>
        </Card>
      )}

      {step === 3 && (
        <Card>
          <CardBody>
            <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
              <div>
                <h3 className="text-lg font-semibold">
                  Client release of information
                </h3>

                <p className="mt-2 text-sm text-muted-foreground">
                  I authorize {COMPANY_A.name} to disclose my complete treatment
                  record to {COMPANY_B.name} for treatment coordination and
                  continuity of care.
                </p>

                <div className="mt-5 space-y-3">
                  {[
                    'I understand which records will be shared.',
                    'I authorize the receiving care team to use them for treatment.',
                    'I understand revocation applies prospectively, subject to applicable law.',
                    'I received an opportunity to ask questions.',
                  ].map((item) => (
                    <label
                      key={item}
                      className="flex gap-3 rounded-xl border p-3 text-sm"
                    >
                      <input
                        type="checkbox"
                        defaultChecked
                        className="mt-0.5"
                      />

                      {item}
                    </label>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-muted p-4">
                <LockKeyhole className="size-7 text-gold-foreground" />

                <p className="mt-3 font-semibold">
                  Electronic signature
                </p>

                <div className="mt-3 rounded-xl border bg-white p-4 font-serif text-xl italic text-black">
                  Jordan Mitchell
                </div>

                <p className="mt-2 text-xs text-muted-foreground">
                  Identity verified · timestamp generated · audit event created
                </p>

                <button
                  type="button"
                  onClick={sign}
                  className="mt-4 w-full rounded-xl bg-gold px-4 py-3 font-semibold text-black"
                >
                  Sign and authorize transfer
                </button>
              </div>
            </div>
          </CardBody>
        </Card>
      )}

      {step === 4 && (
        <Card>
          <CardBody>
            <div className="text-center">
              <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-success/15">
                <ShieldCheck className="size-8 text-success" />
              </div>

              <h3 className="mt-4 text-xl font-semibold">
                {transfer.complete
                  ? 'Transfer complete'
                  : 'Authorization verified'}
              </h3>

              <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground">
                The authorized record package is identity-matched, encrypted in
                transit, delivered to the receiving workspace, and logged.
              </p>

              <div className="mx-auto mt-5 grid max-w-3xl gap-2 sm:grid-cols-3">
                {[
                  'Consent verified',
                  'Record packaged',
                  'Audit trail created',
                ].map((item) => (
                  <div
                    className="rounded-xl bg-muted p-3 text-sm"
                    key={item}
                  >
                    <Check className="mr-2 inline size-4 text-success" />
                    {item}
                  </div>
                ))}
              </div>

              {!transfer.complete ? (
                <button
                  type="button"
                  onClick={complete}
                  className="mt-6 rounded-xl bg-gold px-6 py-3 font-semibold text-black"
                >
                  Complete encrypted transfer
                </button>
              ) : (
                <div className="mt-6 rounded-xl border border-success/30 bg-success/10 p-4 text-sm font-medium text-success">
                  Company B can now continue Jordan’s care with no duplicate
                  intake.
                </div>
              )}
            </div>
          </CardBody>
        </Card>
      )}

      <p className="text-xs text-white/45">
        Demo language: designed to support HIPAA and 42 CFR Part 2 compliant
        workflows. Production compliance requires contracts, security controls,
        policies, risk analysis, and legal review.
      </p>
    </div>
  )
}

function MbsView() {
  type MbsTab =
    | 'overview'
    | 'aura-plan'
    | 'identity'
    | 'baseline'

  type ActionItem = {
    id: string
    pillar: 'Mind' | 'Body' | 'Spirit'
    title: string
    owner: string
    due: string
    reason: string
  }

  const [activeTab, setActiveTab] = useState<MbsTab>('overview')

  const [completedActions, setCompletedActions] = useState<string[]>([
    'mind-1',
    'body-1',
  ])

  const discProfile = {
    primary: 'S',
    secondary: 'C',
    label: 'Steady · Conscientious',
    summary:
      'Jordan values consistency, psychological safety, clear expectations, and time to process decisions.',
    receivesBest: [
      'Calm, respectful communication',
      'Written steps paired with a verbal explanation',
      'One priority at a time',
      'Specific facts, examples, and measurable expectations',
      'Predictable follow-up from the same care-team member',
    ],
    avoid: [
      'Pressure for an immediate answer',
      'Aggressive confrontation, shame, or fear-based accountability',
      'Changing the plan without explaining why',
      'Multiple conflicting instructions from different providers',
    ],
  }

  const goal = {
    statement:
      'Build stable recovery, secure safe housing, return to meaningful employment, and reintegrate into the community with confidence.',
    progress: 72,
    targetDate: 'October 15, 2026',
    status: 'On track with transition risks',
  }

  const pillars = [
    {
      key: 'mind',
      name: 'Mind',
      icon: MessageSquareText,
      started: 3.4,
      current: 6.8,
      target: 8,
      change: '+3.4',
      summary:
        'Clarity and emotional regulation are improving. Anxiety rises when housing or discharge plans feel uncertain.',
      challenge:
        'Fear of failing after discharge causes decision paralysis.',
      clinicianHelp:
        'Break the transition into two clear choices, explain the reason for each, and allow time to process before asking for commitment.',
      actions: [
        'Complete one 10-minute decision-readiness exercise before the next session.',
        'Use a written two-option format when discussing the next level of care.',
        'Identify the thought underneath: “I am going to mess this up.”',
      ],
    },
    {
      key: 'body',
      name: 'Body',
      icon: Activity,
      started: 4.1,
      current: 7.1,
      target: 8,
      change: '+3.0',
      summary:
        'Sleep, medication adherence, energy, and cravings have improved. Transportation instability is disrupting routine.',
      challenge:
        'Inconsistent transportation creates missed appointments and loss of structure.',
      clinicianHelp:
        'Confirm seven days of transportation before transition and create a backup plan owned by case management.',
      actions: [
        'Confirm transportation for every appointment during the next seven days.',
        'Continue the current medication routine pending medical review.',
        'Build a repeatable morning recovery routine before stepping down.',
      ],
    },
    {
      key: 'spirit',
      name: 'Spirit',
      icon: HeartHandshake,
      started: 2.9,
      current: 6.2,
      target: 8,
      change: '+3.3',
      summary:
        'Purpose and connection are strengthening. Shame still limits Jordan’s willingness to ask for support.',
      challenge:
        'Jordan interprets needing help as proof of weakness.',
      clinicianHelp:
        'Reframe support as responsible leadership and connect each request for help to Jordan’s stated goal of independence.',
      actions: [
        'Name one person Jordan can contact before isolation becomes a crisis.',
        'Complete one act of service that supports healthy connection.',
        'Rewrite one identity statement from shame into a truthful strength statement.',
      ],
    },
  ] as const

  const identityStatements = [
    {
      not: 'I am going to mess this up.',
      truth:
        'I am learning to make stable decisions one step at a time, and I can ask for support before I become overwhelmed.',
      clinicianPrompt:
        'What evidence from the last 30 days proves that you are already making different decisions?',
      status: 'In progress',
    },
    {
      not: 'I am weak because I still need help.',
      truth:
        'I am responsible enough to use support while I build lasting independence.',
      clinicianPrompt:
        'How has accepting the right support protected your recovery rather than weakened it?',
      status: 'Ready to reinforce',
    },
    {
      not: 'Nobody trusts me anymore.',
      truth:
        'I am rebuilding trust through consistent actions, honesty, and follow-through.',
      clinicianPrompt:
        'Which three actions this week would make your progress visible to the people who matter?',
      status: 'Active focus',
    },
  ]

  const baseline = [
    {
      week: 'Day 1',
      mind: 3.4,
      body: 4.1,
      spirit: 2.9,
    },
    {
      week: 'Day 7',
      mind: 4.2,
      body: 4.8,
      spirit: 3.7,
    },
    {
      week: 'Day 14',
      mind: 5.1,
      body: 5.9,
      spirit: 4.5,
    },
    {
      week: 'Day 21',
      mind: 5.9,
      body: 6.6,
      spirit: 5.4,
    },
    {
      week: 'Day 30',
      mind: 6.8,
      body: 7.1,
      spirit: 6.2,
    },
  ]

  const auraActions: ActionItem[] = [
    {
      id: 'mind-1',
      pillar: 'Mind',
      title: 'Complete transition decision exercise',
      owner: 'Primary clinician',
      due: 'Today',
      reason:
        'Jordan becomes overwhelmed when given several care options at once.',
    },
    {
      id: 'body-1',
      pillar: 'Body',
      title: 'Confirm seven-day transportation plan',
      owner: 'Case manager',
      due: 'Before step-down',
      reason:
        'Transportation is the highest current threat to appointment consistency.',
    },
    {
      id: 'spirit-1',
      pillar: 'Spirit',
      title: 'Rewrite one “I am not” statement',
      owner: 'Jordan + clinician',
      due: 'Next individual session',
      reason:
        'Shame-based identity language is reducing Jordan’s willingness to ask for support.',
    },
    {
      id: 'care-1',
      pillar: 'Mind',
      title: 'Use one consistent transition messenger',
      owner: 'Care-team lead',
      due: 'Immediately',
      reason:
        'Jordan’s S/C DISC profile responds poorly to conflicting instructions.',
    },
    {
      id: 'care-2',
      pillar: 'Body',
      title: 'Review MAT stability before pathway change',
      owner: 'Medical provider',
      due: 'Within 48 hours',
      reason:
        'No medication or taper changes should occur without medical assessment and client agreement.',
    },
  ]

  const toggleAction = (id: string) => {
    setCompletedActions((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    )
  }

  const averageStart =
    pillars.reduce((total, pillar) => total + pillar.started, 0) /
    pillars.length

  const averageCurrent =
    pillars.reduce((total, pillar) => total + pillar.current, 0) /
    pillars.length

  const averageTarget =
    pillars.reduce((total, pillar) => total + pillar.target, 0) /
    pillars.length

  const percentToTarget = Math.round(
    (averageCurrent / averageTarget) * 100,
  )

  return (
    <div className="space-y-5">
      <PageHead
        title="MBS™ Triangulation"
        subtitle="A personalized clinician view of how Jordan thinks, receives care, progresses toward recovery, and needs to be supported."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Metric
          icon={<Target />}
          value={`${goal.progress}%`}
          label="Goal progress"
          detail={goal.status}
        />

        <Metric
          icon={<Activity />}
          value={averageCurrent.toFixed(1)}
          label="Current MBS score"
          detail={`Started at ${averageStart.toFixed(1)}`}
        />

        <Metric
          icon={<CheckCircle2 />}
          value={`${percentToTarget}%`}
          label="To clinical target"
          detail={`Target average ${averageTarget.toFixed(1)}`}
        />

        <Metric
          icon={<Sparkles />}
          value={`${completedActions.length}/${auraActions.length}`}
          label="AURA actions complete"
          detail="Recommended this week"
        />
      </div>

      <Card>
        <CardBody>
          <div className="grid gap-6 xl:grid-cols-[1fr_340px]">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone="gold">Primary goal</Badge>

                <Badge tone="success">
                  Target date: {goal.targetDate}
                </Badge>
              </div>

              <h2 className="mt-4 text-xl font-semibold">
                What Jordan is working toward
              </h2>

              <p className="mt-2 max-w-4xl text-sm leading-6 text-muted-foreground">
                {goal.statement}
              </p>

              <div className="mt-5">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span>Overall pathway progress</span>
                  <span className="font-semibold">
                    {goal.progress}%
                  </span>
                </div>

                <ProgressBar value={goal.progress} />
              </div>
            </div>

            <div className="rounded-2xl border border-gold/30 bg-gold/10 p-4">
              <div className="flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-xl bg-gold text-xl font-black text-black">
                  {discProfile.primary}
                </div>

                <div className="flex size-11 items-center justify-center rounded-xl border border-gold/40 bg-black/30 text-xl font-black text-gold">
                  {discProfile.secondary}
                </div>

                <div>
                  <p className="font-semibold">
                    {discProfile.label}
                  </p>

                  <p className="text-xs text-white/55">
                    DISC communication profile
                  </p>
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-white/75">
                {discProfile.summary}
              </p>
            </div>
          </div>
        </CardBody>
      </Card>

      <div className="flex flex-wrap gap-2 rounded-2xl border border-white/10 bg-black/30 p-2">
        {[
          {
            key: 'overview',
            label: 'Clinician Overview',
          },
          {
            key: 'aura-plan',
            label: 'AURA Action Plan',
          },
          {
            key: 'identity',
            label: 'I Am Statements',
          },
          {
            key: 'baseline',
            label: '30-Day Baseline',
          },
        ].map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key as MbsTab)}
            className={
              activeTab === tab.key
                ? 'rounded-xl bg-gold px-4 py-2.5 text-sm font-semibold text-black'
                : 'rounded-xl px-4 py-2.5 text-sm font-medium text-white/65 transition hover:bg-white/10 hover:text-white'
            }
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-5">
          <div className="grid gap-5 xl:grid-cols-[360px_1fr]">
            <Card>
              <CardBody>
                <div className="flex items-center gap-3">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-gold text-black">
                    <MessageSquareText className="size-5" />
                  </div>

                  <div>
                    <h2 className="font-semibold">
                      How Jordan receives information
                    </h2>

                    <p className="text-xs text-muted-foreground">
                      Based on S/C DISC tendencies
                    </p>
                  </div>
                </div>

                <div className="mt-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-success">
                    Use this approach
                  </p>

                  <div className="mt-3 space-y-2">
                    {discProfile.receivesBest.map((item) => (
                      <div
                        key={item}
                        className="flex gap-3 rounded-xl border border-success/20 bg-success/5 p-3 text-sm"
                      >
                        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" />

                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-destructive">
                    Avoid this approach
                  </p>

                  <div className="mt-3 space-y-2">
                    {discProfile.avoid.map((item) => (
                      <div
                        key={item}
                        className="flex gap-3 rounded-xl border border-destructive/20 bg-destructive/5 p-3 text-sm"
                      >
                        <XCircle className="mt-0.5 size-4 shrink-0 text-destructive" />

                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardBody>
            </Card>

            <div className="grid gap-5 lg:grid-cols-3">
              {pillars.map((pillar) => {
                const Icon = pillar.icon
                const targetPercent = Math.round(
                  (pillar.current / pillar.target) * 100,
                )

                return (
                  <Card key={pillar.key}>
                    <CardBody>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex size-10 items-center justify-center rounded-xl bg-gold/15 text-gold">
                            <Icon className="size-5" />
                          </div>

                          <div>
                            <h3 className="font-semibold">
                              {pillar.name}
                            </h3>

                            <p className="text-xs text-success">
                              {pillar.change} since intake
                            </p>
                          </div>
                        </div>

                        <Badge tone="gold">
                          {targetPercent}% to target
                        </Badge>
                      </div>

                      <div className="mt-5 grid grid-cols-3 gap-2">
                        <ScoreBox
                          label="Started"
                          value={pillar.started}
                        />

                        <ScoreBox
                          label="Current"
                          value={pillar.current}
                          emphasis
                        />

                        <ScoreBox
                          label="Target"
                          value={pillar.target}
                        />
                      </div>

                      <div className="mt-5">
                        <ScoreMeter
                          value={pillar.current}
                          max={10}
                        />
                      </div>

                      <p className="mt-4 text-sm leading-6 text-muted-foreground">
                        {pillar.summary}
                      </p>

                      <div className="mt-4 rounded-xl border border-destructive/20 bg-destructive/5 p-3">
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-destructive">
                          Current barrier
                        </p>

                        <p className="mt-2 text-sm">
                          {pillar.challenge}
                        </p>
                      </div>

                      <div className="mt-3 rounded-xl border border-gold/30 bg-gold/10 p-3">
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold">
                          Clinician focus
                        </p>

                        <p className="mt-2 text-sm">
                          {pillar.clinicianHelp}
                        </p>
                      </div>
                    </CardBody>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'aura-plan' && (
        <div className="grid gap-5 xl:grid-cols-[1fr_360px]">
          <div className="space-y-4">
            <Card>
              <CardBody>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex size-11 items-center justify-center rounded-xl bg-gold text-black">
                      <Bot className="size-5" />
                    </div>

                    <div>
                      <h2 className="text-lg font-semibold">
                        AURA Genesis™ recommended action plan
                      </h2>

                      <p className="text-sm text-muted-foreground">
                        Generated from Jordan’s DISC style, MBS scores,
                        longitudinal record, barriers, and stated goals.
                      </p>
                    </div>
                  </div>

                  <Badge tone="gold">
                    Clinician approval required
                  </Badge>
                </div>

                <div className="mt-5 space-y-3">
                  {auraActions.map((action) => {
                    const complete = completedActions.includes(action.id)

                    return (
                      <button
                        key={action.id}
                        type="button"
                        onClick={() => toggleAction(action.id)}
                        className={
                          complete
                            ? 'flex w-full gap-4 rounded-2xl border border-success/30 bg-success/10 p-4 text-left'
                            : 'flex w-full gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-left transition hover:border-gold/40 hover:bg-gold/5'
                        }
                      >
                        <div
                          className={
                            complete
                              ? 'flex size-9 shrink-0 items-center justify-center rounded-full bg-success text-black'
                              : 'flex size-9 shrink-0 items-center justify-center rounded-full border border-white/20 bg-black/20'
                          }
                        >
                          {complete ? (
                            <Check className="size-5" />
                          ) : (
                            <span className="size-3 rounded-full bg-white/20" />
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <Badge tone="gold">
                              {action.pillar}
                            </Badge>

                            <Badge tone={complete ? 'success' : 'neutral'}>
                              {complete ? 'Complete' : action.due}
                            </Badge>
                          </div>

                          <h3
                            className={
                              complete
                                ? 'mt-3 font-semibold line-through opacity-70'
                                : 'mt-3 font-semibold'
                            }
                          >
                            {action.title}
                          </h3>

                          <p className="mt-1 text-sm text-muted-foreground">
                            {action.reason}
                          </p>

                          <p className="mt-3 text-xs text-white/50">
                            Owner: {action.owner}
                          </p>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </CardBody>
            </Card>

            <div className="grid gap-4 lg:grid-cols-3">
              {pillars.map((pillar) => (
                <Card key={pillar.key}>
                  <CardBody>
                    <h3 className="font-semibold">
                      {pillar.name} daily actions
                    </h3>

                    <div className="mt-4 space-y-3">
                      {pillar.actions.map((action, index) => (
                        <div
                          key={action}
                          className="flex gap-3 rounded-xl bg-muted/40 p-3 text-sm"
                        >
                          <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-gold text-xs font-bold text-black">
                            {index + 1}
                          </div>

                          <span>{action}</span>
                        </div>
                      ))}
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>

          <Card>
            <CardBody>
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-gold/15 text-gold">
                  <Sparkles className="size-5" />
                </div>

                <div>
                  <h2 className="font-semibold">
                    AURA clinical interpretation
                  </h2>

                  <p className="text-xs text-muted-foreground">
                    Current priority summary
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                <Insight
                  title="Primary strength"
                  text="Jordan follows through when the expectation is clear, the relationship feels safe, and the next step is predictable."
                  tone="success"
                />

                <Insight
                  title="Primary risk"
                  text="Uncertainty can appear as resistance, but the behavior is more consistent with fear of making the wrong decision."
                  tone="danger"
                />

                <Insight
                  title="Best intervention"
                  text="Use one trusted clinician to present two written options, explain the reason for each, and schedule a defined follow-up."
                  tone="gold"
                />

                <Insight
                  title="Transition guardrail"
                  text="Do not discharge until housing, transportation, medication continuity, and receiving-provider confirmation are documented."
                  tone="neutral"
                />
              </div>
            </CardBody>
          </Card>
        </div>
      )}

      {activeTab === 'identity' && (
        <div className="grid gap-5 xl:grid-cols-[1fr_360px]">
          <div className="space-y-4">
            {identityStatements.map((statement, index) => (
              <Card key={statement.not}>
                <CardBody>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <Badge tone="gold">
                      Identity statement {index + 1}
                    </Badge>

                    <Badge tone="neutral">
                      {statement.status}
                    </Badge>
                  </div>

                  <div className="mt-5 grid gap-4 lg:grid-cols-2">
                    <div className="rounded-2xl border border-destructive/25 bg-destructive/5 p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-destructive">
                        I am not statement
                      </p>

                      <p className="mt-3 text-lg font-semibold">
                        “{statement.not}”
                      </p>
                    </div>

                    <div className="rounded-2xl border border-success/25 bg-success/5 p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-success">
                        Truthful I am statement
                      </p>

                      <p className="mt-3 text-lg font-semibold">
                        “{statement.truth}”
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 rounded-2xl border border-gold/30 bg-gold/10 p-4">
                    <div className="flex items-center gap-2">
                      <MessageSquareText className="size-4 text-gold" />

                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">
                        Clinician processing prompt
                      </p>
                    </div>

                    <p className="mt-3 text-sm leading-6">
                      {statement.clinicianPrompt}
                    </p>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>

          <Card>
            <CardBody>
              <h2 className="font-semibold">
                Identity work protocol
              </h2>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Help Jordan identify the belief underneath the behavior,
                challenge it with evidence, and replace it with a truthful
                identity statement supported by daily action.
              </p>

              <div className="mt-5 space-y-3">
                {[
                  {
                    title: '1. Identify',
                    text:
                      'Name the exact “I am not” statement showing up in Jordan’s language.',
                  },
                  {
                    title: '2. Trace',
                    text:
                      'Connect the statement to the fear, shame, experience, or unmet need underneath it.',
                  },
                  {
                    title: '3. Challenge',
                    text:
                      'Use evidence from Jordan’s actual progress to test whether the belief is fully true.',
                  },
                  {
                    title: '4. Rewrite',
                    text:
                      'Create a believable “I am” statement that reflects growth without using false positivity.',
                  },
                  {
                    title: '5. Reinforce',
                    text:
                      'Assign one daily action that gives Jordan evidence that the new statement is becoming true.',
                  },
                ].map((step) => (
                  <div
                    key={step.title}
                    className="rounded-xl border border-white/10 bg-white/5 p-3"
                  >
                    <p className="text-sm font-semibold">
                      {step.title}
                    </p>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {step.text}
                    </p>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      )}

      {activeTab === 'baseline' && (
        <div className="space-y-5">
          <Card>
            <CardBody>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold">
                    First 30-day baseline
                  </h2>

                  <p className="text-sm text-muted-foreground">
                    Jordan’s measured progression from intake through the end
                    of the baseline period.
                  </p>
                </div>

                <Badge tone="success">
                  Improvement across all pillars
                </Badge>
              </div>

              <div className="mt-6 overflow-x-auto">
                <div className="min-w-[720px]">
                  <div className="grid grid-cols-[130px_repeat(3,1fr)] gap-3 border-b border-white/10 pb-3 text-xs font-semibold uppercase tracking-[0.14em] text-white/45">
                    <div>Checkpoint</div>
                    <div>Mind</div>
                    <div>Body</div>
                    <div>Spirit</div>
                  </div>

                  <div className="divide-y divide-white/10">
                    {baseline.map((entry) => (
                      <div
                        key={entry.week}
                        className="grid grid-cols-[130px_repeat(3,1fr)] gap-3 py-4"
                      >
                        <div className="font-semibold">
                          {entry.week}
                        </div>

                        <BaselineCell value={entry.mind} />
                        <BaselineCell value={entry.body} />
                        <BaselineCell value={entry.spirit} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          <div className="grid gap-5 lg:grid-cols-3">
            {pillars.map((pillar) => {
              const improvement = Math.round(
                ((pillar.current - pillar.started) /
                  pillar.started) *
                  100,
              )

              const targetProgress = Math.round(
                (pillar.current / pillar.target) * 100,
              )

              return (
                <Card key={pillar.key}>
                  <CardBody>
                    <h3 className="font-semibold">
                      {pillar.name} progression
                    </h3>

                    <div className="mt-5 grid grid-cols-2 gap-3">
                      <div className="rounded-xl bg-muted/40 p-3">
                        <p className="text-xs text-muted-foreground">
                          Improvement
                        </p>

                        <p className="mt-1 text-2xl font-bold text-success">
                          +{improvement}%
                        </p>
                      </div>

                      <div className="rounded-xl bg-muted/40 p-3">
                        <p className="text-xs text-muted-foreground">
                          Target reached
                        </p>

                        <p className="mt-1 text-2xl font-bold text-gold">
                          {targetProgress}%
                        </p>
                      </div>
                    </div>

                    <div className="mt-5">
                      <div className="mb-2 flex justify-between text-sm">
                        <span>
                          {pillar.current} current
                        </span>

                        <span>
                          {pillar.target} target
                        </span>
                      </div>

                      <ProgressBar value={targetProgress} />
                    </div>

                    <p className="mt-4 text-sm text-muted-foreground">
                      Started at {pillar.started}. Jordan has improved by{' '}
                      {(pillar.current - pillar.started).toFixed(1)} points
                      during the first 30 days.
                    </p>
                  </CardBody>
                </Card>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

function PathwayView() {
  const stages = [
    {
      label: 'Detox',
      status: 'complete',
      detail: 'Medical stabilization completed',
    },
    {
      label: 'Inpatient',
      status: 'complete',
      detail: 'Clinical stabilization completed',
    },
    {
      label: 'PHP',
      status: 'complete',
      detail: 'Structured transition completed',
    },
    {
      label: 'IOP',
      status: 'active',
      detail: 'Current level of care',
    },
    {
      label: 'Outpatient',
      status: 'next',
      detail: 'Recommended next step',
    },
    {
      label: 'Community reintegration',
      status: 'future',
      detail: 'Housing, employment, support',
    },
    {
      label: 'Recovered',
      status: 'future',
      detail: 'Long-term stability milestone',
    },
  ]

  return (
    <div className="space-y-5">
      <PageHead
        title="Personalized Care Pathway"
        subtitle="Coordinate each transition around clinical need, client preference, readiness, safety, and long-term reintegration."
      />

      <ClientGoalBanner />

      <Card>
        <CardBody>
          <div className="space-y-3">
            {stages.map((stage, index) => (
              <div
                key={stage.label}
                className={
                  stage.status === 'active'
                    ? 'flex items-center gap-4 rounded-2xl border border-gold bg-gold/10 p-4'
                    : 'flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4'
                }
              >
                <div
                  className={
                    stage.status === 'complete'
                      ? 'flex size-10 shrink-0 items-center justify-center rounded-full bg-success text-black'
                      : stage.status === 'active'
                        ? 'flex size-10 shrink-0 items-center justify-center rounded-full bg-gold text-black'
                        : 'flex size-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-black/20'
                  }
                >
                  {stage.status === 'complete' ? (
                    <Check className="size-5" />
                  ) : (
                    index + 1
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="font-semibold">{stage.label}</p>
                  <p className="text-sm text-muted-foreground">
                    {stage.detail}
                  </p>
                </div>

                <Badge
                  tone={
                    stage.status === 'complete'
                      ? 'success'
                      : stage.status === 'active'
                        ? 'gold'
                        : 'neutral'
                  }
                >
                  {stage.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
          <CardBody>
            <h2 className="font-semibold">
              Transition readiness
            </h2>

            <div className="mt-5 space-y-4">
              <ReadinessRow
                label="Clinical stability"
                value={82}
              />

              <ReadinessRow
                label="Medication continuity"
                value={90}
              />

              <ReadinessRow
                label="Housing readiness"
                value={54}
              />

              <ReadinessRow
                label="Transportation"
                value={61}
              />

              <ReadinessRow
                label="Support network"
                value={72}
              />
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <h2 className="font-semibold">
              AURA recommendation
            </h2>

            <div className="mt-4 rounded-2xl border border-gold/30 bg-gold/10 p-4">
              <p className="font-semibold">
                Continue IOP until housing and transportation are confirmed
              </p>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Jordan is clinically approaching outpatient readiness, but a
                premature transition would increase the risk of missed
                appointments, isolation, and loss of structure.
              </p>
            </div>

            <div className="mt-4 space-y-2">
              {[
                'Confirm Company B outpatient admission',
                'Complete ROI authorization',
                'Secure sober-living placement',
                'Document transportation plan',
                'Complete MAT review',
              ].map((item) => (
                <div
                  key={item}
                  className="flex gap-3 rounded-xl border border-white/10 bg-white/5 p-3 text-sm"
                >
                  <CheckCircle2 className="size-4 shrink-0 text-success" />
                  {item}
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

function MatView() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Medications & MAT"
        subtitle="Support individualized, medically supervised medication decisions as one part of Jordan’s complete recovery pathway."
      />

      <div className="grid gap-5 xl:grid-cols-[1fr_360px]">
        <Card>
          <CardBody>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold">
                  Current MAT plan
                </h2>

                <p className="text-sm text-muted-foreground">
                  Medication decisions remain individualized and clinically
                  supervised.
                </p>
              </div>

              <Badge tone="success">Stable</Badge>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <InfoBlock
                label="Medication"
                value={MAT_PLAN.medication}
              />

              <InfoBlock
                label="Current dose"
                value={MAT_PLAN.dose}
              />

              <InfoBlock
                label="Prescriber"
                value={MAT_PLAN.provider}
              />

              <InfoBlock
                label="Next review"
                value={MAT_PLAN.reviewDate}
              />
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              {[
                {
                  title: 'Continue MAT',
                  text:
                    'Maintain the current plan when it supports safety, stability, recovery, and client preference.',
                },
                {
                  title: 'Adjust MAT',
                  text:
                    'Modify medication only after clinical review of symptoms, cravings, side effects, and recovery risk.',
                },
                {
                  title: 'Supervised taper',
                  text:
                    'Consider only when clinically appropriate, medically supervised, and chosen with the client.',
                },
              ].map((option) => (
                <div
                  key={option.title}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <Pill className="size-5 text-gold" />

                  <p className="mt-3 font-semibold">
                    {option.title}
                  </p>

                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {option.text}
                  </p>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <h2 className="font-semibold">
              Current indicators
            </h2>

            <div className="mt-5 space-y-4">
              <ReadinessRow
                label="Medication adherence"
                value={96}
              />

              <ReadinessRow
                label="Craving stability"
                value={78}
              />

              <ReadinessRow
                label="Withdrawal stability"
                value={90}
              />

              <ReadinessRow
                label="Housing stability"
                value={54}
              />

              <ReadinessRow
                label="Support readiness"
                value={72}
              />
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="rounded-2xl border border-gold/30 bg-gold/10 p-4 text-sm leading-6">
        Recovery status is not dependent on medication discontinuation. Any
        continuation, adjustment, or taper must remain clinically appropriate,
        medically supervised, and aligned with the client’s informed
        preference.
      </div>
    </div>
  )
}

function CaseView() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Case Management Pathway"
        subtitle="Track every practical barrier that could interrupt Jordan’s transition, recovery stability, or reintegration."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {CASE_ITEMS.map((item) => (
          <Card key={item.title}>
            <CardBody>
              <div className="flex items-start justify-between gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-gold/15 text-gold">
                  <Route className="size-5" />
                </div>

                <Badge
                  tone={
                    item.status === 'Complete'
                      ? 'success'
                      : item.status === 'Blocked'
                        ? 'danger'
                        : 'gold'
                  }
                >
                  {item.status}
                </Badge>
              </div>

              <h2 className="mt-4 font-semibold">
                {item.title}
              </h2>

              <div className="mt-4 space-y-3 text-sm">
                <InfoRow
                  label="Owner"
                  value={item.owner}
                />

                <InfoRow
                  label="Next action"
                  value={item.next}
                />

                <InfoRow
                  label="Barrier"
                  value={item.barrier}
                />
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  )
}

function TeamView() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Care Team Alignment"
        subtitle="Keep every internal and external provider working from the same client goal, pathway, risks, and updated record."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {CARE_TEAM.map((member) => (
          <Card key={member.name}>
            <CardBody>
              <div className="flex items-center gap-4">
                <div className="flex size-12 items-center justify-center rounded-full bg-gold/15 text-gold">
                  <UserRoundCheck className="size-6" />
                </div>

                <div>
                  <h2 className="font-semibold">
                    {member.name}
                  </h2>

                  <p className="text-sm text-muted-foreground">
                    {member.role}
                  </p>
                </div>
              </div>

              <div className="mt-4 rounded-xl bg-muted/40 p-3 text-sm">
                <p className="text-xs text-muted-foreground">
                  Current responsibility
                </p>

                <p className="mt-1">
                  {member.focus}
                </p>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      <Card>
        <CardBody>
          <h2 className="text-lg font-semibold">
            Care Alignment Check
          </h2>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {[
              {
                title: 'Housing plan unresolved',
                status: 'Action required',
                tone: 'danger' as const,
              },
              {
                title: 'Company B admission pending ROI',
                status: 'Pending',
                tone: 'gold' as const,
              },
              {
                title: 'Medication list reconciled',
                status: 'Aligned',
                tone: 'success' as const,
              },
              {
                title: 'Discharge goals shared across team',
                status: 'Aligned',
                tone: 'success' as const,
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 p-4"
              >
                <span className="text-sm font-medium">
                  {item.title}
                </span>

                <Badge tone={item.tone}>
                  {item.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

function OutcomesView() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Outcomes"
        subtitle="Measure whether Jordan’s coordinated care is producing real progress toward stability, independence, and long-term recovery."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {OUTCOMES.map((outcome) => (
          <Metric
            key={outcome.label}
            icon={<Target />}
            value={outcome.value}
            label={outcome.label}
            detail={outcome.detail}
          />
        ))}
      </div>

      <Card>
        <CardBody>
          <h2 className="text-lg font-semibold">
            Patient-centered outcome summary
          </h2>

          <div className="mt-5 grid gap-4 lg:grid-cols-3">
            <OutcomeSummary
              title="Clinical"
              items={[
                'Cravings reduced',
                'Anxiety regulation improved',
                'Medication adherence stable',
                'No emergency readmission',
              ]}
            />

            <OutcomeSummary
              title="Functional"
              items={[
                'Housing application active',
                'Employment readiness initiated',
                'Transportation plan in progress',
                'Community support expanded',
              ]}
            />

            <OutcomeSummary
              title="Identity"
              items={[
                'Shame language decreasing',
                'Help-seeking improving',
                'Trust rebuilding through action',
                'Purpose and self-efficacy improving',
              ]}
            />
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

function DischargeView() {
  const completedCount = DISCHARGE_CHECKLIST.filter(
    (item) => item.complete,
  ).length

  const completion = Math.round(
    (completedCount / DISCHARGE_CHECKLIST.length) * 100,
  )

  return (
    <div className="space-y-5">
      <PageHead
        title="Discharge & Recovery Milestone"
        subtitle="Discharge is a coordinated transition, not the end of care."
      />

      <div className="grid gap-5 xl:grid-cols-[1fr_380px]">
        <Card>
          <CardBody>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold">
                  Final discharge readiness
                </h2>

                <p className="text-sm text-muted-foreground">
                  Every critical support must be verified before transition.
                </p>
              </div>

              <Badge tone={completion === 100 ? 'success' : 'gold'}>
                {completion}% complete
              </Badge>
            </div>

            <div className="mt-5">
              <ProgressBar value={completion} />
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {DISCHARGE_CHECKLIST.map((item) => (
                <div
                  key={item.label}
                  className={
                    item.complete
                      ? 'flex gap-3 rounded-xl border border-success/20 bg-success/5 p-3 text-sm'
                      : 'flex gap-3 rounded-xl border border-gold/30 bg-gold/5 p-3 text-sm'
                  }
                >
                  {item.complete ? (
                    <CheckCircle2 className="size-4 shrink-0 text-success" />
                  ) : (
                    <Clock3 className="size-4 shrink-0 text-gold" />
                  )}

                  {item.label}
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="text-center">
              <Image
                src="/phoenix-s.png"
                alt="Sentient Continuum Phoenix S"
                width={96}
                height={96}
                className="mx-auto size-24 object-contain"
              />

              <Badge tone="gold">Future milestone</Badge>

              <h2 className="mt-4 text-3xl font-black tracking-wide">
                RECOVERED
              </h2>

              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Recovered reflects sustained client-defined stability,
                reintegration, and goal achievement. It does not mean support
                ends.
              </p>

              <div className="mt-5 space-y-2 text-left">
                {RECOVERED_HIGHLIGHTS.map((item) => (
                  <div
                    key={item}
                    className="flex gap-3 rounded-xl bg-muted/40 p-3 text-sm"
                  >
                    <CheckCircle2 className="size-4 shrink-0 text-success" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

function AuditView() {
  const { audit } = useDemo()

  return (
    <div className="space-y-5">
      <PageHead
        title="Compliance Audit Log"
        subtitle="Track every access, consent, transfer, update, and pathway decision."
      />

      <Card>
        <CardBody>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 text-xs uppercase tracking-[0.14em] text-white/45">
                  <th className="pb-3">Time</th>
                  <th className="pb-3">User</th>
                  <th className="pb-3">Role</th>
                  <th className="pb-3">Organization</th>
                  <th className="pb-3">Action</th>
                  <th className="pb-3">Reason</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-white/10">
                {audit.map((entry, index) => (
                  <tr key={`${entry.time}-${entry.action}-${index}`}>
                    <td className="py-4 text-white/55">
                      {entry.time}
                    </td>

                    <td className="py-4 font-medium">
                      {entry.user}
                    </td>

                    <td className="py-4">
                      {entry.role}
                    </td>

                    <td className="py-4">
                      {entry.org}
                    </td>

                    <td className="py-4">
                      {entry.action}
                    </td>

                    <td className="py-4 text-white/55">
                      {entry.reason}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

function IntakeView() {
  const steps = [
    'Identity and demographics',
    'Presenting concerns',
    'Medical history',
    'Behavioral-health history',
    'Substance-use history',
    'Medication history',
    'Risk and safety screening',
    'Housing and transportation',
    'Employment and education',
    'Family and support system',
    'Legal obligations',
    'Insurance verification',
    'MBS Triangulation baseline',
    'Client goals',
    'Consent and signatures',
    'Recommended level of care',
  ]

  const [currentStep, setCurrentStep] = useState(1)

  const completion = Math.round(
    (currentStep / steps.length) * 100,
  )

  return (
    <div className="space-y-5">
      <PageHead
        title="Standardized Intake"
        subtitle="One complete intake that follows Jordan through every authorized transition."
      />

      <Card>
        <CardBody>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-semibold">
                Step {currentStep} of {steps.length}
              </h2>

              <p className="text-sm text-muted-foreground">
                {steps[currentStep - 1]}
              </p>
            </div>

            <Badge tone="gold">
              {completion}% complete
            </Badge>
          </div>

          <div className="mt-4">
            <ProgressBar value={completion} />
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-lg font-semibold">
              {steps[currentStep - 1]}
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              This demo shows the standardized section that would be completed
              once and reused throughout the authorized continuum of care.
            </p>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <DemoField label="Primary response" />
              <DemoField label="Supporting details" />
              <DemoField label="Verified by" />
              <DemoField label="Date reviewed" />
            </div>
          </div>

          <div className="mt-6 flex justify-between gap-3">
            <button
              type="button"
              disabled={currentStep === 1}
              onClick={() =>
                setCurrentStep((current) =>
                  Math.max(1, current - 1),
                )
              }
              className="rounded-xl border border-white/15 px-4 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>

            <button
              type="button"
              onClick={() =>
                setCurrentStep((current) =>
                  Math.min(steps.length, current + 1),
                )
              }
              className="rounded-xl bg-gold px-5 py-3 text-sm font-semibold text-black"
            >
              {currentStep === steps.length
                ? 'Generate care pathway'
                : 'Save and continue'}
            </button>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

function ClientRecord() {
  const timeline = [
    ...TIMELINE,
    ...TIMELINE_COMPANY_B,
  ]

  return (
    <div className="space-y-5">
      <PageHead
        title="Longitudinal Client Record"
        subtitle="One authorized timeline across every participating organization and level of care."
      />

      <ClientSummaryCard />
      <ClientGoalBanner />

      <Card>
        <CardBody>
          <h2 className="text-lg font-semibold">
            Complete care timeline
          </h2>

          <div className="mt-5 space-y-4">
            {timeline.map((event, index) => (
              <div
                key={`${event.date}-${event.title}-${index}`}
                className="relative flex gap-4"
              >
                <div className="flex flex-col items-center">
                  <div className="flex size-9 items-center justify-center rounded-full bg-gold text-black">
                    <Check className="size-4" />
                  </div>

                  {index < timeline.length - 1 && (
                    <div className="mt-2 h-full w-px bg-white/10" />
                  )}
                </div>

                <div className="mb-5 flex-1 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex flex-wrap justify-between gap-3">
                    <div>
                      <p className="font-semibold">
                        {event.title}
                      </p>

                      <p className="mt-1 text-sm text-muted-foreground">
                        {event.summary}
                      </p>
                    </div>

                    <div className="text-right">
                      <Badge tone="gold">
                        {event.facility}
                      </Badge>

                      <p className="mt-2 text-xs text-white/45">
                        {event.date}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

function NotesView() {
  const notes = [
    {
      type: 'Individual Therapy',
      provider: 'Dr. Maya Chen',
      facility: COMPANY_A.short,
      date: 'July 21, 2026',
      summary:
        'Jordan processed anxiety regarding discharge and identified fear of losing structure as the primary concern.',
    },
    {
      type: 'Case Management',
      provider: 'Priya Nair, MSW',
      facility: COMPANY_A.short,
      date: 'July 21, 2026',
      summary:
        'Sober-living referral submitted. Transportation benefits remain pending verification.',
    },
    {
      type: 'MAT Review',
      provider: 'Dr. Samuel Brooks',
      facility: COMPANY_A.short,
      date: 'July 20, 2026',
      summary:
        'Medication adherence remains consistent. No taper change recommended before housing and support stability improve.',
    },
  ]

  return (
    <div className="space-y-5">
      <PageHead
        title="Clinical Notes"
        subtitle="Review structured documentation across facilities, providers, disciplines, and levels of care."
      />

      <div className="space-y-4">
        {notes.map((note) => (
          <Card key={`${note.type}-${note.date}`}>
            <CardBody>
              <div className="flex flex-wrap justify-between gap-3">
                <div>
                  <Badge tone="gold">{note.type}</Badge>

                  <h2 className="mt-3 font-semibold">
                    {note.provider}
                  </h2>

                  <p className="text-sm text-muted-foreground">
                    {note.facility}
                  </p>
                </div>

                <p className="text-sm text-white/45">
                  {note.date}
                </p>
              </div>

              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                {note.summary}
              </p>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  )
}

function SettingsView() {
  return (
    <div className="space-y-5">
      <PageHead
        title="Settings"
        subtitle="Configure facility access, roles, compliance controls, treatment standards, and external continuum partners."
      />

      <div className="grid gap-5 md:grid-cols-2">
        {[
          {
            title: 'Role-based access',
            text:
              'Control which clinical, medical, case-management, transfer, and administrative information each role may access.',
          },
          {
            title: 'Continuum partners',
            text:
              'Manage trusted detox, residential, PHP, IOP, outpatient, sober-living, MAT, and community providers.',
          },
          {
            title: 'ROI templates',
            text:
              'Configure consent language, expiration rules, revocation workflows, signatures, and record categories.',
          },
          {
            title: 'Treatment standards',
            text:
              'Define required assessments, individualized planning standards, reassessment timing, transition safeguards, and outcome measures.',
          },
        ].map((setting) => (
          <Card key={setting.title}>
            <CardBody>
              <h2 className="font-semibold">
                {setting.title}
              </h2>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {setting.text}
              </p>

              <button
                type="button"
                className="mt-4 rounded-xl border border-white/15 px-4 py-2 text-sm font-semibold transition hover:border-gold hover:text-gold"
              >
                Configure
              </button>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  )
}

function Metric({
  icon,
  value,
  label,
  detail,
}: {
  icon: React.ReactNode
  value: string
  label: string
  detail: string
}) {
  return (
    <Card>
      <CardBody>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-2xl font-bold">{value}</p>

            <p className="mt-1 text-sm font-medium">
              {label}
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              {detail}
            </p>
          </div>

          <div className="flex size-10 items-center justify-center rounded-xl bg-gold/15 text-gold [&_svg]:size-5">
            {icon}
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

function AuraAction({
  title,
  text,
  action,
  onClick,
}: {
  title: string
  text: string
  action: string
  onClick: () => void
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
      <div>
        <p className="font-semibold">{title}</p>

        <p className="mt-1 text-sm text-muted-foreground">
          {text}
        </p>
      </div>

      <button
        type="button"
        onClick={onClick}
        className="rounded-xl border border-gold/40 px-4 py-2 text-sm font-semibold text-gold transition hover:bg-gold hover:text-black"
      >
        {action}
      </button>
    </div>
  )
}

function CompanyCard({
  company,
  label,
}: {
  company: {
    name: string
    short: string
    careLevel: string
    availability: string
    insurance: string
  }
  label: string
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-xl bg-gold/15 text-gold">
          <Building2 className="size-5" />
        </div>

        <div>
          <p className="font-semibold">{company.name}</p>
          <p className="text-xs text-muted-foreground">{label}</p>
        </div>
      </div>

      <div className="mt-4 space-y-2 text-sm">
        <InfoRow label="Level of care" value={company.careLevel} />
        <InfoRow label="Availability" value={company.availability} />
        <InfoRow label="Insurance" value={company.insurance} />
      </div>
    </div>
  )
}

function PageHead({
  title,
  subtitle,
}: {
  title: string
  subtitle: string
}) {
  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
        {title}
      </h1>

      <p className="mt-2 max-w-4xl text-sm leading-6 text-muted-foreground">
        {subtitle}
      </p>
    </div>
  )
}

function ScoreBox({
  label,
  value,
  emphasis = false,
}: {
  label: string
  value: number
  emphasis?: boolean
}) {
  return (
    <div
      className={
        emphasis
          ? 'rounded-xl border border-gold/30 bg-gold/10 p-3 text-center'
          : 'rounded-xl bg-muted/40 p-3 text-center'
      }
    >
      <p className="text-xs text-muted-foreground">
        {label}
      </p>

      <p
        className={
          emphasis
            ? 'mt-1 text-xl font-bold text-gold'
            : 'mt-1 text-xl font-bold'
        }
      >
        {value}
      </p>
    </div>
  )
}

function BaselineCell({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gold"
          style={{
            width: `${value * 10}%`,
          }}
        />
      </div>

      <span className="w-8 text-sm font-semibold">
        {value}
      </span>
    </div>
  )
}

function Insight({
  title,
  text,
  tone,
}: {
  title: string
  text: string
  tone: 'success' | 'danger' | 'gold' | 'neutral'
}) {
  const classes = {
    success: 'border-success/25 bg-success/5',
    danger: 'border-destructive/25 bg-destructive/5',
    gold: 'border-gold/30 bg-gold/10',
    neutral: 'border-white/10 bg-white/5',
  }

  return (
    <div className={`rounded-xl border p-3 ${classes[tone]}`}>
      <p className="text-sm font-semibold">{title}</p>

      <p className="mt-1 text-sm leading-6 text-muted-foreground">
        {text}
      </p>
    </div>
  )
}

function ReadinessRow({
  label,
  value,
}: {
  label: string
  value: number
}) {
  return (
    <div>
      <div className="mb-2 flex justify-between gap-3 text-sm">
        <span>{label}</span>
        <span className="font-semibold">{value}%</span>
      </div>

      <ProgressBar value={value} />
    </div>
  )
}

function InfoBlock({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="rounded-xl bg-muted/40 p-4">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-2 font-semibold">{value}</p>
    </div>
  )
}

function InfoRow({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-right font-medium">{value}</span>
    </div>
  )
}

function OutcomeSummary({
  title,
  items,
}: {
  title: string
  items: string[]
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <h3 className="font-semibold">{title}</h3>

      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <div key={item} className="flex gap-3 text-sm">
            <CheckCircle2 className="size-4 shrink-0 text-success" />
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}

function DemoField({ label }: { label: string }) {
  return (
    <label className="block">
      <span className="text-sm font-medium">{label}</span>

      <input
        type="text"
        placeholder={`Enter ${label.toLowerCase()}`}
        className="mt-2 w-full rounded-xl border border-white/15 bg-black/20 px-3 py-3 text-sm outline-none focus:border-gold"
      />
    </label>
  )
}
