"use client";

import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  useThreatIntelligence,
} from "@/hooks/use-threat-intelligence";

export function RiskMatrix() {
  const {
    data = [],
  } =
    useThreatIntelligence();

  const matrix =
    data.map(
      (threat) => ({
        severity:
          threat.severity,

        risk:
          threat.riskScore,

        recurrence:
          threat.recurrencyCount,
      })
    );

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Risk Matrix
        </CardTitle>
      </CardHeader>

      <CardContent className="h-[350px]">
        <ResponsiveContainer>
          <ScatterChart>
            <XAxis
              dataKey="severity"
              name="Severity"
            />

            <YAxis
              dataKey="risk"
              name="Risk"
            />

            <ZAxis
              dataKey="recurrence"
              range={[
                50,
                500,
              ]}
            />

            <Tooltip />

            <Scatter
              data={matrix}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}