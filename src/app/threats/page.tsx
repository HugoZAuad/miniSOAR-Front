'use client'

import { useState } from 'react'
import { Plus, X } from 'lucide-react'
import { ThreatsTable } from '@/components/threats/ThreatsTable'
import { CreateThreatForm } from '@/components/threats/CreateThreatForm'
import { ToastProvider } from '@/components/ui/Toast'

export default function ThreatsPage() {
  const [showForm, setShowForm] = useState(false)

  return (
    <ToastProvider>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div className="flex-between">
          <div>
            <h2 className="page-title">Ameaças</h2>
            <p className="page-subtitle">Registro, monitoramento e resposta a indicadores de ameaça</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className={`btn ${showForm ? 'btn-secondary' : 'btn-primary'}`}
          >
            {showForm ? (
              <>
                <X size={13} />
                Cancelar
              </>
            ) : (
              <>
                <Plus size={13} />
                Nova Ameaça
              </>
            )}
          </button>
        </div>

        {showForm && (
          <div className="card">
            <div className="card-header">
              <span style={{ fontWeight: 600, fontSize: 13 }}>Registrar Indicador de Ameaça</span>
              <span className="section-label">Manual</span>
            </div>
            <div className="card-body">
              <CreateThreatForm onSuccess={() => setShowForm(false)} />
            </div>
          </div>
        )}

        <div className="card">
          <div className="card-header">
            <span style={{ fontWeight: 600, fontSize: 13 }}>Histórico de Ameaças</span>
          </div>
          <ThreatsTable />
        </div>
      </div>
    </ToastProvider>
  )
}
