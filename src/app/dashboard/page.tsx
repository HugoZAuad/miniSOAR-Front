"use client";

import { useAnalytics } from "@/hooks/use-analytics";

import { StatsCards } from "@/components/dashboard/stats-cards";

import { ThreatTypeChart } from "@/components/dashboard/threat-type-chart";

import { SeverityChart } from "@/components/dashboard/severity-chart";

import { ActivityChart } from "@/components/dashboard/activity-chart";

import { TopIndicators } from "@/components/dashboard/top-indicators";

import { DashboardSkeleton } from "@/components/dashboard/dashboard-skeleton";

import {
  RealtimeFeed
} from "@/components/realtime/realtime-feed";

import {
  LiveStatus
} from "@/components/realtime/live-status";

export default function DashboardPage() {
  const {
    data,
    isLoading,
    error,
  } = useAnalytics();

  if (isLoading) {
    return (
      <DashboardSkeleton />
    );
  }

  if (error || !data) {
    return (
      <div>
        Failed to load analytics.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Security Dashboard
        </h1>

        <p className="text-muted-foreground">
          Real-time threat analytics
        </p>
      </div>

      <StatsCards
        analytics={data}
      />

      <div className="grid gap-6 xl:grid-cols-2">
        <ThreatTypeChart
          data={data.byType}
        />

        <SeverityChart
          data={data.bySeverity}
        />
      </div>

      {data.recentActivity &&
        data.recentActivity.length >
        0 && (
          <ActivityChart
            data={
              data.recentActivity
            }
          />
        )}

      {data.topIndicators &&
        data.topIndicators.length >
        0 && (
          <TopIndicators
            indicators={
              data.topIndicators
            }
          />
        )}

      <div className="flex items-center justify-between">
        <h1>Security Dashboard</h1>

        <LiveStatus />
      </div>
      <RealtimeFeed />
    </div>
  );
}