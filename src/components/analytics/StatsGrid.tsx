import { Shield, AlertTriangle, Lock, TrendingUp } from 'lucide-react'
import type { Analytics } from '@/types'
import { SkeletonCard } from '@/components/ui/Skeleton'

interface StatsGridProps {
  analytics: Analytics | undefined
  isLoading: boolean
}

export function StatsGrid({ analytics, isLoading }: StatsGridProps) {
  if (isLoading) {
    return (
      <div className="grid-4">
        {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
    )
  }

  const stats = [
    {
      label: 'Total de Ameaças',
      value: analytics?.totalThreats ?? 0,
      icon: Shield,
      color: 'var(--text-accent)',
      bg: 'var(--accent-cyan-glow)',
      variant: 'default',
    },
    {
      label: 'Críticas',
      value: analytics?.criticalThreats ?? 0,
      icon: AlertTriangle,
      color: 'var(--accent-red)',
      bg: 'var(--accent-red-glow)',
      variant: 'critical',
    },
    {
      label: 'Contidas',
      value: analytics?.containedThreats ?? 0,
      icon: Lock,
      color: '#10b981',
      bg: 'rgba(16,185,129,0.1)',
      variant: 'default',
    },
    {
      label: 'Severidade Média',
      value: analytics?.averageSeverity?.toFixed(1) ?? '0',
      icon: TrendingUp,
      color: 'var(--accent-amber)',
      bg: 'rgba(245,158,11,0.1)',
      variant: analytics?.averageSeverity && analytics.averageSeverity > 6 ? 'warning' : 'default',
    },
  ]

  return (
    <div className="grid-4">
      {stats.map(({ label, value, icon: Icon, color, bg, variant }) => (
        <div key={label} className={`stat-card ${variant}`}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 500 }}>{label}</span>
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: 7,
                background: bg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icon size={14} color={color} />
            </div>
          </div>
          <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em', lineHeight: 1 }}>
            {value}
          </div>
          <div style={{ marginTop: 8 }}>
            <div className="risk-bar">
              <div
                className="risk-bar-fill"
                style={{
                  width: `${Math.min(100, (Number(value) / Math.max(analytics?.totalThreats ?? 1, 1)) * 100)}%`,
                  background: color,
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
