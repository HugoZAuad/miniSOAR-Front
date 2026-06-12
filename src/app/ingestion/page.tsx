'use client'

import { Upload, FileJson, Zap } from 'lucide-react'
import { IngestionForm } from '@/components/ingestion/IngestionForm'
import { ToastProvider } from '@/components/ui/Toast'

export default function IngestionPage() {
  return (
    <ToastProvider>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div>
          <h2 className="page-title">Ingestão em Lote</h2>
          <p className="page-subtitle">Envio em massa de indicadores de ameaça via formulário tabular ou JSON</p>
        </div>

        <div className="grid-3">
          {[
            {
              icon: Upload,
              title: 'Formulário Tabular',
              desc: 'Adicione ameaças linha por linha com campos editáveis diretamente na tabela.',
            },
            {
              icon: FileJson,
              title: 'Importação JSON',
              desc: 'Cole um array JSON com múltiplos indicadores para importação rápida em massa.',
            },
            {
              icon: Zap,
              title: 'Processamento Automático',
              desc: 'Cada item recebe enriquecimento, score de risco e contenção automática se necessário.',
            },
          ].map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-default)',
                borderRadius: 10,
                padding: 16,
                display: 'flex',
                gap: 12,
              }}
            >
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 8,
                  background: 'var(--accent-cyan-glow)',
                  border: '1px solid var(--border-accent)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Icon size={15} color="var(--text-accent)" />
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--text-primary)', marginBottom: 4 }}>
                  {title}
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="card">
          <div className="card-header">
            <span style={{ fontWeight: 600, fontSize: 13 }}>Lote de Ameaças</span>
            <span className="section-label">POST /api/v1/ingestion</span>
          </div>
          <IngestionForm />
        </div>

        <div
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-default)',
            borderRadius: 10,
            padding: 16,
          }}
        >
          <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--text-primary)', marginBottom: 12 }}>
            Exemplo de payload JSON
          </div>
          <pre
            style={{
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border-default)',
              borderRadius: 8,
              padding: 16,
              fontSize: 12,
              fontFamily: 'monospace',
              color: 'var(--text-secondary)',
              overflowX: 'auto',
              lineHeight: 1.6,
            }}
          >
{`{
  "threats": [
    { "indicator": "1.1.1.1",    "type": "IP",     "severity": 3 },
    { "indicator": "evil.com",   "type": "DOMAIN", "severity": 8 },
    { "indicator": "abc123def",  "type": "HASH",   "severity": 9 }
  ]
}`}
          </pre>
        </div>
      </div>
    </ToastProvider>
  )
}
