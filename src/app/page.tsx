'use client'

import {
  RecentActivityChart,
  SeverityDistributionChart,
  TypeDistributionChart,
} from '@/components/analytics/Charts'

import { StatsGrid } from '@/components/analytics/StatsGrid'
import { SeverityBadge, TypeBadge } from '@/components/ui/Badges'
import { Skeleton } from '@/components/ui/Skeleton'
import { ToastProvider } from '@/components/ui/Toast'
import { useAnalytics, useThreats } from '@/hooks/useApi'
import { formatRelativeTime } from '@/lib/utils'
import { AlertTriangle, Clock, Shield, TrendingUp } from 'lucide-react'

export default function DashboardPage() {
  const { data: analytics, isLoading: analyticsLoading } = useAnalytics()
  const { data: threatsData, isLoading: threatsLoading } = useThreats({ page: 1, limit: 6 })

  const recentThreats = threatsData?.data ?? []

  return (
    <ToastProvider>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div>
          <h2 className="page-title">Dashboard de Segurança</h2>
          <p className="page-subtitle">Monitoramento em tempo real de ameaças e indicadores</p>
        </div>

        <StatsGrid analytics={analytics} isLoading={analyticsLoading} />

        <div className="grid-3">
          <div className="card">
            <div className="card-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <TrendingUp size={15} color="var(--text-accent)" />
                <span style={{ fontWeight: 600, fontSize: 13 }}>Distribuição por Tipo</span>
              </div>
              <span className="section-label">Indicadores</span>
            </div>
            <div className="card-body">
              <TypeDistributionChart analytics={analytics} isLoading={analyticsLoading} />
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <AlertTriangle size={15} color="var(--accent-amber)" />
                <span style={{ fontWeight: 600, fontSize: 13 }}>Distribuição por Severidade</span>
              </div>
              <span className="section-label">Risk Score</span>
            </div>
            <div className="card-body">
              <SeverityDistributionChart analytics={analytics} isLoading={analyticsLoading} />
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Clock size={15} color="var(--accent-emerald)" />
                <span style={{ fontWeight: 600, fontSize: 13 }}>Atividade Recente</span>
              </div>
              <span className="section-label">Timeline</span>
            </div>
            <div className="card-body">
              {/* Usa o mesmo payload do analytics para plotar atividade recente */}
              {/* (Chart component já existe na página /analytics) */}
              {/* Mantido como recorte mínimo aqui para evitar redundância extra */}
              <RecentActivityChart analytics={analytics} isLoading={analyticsLoading} />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Clock size={15} color="var(--text-accent)" />
              <span style={{ fontWeight: 600, fontSize: 13 }}>Atividade Recente</span>
            </div>
            <a
              href="/threats"
              style={{ fontSize: 12, color: 'var(--text-accent)', textDecoration: 'none', fontWeight: 500 }}
            >
              Ver todas →
            </a>
          </div>

          {threatsLoading ? (

            <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} height={44} />
              ))}
            </div>
          ) : recentThreats.length === 0 ? (
            <div className="empty-state">
              <Shield size={28} />
              <span>Nenhuma ameaça registrada ainda</span>
            </div>
          ) : (
            <div>
              {recentThreats.map((threat, i) => (
                <div
                  key={threat.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                    padding: '12px 20px',
                    borderBottom: i < recentThreats.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                    transition: 'background 0.1s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-hover)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  {threat.severity >= 8 && (
                    <div
                      style={{
                        width: 3,
                        height: 36,
                        borderRadius: 2,
                        background: 'var(--accent-red)',
                        flexShrink: 0,
                      }}
                    />
                  )}
                  <code
                    style={{
                      flex: 1,
                      fontSize: 12,
                      fontFamily: 'monospace',
                      color: 'var(--text-primary)',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {threat.indicator}
                  </code>
                  <TypeBadge type={threat.type} />
                  <SeverityBadge severity={threat.severity} />
                  <span style={{ fontSize: 11, color: 'var(--text-muted)', whiteSpace: 'nowrap', minWidth: 70, textAlign: 'right' }}>
                    {formatRelativeTime(threat.createdAt)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {analytics?.topIndicators && analytics.topIndicators.length > 0 && (
          <div className="card">
            <div className="card-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Shield size={15} color="var(--accent-red)" />
                <span style={{ fontWeight: 600, fontSize: 13 }}>Top Indicadores Recorrentes</span>
              </div>
            </div>
            <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {analytics.topIndicators.slice(0, 5).map((ind, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '8px 12px',
                    background: 'var(--bg-elevated)',
                    borderRadius: 7,
                  }}
                >
                  <span style={{ fontSize: 11, color: 'var(--text-muted)', minWidth: 20 }}>
                    #{i + 1}
                  </span>
                  <code style={{ flex: 1, fontSize: 12, fontFamily: 'monospace', color: 'var(--text-primary)' }}>
                    {ind.indicator}
                  </code>
                  <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                    {ind.count}x
                  </span>
                  <SeverityBadge severity={ind.severity} showLabel={false} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </ToastProvider>
  )
}
