"use client";

import { Threat } from "@/types/threat";
import { useState } from "react";
import { ThreatDetails } from "./ThreatDetails";
import { ThreatRow } from "./ThreatRow";

interface TableProps {
  threats: Threat[];
}

export function ThreatTable({ threats }: TableProps) {
  const [selectedThreat, setSelectedThreat] = useState<Threat | null>(null);

  return (
    <div className="w-full">
      <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
        <table className="w-full border-collapse text-left text-sm text-muted-foreground">
          <thead className="bg-muted/40 text-xs uppercase text-foreground/80 font-semibold border-b border-border">
            <tr>
              <th className="px-6 py-3.5 font-medium">Indicador</th>
              <th className="px-6 py-3.5 font-medium">Tipo</th>
              <th className="px-6 py-3.5 font-medium">Severidade Base</th>
              <th className="px-6 py-3.5 font-medium">Hybrid Score</th>
              <th className="px-6 py-3.5 font-medium">Origem (País)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-card">
            {threats.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-10 text-center text-muted-foreground">
                  Nenhuma ameaça localizada na esteira de triagem.
                </td>
              </tr>
            ) : (
              threats.map((threat) => (
                <ThreatRow
                  key={threat.id}
                  threat={threat}
                  onClick={() => setSelectedThreat(threat)}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Gerenciador do Modal de Detalhes */}
      <ThreatDetails
        threat={selectedThreat}
        isOpen={!!selectedThreat}
        onClose={() => setSelectedThreat(null)}
      />
    </div>
  );
}