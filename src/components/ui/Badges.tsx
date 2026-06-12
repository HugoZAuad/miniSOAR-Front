import { getSeverityBg, getSeverityLabel } from '@/lib/utils'

interface SeverityBadgeProps {
  severity: number
  showLabel?: boolean
}

export function SeverityBadge({ severity, showLabel = true }: SeverityBadgeProps) {
  const bg = getSeverityBg(severity)
  const label = getSeverityLabel(severity)

  return (
    <span className={`badge ${bg}`}>
      <span
        style={{
          width: 5,
          height: 5,
          borderRadius: '50%',
          background: 'currentColor',
          flexShrink: 0,
        }}
      />
      {showLabel ? label : severity}
      {showLabel && <span style={{ opacity: 0.6 }}>({severity})</span>}
    </span>
  )
}

interface TypeBadgeProps {
  type: string
}

const typeBg: Record<string, string> = {
  IP: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  DOMAIN: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  HASH: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
}

const typeStyle: Record<string, { bg: string; color: string; border: string }> = {
  IP: { bg: 'rgba(34,211,238,0.08)', color: '#22d3ee', border: 'rgba(34,211,238,0.25)' },
  DOMAIN: { bg: 'rgba(168,85,247,0.08)', color: '#a855f7', border: 'rgba(168,85,247,0.25)' },
  HASH: { bg: 'rgba(96,165,250,0.08)', color: '#60a5fa', border: 'rgba(96,165,250,0.25)' },
}

export function TypeBadge({ type }: TypeBadgeProps) {
  const style = typeStyle[type.toUpperCase()] ?? {
    bg: 'rgba(148,163,184,0.08)',
    color: '#94a3b8',
    border: 'rgba(148,163,184,0.25)',
  }

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '2px 7px',
        borderRadius: 4,
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: '0.06em',
        background: style.bg,
        color: style.color,
        border: `1px solid ${style.border}`,
        fontFamily: 'monospace',
      }}
    >
      {type.toUpperCase()}
    </span>
  )
}
