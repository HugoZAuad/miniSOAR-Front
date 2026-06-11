"use client";

import { useState } from "react";

import { ThreatFilters } from "@/components/threats/ThreatFilters";
import { ThreatForm } from "@/components/threats/ThreatForm";
import { ThreatTable } from "@/components/threats/ThreatTable";

import { useThreats } from "@/hooks/useThreats";

export default function ThreatsPage() {
  const [indicator, setIndicator] = useState("");
  const [severity, setSeverity] = useState("");

  const { data, isLoading, isError } = useThreats({
    indicator: indicator || undefined,
    severity: severity ? Number(severity) : undefined,
  });

  if (isLoading) {
    return <div>Carregando ameaças...</div>;
  }

  if (isError) {
    return <div>Erro ao carregar ameaças.</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">
          Threats
        </h1>

        <p className="text-sm text-gray-500">
          Monitoramento e registro de ameaças.
        </p>
      </div>

      <ThreatForm />

      <ThreatFilters
        indicator={indicator}
        severity={severity}
        onIndicatorChange={setIndicator}
        onSeverityChange={setSeverity}
      />

      <ThreatTable
        threats={data?.data ?? []}
      />
    </div>
  );
}