'use client'

import { Skeleton } from '@/components/ui/Skeleton'
import type { Analytics } from '@/types'
import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

export const COLORS = {
  IP: '#22d3ee',
  DOMAIN: '#a855f7',
  HASH: '#60a5fa',
}

export const SEVERITY_COLORS = ['#10b981', '#22d3ee', '#f59e0b', '#ef4444']

interface ChartsProps {
  analytics: Analytics | undefined
  isLoading: boolean
}

export const tooltipStyle = {
  background: 'var(--bg-elevated)',
  border: '1px solid var(--border-default)',
  borderRadius: 8,
  color: 'var(--text-primary)',
  fontSize: 12,
}

export function TypeDistributionChart({ analytics, isLoading }: ChartsProps) {
  if (isLoading) return <Skeleton height={200} />

  const data = Object.entries(analytics?.byType ?? {}).map(([name, value]) => ({
    name,
    value,
    color: COLORS[name as keyof typeof COLORS] ?? '#94a3b8',
  }))

  if (data.length === 0) return (
    <div className="empty-state" style={{ padding: 32 }}>
      <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Sem dados disponíveis</span>
    </div>
  )

  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={55}
          outerRadius={85}
          paddingAngle={3}
          dataKey="value"
        >
          {data.map((entry) => (
            <Cell key={entry.name} fill={entry.color} strokeWidth={0} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={tooltipStyle}
          formatter={(value, name) => [value, name]}
        />
        <Legend
          formatter={(value) => (
            <span style={{ color: 'var(--text-secondary)', fontSize: 12 }}>{value}</span>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}

export function SeverityDistributionChart({ analytics, isLoading }: ChartsProps) {
  if (isLoading) return <Skeleton height={200} />

  const data = Object.entries(analytics?.bySeverity ?? {}).map(([severity, count], i) => ({
    severity: `Sev ${severity}`,
    count,
    fill: SEVERITY_COLORS[Math.min(i, SEVERITY_COLORS.length - 1)],
  }))

  if (data.length === 0) return (
    <div className="empty-state" style={{ padding: 32 }}>
      <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Sem dados disponíveis</span>
    </div>
  )

  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
        <XAxis
          dataKey="severity"
          tick={{ fill: 'var(--text-muted)', fontSize: 11 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: 'var(--text-muted)', fontSize: 11 }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          contentStyle={tooltipStyle}
          cursor={{ fill: 'var(--bg-hover)' }}
        />
        <Bar dataKey="count" name="Ameaças" radius={[4, 4, 0, 0]}>
          {data.map((entry, i) => (
            <Cell key={i} fill={entry.fill} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

export function RecentActivityChart({ analytics, isLoading }: ChartsProps) {
  if (isLoading) return <Skeleton height={200} />

  const data = analytics?.recentActivity ?? []

  if (data.length === 0) return (
    <div className="empty-state" style={{ padding: 32 }}>
      <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Sem atividade recente</span>
    </div>
  )

  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
        <XAxis
          dataKey="date"
          tick={{ fill: 'var(--text-muted)', fontSize: 11 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: 'var(--text-muted)', fontSize: 11 }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'var(--bg-hover)' }} />
        <Bar dataKey="count" name="Eventos" fill="var(--accent-cyan)" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
