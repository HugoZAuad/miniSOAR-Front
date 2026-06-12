"use client";

import { Threat } from "@/types/threat";

interface Props {
  threat: Threat;
}

export function ThreatScoreGauge({
  threat,
}: Props) {
  return (
    <div className="grid md:grid-cols-3 gap-4">

      <MetricCard
        title="Risk Score"
        value={threat.riskScore}
      />

      <MetricCard
        title="Hybrid Score"
        value={threat.hybridScore}
      />

      <MetricCard
        title="Reputation"
        value={
          threat.reputationScore ??
          0
        }
      />

    </div>
  );
}

function MetricCard({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div className="border rounded-xl p-5">
      <p className="text-sm text-muted-foreground">
        {title}
      </p>

      <p className="text-4xl font-bold mt-2">
        {value}
      </p>
    </div>
  );
}