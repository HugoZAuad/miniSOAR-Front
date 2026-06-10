"use client";

import {
  Activity,
  BarChart3,
  ShieldAlert,
} from "lucide-react";

import { useAnalytics } from "@/hooks/useAnalytics";

import { StatCard } from "./StatCard";

import { EmptyState } from "@/components/shared/EmptyState";
import { LoadingState } from "@/components/shared/LoadingState";
import { PageHeader } from "@/components/shared/PageHeader";

export function DashboardOverview() {
  const {
  data,
  isLoading,
  isError,
} = useAnalytics();

console.log(data)

  if (isLoading) {
    return <LoadingState />;
  }

  if (isError || !data) {
    return (
      <EmptyState
        title="Falha ao carregar analytics"
        description="Verifique a API do backend."
      />
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Visão geral da operação de segurança."
      />

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          title="Total Threats"
          value={data.totalThreats}
          icon={<ShieldAlert size={28} />}
        />

        <StatCard
          title="Severity Levels"
          value={data.bySeverity.length ?? 0}
          icon={<BarChart3 size={28} />}
        />

        <StatCard
          title="Top Indicators"
          value={data.topIndicators.length ?? 0}
          icon={<Activity size={28} />}
        />
      </div>
    </div>
  );
}