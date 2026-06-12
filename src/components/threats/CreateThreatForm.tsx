'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Plus, Loader2 } from 'lucide-react'
import { useCreateThreat } from '@/hooks/useApi'
import { useToast } from '@/components/ui/Toast'

const schema = z.object({
  indicator: z.string().min(1, 'Indicador obrigatório').max(500),
  type: z.enum(['IP', 'DOMAIN', 'HASH'], { required_error: 'Tipo inválido' }),
  severity: z.coerce.number().int().min(1, 'Mínimo 1').max(10, 'Máximo 10'),
})

type FormValues = z.infer<typeof schema>

interface CreateThreatFormProps {
  onSuccess?: () => void
}

export function CreateThreatForm({ onSuccess }: CreateThreatFormProps) {
  const { mutateAsync, isPending } = useCreateThreat()
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { type: 'IP', severity: 5 },
  })

  async function onSubmit(values: FormValues) {
    try {
      await mutateAsync(values)
      toast('Ameaça registrada com sucesso', 'success')
      reset()
      onSuccess?.()
    } catch (err) {
      toast(err instanceof Error ? err.message : 'Erro ao registrar ameaça', 'error')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div className="form-group">
        <label className="label">Indicador *</label>
        <input
          {...register('indicator')}
          className="input"
          placeholder="Ex: 192.168.1.1, malware.com, abc123..."
        />
        {errors.indicator && <span className="error-text">{errors.indicator.message}</span>}
      </div>

      <div className="grid-2" style={{ gap: 12 }}>
        <div className="form-group">
          <label className="label">Tipo *</label>
          <div style={{ position: 'relative' }}>
            <select {...register('type')} className="select">
              <option value="IP">IP</option>
              <option value="DOMAIN">DOMAIN</option>
              <option value="HASH">HASH</option>
            </select>
            <div style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text-muted)' }}>
              ▾
            </div>
          </div>
          {errors.type && <span className="error-text">{errors.type.message}</span>}
        </div>

        <div className="form-group">
          <label className="label">Severidade (1–10) *</label>
          <input
            {...register('severity')}
            type="number"
            min={1}
            max={10}
            className="input"
            placeholder="5"
          />
          {errors.severity && <span className="error-text">{errors.severity.message}</span>}
        </div>
      </div>

      <div
        style={{
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border-default)',
          borderRadius: 7,
          padding: '10px 14px',
          fontSize: 12,
          color: 'var(--text-muted)',
          lineHeight: 1.5,
        }}
      >
        💡 Se a severidade for <strong style={{ color: 'var(--accent-red)' }}>alta (&gt;7)</strong>, o sistema executará
        contenção automática via Firewall e enviará alerta no Discord.
      </div>

      <button type="submit" disabled={isPending} className="btn btn-primary">
        {isPending ? (
          <>
            <Loader2 size={13} style={{ animation: 'spin 1s linear infinite' }} />
            Registrando...
          </>
        ) : (
          <>
            <Plus size={13} />
            Registrar Ameaça
          </>
        )}
      </button>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </form>
  )
}
