"use client";

import { ThreatForm } from "@/components/threats/ThreatForm";
import { ThreatTable } from "@/components/threats/ThreatTable";
import { useThreats } from "@/hooks/useThreats";

export default function ThreatsPage() {
  const { data, isLoading } = useThreats();

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h1>Threats</h1>

      <ThreatForm />

      <ThreatTable
        threats={data?.data ?? []}
      />
    </div>
  );
}