'use client'

import { BarChart3, PieChart, Activity, RefreshCw } from 'lucide-react'
import { useAnalytics } from '@/hooks/useApi'
import { StatsGrid } from '@/components/analytics/StatsGrid'
import {
  TypeDistributionChart,
  SeverityDistributionChart,
  RecentActivityChart,
} from '@/components/analytics/Charts'
import { ToastProvider } from '@/components/ui/Toast'
import { Skeleton } from '@/components/ui/Skeleton'

export default function AnalyticsPage() {
  const { data: analytics, isLoading, refetch, isFetching } = useAnalytics()

  return (
    <ToastProvider>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div className="flex-between">
          <div>
            <h2 className="page-title">Analytics</h2>
            <p className="page-subtitle">Métricas e estatísticas agregadas do sistema SOAR</p>
          </div>
          <button
            onClick={() => refetch()}
            disabled={isFetching}
            className="btn btn-secondary btn-sm"
          >
            <RefreshCw size={13} style={{ animation: isFetching ? 'spin 0.8s linear infinite' : 'none' }} />
            Atualizar
          </button>
        </div>

        <StatsGrid analytics={analytics} isLoading={isLoading} />

        <div className="grid-3">
          <div className="card">
            <div className="card-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <PieChart size={14} color="var(--text-accent)" />
                <span style={{ fontWeight: 600, fontSize: 13 }}>Por Tipo</span>
              </div>
            </div>
            <div className="card-body">
              <TypeDistributionChart analytics={analytics} isLoading={isLoading} />
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <BarChart3 size={14} color="var(--accent-amber)" />
                <span style={{ fontWeight: 600, fontSize: 13 }}>Por Severidade</span>
              </div>
            </div>
            <div className="card-body">
              <SeverityDistributionChart analytics={analytics} isLoading={isLoading} />
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Activity size={14} color="var(--accent-emerald)" />
                <span style={{ fontWeight: 600, fontSize: 13 }}>Atividade Recente</span>
              </div>
            </div>
            <div className="card-body">
              <RecentActivityChart analytics={analytics} isLoading={isLoading} />
            </div>
          </div>
        </div>

        {analytics && (
          <div className="grid-2">
            <div className="card">
              <div className="card-header">
                <span style={{ fontWeight: 600, fontSize: 13 }}>Detalhes por Tipo</span>
              </div>
              <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {Object.entries(analytics.byType ?? {}).length === 0 ? (
                  <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Sem dados</span>
                ) : (
                  Object.entries(analytics.byType ?? {}).map(([type, count]) => (
                    <div key={type} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span
                        style={{
                          minWidth: 60,
                          fontFamily: 'monospace',
                          fontSize: 11,
                          fontWeight: 700,
                          color: type === 'IP' ? '#22d3ee' : type === 'DOMAIN' ? '#a855f7' : '#60a5fa',
                        }}
                      >
                        {type}
                      </span>
                      <div className="risk-bar" style={{ flex: 1 }}>
                        <div
                          className="risk-bar-fill"
                          style={{
                            width: `${Math.round((count / (analytics.totalThreats || 1)) * 100)}%`,
                            background: type === 'IP' ? '#22d3ee' : type === 'DOMAIN' ? '#a855f7' : '#60a5fa',
                          }}
                        />
                      </div>
                      <span style={{ fontSize: 12, color: 'var(--text-secondary)', minWidth: 30, textAlign: 'right' }}>
                        {count}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <span style={{ fontWeight: 600, fontSize: 13 }}>Resumo Executivo</span>
              </div>
              <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  {
                    label: 'Total de ameaças processadas',
                    value: analytics.totalThreats ?? 0,
                    color: 'var(--text-accent)',
                  },
                  {
                    label: 'Ameaças críticas (sev 8–10)',
                    value: analytics.criticalThreats ?? 0,
                    color: 'var(--accent-red)',
                  },
                  {
                    label: 'Contenções ativadas',
                    value: analytics.containedThreats ?? 0,
                    color: '#10b981',
                  },
                  {
                    label: 'Severidade média',
                    value: analytics.averageSeverity?.toFixed(2) ?? '0',
                    color: 'var(--accent-amber)',
                  },
                ].map(({ label, value, color }) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{label}</span>
                    <span style={{ fontSize: 16, fontWeight: 700, color }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </ToastProvider>
  )
}
