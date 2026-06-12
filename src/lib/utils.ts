import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getSeverityLabel(severity: number): string {
  if (severity <= 2) return 'Baixo'
  if (severity <= 4) return 'Médio'
  if (severity <= 7) return 'Alto'
  return 'Crítico'
}

export function getSeverityColor(severity: number): string {
  if (severity <= 2) return 'severity-low'
  if (severity <= 4) return 'severity-medium'
  if (severity <= 7) return 'severity-high'
  return 'severity-critical'
}

export function getSeverityBg(severity: number): string {
  if (severity <= 2) return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
  if (severity <= 4) return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
  if (severity <= 7) return 'bg-orange-500/10 text-orange-400 border-orange-500/20'
  return 'bg-red-500/10 text-red-400 border-red-500/20'
}

export function getTypeBg(type: string): string {
  switch (type.toUpperCase()) {
    case 'IP': return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
    case 'DOMAIN': return 'bg-purple-500/10 text-purple-400 border-purple-500/20'
    case 'HASH': return 'bg-blue-500/10 text-blue-400 border-blue-500/20'
    default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20'
  }
}

export function formatDate(dateStr: string): string {
  try {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(dateStr))
  } catch {
    return dateStr
  }
}

export function formatRelativeTime(dateStr: string): string {
  try {
    const now = new Date()
    const date = new Date(dateStr)
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    if (minutes < 1) return 'agora'
    if (minutes < 60) return `${minutes}m atrás`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}h atrás`
    const days = Math.floor(hours / 24)
    return `${days}d atrás`
  } catch {
    return dateStr
  }
}
