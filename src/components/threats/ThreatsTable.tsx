'use client'

import { useState } from 'react'
import { Search, ChevronLeft, ChevronRight, Shield, AlertTriangle } from 'lucide-react'
import { useThreats } from '@/hooks/useApi'
import { SeverityBadge, TypeBadge } from '@/components/ui/Badges'
import { SkeletonTableRow } from '@/components/ui/Skeleton'
import { formatRelativeTime } from '@/lib/utils'
import type { ThreatFilters } from '@/types'

export function ThreatsTable() {
  const [filters, setFilters] = useState<ThreatFilters>({ page: 1, limit: 15 })
  const [indicatorInput, setIndicatorInput] = useState('')

  const { data, isLoading, isError } = useThreats(filters)

  function handleSearch() {
    setFilters((f) => ({ ...f, page: 1, indicator: indicatorInput || undefined }))
  }

  function handleSeverityFilter(val: string) {
    setFilters((f) => ({ ...f, page: 1, severity: val ? Number(val) : undefined }))
  }

  function handlePageChange(page: number) {
    setFilters((f) => ({ ...f, page }))
  }

  const total = data?.total ?? 0
  const page = data?.page ?? 1
  const limit = data?.limit ?? 15
  const totalPages = Math.max(1, Math.ceil(total / limit))

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '14px 20px',
          borderBottom: '1px solid var(--border-default)',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, minWidth: 200 }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search
              size={13}
              style={{
                position: 'absolute',
                left: 10,
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-muted)',
              }}
            />
            <input
              value={indicatorInput}
              onChange={(e) => setIndicatorInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="input"
              placeholder="Buscar por indicador..."
              style={{ paddingLeft: 32 }}
            />
          </div>
          <button onClick={handleSearch} className="btn btn-secondary btn-sm">
            Buscar
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Severidade:</span>
          <div style={{ position: 'relative' }}>
            <select
              className="select"
              style={{ width: 110, fontSize: 12, padding: '6px 28px 6px 10px' }}
              onChange={(e) => handleSeverityFilter(e.target.value)}
            >
              <option value="">Todas</option>
              {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
            <div style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text-muted)', fontSize: 10 }}>▾</div>
          </div>
        </div>

        <span style={{ fontSize: 12, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
          {total} resultado{total !== 1 ? 's' : ''}
        </span>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Indicador</th>
              <th>Tipo</th>
              <th>Severidade</th>
              <th>Risco</th>
              <th>Contenção</th>
              <th>Registrado</th>
            </tr>
          </thead>
          <tbody>
            {isLoading &&
              Array.from({ length: 8 }).map((_, i) => <SkeletonTableRow key={i} />)
            }
            {isError && (
              <tr>
                <td colSpan={6}>
                  <div className="empty-state" style={{ padding: 40 }}>
                    <AlertTriangle size={28} color="var(--accent-red)" />
                    <span style={{ color: 'var(--text-muted)' }}>Erro ao carregar ameaças. Verifique a API Key e a conexão.</span>
                  </div>
                </td>
              </tr>
            )}
            {!isLoading && !isError && data?.data.length === 0 && (
              <tr>
                <td colSpan={6}>
                  <div className="empty-state">
                    <Shield size={28} />
                    <span>Nenhuma ameaça encontrada</span>
                    <span style={{ fontSize: 12 }}>Registre a primeira ameaça usando o formulário acima</span>
                  </div>
                </td>
              </tr>
            )}
            {!isLoading &&
              data?.data.map((threat) => (
                <tr
                  key={threat.id}
                  className={threat.severity >= 8 ? 'threat-row-critical' : ''}
                  style={{ position: 'relative' }}
                >
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      {threat.severity >= 8 && (
                        <div
                          style={{
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            bottom: 0,
                            width: 2,
                            background: 'var(--accent-red)',
                          }}
                        />
                      )}
                      <code
                        style={{
                          fontSize: 12,
                          fontFamily: 'monospace',
                          color: 'var(--text-primary)',
                          background: 'var(--bg-elevated)',
                          padding: '2px 6px',
                          borderRadius: 4,
                          maxWidth: 220,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          display: 'block',
                        }}
                        title={threat.indicator}
                      >
                        {threat.indicator}
                      </code>
                    </div>
                  </td>
                  <td><TypeBadge type={threat.type} /></td>
                  <td><SeverityBadge severity={threat.severity} /></td>
                  <td>
                    {threat.riskScore !== undefined ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div className="risk-bar" style={{ width: 60 }}>
                          <div
                            className="risk-bar-fill"
                            style={{
                              width: `${threat.riskScore}%`,
                              background:
                                threat.riskScore >= 70
                                  ? 'var(--accent-red)'
                                  : threat.riskScore >= 40
                                  ? 'var(--accent-amber)'
                                  : 'var(--accent-emerald)',
                            }}
                          />
                        </div>
                        <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                          {threat.riskScore}
                        </span>
                      </div>
                    ) : (
                      <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>—</span>
                    )}
                  </td>
                  <td>
                    {threat.containment ? (
                      <span style={{ fontSize: 11, color: 'var(--accent-red)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-red)', display: 'inline-block' }} />
                        Contida
                      </span>
                    ) : (
                      <span style={{ fontSize: 11, color: 'var(--accent-emerald)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-emerald)', display: 'inline-block' }} />
                        Livre
                      </span>
                    )}
                  </td>
                  <td>
                    <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                      {formatRelativeTime(threat.createdAt)}
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 20px',
            borderTop: '1px solid var(--border-default)',
          }}
        >
          <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
            Página {page} de {totalPages}
          </span>
          <div style={{ display: 'flex', gap: 6 }}>
            <button
              disabled={page <= 1}
              onClick={() => handlePageChange(page - 1)}
              className="btn btn-secondary btn-sm"
              style={{ padding: '5px 8px' }}
            >
              <ChevronLeft size={13} />
            </button>
            <button
              disabled={page >= totalPages}
              onClick={() => handlePageChange(page + 1)}
              className="btn btn-secondary btn-sm"
              style={{ padding: '5px 8px' }}
            >
              <ChevronRight size={13} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
