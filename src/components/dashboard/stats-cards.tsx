"use client";

import {
  Activity,
  AlertTriangle,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";

import { ThreatAnalytics } from "@/types/analytics";

interface Props {
  analytics: ThreatAnalytics;
}

export function StatsCards({
  analytics,
}: Props) {
  const cards = [
    {
      title: "Total Threats",
      value: analytics.totalThreats,
      icon: Activity,
    },
    {
      title: "Critical",
      value: analytics.criticalThreats,
      icon: AlertTriangle,
    },
    {
      title: "Contained",
      value: analytics.containedThreats,
      icon: ShieldCheck,
    },
    {
      title: "Average Severity",
      value:
        analytics.averageSeverity.toFixed(
          1
        ),
      icon: ShieldAlert,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-xl border p-5"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {card.title}
              </span>

              <Icon size={18} />
            </div>

            <div className="mt-4 text-3xl font-bold">
              {card.value}
            </div>
          </div>
        );
      })}
    </div>
  );
}