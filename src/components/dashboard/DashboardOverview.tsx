"use client";

import {
  Activity,
  BarChart3,
  ShieldAlert,
} from "lucide-react";

import { EmptyState } from "@/components/shared/EmptyState";
import { LoadingState } from "@/components/shared/LoadingState";
import { PageHeader } from "@/components/shared/PageHeader";
import { useAnalytics } from "@/hooks/useAnalytics";
import { SeverityChart } from "./SeverityChart";
import { StatCard } from "./StatCard";
import { TopIndicatorsChart } from "./TopIndicatorsChart";

export function DashboardOverview() {
  const {
    data,
    isLoading,
    isError,
  } = useAnalytics();

  if (isLoading) {
    return <LoadingState />;
  }

  if (isError || !data) {
    return (
      <EmptyState
        title="Falha ao carregar analytics"
        description="Verifique a integridade da API do backend."
      />
    );
  }

  const highSeverityCount = data.bySeverity?.reduce((acc, curr) => {
    if (curr.level >= 4) {
      return acc + curr.count;
    }
    return acc;
  }, 0) ?? 0;

  const topActiveIndicator = data.topIndicators?.[0]?.indicator ?? "Nenhum";

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Visão geral da operação de segurança e triagem de ameaças."
      />

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          title="Total de Ameaças"
          value={data.totalThreats ?? 0}
          icon={<ShieldAlert size={24} className="text-muted-foreground" />}
          description="Indicadores totais na base"
        />

        <StatCard
          title="Ameaças Críticas / Altas"
          value={highSeverityCount}
          icon={<BarChart3 size={24} className="text-destructive" />}
          description="Exigem resposta imediata"
        />

        <StatCard
          title="Principal Vetor Ativo"
          value={topActiveIndicator}
          icon={<Activity size={24} className="text-primary" />}
          description="Indicador com maior recorrência"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <SeverityChart
          data={data.bySeverity ?? []}
        />

        <TopIndicatorsChart
          data={data.topIndicators ?? []}
        />
      </div>
    </div>
  );
}