import { Header } from '@/components/layout/Header'
import { Sidebar } from '@/components/layout/Sidebar'
import { ReactQueryProvider } from '@/lib/query-provider'
import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import './globals.css'



export const metadata: Metadata = {
  title: 'MiniSOAR',
  description: 'Plataforma de Segurança SOAR — Orquestração, Automação e Resposta',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <ReactQueryProvider>
            <div className="app-shell">
              <Sidebar />
              <div className="main-area">
                <Header />
                <main className="page-content">{children}</main>
              </div>
            </div>
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
