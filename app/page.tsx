'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  Activity, ArrowRight, Bot, Check, CheckCircle2, ClipboardCheck, FileCheck2,
  HeartHandshake, LockKeyhole, MessageSquareText, Network, Pill, Route, ShieldCheck,
  Sparkles, Target, UsersRound, XCircle, Send, Clock3, Building2, UserRoundCheck,
} from 'lucide-react'
import { DemoProvider, useDemo } from '@/components/emr/demo-context'
import { Sidebar } from '@/components/emr/sidebar'
import { Topbar } from '@/components/emr/topbar'
import { DemoController, Toast } from '@/components/emr/demo-controller'
import { ContinuumBar } from '@/components/emr/continuum-bar'
import { ClientGoalBanner, ClientSummaryCard } from '@/components/emr/client-summary'
import { Card, CardBody, Badge, ProgressBar, ScoreMeter } from '@/components/emr/ui'
import {
  CLIENT, COMPANY_A, COMPANY_B, CARE_TEAM, MBS, CASE_ITEMS, OUTCOMES,
  RECORD_CATEGORIES, MAT_PLAN, TIMELINE, TIMELINE_COMPANY_B, DISCHARGE_CHECKLIST,
  RECOVERED_HIGHLIGHTS, type NavKey,
} from '@/lib/demo-data'

export default function Page() {
  return <DemoProvider><App /></DemoProvider>
}

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { view } = useDemo()
  return (
    <div className="min-h-screen bg-background lg:flex">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
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
        <Image src="/phoenix-s.png" alt="Sentient Connect Phoenix S" width={38} height={38} className="rounded-lg" />
        <div>
          <p className="text-sm font-semibold text-white">AURA Continuum Orchestration</p>
          <p className="text-xs text-white/60">Consent-controlled sharing · role-based access · immutable audit simulation</p>
        </div>
      </div>
      <div className="flex gap-2"><Badge tone="success">Mock data only</Badge><Badge tone="gold">HIPAA-ready workflow demo</Badge></div>
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
  return <>
    <div className="grid gap-5 xl:grid-cols-[1fr_360px]">
      <div className="space-y-5">
        <ClientSummaryCard /><ClientGoalBanner />
        <Card><CardBody><h2 className="mb-4 text-lg font-semibold">Longitudinal continuum</h2><ContinuumBar /></CardBody></Card>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Metric icon={<UsersRound />} value="42" label="Active clients" detail="Across 4 care levels" />
          <Metric icon={<Network />} value="7" label="Transitions pending" detail="2 require ROI signature" />
          <Metric icon={<Clock3 />} value="14m" label="Median transfer" detail="Previously 2–5 days" />
          <Metric icon={<ClipboardCheck />} value="82%" label="Intake auto-filled" detail="From authorized record" />
        </div>
        <Card><CardBody><div className="flex items-center justify-between"><h2 className="text-lg font-semibold">AURA priority actions</h2><Badge tone="gold">Live demo</Badge></div>
          <div className="mt-4 grid gap-3">
            <AuraAction title="Secure receiving placement" text="Company B has outpatient and sober-living capacity within 48 hours." action="Open transfer" onClick={() => navigate('roi')} />
            <AuraAction title="Resolve housing before step-down" text="Housing remains the highest transition risk. Assign Renee Coleman today." action="Open case plan" onClick={() => navigate('case')} />
            <AuraAction title="Review MAT plan" text="Jordan reports reduced cravings. Medical review is due before any taper change." action="Review MAT" onClick={() => navigate('mat')} />
          </div>
        </CardBody></Card>
      </div>
      <AuraPanel />
    </div>
  </>
}

function AuraPanel() {
  const [messages, setMessages] = useState([{ from:'aura', text:'Jordan is approaching an IOP transition. I identified three unresolved risks: housing, transportation, and receiving-provider confirmation.' }])
  const [input, setInput] = useState('')
  const send = () => { if (!input.trim()) return; setMessages(m => [...m,{from:'user',text:input},{from:'aura',text:'I reviewed the longitudinal record. The safest next step is to finalize ROI consent, confirm Company B admission, and assign the housing task before discharge.'}]); setInput('') }
  return <aside className="h-fit rounded-2xl border border-gold/30 bg-[#0d0d0f] p-4 xl:sticky xl:top-28">
    <div className="flex items-center gap-3 border-b border-white/10 pb-4"><div className="flex size-10 items-center justify-center rounded-xl bg-gold text-black"><Bot /></div><div><p className="font-semibold">AURA Genesis™</p><p className="text-xs text-white/50">Care-team orchestration assistant</p></div></div>
    <div className="my-4 max-h-[420px] space-y-3 overflow-y-auto">
      {messages.map((m,i)=><div key={i} className={`rounded-xl p-3 text-sm ${m.from==='aura'?'bg-white/8 text-white/85':'ml-8 bg-gold text-black'}`}>{m.text}</div>)}
    </div>
    <div className="flex gap-2"><input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()} placeholder="Ask AURA about Jordan..." className="min-w-0 flex-1 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm outline-none focus:border-gold"/><button onClick={send} className="rounded-xl bg-gold p-2 text-black"><Send className="size-5"/></button></div>
    <p className="mt-3 text-[11px] text-white/40">Decision support only. Licensed professionals retain clinical judgment.</p>
  </aside>
}

function TransferCenter() {
  const { transfer, setTransfer, addAudit, showToast, role } = useDemo()
  const [step,setStep]=useState(transfer.complete?4:1)
  const sign=()=>{setTransfer({consentSigned:true});addAudit({user:'Jordan Mitchell',role:'Client',org:COMPANY_A.short,action:'ROI consent signed',reason:'Continuity of treatment',device:'Client portal · Verified session'});setStep(4);showToast('ROI signed and authorization verified')}
  const complete=()=>{setTransfer({complete:true});addAudit({user:'Priya Nair, MSW',role:'Case Manager',org:COMPANY_A.short,action:'Complete record transferred',reason:'Authorized transition to Company B',device:'Secure transfer service'});showToast('Encrypted transfer completed');}
  return <div className="space-y-5"><PageHead title="ROI & Secure Transfer Center" subtitle="Move the complete authorized longitudinal record without forcing the client to restart." />
    <div className="grid gap-4 md:grid-cols-4">{['Receiving facility','Record package','Client authorization','Secure delivery'].map((s,i)=><button key={s} onClick={()=>setStep(i+1)} className={`rounded-2xl border p-4 text-left ${step===i+1?'border-gold bg-gold/10':'border-white/10 bg-white/5'}`}><span className="text-xs text-white/50">Step {i+1}</span><p className="mt-1 text-sm font-semibold">{s}</p></button>)}</div>
    {step===1&&<Card><CardBody><h3 className="text-lg font-semibold">Selected receiving facility</h3><div className="mt-4 grid gap-4 md:grid-cols-2"><CompanyCard company={COMPANY_A} label="Originating record custodian"/><CompanyCard company={COMPANY_B} label="Receiving continuum partner"/></div><button onClick={()=>{setTransfer({facilitySelected:true});setStep(2)}} className="mt-5 rounded-xl bg-gold px-5 py-3 font-semibold text-black">Confirm Company B <ArrowRight className="ml-2 inline size-4"/></button></CardBody></Card>}
    {step===2&&<Card><CardBody><div className="flex flex-wrap justify-between gap-3"><div><h3 className="text-lg font-semibold">Complete longitudinal record</h3><p className="text-sm text-muted-foreground">All categories are included under the client’s authorization.</p></div><Badge tone="success">{RECORD_CATEGORIES.length} categories selected</Badge></div><div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">{RECORD_CATEGORIES.map(r=><div key={r} className="flex items-center gap-2 rounded-xl border bg-muted/40 p-3 text-sm"><CheckCircle2 className="size-4 text-success"/>{r}</div>)}</div><button onClick={()=>setStep(3)} className="mt-5 rounded-xl bg-gold px-5 py-3 font-semibold text-black">Continue to authorization</button></CardBody></Card>}
    {step===3&&<Card><CardBody><div className="grid gap-6 lg:grid-cols-[1fr_340px]"><div><h3 className="text-lg font-semibold">Client release of information</h3><p className="mt-2 text-sm text-muted-foreground">I authorize {COMPANY_A.name} to disclose my complete treatment record to {COMPANY_B.name} for treatment coordination and continuity of care.</p><div className="mt-5 space-y-3">{['I understand which records will be shared.','I authorize the receiving care team to use them for treatment.','I understand revocation applies prospectively, subject to applicable law.','I received an opportunity to ask questions.'].map(x=><label key={x} className="flex gap-3 rounded-xl border p-3 text-sm"><input type="checkbox" defaultChecked className="mt-0.5"/>{x}</label>)}</div></div><div className="rounded-2xl bg-muted p-4"><LockKeyhole className="size-7 text-gold-foreground"/><p className="mt-3 font-semibold">Electronic signature</p><div className="mt-3 rounded-xl border bg-white p-4 font-serif text-xl italic text-black">Jordan Mitchell</div><p className="mt-2 text-xs text-muted-foreground">Identity verified · timestamp generated · audit event created</p><button onClick={sign} className="mt-4 w-full rounded-xl bg-gold px-4 py-3 font-semibold text-black">Sign and authorize transfer</button></div></div></CardBody></Card>}
    {step===4&&<Card><CardBody><div className="text-center"><div className="mx-auto flex size-16 items-center justify-center rounded-full bg-success/15"><ShieldCheck className="size-8 text-success"/></div><h3 className="mt-4 text-xl font-semibold">{transfer.complete?'Transfer complete':'Authorization verified'}</h3><p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground">The authorized record package is identity-matched, encrypted in transit, delivered to the receiving workspace, and logged.</p><div className="mx-auto mt-5 grid max-w-3xl gap-2 sm:grid-cols-3">{['Consent verified','Record packaged','Audit trail created'].map(x=><div className="rounded-xl bg-muted p-3 text-sm" key={x}><Check className="mr-2 inline size-4 text-success"/>{x}</div>)}</div>{!transfer.complete?<button onClick={complete} className="mt-6 rounded-xl bg-gold px-6 py-3 font-semibold text-black">Complete encrypted transfer</button>:<div className="mt-6 rounded-xl border border-success/30 bg-success/10 p-4 text-sm font-medium text-success">Company B can now continue Jordan’s care with no duplicate intake.</div>}</div></CardBody></Card>}
    <p className="text-xs text-white/45">Demo language: designed to support HIPAA and 42 CFR Part 2 compliant workflows; production compliance requires contracts, security controls, policies, risk analysis, and legal review.</p>
  </div>
}

function MbsView(){return <div className="space-y-5"><PageHead title="MBS™ Triangulation" subtitle="One consistent healing framework, individualized to the person."/><div className="grid gap-5 lg:grid-cols-3">{MBS.map(p=><Card key={p.name}><CardBody><h3 className="text-xl font-semibold">{p.name}</h3><p className="mt-1 text-sm text-muted-foreground">{p.description}</p><div className="mt-4 space-y-3">{p.metrics.map(m=><div key={m.name} className="flex items-center justify-between gap-3"><span className="text-sm">{m.name}</span><ScoreMeter score={m.current} invert={m.invert}/></div>)}</div><div className="mt-5 border-t pt-4"><p className="text-xs font-semibold uppercase text-muted-foreground">Today’s personalized actions</p>{p.actions.map((a,i)=><div key={a} className="mt-2 flex gap-2 text-sm"><span className="font-semibold text-gold-foreground">{i+1}.</span>{a}</div>)}</div></CardBody></Card>)}</div></div>}

function PathwayView(){return <div className="space-y-5"><PageHead title="Personalized Care Pathway" subtitle="AURA coordinates every internal and external handoff around Jordan’s goals."/><Card><CardBody><ContinuumBar/><div className="mt-6 grid gap-3 md:grid-cols-5">{['IOP stabilization','Outpatient transition','Sober living','Employment & housing','Recovery maintenance'].map((x,i)=><div key={x} className="rounded-xl border p-4"><Badge tone={i<1?'success':i===1?'gold':'neutral'}>{i<1?'Complete':i===1?'Next':'Planned'}</Badge><p className="mt-3 text-sm font-semibold">{x}</p></div>)}</div></CardBody></Card><Card><CardBody><h3 className="font-semibold">AURA pathway rationale</h3><p className="mt-2 text-sm text-muted-foreground">Maintain IOP until the receiving provider, housing placement, transportation, medication continuity, and ROI transfer are simultaneously confirmed. This reduces the chance of a failed transition caused by administrative gaps.</p></CardBody></Card></div>}

function MatView(){return <div className="space-y-5"><PageHead title="Medication & MAT Pathway" subtitle="Individualized, medically supervised, and never treated as a condition of recovery."/><div className="grid gap-5 lg:grid-cols-2"><Card><CardBody><h3 className="text-lg font-semibold">Current plan</h3>{Object.entries(MAT_PLAN).slice(0,8).map(([k,v])=><div key={k} className="flex justify-between gap-4 border-b py-3 text-sm"><span className="capitalize text-muted-foreground">{k.replaceAll('_',' ')}</span><span className="text-right font-medium">{String(v)}</span></div>)}</CardBody></Card><Card><CardBody><h3 className="text-lg font-semibold">Clinical guardrail</h3><div className="mt-4 rounded-xl border border-gold/30 bg-gold/10 p-4 text-sm">Continue, adjust, or taper MAT only through shared decision-making with the client and qualified medical provider. “Recovered” is not dependent on stopping medication.</div><div className="mt-4 space-y-3">{['Client preference documented','Craving and withdrawal trends reviewed','Housing and support stability verified','Prescriber approval required'].map(x=><div key={x} className="flex gap-2 rounded-xl bg-muted p-3 text-sm"><CheckCircle2 className="size-4 text-success"/>{x}</div>)}</div></CardBody></Card></div></div>}

function CaseView(){return <div className="space-y-5"><PageHead title="Case Management Pathway" subtitle="Every nonclinical barrier has an owner, deadline, next action, and proof of completion."/><div className="grid gap-3 lg:grid-cols-2">{CASE_ITEMS.map(i=><Card key={i.label}><CardBody><div className="flex items-start justify-between"><div><p className="font-semibold">{i.label}</p><p className="text-sm text-muted-foreground">{i.nextAction}</p></div><Badge tone={i.status==='Complete'?'success':i.status==='At Risk'?'danger':'gold'}>{i.status}</Badge></div><div className="mt-4 flex justify-between text-xs text-muted-foreground"><span>Owner: {i.owner}</span><span>Due: {i.due}</span></div></CardBody></Card>)}</div></div>}

function TeamView(){return <div className="space-y-5"><PageHead title="Unified Care Team" subtitle="Internal and external providers operate from one current plan."/><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{CARE_TEAM.map(m=><Card key={m.name}><CardBody><div className="flex gap-3"><div className="flex size-11 items-center justify-center rounded-xl bg-gold/15 text-gold-foreground"><UsersRound/></div><div><p className="font-semibold">{m.name}</p><p className="text-sm text-muted-foreground">{m.role} · {m.org}</p><p className="mt-2 text-sm">{m.focus}</p></div></div></CardBody></Card>)}</div></div>}

function OutcomesView(){return <div className="space-y-5"><PageHead title="Outcomes & Accountability" subtitle="Measure whether the system actually moves the client toward their stated goals."/><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{OUTCOMES.slice(0,8).map(o=><Card key={o.label}><CardBody><p className="text-sm text-muted-foreground">{o.label}</p><p className="mt-1 text-lg font-semibold">{o.after}</p><p className="mt-2 text-xs text-muted-foreground">Before: {o.before}</p></CardBody></Card>)}</div></div>}

function DischargeView(){const {clientStatus,setClientStatus,showToast}=useDemo();return <div className="space-y-5"><PageHead title="Discharge & Recovery Maintenance" subtitle="Discharge is a verified transition—not an administrative exit."/><Card><CardBody><div className="grid gap-3 md:grid-cols-2">{DISCHARGE_CHECKLIST.map((x:any)=><div key={typeof x==='string'?x:x.item} className="flex gap-3 rounded-xl border p-3 text-sm"><CheckCircle2 className="size-5 shrink-0 text-success"/>{typeof x==='string'?x:x.item}</div>)}</div><button onClick={()=>{setClientStatus('Recovered');showToast('Jordan advanced to Recovered status')}} className="mt-6 rounded-xl bg-gold px-6 py-3 font-semibold text-black">Complete clinical and client review</button></CardBody></Card>{clientStatus==='Recovered'&&<div className="rounded-3xl border border-gold/40 bg-gold/10 p-8 text-center"><Image src="/phoenix-s.png" width={100} height={100} alt="Phoenix S" className="mx-auto rounded-2xl"/><h2 className="mt-4 text-3xl font-semibold text-gold">RECOVERED</h2><p className="mx-auto mt-2 max-w-xl text-white/70">Jordan completed the coordinated continuum and entered voluntary long-term recovery maintenance.</p><div className="mt-6 flex flex-wrap justify-center gap-2">{RECOVERED_HIGHLIGHTS.map(x=><Badge key={x} tone="success">{x}</Badge>)}</div></div>}</div>}

function AuditView(){const {audit}=useDemo();return <div className="space-y-5"><PageHead title="Compliance Audit Trail" subtitle="Every access, authorization, edit, and transfer is attributable and reviewable."/><Card><div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead className="bg-muted"><tr>{['Date / time','User','Organization','Action','Reason'].map(x=><th key={x} className="p-3">{x}</th>)}</tr></thead><tbody>{audit.map(a=><tr key={a.id} className="border-t"><td className="p-3 whitespace-nowrap">{a.date} {a.time}</td><td className="p-3">{a.user}<br/><span className="text-xs text-muted-foreground">{a.role}</span></td><td className="p-3">{a.org}</td><td className="p-3 font-medium">{a.action}</td><td className="p-3">{a.reason}</td></tr>)}</tbody></table></div></Card></div>}

function IntakeView(){const [progress,setProgress]=useState(68);return <div className="space-y-5"><PageHead title="Standardized Intake" subtitle="One protected intake follows the client; receiving facilities verify only what changed."/><Card><CardBody><div className="flex items-center justify-between"><p className="font-semibold">Jordan Mitchell · Intake completion</p><span>{progress}%</span></div><ProgressBar value={progress}/><div className="mt-5 grid gap-3 md:grid-cols-2">{['Identity & demographics','Medical history','Substance-use history','Risk screening','Insurance verification','MBS baseline','Client goals','Consent & signatures'].map((x,i)=><button key={x} onClick={()=>setProgress(Math.min(100,progress+4))} className="flex justify-between rounded-xl border p-4 text-left text-sm"><span>{x}</span>{i<5?<CheckCircle2 className="size-5 text-success"/>:<Clock3 className="size-5 text-gold-foreground"/>}</button>)}</div></CardBody></Card></div>}

function ClientRecord(){return <div className="space-y-5"><PageHead title="Longitudinal Client Record" subtitle="One continuous clinical story across every authorized organization."/><ClientSummaryCard/><Card><CardBody><div className="space-y-5">{[...TIMELINE,...TIMELINE_COMPANY_B].map(t=><div key={t.id} className="relative border-l-2 border-gold/30 pl-5"><span className="absolute -left-[7px] top-1 size-3 rounded-full bg-gold"/><p className="text-xs text-muted-foreground">{t.date} · {t.facility}</p><p className="font-semibold">{t.title}</p><p className="mt-1 text-sm text-muted-foreground">{t.summary}</p></div>)}</div></CardBody></Card></div>}

function NotesView(){return <Generic title="Clinical Documentation" text="Structured notes remain attributable to the authoring company while joining the authorized longitudinal record. Filters support facility, provider, date, level of care, and note type."/>}
function SettingsView(){return <Generic title="Security & Organization Settings" text="Configure role-based access, minimum-necessary views, consent policy, retention, breach response, session timeout, facility directory, and data-sharing agreements."/>}
function Generic({title,text}:{title:string;text:string}){return <div className="space-y-5"><PageHead title={title} subtitle={text}/><Card><CardBody><div className="grid gap-4 md:grid-cols-3">{['Role-based access','Consent policy','Audit & accountability'].map(x=><div key={x} className="rounded-xl border p-5"><ShieldCheck className="text-gold-foreground"/><p className="mt-3 font-semibold">{x}</p><p className="mt-1 text-sm text-muted-foreground">Configured for the demo environment.</p></div>)}</div></CardBody></Card></div>}

function Metric({icon,value,label,detail}:{icon:React.ReactNode;value:string;label:string;detail:string}){return <Card><CardBody><div className="text-gold-foreground">{icon}</div><p className="mt-3 text-3xl font-semibold">{value}</p><p className="font-medium">{label}</p><p className="text-xs text-muted-foreground">{detail}</p></CardBody></Card>}
function AuraAction({title,text,action,onClick}:{title:string;text:string;action:string;onClick:()=>void}){return <div className="flex flex-col gap-3 rounded-xl border p-4 sm:flex-row sm:items-center"><Sparkles className="size-5 shrink-0 text-gold-foreground"/><div className="flex-1"><p className="font-semibold">{title}</p><p className="text-sm text-muted-foreground">{text}</p></div><button onClick={onClick} className="rounded-lg bg-gold px-3 py-2 text-sm font-semibold text-black">{action}</button></div>}
function CompanyCard({company,label}:{company:any;label:string}){return <div className="rounded-2xl border p-5"><Building2 className="text-gold-foreground"/><p className="mt-3 text-xs uppercase text-muted-foreground">{label}</p><p className="font-semibold">{company.name}</p><p className="mt-1 text-sm text-muted-foreground">{company.city}</p><p className="mt-2 text-sm">{company.levels||company.program}</p></div>}
function PageHead({title,subtitle}:{title:string;subtitle:string}){return <div><h1 className="text-2xl font-semibold sm:text-3xl">{title}</h1><p className="mt-1 max-w-4xl text-sm text-white/55 sm:text-base">{subtitle}</p></div>}
