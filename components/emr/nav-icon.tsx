'use client'

import {
  LayoutDashboard,
  Users,
  ClipboardList,
  Route,
  FileText,
  Triangle,
  Pill,
  Briefcase,
  ArrowLeftRight,
  UsersRound,
  TrendingUp,
  CircleCheckBig,
  ShieldCheck,
  Settings,
  type LucideIcon,
} from 'lucide-react'

const map: Record<string, LucideIcon> = {
  LayoutDashboard,
  Users,
  ClipboardList,
  Route,
  FileText,
  Triangle,
  Pill,
  Briefcase,
  ArrowLeftRight,
  UsersRound,
  TrendingUp,
  CircleCheckBig,
  ShieldCheck,
  Settings,
}

export function NavIcon({ name, className }: { name: string; className?: string }) {
  const Icon = map[name] ?? LayoutDashboard
  return <Icon className={className} />
}
