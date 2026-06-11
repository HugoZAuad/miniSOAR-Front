"use client";

import { useCreateThreat } from "@/hooks/useCreateThreat";
import { Loader2, Plus } from "lucide-react";
import { useState } from "react";

export function ThreatForm() {
  const [indicator, setIndicator] = useState("");
  const [type, setType] = useState("IP");
  const [severity, setSeverity] = useState(1);

  const createThreatMutation = useCreateThreat();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!indicator.trim()) return;

    await createThreatMutation.mutateAsync({
      indicator: indicator.trim(),
      type,
      severity,
    });

    setIndicator("");
    setSeverity(1);
  }

  return (
    <form onSubmit={handleSubmit} className="p-5 bg-card border border-border rounded-xl shadow-sm space-y-4">
      <h3 className="text-sm font-semibold text-foreground border-b border-border pb-2">Registrar Novo IoC Manual</h3>
      
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="space-y-1">
          <label className="text-xs text-muted-foreground font-medium">Indicador</label>
          <input
            value={indicator}
            onChange={(e) => setIndicator(e.target.value)}
            placeholder="Ex: 8.8.8.8 ou malicios.com"
            className="w-full px-3 py-1.5 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground"
            required
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs text-muted-foreground font-medium">Tipo de Vetor</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full px-3 py-1.5 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer"
          >
            <option value="IP">Endereço IP (IPv4/v6)</option>
            <option value="DOMAIN">Nome de Domínio</option>
            <option value="HASH">Arquivo Hash (MD5/SHA)</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-xs text-muted-foreground font-medium">Severidade (1 a 10)</label>
          <input
            type="number"
            min={1}
            max={10}
            value={severity}
            onChange={(e) => setSeverity(Number(e.target.value))}
            className="w-full px-3 py-1.5 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>
      </div>

      <div className="flex justify-end pt-1">
        <button
          type="submit"
          disabled={createThreatMutation.isPending}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium rounded-lg shadow-sm transition-colors disabled:opacity-50 cursor-pointer"
        >
          {createThreatMutation.isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Injetando...
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" />
              Registrar Ameaça
            </>
          )}
        </button>
      </div>
    </form>
  );
}