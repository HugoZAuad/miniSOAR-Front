"use client";

import { Search, ShieldAlert } from "lucide-react";

interface Props {
  indicator: string;
  severity: string;
  onIndicatorChange: (v: string) => void;
  onSeverityChange: (v: string) => void;
}

export function ThreatFilters({
  indicator,
  severity,
  onIndicatorChange,
  onSeverityChange,
}: Props) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center bg-card p-4 rounded-xl border border-border shadow-sm">
      {/* Filtro por Indicador */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Filtrar por Indicador (IP, Domínio, Hash)..."
          value={indicator}
          onChange={(e) => onIndicatorChange(e.target.value)}
          className="w-full pl-9 pr-4 py-2 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground"
        />
      </div>

      {/* Filtro por Severidade */}
      <div className="relative w-full sm:w-48">
        <ShieldAlert className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="number"
          min={1}
          max={10}
          placeholder="Severidade (1-10)"
          value={severity}
          onChange={(e) => onSeverityChange(e.target.value)}
          className="w-full pl-9 pr-4 py-2 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground"
        />
      </div>
    </div>
  );
}