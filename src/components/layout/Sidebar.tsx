'use client'

import { cn } from '@/lib/utils'
import {
  Activity,
  AlertTriangle,
  LayoutDashboard,
  Shield,
  Upload,
  Zap
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/threats', icon: AlertTriangle, label: 'Ameaças' },
  { href: '/ingestion', icon: Upload, label: 'Ingestão em Lote' },

]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside
      style={{
        width: 'var(--sidebar-width)',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        background: 'var(--bg-sidebar)',
        borderRight: '1px solid var(--border-default)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 100,
      }}
    >
      <div
        style={{
          padding: '0 16px',
          height: 'var(--header-height)',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          borderBottom: '1px solid var(--border-default)',
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: 'var(--accent-cyan-glow)',
            border: '1px solid var(--accent-cyan)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Shield size={16} color="var(--accent-cyan)" />
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
            MiniSOAR
          </div>
          <div style={{ fontSize: 10, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Security Platform
          </div>
        </div>
      </div>

      <div style={{ padding: '16px 10px', flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <div className="section-label" style={{ padding: '0 8px', marginBottom: 8 }}>
          Navegação
        </div>
        {navItems.map(({ href, icon: Icon, label }) => (
          <Link
            key={href}
            href={href}
            className={cn('sidebar-nav-item', pathname === href && 'active')}
          >
            <Icon size={15} />
            {label}
          </Link>
        ))}
      </div>

      <div
        style={{
          padding: '12px 10px',
          borderTop: '1px solid var(--border-default)',
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
        }}
      >
        <div
          style={{
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border-default)',
            borderRadius: 8,
            padding: '10px 12px',
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div className="pulse-dot" />
            <span style={{ fontSize: 11, color: 'var(--text-secondary)', fontWeight: 500 }}>
              Sistema Ativo
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-muted)', fontSize: 11 }}>
            <Activity size={11} />
            <span>API conectada</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-muted)', fontSize: 11 }}>
            <Zap size={11} />
            <span>Contenção habilitada</span>
          </div>
        </div>
      </div>
    </aside>
  )
}
