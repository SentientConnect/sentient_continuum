// ---------------------------------------------------------------------------
// Sentient Continuum™ — mock data only. No real patient information.
// ---------------------------------------------------------------------------

export type Role =
  | 'Intake Coordinator'
  | 'Clinician'
  | 'Medical Provider'
  | 'Case Manager'
  | 'Facility Administrator'
  | 'Receiving Facility'
  | 'Client View'

export const ROLES: Role[] = [
  'Intake Coordinator',
  'Clinician',
  'Medical Provider',
  'Case Manager',
  'Facility Administrator',
  'Receiving Facility',
  'Client View',
]

export type NavKey =
  | 'dashboard'
  | 'clients'
  | 'intake'
  | 'pathway'
  | 'notes'
  | 'mbs'
  | 'mat'
  | 'case'
  | 'roi'
  | 'team'
  | 'outcomes'
  | 'discharge'
  | 'audit'
  | 'settings'

export interface NavItem {
  key: NavKey
  label: string
  icon: string
  roles: Role[] | 'all'
}

export const NAV_ITEMS: NavItem[] = [
  { key: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard', roles: 'all' },
  { key: 'clients', label: 'Clients', icon: 'Users', roles: 'all' },
  {
    key: 'intake',
    label: 'Intake',
    icon: 'ClipboardList',
    roles: ['Intake Coordinator', 'Clinician', 'Facility Administrator', 'Receiving Facility'],
  },
  { key: 'pathway', label: 'Care Pathway', icon: 'Route', roles: 'all' },
  {
    key: 'notes',
    label: 'Clinical Notes',
    icon: 'FileText',
    roles: ['Clinician', 'Medical Provider', 'Case Manager', 'Facility Administrator', 'Receiving Facility'],
  },
  { key: 'mbs', label: 'MBS Triangulation', icon: 'Triangle', roles: 'all' },
  {
    key: 'mat',
    label: 'Medications & MAT',
    icon: 'Pill',
    roles: ['Clinician', 'Medical Provider', 'Case Manager', 'Facility Administrator', 'Receiving Facility', 'Client View'],
  },
  {
    key: 'case',
    label: 'Case Management',
    icon: 'Briefcase',
    roles: ['Case Manager', 'Clinician', 'Facility Administrator', 'Receiving Facility', 'Client View'],
  },
  {
    key: 'roi',
    label: 'ROI & Transfers',
    icon: 'ArrowLeftRight',
    roles: ['Intake Coordinator', 'Case Manager', 'Facility Administrator', 'Receiving Facility', 'Client View'],
  },
  { key: 'team', label: 'Care Team', icon: 'UsersRound', roles: 'all' },
  {
    key: 'outcomes',
    label: 'Outcomes',
    icon: 'TrendingUp',
    roles: ['Clinician', 'Case Manager', 'Facility Administrator', 'Receiving Facility'],
  },
  {
    key: 'discharge',
    label: 'Discharge Planning',
    icon: 'CircleCheckBig',
    roles: ['Clinician', 'Medical Provider', 'Case Manager', 'Facility Administrator', 'Receiving Facility', 'Client View'],
  },
  {
    key: 'audit',
    label: 'Audit Log',
    icon: 'ShieldCheck',
    roles: ['Facility Administrator', 'Receiving Facility'],
  },
  { key: 'settings', label: 'Settings', icon: 'Settings', roles: 'all' },
]

export const ROLE_DESCRIPTIONS: Record<Role, string> = {
  'Intake Coordinator':
    'Completes standardized intake, verifies insurance, and initiates records requests.',
  Clinician:
    'Owns clinical assessment, care planning, MBS Triangulation, and progress notes.',
  'Medical Provider':
    'Manages diagnoses, medications, and MAT decisions with clinical supervision.',
  'Case Manager':
    'Coordinates housing, employment, transportation, and community reintegration.',
  'Facility Administrator':
    'Oversees compliance, role-based access, audit trail, and facility operations.',
  'Receiving Facility':
    'Company B workspace — receives authorized transfers and continues coordinated care.',
  'Client View':
    'What Jordan sees — goals, consent, medications, and progress toward recovery.',
}

// ---------------------------------------------------------------------------
// Continuum of care
// ---------------------------------------------------------------------------

export const CONTINUUM = [
  'Intake',
  'Detox',
  'Inpatient',
  'Residential',
  'PHP',
  'IOP',
  'Outpatient',
  'Community Reintegration',
  'Recovered',
] as const

export type ContinuumStage = (typeof CONTINUUM)[number]

export const CURRENT_STAGE_INDEX = 5 // IOP

// ---------------------------------------------------------------------------
// Companies
// ---------------------------------------------------------------------------

export const COMPANY_A = {
  id: 'company-a',
  name: 'Company A Recovery Center',
  short: 'Company A',
  city: 'Phoenix, AZ',
  levels: 'Detox · Inpatient · Residential · PHP · IOP',
}

export const COMPANY_B = {
  id: 'company-b',
  name: 'Company B Wellness Network',
  short: 'Company B',
  city: 'Scottsdale, AZ',
  contact: 'Alicia Romero, LCSW — Admissions Director',
  availability: 'Beds available within 48 hours',
  insurance: 'BlueShield PPO, Aetna, Medicaid',
  program: 'Outpatient · Sober Living · Employment Support',
}

// ---------------------------------------------------------------------------
// Demo client — Jordan Mitchell
// ---------------------------------------------------------------------------

export const CLIENT = {
  id: 'JM-1042',
  name: 'Jordan Mitchell',
  age: 31,
  pronouns: 'they/them',
  dob: '05/14/1994',
  primaryConcern: 'Opioid use disorder',
  secondaryConcerns: ['Anxiety', 'Unstable housing', 'Unemployment'],
  levelOfCare: 'IOP',
  organization: COMPANY_A.name,
  status: 'Active',
  recoveryDay: 67,
  riskLevel: 'Moderate' as 'Low' | 'Moderate' | 'High',
  matStatus: 'Active taper plan',
  nextStep: 'Outpatient care and sober living',
  goal: 'Stable recovery, independent housing, meaningful employment and successful community reintegration.',
  phone: '(602) 555-0148',
  email: 'jordan.m@example.com',
  address: 'Transitional housing — Phoenix, AZ',
  emergencyContact: {
    name: 'Dana Mitchell',
    relation: 'Sister',
    phone: '(602) 555-0192',
  },
  insurance: {
    payer: 'BlueShield PPO',
    memberId: 'BSX-88410273',
    group: 'GRP-40921',
    status: 'Verified — authorized through current level of care',
  },
  diagnoses: [
    { code: 'F11.20', label: 'Opioid use disorder, moderate' },
    { code: 'F41.1', label: 'Generalized anxiety disorder' },
  ],
  allergies: ['No known drug allergies'],
  barriers: ['Unstable housing', 'Unemployment', 'Limited transportation'],
}

export const CARE_TEAM = [
  { name: 'Dr. Elena Reyes, MD', role: 'Medical Provider', org: 'Company A', focus: 'MAT & medical oversight' },
  { name: 'Marcus Bell, LPC', role: 'Primary Clinician', org: 'Company A', focus: 'Individual therapy & care plan' },
  { name: 'Priya Nair, MSW', role: 'Case Manager', org: 'Company A', focus: 'Housing, employment, benefits' },
  { name: 'Tomás Vega, CRSS', role: 'Peer Specialist', org: 'Company A', focus: 'Peer support & recovery community' },
  { name: 'Renee Coleman', role: 'Housing Coordinator', org: 'Community Partner', focus: 'Sober living placement' },
  { name: 'Derek Fontaine', role: 'Employment Specialist', org: 'Workforce Partner', focus: 'Vocational readiness' },
  { name: 'Alicia Romero, LCSW', role: 'Receiving Coordinator', org: 'Company B', focus: 'Transfer intake & continuity' },
]

export const MEDICATIONS = [
  { name: 'Buprenorphine/Naloxone 8mg/2mg', purpose: 'MAT — opioid use disorder', schedule: 'Daily, sublingual' },
  { name: 'Sertraline 50mg', purpose: 'Anxiety', schedule: 'Daily, morning' },
]

// ---------------------------------------------------------------------------
// Longitudinal timeline
// ---------------------------------------------------------------------------

export interface TimelineEvent {
  id: string
  date: string
  title: string
  facility: string
  level: string
  staff: string
  summary: string
  documents: string[]
  consent: 'On file' | 'Signed' | 'Transferred' | 'N/A'
  org: 'company-a' | 'company-b'
}

export const TIMELINE: TimelineEvent[] = [
  {
    id: 't1',
    date: 'Mar 2, 2025',
    title: 'Initial Intake',
    facility: COMPANY_A.name,
    level: 'Intake',
    staff: 'Intake Coordinator — S. Okafor',
    summary:
      'Presented with opioid use disorder, anxiety, and housing instability. Standardized intake and MBS baseline completed. Recommended medically supervised detox.',
    documents: ['Intake Assessment', 'Insurance Verification', 'MBS Baseline'],
    consent: 'On file',
    org: 'company-a',
  },
  {
    id: 't2',
    date: 'Mar 3, 2025',
    title: 'Detox Admission',
    facility: COMPANY_A.name,
    level: 'Detox',
    staff: 'Dr. Elena Reyes, MD',
    summary:
      'Admitted for medically supervised withdrawal. Vitals stabilized; buprenorphine induction initiated. Tolerated protocol well.',
    documents: ['Medical Note', 'Withdrawal Assessment (COWS)'],
    consent: 'On file',
    org: 'company-a',
  },
  {
    id: 't3',
    date: 'Mar 9, 2025',
    title: 'Inpatient Transfer',
    facility: COMPANY_A.name,
    level: 'Inpatient',
    staff: 'Marcus Bell, LPC',
    summary:
      'Transitioned to inpatient stabilization. Began individual and group therapy. Anxiety symptoms actively addressed.',
    documents: ['Treatment Plan', 'Group Therapy Note'],
    consent: 'On file',
    org: 'company-a',
  },
  {
    id: 't4',
    date: 'Mar 23, 2025',
    title: 'Residential Progress',
    facility: COMPANY_A.name,
    level: 'Residential',
    staff: 'Marcus Bell, LPC',
    summary:
      'Sustained engagement in residential programming. Coping skills improving; identified housing and employment as key barriers.',
    documents: ['Progress Note', 'Case Management Note'],
    consent: 'On file',
    org: 'company-a',
  },
  {
    id: 't5',
    date: 'Apr 14, 2025',
    title: 'PHP Admission',
    facility: COMPANY_A.name,
    level: 'PHP',
    staff: 'Marcus Bell, LPC',
    summary:
      'Stepped down to partial hospitalization. Structured day programming with continued MAT and case management.',
    documents: ['Treatment Plan Update', 'PHP Assessment'],
    consent: 'On file',
    org: 'company-a',
  },
  {
    id: 't6',
    date: 'May 5, 2025',
    title: 'IOP Admission',
    facility: COMPANY_A.name,
    level: 'IOP',
    staff: 'Marcus Bell, LPC',
    summary:
      'Stepped down to intensive outpatient. Attending group 3x weekly, individual therapy weekly. Current level of care.',
    documents: ['IOP Treatment Plan', 'Weekly Progress Note'],
    consent: 'On file',
    org: 'company-a',
  },
  {
    id: 't7',
    date: 'May 12, 2025',
    title: 'MAT Evaluation',
    facility: COMPANY_A.name,
    level: 'IOP',
    staff: 'Dr. Elena Reyes, MD',
    summary:
      'MAT reviewed. Cravings reduced and adherence strong. Provider-supervised taper plan initiated based on stability and client preference.',
    documents: ['MAT Review', 'Urine Screen Result'],
    consent: 'On file',
    org: 'company-a',
  },
  {
    id: 't8',
    date: 'May 20, 2025',
    title: 'Housing Referral',
    facility: COMPANY_A.name,
    level: 'IOP',
    staff: 'Priya Nair, MSW',
    summary:
      'Referred to sober living network. Application submitted; awaiting placement confirmation to support step-down.',
    documents: ['Housing Referral', 'Case Management Note'],
    consent: 'On file',
    org: 'company-a',
  },
  {
    id: 't9',
    date: 'May 28, 2025',
    title: 'Employment Support',
    facility: COMPANY_A.name,
    level: 'IOP',
    staff: 'Derek Fontaine',
    summary:
      'Enrolled in vocational readiness program. Resume completed and two interviews scheduled with recovery-friendly employers.',
    documents: ['Employment Plan'],
    consent: 'On file',
    org: 'company-a',
  },
  {
    id: 't10',
    date: 'Jun 6, 2025',
    title: 'Outpatient Recommendation',
    facility: COMPANY_A.name,
    level: 'IOP → Outpatient',
    staff: 'Marcus Bell, LPC',
    summary:
      'Care team recommends step-down to outpatient with sober living. Coordinated transfer to Company B Wellness Network proposed.',
    documents: ['Transition Note', 'Care Pathway Update'],
    consent: 'Signed',
    org: 'company-a',
  },
]

// Events appended after transfer to Company B (revealed by demo state)
export const TIMELINE_COMPANY_B: TimelineEvent[] = [
  {
    id: 't11',
    date: 'Jun 12, 2025',
    title: 'Received Transfer & Outpatient Admission',
    facility: COMPANY_B.name,
    level: 'Outpatient',
    staff: 'Alicia Romero, LCSW',
    summary:
      'Authorized longitudinal record received from Company A. No duplicate intake required. Admitted to outpatient with sober living placement.',
    documents: ['Transfer Summary', 'Outpatient Treatment Plan'],
    consent: 'Transferred',
    org: 'company-b',
  },
  {
    id: 't12',
    date: 'Jul 1, 2025',
    title: 'Community Reintegration',
    facility: COMPANY_B.name,
    level: 'Community Reintegration',
    staff: 'Priya Nair, MSW (shared)',
    summary:
      'Secured part-time employment and stable sober living. MAT taper progressing. Peer support and community connections strengthening.',
    documents: ['Case Management Note', 'MBS Reassessment'],
    consent: 'On file',
    org: 'company-b',
  },
]

// ---------------------------------------------------------------------------
// MBS Triangulation
// ---------------------------------------------------------------------------

export interface MbsMetric {
  label: string
  score: number
  trend: number[] // weekly 1-10
}

export interface MbsPillar {
  key: 'mind' | 'body' | 'spirit'
  title: string
  metrics: MbsMetric[]
  strengths: string[]
  risks: string[]
  clientGoals: string[]
  recommendations: string[]
  dailyActions: string[]
}

const t = (arr: number[]) => arr

export const MBS: MbsPillar[] = [
  {
    key: 'mind',
    title: 'Mind',
    metrics: [
      { label: 'Anxiety (lower is better)', score: 4, trend: t([8, 7, 7, 6, 5, 5, 4]) },
      { label: 'Depression (lower is better)', score: 3, trend: t([6, 6, 5, 5, 4, 4, 3]) },
      { label: 'Clarity', score: 7, trend: t([3, 4, 4, 5, 6, 6, 7]) },
      { label: 'Focus', score: 6, trend: t([3, 4, 5, 5, 5, 6, 6]) },
      { label: 'Shame (lower is better)', score: 4, trend: t([8, 7, 6, 6, 5, 5, 4]) },
      { label: 'Decision readiness', score: 7, trend: t([3, 4, 5, 5, 6, 7, 7]) },
      { label: 'Emotional regulation', score: 7, trend: t([4, 4, 5, 6, 6, 6, 7]) },
    ],
    strengths: ['Consistent therapy engagement', 'Improved emotional regulation', 'Growing decision confidence'],
    risks: ['Anticipatory anxiety around transitions', 'Occasional intrusive shame'],
    clientGoals: ['Manage anxiety without avoidance', 'Feel ready to make my own decisions'],
    recommendations: ['Continue weekly CBT', 'Add a transition-planning session before step-down'],
    dailyActions: ['5-minute morning grounding practice', 'Name one clear decision made today', 'Journal one reframed thought'],
  },
  {
    key: 'body',
    title: 'Body',
    metrics: [
      { label: 'Sleep', score: 7, trend: t([3, 4, 5, 5, 6, 6, 7]) },
      { label: 'Nutrition', score: 6, trend: t([4, 4, 5, 5, 6, 6, 6]) },
      { label: 'Energy', score: 6, trend: t([3, 4, 4, 5, 5, 6, 6]) },
      { label: 'Cravings (lower is better)', score: 3, trend: t([7, 6, 6, 5, 4, 4, 3]) },
      { label: 'Medication adherence', score: 9, trend: t([6, 7, 8, 8, 9, 9, 9]) },
      { label: 'Physical health', score: 7, trend: t([4, 5, 5, 6, 6, 7, 7]) },
      { label: 'Substance-free stability', score: 8, trend: t([4, 5, 6, 6, 7, 7, 8]) },
    ],
    strengths: ['Strong medication adherence', 'Cravings substantially reduced', 'Improving sleep routine'],
    risks: ['Nutrition inconsistent on busy days', 'Energy dips mid-afternoon'],
    clientGoals: ['Sleep 7+ hours consistently', 'Keep cravings manageable'],
    recommendations: ['Continue MAT taper as tolerated', 'Nutrition check-in with case manager'],
    dailyActions: ['Consistent sleep and wake time', 'Log cravings and triggers', 'One balanced meal planned ahead'],
  },
  {
    key: 'spirit',
    title: 'Spirit',
    metrics: [
      { label: 'Purpose', score: 7, trend: t([3, 4, 5, 5, 6, 6, 7]) },
      { label: 'Integrity', score: 7, trend: t([4, 5, 5, 6, 6, 7, 7]) },
      { label: 'Connection', score: 6, trend: t([3, 3, 4, 5, 5, 6, 6]) },
      { label: 'Forgiveness', score: 6, trend: t([2, 3, 4, 4, 5, 5, 6]) },
      { label: 'Gratitude', score: 7, trend: t([3, 4, 5, 6, 6, 7, 7]) },
      { label: 'Service', score: 6, trend: t([2, 3, 4, 4, 5, 5, 6]) },
      { label: 'Peace', score: 6, trend: t([3, 4, 4, 5, 5, 6, 6]) },
    ],
    strengths: ['Renewed sense of purpose', 'Daily gratitude practice', 'Reconnecting with sister'],
    risks: ['Isolation risk during housing transition', 'Self-forgiveness still developing'],
    clientGoals: ['Rebuild trust with family', 'Give back through peer support'],
    recommendations: ['Connect with recovery community group', 'Explore peer mentorship opportunity'],
    dailyActions: ['Write three gratitudes', 'One act of service or connection', 'Five minutes of quiet reflection'],
  },
]

// ---------------------------------------------------------------------------
// Care pathway
// ---------------------------------------------------------------------------

export const RECOMMENDED_PATHWAY = [
  'IOP',
  'Outpatient',
  'Sober Living',
  'Employment Support',
  'Independent Housing',
  'Community Reintegration',
  'Recovered',
]

export const PATHWAY_FACTORS = [
  { label: 'Readiness score', value: 'High (8/10)', good: true },
  { label: 'Housing readiness', value: 'In progress — sober living pending', good: true },
  { label: 'Medication stability', value: 'Stable — supervised taper', good: true },
  { label: 'Transportation availability', value: 'Limited — bus pass provided', good: false },
  { label: 'Insurance approval', value: 'Authorized for outpatient', good: true },
  { label: 'Receiving-facility availability', value: 'Company B — beds within 48h', good: true },
]

// ---------------------------------------------------------------------------
// MAT pathway
// ---------------------------------------------------------------------------

export const MAT_PLAN = {
  medication: 'Buprenorphine/Naloxone (Suboxone)',
  provider: 'Dr. Elena Reyes, MD',
  currentDose: '8mg/2mg daily',
  startDate: 'Mar 3, 2025',
  reviewDate: 'Jul 15, 2025',
  urineScreens: 'Consistent with prescribed medication; no illicit substances (last 6 screens)',
  cravingTrend: [7, 6, 6, 5, 4, 4, 3],
  withdrawalTrend: [8, 6, 5, 4, 3, 3, 2],
  sideEffects: 'Mild; none limiting',
  clientPreference: 'Open to gradual taper with provider support',
  rationale: 'Sustained stability, reduced cravings, strong adherence, and improving support network.',
  taperReadiness: 'Appropriate for gradual, supervised taper',
}

export const MAT_PATHWAYS = [
  {
    title: 'Continue MAT',
    body: 'Maintain current dose to sustain stability. Appropriate when cravings or stressors remain elevated.',
    selected: false,
  },
  {
    title: 'Adjust MAT',
    body: 'Modify dose based on clinical response and side effects. Individualized to the client’s current needs.',
    selected: false,
  },
  {
    title: 'Clinically Supervised Taper',
    body: 'Gradual, provider-supervised reduction based on stability, preference, and relapse risk. Recommended for Jordan.',
    selected: true,
  },
]

// ---------------------------------------------------------------------------
// Case management
// ---------------------------------------------------------------------------

export type CaseStatus = 'Complete' | 'In Progress' | 'Not Started' | 'At Risk'

export interface CaseItem {
  label: string
  status: CaseStatus
  owner: string
  due: string
  barrier: string
  nextAction: string
  evidence: string
}

export const CASE_ITEMS: CaseItem[] = [
  { label: 'Identification documents', status: 'Complete', owner: 'Priya Nair', due: 'Mar 10', barrier: 'None', nextAction: 'Filed', evidence: 'State ID on file' },
  { label: 'Insurance', status: 'Complete', owner: 'Intake', due: 'Mar 2', barrier: 'None', nextAction: 'Reverify at transfer', evidence: 'BlueShield verified' },
  { label: 'Primary care', status: 'In Progress', owner: 'Priya Nair', due: 'Jul 20', barrier: 'Transportation', nextAction: 'Book new-patient visit', evidence: '—' },
  { label: 'Psychiatry', status: 'Complete', owner: 'Dr. Reyes', due: 'Apr 1', barrier: 'None', nextAction: 'Continue', evidence: 'Established' },
  { label: 'Therapy', status: 'Complete', owner: 'Marcus Bell', due: 'Mar 9', barrier: 'None', nextAction: 'Continue weekly', evidence: 'Active' },
  { label: 'MAT provider', status: 'Complete', owner: 'Dr. Reyes', due: 'Mar 3', barrier: 'None', nextAction: 'Continue taper', evidence: 'Active' },
  { label: 'Transportation', status: 'At Risk', owner: 'Priya Nair', due: 'Jul 10', barrier: 'No vehicle', nextAction: 'Provide bus pass', evidence: 'Pass issued' },
  { label: 'Housing', status: 'In Progress', owner: 'Renee Coleman', due: 'Jul 8', barrier: 'Waitlist', nextAction: 'Confirm placement', evidence: 'Application in' },
  { label: 'Sober living', status: 'In Progress', owner: 'Renee Coleman', due: 'Jul 8', barrier: 'Availability', nextAction: 'Confirm bed', evidence: 'Pending' },
  { label: 'Employment', status: 'In Progress', owner: 'Derek Fontaine', due: 'Jul 15', barrier: 'Gap in history', nextAction: 'Attend interviews', evidence: '2 scheduled' },
  { label: 'Education', status: 'Not Started', owner: 'Derek Fontaine', due: 'Aug 1', barrier: 'Focus on employment', nextAction: 'Explore GED options', evidence: '—' },
  { label: 'Legal obligations', status: 'Complete', owner: 'Priya Nair', due: 'Apr 15', barrier: 'None', nextAction: 'None', evidence: 'No active obligations' },
  { label: 'Family reunification', status: 'In Progress', owner: 'Marcus Bell', due: 'Ongoing', barrier: 'Rebuilding trust', nextAction: 'Family session', evidence: 'Sister engaged' },
  { label: 'Peer support', status: 'Complete', owner: 'Tomás Vega', due: 'Mar 15', barrier: 'None', nextAction: 'Continue', evidence: 'Weekly group' },
  { label: 'Recovery community', status: 'In Progress', owner: 'Tomás Vega', due: 'Jul 12', barrier: 'New area', nextAction: 'Connect locally', evidence: 'Meetings identified' },
  { label: 'Financial stability', status: 'In Progress', owner: 'Priya Nair', due: 'Aug 1', barrier: 'Income', nextAction: 'Benefits + budget plan', evidence: 'SNAP applied' },
  { label: 'Long-term wellness plan', status: 'In Progress', owner: 'Care Team', due: 'At discharge', barrier: 'None', nextAction: 'Finalize with client', evidence: 'Draft complete' },
]

// ---------------------------------------------------------------------------
// Care team alignment
// ---------------------------------------------------------------------------

export const CARE_TEAM_UPDATES = [
  { author: 'Marcus Bell, LPC', time: '2h ago', text: 'Jordan expressed readiness for outpatient step-down. Recommends coordinated transfer.' },
  { author: 'Priya Nair, MSW', time: '5h ago', text: 'Sober living application submitted. Awaiting placement confirmation.' },
  { author: 'Dr. Elena Reyes, MD', time: '1d ago', text: 'MAT taper progressing well. No dose adjustment needed this week.' },
  { author: 'Derek Fontaine', time: '1d ago', text: 'Two interviews scheduled with recovery-friendly employers.' },
]

export const ALIGNMENT_CHECKS = [
  { label: 'Duplicate tasks', status: 'clear', detail: 'No duplicate tasks detected across the team.' },
  { label: 'Conflicting plans', status: 'clear', detail: 'Care plans are aligned toward outpatient step-down.' },
  { label: 'Missing follow-up', status: 'warn', detail: 'Primary care follow-up not yet scheduled.' },
  { label: 'Medication discrepancies', status: 'clear', detail: 'Medication list reconciled across providers.' },
  { label: 'Discharge risks', status: 'warn', detail: 'Housing placement must be confirmed before step-down.' },
  { label: 'Unresolved housing barriers', status: 'warn', detail: 'Sober living bed pending confirmation.' },
  { label: 'Unconfirmed receiving provider', status: 'clear', detail: 'Company B confirmed and coordinated.' },
]

// ---------------------------------------------------------------------------
// Clinical notes
// ---------------------------------------------------------------------------

export interface ClinicalNote {
  id: string
  type: string
  date: string
  provider: string
  facility: string
  level: string
  summary: string
}

export const NOTE_TYPES = [
  'Intake note',
  'Individual therapy',
  'Group therapy',
  'Medical note',
  'Case-management note',
  'MAT review',
  'Transition note',
  'Discharge summary',
  'Community follow-up',
]

export const CLINICAL_NOTES: ClinicalNote[] = [
  { id: 'n1', type: 'Intake note', date: 'Mar 2, 2025', provider: 'S. Okafor', facility: 'Company A', level: 'Intake', summary: 'Comprehensive biopsychosocial completed. OUD with anxiety and housing instability identified. Detox recommended.' },
  { id: 'n2', type: 'Medical note', date: 'Mar 3, 2025', provider: 'Dr. Reyes', facility: 'Company A', level: 'Detox', summary: 'Buprenorphine induction. Vitals stable. Withdrawal well managed.' },
  { id: 'n3', type: 'Individual therapy', date: 'Mar 12, 2025', provider: 'Marcus Bell', facility: 'Company A', level: 'Inpatient', summary: 'CBT focus on triggers and anxiety. Client engaged and motivated.' },
  { id: 'n4', type: 'Group therapy', date: 'Mar 20, 2025', provider: 'Marcus Bell', facility: 'Company A', level: 'Residential', summary: 'Relapse-prevention group. Active participation and peer support.' },
  { id: 'n5', type: 'Case-management note', date: 'May 20, 2025', provider: 'Priya Nair', facility: 'Company A', level: 'IOP', summary: 'Housing referral submitted. Employment program enrollment completed.' },
  { id: 'n6', type: 'MAT review', date: 'May 12, 2025', provider: 'Dr. Reyes', facility: 'Company A', level: 'IOP', summary: 'Cravings reduced, adherence strong. Supervised taper plan initiated.' },
  { id: 'n7', type: 'Transition note', date: 'Jun 6, 2025', provider: 'Marcus Bell', facility: 'Company A', level: 'IOP → Outpatient', summary: 'Recommends coordinated transfer to Company B for outpatient and sober living.' },
]

// ---------------------------------------------------------------------------
// Records for transfer
// ---------------------------------------------------------------------------

export const RECORD_CATEGORIES = [
  'Intake',
  'Assessments',
  'Diagnoses',
  'Medical history',
  'Medication history',
  'MAT records',
  'Clinical notes',
  'Treatment plans',
  'Progress notes',
  'Risk assessments',
  'Case-management notes',
  'Housing records',
  'Employment records',
  'Discharge summaries',
  'Prior ROI transfer records',
  'MBS Triangulation history',
  'Outcome measurements',
]

export const TRANSFER_STEPS = [
  'Consent verified',
  'Identity matched',
  'Records packaged',
  'Transfer encrypted',
  'Receiving facility notified',
  'Record copied into receiving intake workflow',
  'Audit log created',
]

// ---------------------------------------------------------------------------
// Outcomes
// ---------------------------------------------------------------------------

export interface Outcome {
  label: string
  before: string
  after: string
  improved: boolean
}

export const OUTCOMES: Outcome[] = [
  { label: 'Treatment completion', before: '—', after: 'On track', improved: true },
  { label: 'Successful transitions', before: '0', after: '6 of 6', improved: true },
  { label: 'Transfer completion time', before: 'Days (fax/mail)', after: 'Under 5 minutes', improved: true },
  { label: 'Duplicate intake reduction', before: 'Full re-intake', after: '82% auto-completed', improved: true },
  { label: 'Client-reported satisfaction', before: '6/10', after: '9/10', improved: true },
  { label: 'Housing stability', before: 'Unstable', after: 'Sober living secured', improved: true },
  { label: 'Employment status', before: 'Unemployed', after: 'Part-time employed', improved: true },
  { label: 'Substance-free stability', before: '4/10', after: '8/10', improved: true },
  { label: 'Emergency readmission', before: 'At risk', after: 'None', improved: true },
  { label: 'Follow-up completion', before: '55%', after: '94%', improved: true },
  { label: 'MBS improvement', before: '4.1 avg', after: '6.6 avg', improved: true },
  { label: 'Care-plan completion', before: '40%', after: '88%', improved: true },
  { label: 'Community reintegration', before: 'Not started', after: 'In progress', improved: true },
]

export const MBS_OVERALL_TREND = [
  { week: 'W1', mind: 4.4, body: 4.4, spirit: 2.9 },
  { week: 'W2', mind: 4.7, body: 5.0, spirit: 3.7 },
  { week: 'W3', mind: 5.1, body: 5.3, spirit: 4.4 },
  { week: 'W4', mind: 5.4, body: 5.6, spirit: 5.0 },
  { week: 'W5', mind: 5.9, body: 6.1, spirit: 5.4 },
  { week: 'W6', mind: 6.1, body: 6.4, spirit: 6.0 },
  { week: 'W7', mind: 6.4, body: 6.7, spirit: 6.3 },
]

// ---------------------------------------------------------------------------
// Discharge
// ---------------------------------------------------------------------------

export const DISCHARGE_CHECKLIST = [
  'Stable housing',
  'Ongoing medical care',
  'Behavioral-health support',
  'Medication plan',
  'MAT plan (when applicable)',
  'Employment or education plan',
  'Transportation',
  'Peer support',
  'Emergency plan',
  'Relapse-prevention plan',
  'Primary-care connection',
  'Community resources',
  'Client-defined recovery goals',
  'Final MBS assessment',
  'Follow-up schedule',
  'Client approval of discharge plan',
]

export const STATUS_OPTIONS = [
  'Active Treatment',
  'Transitioning',
  'Continuing Care',
  'Community Reintegration',
  'Recovery Maintenance',
  'Recovered',
] as const

export type ClientStatus = (typeof STATUS_OPTIONS)[number]

export const RECOVERED_HIGHLIGHTS = [
  '365 days of continued stability',
  'Stable housing',
  'Employment',
  'Ongoing outpatient support',
  'Strong recovery network',
  'Improved MBS scores',
  'No unresolved care transitions',
  'Client-defined goals achieved',
]

// ---------------------------------------------------------------------------
// Audit log
// ---------------------------------------------------------------------------

export interface AuditEntry {
  id: string
  user: string
  role: Role
  org: string
  date: string
  time: string
  action: string
  reason: string
  device: string
}

export const AUDIT_LOG: AuditEntry[] = [
  { id: 'a1', user: 'S. Okafor', role: 'Intake Coordinator', org: 'Company A', date: 'Jun 10, 2025', time: '09:14', action: 'Record viewed', reason: 'Transfer preparation', device: '10.0.4.21 · Workstation' },
  { id: 'a2', user: 'Priya Nair', role: 'Case Manager', org: 'Company A', date: 'Jun 10, 2025', time: '09:41', action: 'ROI created', reason: 'Coordinated transfer to Company B', device: '10.0.4.33 · Laptop' },
  { id: 'a3', user: 'Jordan Mitchell', role: 'Client View', org: 'Company A', date: 'Jun 10, 2025', time: '10:02', action: 'Consent signed', reason: 'Authorized record sharing', device: '10.0.9.88 · Mobile' },
  { id: 'a4', user: 'Priya Nair', role: 'Case Manager', org: 'Company A', date: 'Jun 10, 2025', time: '10:05', action: 'Records transferred', reason: 'Encrypted transfer to Company B', device: '10.0.4.33 · Laptop' },
  { id: 'a5', user: 'Alicia Romero', role: 'Receiving Facility', org: 'Company B', date: 'Jun 10, 2025', time: '10:07', action: 'Receiving facility accessed record', reason: 'Intake continuity', device: '10.2.1.14 · Workstation' },
  { id: 'a6', user: 'Dr. Reyes', role: 'Medical Provider', org: 'Company A', date: 'May 12, 2025', time: '14:22', action: 'Medication updated', reason: 'MAT taper plan', device: '10.0.4.10 · Workstation' },
  { id: 'a7', user: 'Marcus Bell', role: 'Clinician', org: 'Company A', date: 'Jun 6, 2025', time: '11:30', action: 'Care pathway changed', reason: 'Step-down to outpatient', device: '10.0.4.18 · Laptop' },
]
