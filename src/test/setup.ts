import '@testing-library/jest-dom'
import { vi } from 'vitest'

// ---- next/navigation mocks ----
vi.mock('next/navigation', () => {
  return {
    usePathname: () => '/',
  }
})

// ---- next-themes mocks ----
vi.mock('next-themes', () => {
  return {
    useTheme: () => ({
      resolvedTheme: 'dark',
      setTheme: vi.fn(),
    }),
  }
})

// ---- next/link mock (keeps href rendering) ----
vi.mock('next/link', () => {
  const React = require('react')
  return {
    __esModule: true,
    default: ({ href, children }: { href: string; children: React.ReactNode }) =>
      React.createElement('a', { href }, children),
  }
})





// ---- lucide-react mock: render deterministic spans for tests ----
vi.mock('lucide-react', () => {
  const React = require('react')
  const mk = (name: string) => {
    return ({ size }: { size?: number; style?: any; color?: any }) => (
      React.createElement('span', { 'data-icon': name, 'data-size': String(size ?? '') })
    )
  }

  return {
    __esModule: true,
    Moon: mk('Moon'),
    Sun: mk('Sun'),
    RefreshCw: mk('RefreshCw'),
    Activity: mk('Activity'),
    AlertTriangle: mk('AlertTriangle'),
    LayoutDashboard: mk('LayoutDashboard'),
    Shield: mk('Shield'),
    Upload: mk('Upload'),
    Zap: mk('Zap'),
    Search: mk('Search'),
    ChevronLeft: mk('ChevronLeft'),
    ChevronRight: mk('ChevronRight'),
    FileJson: mk('FileJson'),
    Plus: mk('Plus'),
    Trash2: mk('Trash2'),
    Loader2: mk('Loader2'),
    CheckCircle: mk('CheckCircle'),
    X: mk('X'),
    Lock: mk('Lock'),
    Clock: mk('Clock'),
    TrendingUp: mk('TrendingUp'),
    BarChart3: mk('BarChart3'),
    PieChart: mk('PieChart'),
  }
})



// ---- charts (recharts) mock ----
vi.mock('recharts', () => {
  const React = require('react')
  const el = (tag: string, props: any, children?: any) => React.createElement(tag, props, children)

  return {
    __esModule: true,
    ResponsiveContainer: ({ children }: { children: React.ReactNode }) => el('div', { 'data-testid': 'recharts-container' }, children),
    PieChart: ({ children }: { children?: React.ReactNode }) => el('div', { 'data-testid': 'piechart' }, children),
    BarChart: ({ children }: { children?: React.ReactNode }) => el('div', { 'data-testid': 'barchart' }, children),
    Pie: ({ children }: { children?: React.ReactNode }) => el('div', { 'data-testid': 'pie' }, children),
    Bar: ({ children }: { children?: React.ReactNode }) => el('div', { 'data-testid': 'bar' }, children),
    XAxis: () => el('div', { 'data-testid': 'xaxis' }),
    YAxis: () => el('div', { 'data-testid': 'yaxis' }),
    Tooltip: () => el('div', { 'data-testid': 'tooltip' }),
    Legend: () => el('div', { 'data-testid': 'legend' }),
    Cell: () => el('div', { 'data-testid': 'cell' }),
  }
})



// ---- deterministic timers ----
vi.useFakeTimers()

