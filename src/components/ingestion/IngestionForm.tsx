'use client'

import { useState } from 'react'
import { Upload, Plus, Trash2, FileJson, Loader2, CheckCircle } from 'lucide-react'
import { useIngest } from '@/hooks/useApi'
import { useToast } from '@/components/ui/Toast'
import { TypeBadge, SeverityBadge } from '@/components/ui/Badges'
import type { CreateThreatDto } from '@/types'

const EMPTY_THREAT: CreateThreatDto = { indicator: '', type: 'IP', severity: 5 }

interface IngestionResult {
  processed: number
  timestamp: string
}

export function IngestionForm() {
  const [threats, setThreats] = useState<CreateThreatDto[]>([{ ...EMPTY_THREAT }])
  const [jsonMode, setJsonMode] = useState(false)
  const [jsonInput, setJsonInput] = useState('')
  const [jsonError, setJsonError] = useState('')
  const [result, setResult] = useState<IngestionResult | null>(null)

  const { mutateAsync, isPending } = useIngest()
  const { toast } = useToast()

  function addRow() {
    setThreats((prev) => [...prev, { ...EMPTY_THREAT }])
  }

  function removeRow(index: number) {
    setThreats((prev) => prev.filter((_, i) => i !== index))
  }

  function updateRow(index: number, field: keyof CreateThreatDto, value: string | number) {
    setThreats((prev) =>
      prev.map((t, i) =>
        i === index ? { ...t, [field]: field === 'severity' ? Number(value) : value } : t
      )
    )
  }

  function parseJson() {
    try {
      const parsed = JSON.parse(jsonInput)
      const arr = Array.isArray(parsed) ? parsed : parsed.threats
      if (!Array.isArray(arr)) throw new Error('Esperado array de ameaças')
      setThreats(arr)
      setJsonError('')
      setJsonMode(false)
      toast(`${arr.length} ameaça(s) importada(s) do JSON`, 'success')
    } catch (e) {
      setJsonError(e instanceof Error ? e.message : 'JSON inválido')
    }
  }

  async function handleSubmit() {
    const valid = threats.filter((t) => t.indicator.trim())
    if (valid.length === 0) {
      toast('Adicione pelo menos uma ameaça com indicador preenchido', 'error')
      return
    }

    try {
      const res = await mutateAsync({ threats: valid })
      setResult({ processed: res.processed ?? valid.length, timestamp: new Date().toISOString() })
      toast(`${res.processed ?? valid.length} ameaça(s) processada(s) com sucesso`, 'success')
    } catch (err) {
      toast(err instanceof Error ? err.message : 'Erro na ingestão', 'error')
    }
  }

  if (result) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 40, gap: 16 }}>
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            background: 'rgba(16,185,129,0.1)',
            border: '1px solid #10b981',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CheckCircle size={24} color="#10b981" />
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>
            Ingestão Concluída
          </div>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>
            {result.processed} ameaça(s) processada(s) e enriquecida(s)
          </div>
        </div>
        <button
          onClick={() => {
            setResult(null)
            setThreats([{ ...EMPTY_THREAT }])
          }}
          className="btn btn-secondary"
        >
          Nova Ingestão
        </button>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '14px 20px',
          borderBottom: '1px solid var(--border-default)',
        }}
      >
        <button
          onClick={() => setJsonMode(!jsonMode)}
          className={`btn btn-sm ${jsonMode ? 'btn-primary' : 'btn-secondary'}`}
        >
          <FileJson size={13} />
          Importar JSON
        </button>
        {!jsonMode && (
          <button onClick={addRow} className="btn btn-secondary btn-sm">
            <Plus size={13} />
            Adicionar linha
          </button>
        )}
        <span style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--text-muted)' }}>
          {threats.length} entrada(s)
        </span>
      </div>

      {jsonMode ? (
        <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div className="form-group">
            <label className="label">Cole o JSON aqui</label>
            <textarea
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              className="input"
              rows={10}
              placeholder={`[\n  {"indicator": "1.1.1.1", "type": "IP", "severity": 5},\n  {"indicator": "evil.com", "type": "DOMAIN", "severity": 8}\n]\n\nOu com wrapper:\n{\n  "threats": [...]\n}`}
              style={{ fontFamily: 'monospace', fontSize: 12, resize: 'vertical' }}
            />
            {jsonError && <span className="error-text">{jsonError}</span>}
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={parseJson} className="btn btn-primary">
              Importar
            </button>
            <button onClick={() => setJsonMode(false)} className="btn btn-secondary">
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th style={{ width: 40 }}>#</th>
                  <th>Indicador</th>
                  <th style={{ width: 130 }}>Tipo</th>
                  <th style={{ width: 120 }}>Severidade</th>
                  <th style={{ width: 50 }} />
                </tr>
              </thead>
              <tbody>
                {threats.map((threat, i) => (
                  <tr key={i}>
                    <td style={{ color: 'var(--text-muted)', fontSize: 11 }}>{i + 1}</td>
                    <td>
                      <input
                        value={threat.indicator}
                        onChange={(e) => updateRow(i, 'indicator', e.target.value)}
                        className="input"
                        placeholder="IP, domínio ou hash..."
                        style={{ fontFamily: 'monospace', fontSize: 12 }}
                      />
                    </td>
                    <td>
                      <div style={{ position: 'relative' }}>
                        <select
                          value={threat.type}
                          onChange={(e) => updateRow(i, 'type', e.target.value)}
                          className="select"
                          style={{ fontSize: 12 }}
                        >
                          <option value="IP">IP</option>
                          <option value="DOMAIN">DOMAIN</option>
                          <option value="HASH">HASH</option>
                        </select>
                        <div style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text-muted)', fontSize: 10 }}>▾</div>
                      </div>
                    </td>
                    <td>
                      <input
                        type="number"
                        min={1}
                        max={10}
                        value={threat.severity}
                        onChange={(e) => updateRow(i, 'severity', e.target.value)}
                        className="input"
                        style={{ fontSize: 12 }}
                      />
                    </td>
                    <td>
                      <button
                        onClick={() => removeRow(i)}
                        disabled={threats.length <= 1}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: threats.length <= 1 ? 'not-allowed' : 'pointer',
                          color: 'var(--text-muted)',
                          opacity: threats.length <= 1 ? 0.3 : 1,
                          padding: '4px',
                          borderRadius: 4,
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <Trash2 size={13} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div
            style={{
              padding: '14px 20px',
              borderTop: '1px solid var(--border-default)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
              {threats.filter((t) => t.indicator.trim()).length} de {threats.length} preenchida(s)
            </div>
            <button
              onClick={handleSubmit}
              disabled={isPending || threats.every((t) => !t.indicator.trim())}
              className="btn btn-primary"
            >
              {isPending ? (
                <>
                  <Loader2 size={13} style={{ animation: 'spin 1s linear infinite' }} />
                  Processando...
                </>
              ) : (
                <>
                  <Upload size={13} />
                  Enviar Lote
                </>
              )}
            </button>
          </div>
        </>
      )}

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
