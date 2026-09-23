'use client'

import { useState } from 'react'
import {
  ArrowRight,
  BadgeDollarSign,
  BarChart3,
  BrainCircuit,
  CalendarDays,
  Check,
  ChevronDown,
  CircleDollarSign,
  Clock3,
  FileText,
  Gauge,
  Lightbulb,
  Sparkles,
  Target,
  TrendingUp,
  UsersRound,
} from 'lucide-react'

import { Badge, Card, CardBody, ProgressBar } from '@/components/emr/ui'
import { useDemo } from '@/components/emr/demo-context'

const monthlyRevenue = [
  { month: 'Apr', captured: 31840, missed: 7620 },
  { month: 'May', captured: 34620, missed: 6810 },
  { month: 'Jun', captured: 36190, missed: 7040 },
  { month: 'Jul', captured: 38940, missed: 8210 },
  { month: 'Aug', captured: 40580, missed: 8640 },
  { month: 'Sep', captured: 42680, missed: 8940 },
]

const billingOpportunities = [
  {
    client: 'Jordan Mitchell',
    code: 'H2014',
    service: 'Skills training & development',
    units: 3,
    opportunity: '$67.50',
    reason: 'AURA-guided coping-skill application linked to treatment plan; provider participation/time requires review.',
    status: 'Review',
  },
  {
    client: 'Maya Thompson',
    code: 'T1017',
    service: 'Targeted case management',
    units: 2,
    opportunity: '$40.00',
    reason: 'Transportation and housing barriers generated documented coordination work.',
    status: 'Ready',
  },
  {
    client: 'Ethan Brooks',
    code: 'H0038',
    service: 'Peer support',
    units: 4,
    opportunity: '$62.00',
    reason: 'Recovery-skill reinforcement and relapse-prevention support documented by qualified peer staff.',
    status: 'Review',
  },
  {
    client: 'Avery Cole',
    code: '90834',
    service: 'Psychotherapy, 45 min',
    units: 1,
    opportunity: '$95.00',
    reason: 'Completed psychotherapy encounter has unsigned documentation preventing claim release.',
    status: 'Gap',
  },
]

const schedule = [
  { time: '8:30 AM', client: 'Jordan Mitchell', type: 'Individual session', priority: 'High', note: 'Cravings ↑ · sleep ↓ · housing stress' },
  { time: '10:00 AM', client: 'Maya Thompson', type: 'Treatment-plan review', priority: 'Medium', note: 'Transportation barrier unresolved' },
  { time: '11:30 AM', client: 'Ethan Brooks', type: 'Skills training', priority: 'Low', note: 'Strong 7-day check-in streak' },
  { time: '2:00 PM', client: 'Avery Cole', type: 'Individual session', priority: 'Medium', note: 'Documentation follow-up due' },
]

const compareRows = [
  ['Scheduling / agenda', 'Familiar core workflow', 'AURA-prioritized day with clinical + revenue actions'],
  ['Clinical notes', 'Structured documentation', 'AURA pre-session brief + draft post-session documentation'],
  ['Billing / claims', 'Claims workflow', 'Claims + missed-revenue detection + billing opportunity queue'],
  ['Client portal', 'Standard portal workflows', 'Daily check-ins + skill application + longitudinal signals'],
  ['Clinical flags', 'Manual / rules-based flags', 'AURA Signals with trend and treatment-plan context'],
  ['Reporting', 'Operational reports', 'Revenue intelligence, utilization, capacity and opportunity forecasting'],
  ['Client preparation', 'Chart review', 'Brief with AURA: last session, DISC approach, signals and guidance'],
  ['Growth intelligence', 'Not the core workflow', 'Open capacity → additional-client → revenue scenario modeling'],
]

function PageHead({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h1>
      <p className="mt-2 max-w-5xl text-sm leading-6 text-muted-foreground">{subtitle}</p>
    </div>
  )
}

function MoneyMetric({
  label,
  value,
  detail,
  tone = 'gold',
}: {
  label: string
  value: string
  detail: string
  tone?: 'gold' | 'success' | 'warning'
}) {
  const classes = {
    gold: 'border-gold/25 bg-gold/10',
    success: 'border-success/25 bg-success/10',
    warning: 'border-warning/25 bg-warning/10',
  }
  return (
    <div className={`rounded-2xl border p-4 ${classes[tone]}`}>
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">{label}</p>
      <p className="mt-2 text-2xl font-bold">{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{detail}</p>
    </div>
  )
}

export function DailyBriefView() {
  const { navigate } = useDemo()

  return (
    <div className="space-y-5">
      <PageHead
        title="AURA Daily Brief"
        subtitle="One view of your clinical day: who needs you, what changed, what is unfinished, and where action can improve client outcomes or protect revenue."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MoneyMetric label="Client check-in rate" value="78%" detail="33 of 42 completed today · target 90%+" tone="success" />
        <MoneyMetric label="Priority clients" value="6" detail="2 high-priority signals since yesterday" tone="warning" />
        <MoneyMetric label="Open documentation" value="4" detail="2 notes block claims from release" />
        <MoneyMetric label="Revenue to review" value="$326" detail="Illustrative opportunities identified today" />
      </div>

      <div className="grid gap-5 xl:grid-cols-[1fr_380px]">
        <Card>
          <CardBody>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold">Today</h2>
                <p className="text-sm text-muted-foreground">AURA orders the day by clinical priority, not just appointment time.</p>
              </div>
              <Badge tone="gold">Wednesday · Demo</Badge>
            </div>

            <div className="mt-5 space-y-3">
              {schedule.map((item) => (
                <button
                  key={item.time + item.client}
                  type="button"
                  onClick={() => navigate('clients')}
                  className="flex w-full flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-left transition hover:border-gold/40 sm:flex-row sm:items-center"
                >
                  <div className="w-24 shrink-0 text-sm font-semibold text-gold">{item.time}</div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-semibold">{item.client}</p>
                      <Badge tone={item.priority === 'High' ? 'danger' : item.priority === 'Medium' ? 'warning' : 'success'}>
                        {item.priority}
                      </Badge>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{item.type} · {item.note}</p>
                  </div>
                  <ArrowRight className="size-4 text-white/40" />
                </button>
              ))}
            </div>
          </CardBody>
        </Card>

        <div className="space-y-5">
          <Card>
            <CardBody>
              <div className="flex items-center gap-2">
                <BrainCircuit className="size-5 text-gold" />
                <h2 className="font-semibold">Your AURA focus</h2>
              </div>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Start with Jordan. Their check-in shows increased cravings, lower sleep, and housing stress. Use a direct, collaborative approach and confirm the next practical recovery action before ending the session.
              </p>
              <button
                type="button"
                onClick={() => navigate('clients')}
                className="mt-4 rounded-xl bg-gold px-4 py-2 text-sm font-semibold text-black"
              >
                Brief with AURA
              </button>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <div className="flex items-center justify-between">
                <h2 className="font-semibold">Caseload engagement</h2>
                <span className="text-sm font-semibold">78%</span>
              </div>
              <ProgressBar value={78} className="mt-3" />
              <p className="mt-3 text-xs leading-5 text-muted-foreground">
                AURA recommends outreach to 9 clients who have not checked in. Three have declining engagement patterns.
              </p>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}

export function BillingView() {
  const max = Math.max(...monthlyRevenue.map((m) => m.captured + m.missed))
  const current = monthlyRevenue[monthlyRevenue.length - 1]
  const potential = current.captured + current.missed

  return (
    <div className="space-y-5">
      <PageHead
        title="Billing & Revenue Intelligence"
        subtitle="Continuum connects documented care, AURA signals, provider activity and claims workflow so the organization can see both captured revenue and legitimate opportunities that still require review."
      />

      <div className="rounded-2xl border border-warning/25 bg-warning/10 px-4 py-3 text-xs leading-5 text-muted-foreground">
        Demo financial data only. Dollar amounts below are illustrative contracted amounts, not a Medicaid fee schedule. Eligibility, medical necessity, provider qualifications, payer rules and documentation must be verified before billing.
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MoneyMetric label="September captured" value="$42,680" detail="+5.2% month over month" tone="success" />
        <MoneyMetric label="Missed / unreviewed" value="$8,940" detail="Documented activity requiring billing review" tone="warning" />
        <MoneyMetric label="Identified potential" value="$51,620" detail="Captured + reviewable opportunity" />
        <MoneyMetric label="Annualized gap" value="$107,280" detail="If September's gap repeated for 12 months" tone="warning" />
      </div>

      <Card>
        <CardBody>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold">Revenue by month</h2>
              <p className="text-sm text-muted-foreground">Captured revenue versus Continuum-identified missed or unreviewed opportunity.</p>
            </div>
            <Badge tone="gold">6-month demo</Badge>
          </div>

          <div className="mt-6 grid min-h-64 grid-cols-6 items-end gap-3">
            {monthlyRevenue.map((month) => {
              const capturedHeight = Math.max(10, Math.round((month.captured / max) * 190))
              const missedHeight = Math.max(6, Math.round((month.missed / max) * 190))
              return (
                <div key={month.month} className="flex h-full flex-col items-center justify-end gap-2">
                  <div className="flex h-[205px] items-end gap-1">
                    <div
                      className="w-5 rounded-t-md bg-gold"
                      style={{ height: capturedHeight }}
                      title={`Captured $${month.captured.toLocaleString()}`}
                    />
                    <div
                      className="w-5 rounded-t-md bg-white/20"
                      style={{ height: missedHeight }}
                      title={`Opportunity $${month.missed.toLocaleString()}`}
                    />
                  </div>
                  <span className="text-xs font-semibold">{month.month}</span>
                </div>
              )
            })}
          </div>

          <div className="mt-3 flex flex-wrap gap-4 text-xs text-muted-foreground">
            <span><span className="mr-2 inline-block size-2 rounded-full bg-gold" />Captured</span>
            <span><span className="mr-2 inline-block size-2 rounded-full bg-white/30" />Missed / reviewable</span>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold">Revenue opportunity queue</h2>
              <p className="text-sm text-muted-foreground">AURA identifies the gap; the provider or billing team decides whether the service is actually billable.</p>
            </div>
            <Badge tone="warning">4 require action</Badge>
          </div>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead className="border-b border-white/10 text-xs uppercase tracking-[0.12em] text-muted-foreground">
                <tr>
                  <th className="px-3 py-3">Client</th>
                  <th className="px-3 py-3">Code</th>
                  <th className="px-3 py-3">Service</th>
                  <th className="px-3 py-3">Units</th>
                  <th className="px-3 py-3">Demo value</th>
                  <th className="px-3 py-3">Why flagged</th>
                  <th className="px-3 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {billingOpportunities.map((row) => (
                  <tr key={row.client + row.code} className="border-b border-white/5 align-top">
                    <td className="px-3 py-4 font-semibold">{row.client}</td>
                    <td className="px-3 py-4"><Badge tone="gold">{row.code}</Badge></td>
                    <td className="px-3 py-4">{row.service}</td>
                    <td className="px-3 py-4">{row.units}</td>
                    <td className="px-3 py-4 font-semibold text-gold">{row.opportunity}</td>
                    <td className="max-w-md px-3 py-4 text-muted-foreground">{row.reason}</td>
                    <td className="px-3 py-4"><Badge tone={row.status === 'Ready' ? 'success' : row.status === 'Gap' ? 'danger' : 'warning'}>{row.status}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>

      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
          <CardBody>
            <div className="flex items-center gap-2">
              <Gauge className="size-5 text-gold" />
              <h2 className="font-semibold">Client growth capacity</h2>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              <div><p className="text-2xl font-bold">42</p><p className="text-xs text-muted-foreground">Current active clients</p></div>
              <div><p className="text-2xl font-bold">54</p><p className="text-xs text-muted-foreground">Modeled capacity</p></div>
              <div><p className="text-2xl font-bold text-gold">+12</p><p className="text-xs text-muted-foreground">Open client capacity</p></div>
            </div>
            <ProgressBar value={78} className="mt-5" />
            <p className="mt-3 text-sm text-muted-foreground">
              Continuum models capacity from clinician schedules, utilization and documentation workload—not simply licensed headcount.
            </p>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="flex items-center gap-2">
              <TrendingUp className="size-5 text-gold" />
              <h2 className="font-semibold">Why Continuum is stronger on revenue</h2>
            </div>
            <div className="mt-4 space-y-3">
              {[
                'Connects treatment-plan activity to the billing workflow instead of waiting for claims staff to discover it.',
                'Surfaces unfinished documentation and missed service opportunities before the revenue disappears.',
                'Combines clinical utilization, client engagement and available staff capacity in one forecast.',
                'Keeps AURA recommendations separate from provider attestation so opportunity detection does not become automatic billing.',
              ].map((text) => (
                <div key={text} className="flex gap-3 text-sm text-muted-foreground">
                  <Check className="mt-0.5 size-4 shrink-0 text-success" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export function CompareSoftwareView() {
  const [software, setSoftware] = useState('Ensora')
  const options = ['Ensora', 'SimplePractice', 'TherapyNotes']

  return (
    <div className="space-y-5">
      <PageHead
        title="Compare Software"
        subtitle="Choose the system your team already knows. Continuum keeps familiar clinical workflows while adding AURA orchestration, longitudinal intelligence and revenue visibility."
      />

      <Card>
        <CardBody>
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-2 text-sm font-medium text-muted-foreground">Compare Continuum with</span>
            {options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setSoftware(option)}
                className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${software === option ? 'bg-gold text-black' : 'border border-white/10 bg-white/5 hover:border-gold/40'}`}
              >
                {option}
              </button>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Demo comparison framework. Vendor capabilities change; validate competitor-specific details before using this screen in external sales material.
          </p>
        </CardBody>
      </Card>

      <Card>
        <CardBody className="overflow-x-auto">
          <table className="w-full min-w-[780px] text-left text-sm">
            <thead className="border-b border-white/10">
              <tr>
                <th className="px-3 py-4 text-muted-foreground">Workflow</th>
                <th className="px-3 py-4">{software}</th>
                <th className="px-3 py-4 text-gold">Sentient Continuum</th>
              </tr>
            </thead>
            <tbody>
              {compareRows.map(([feature, current, continuum]) => (
                <tr key={feature} className="border-b border-white/5">
                  <td className="px-3 py-4 font-semibold">{feature}</td>
                  <td className="px-3 py-4 text-muted-foreground">{current}</td>
                  <td className="px-3 py-4">{continuum}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <MoneyMetric label="Same mental model" value="Familiar" detail="Agenda, notes, clients, billing and reporting remain recognizable." />
        <MoneyMetric label="Added intelligence" value="AURA" detail="Prioritization, longitudinal signals and session preparation." />
        <MoneyMetric label="Added economics" value="Revenue" detail="Opportunity detection, leakage visibility and capacity forecasting." tone="success" />
      </div>
    </div>
  )
}

export function AuraClientBrief() {
  const [open, setOpen] = useState(false)

  return (
    <Card className="border-gold/30">
      <CardBody>
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="flex w-full items-center justify-between gap-4 text-left"
        >
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-gold text-black">
              <Sparkles className="size-5" />
            </div>
            <div>
              <h2 className="font-semibold">Brief with AURA</h2>
              <p className="text-sm text-muted-foreground">Prepare for Jordan's next session in under a minute.</p>
            </div>
          </div>
          <ChevronDown className={`size-5 transition ${open ? 'rotate-180' : ''}`} />
        </button>

        {open ? (
          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            <BriefBlock
              icon={<FileText />}
              title="Last session"
              text="Jordan processed anxiety about losing structure after IOP. Primary themes were housing uncertainty, independence, and fear of relapse during transition."
            />
            <BriefBlock
              icon={<BarChart3 />}
              title="Since the last session"
              text="Daily check-ins show cravings 4→7, sleep 6.5h→5.1h, and increased housing stress. Medication adherence remains stable."
            />
            <BriefBlock
              icon={<BrainCircuit />}
              title="DISC communication guidance"
              text="Use direct, collaborative language. Start with the practical problem, give Jordan choices, and connect each skill to immediate independence rather than abstract theory."
            />
            <BriefBlock
              icon={<Target />}
              title="Suggested session direction"
              text="Stabilize transition anxiety, rehearse one coping response for a high-craving evening, and leave with one concrete housing/transportation action Jordan owns."
            />
            <BriefBlock
              icon={<Lightbulb />}
              title="Suggested questions"
              text={'“What changed right before cravings increased?” · “Which part of leaving IOP feels least controllable?” · “What would make tonight 10% easier?”'}
            />
            <BriefBlock
              icon={<BadgeDollarSign />}
              title="Billing intelligence"
              text="AURA detected potential H2014 skills-training and T1017 case-management activity. Continuum keeps these as review opportunities until provider time, medical necessity and documentation are confirmed."
            />
          </div>
        ) : null}
      </CardBody>
    </Card>
  )
}

function BriefBlock({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-center gap-2 text-gold [&_svg]:size-4">
        {icon}
        <h3 className="text-sm font-semibold text-white">{title}</h3>
      </div>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
    </div>
  )
}
