"use client";

import {
  ThreatOverview,
} from "@/components/intelligence/threat-overview";

import {
  GeographicDistribution,
} from "@/components/intelligence/geographic-distribution";

import {
  TopIndicators,
} from "@/components/intelligence/top-indicators";

import {
  RiskMatrix,
} from "@/components/intelligence/risk-matrix";

import {
  ThreatTimeline,
} from "@/components/intelligence/threat-timeline";

import {
  ContainmentPanel,
} from "@/components/intelligence/containment-panel";

export default function IntelligencePage() {
  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold">
          Threat Intelligence Center
        </h1>

        <p className="text-muted-foreground">
          Deep analysis of indicators,
          reputation, recurrence and
          containment actions.
        </p>
      </div>

      <ThreatOverview />

      <div className="grid gap-6 lg:grid-cols-2">
        <GeographicDistribution />
        <TopIndicators />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <RiskMatrix />
        <ContainmentPanel />
      </div>

      <ThreatTimeline />

    </div>
  );
}