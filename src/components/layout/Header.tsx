'use client'

import { useQueryClient } from '@tanstack/react-query'
import { Moon, RefreshCw, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const routeLabels: Record<string, { title: string; description: string }> = {
  '/': { title: 'Dashboard', description: 'Visão geral do sistema de segurança' },

  '/threats': { title: 'Ameaças', description: 'Registro e monitoramento de indicadores de ameaça' },
  '/ingestion': { title: 'Ingestão em Lote', description: 'Envio em massa de indicadores via JSON ou formulário' },
  '/analytics': { title: 'Analytics', description: 'Estatísticas e métricas agregadas' },
}

export function Header() {
  const { resolvedTheme, setTheme } = useTheme()
  const pathname = usePathname()
  const queryClient = useQueryClient()
  const [refreshing, setRefreshing] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])
  const route = routeLabels[pathname] ?? { title: 'MiniSOAR', description: '' }



  async function handleRefresh() {
    setRefreshing(true)
    await queryClient.invalidateQueries()
    setTimeout(() => setRefreshing(false), 600)
  }

  return (
    <header
      style={{
        height: 'var(--header-height)',
        background: 'var(--bg-surface)',
        borderBottom: '1px solid var(--border-default)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      <div>
        <h1 style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
          {route.title}
        </h1>
        <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 1 }}>
          {route.description}
        </p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <button
          onClick={handleRefresh}
          className="btn btn-secondary btn-sm"
          title="Atualizar dados"
          style={{ padding: '6px 8px' }}
        >
          <RefreshCw size={13} style={{ animation: refreshing ? 'spin 0.6s linear' : 'none' }} />
        </button>

        <button
          onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
          className="btn btn-secondary btn-sm"
          title="Alternar tema"
          style={{ padding: '6px 8px' }}
        >
          {(!mounted || resolvedTheme === 'dark') ? <Sun size={13} /> : <Moon size={13} />}

        </button>


        <div
          style={{
            width: 1,
            height: 20,
            background: 'var(--border-default)',
            margin: '0 4px',
          }}
        />

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '5px 10px',
            background: 'var(--bg-elevated)',
            borderRadius: 7,
            border: '1px solid var(--border-default)',
          }}
        >
          <div
            style={{
              width: 24,
              height: 24,
              borderRadius: 6,
              background: 'var(--accent-cyan-glow)',
              border: '1px solid var(--accent-cyan)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 10,
              fontWeight: 700,
              color: 'var(--text-accent)',
            }}
          >
            SO
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)' }}>SOC Analyst</div>
            <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Administrador</div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </header>
  )
}
