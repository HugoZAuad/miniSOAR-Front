"use client";

import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useThreatIntelligence } from "@/hooks/use-threat-intelligence";

export function GeographicDistribution() {
  const { data = [] } =
    useThreatIntelligence();

  const grouped =
    Object.entries(
      data.reduce(
        (acc, threat) => {
          const country =
            threat.country ??
            "UNKNOWN";

          acc[country] =
            (acc[country] ?? 0) + 1;

          return acc;
        },
        {} as Record<
          string,
          number
        >
      )
    ).map(
      ([country, count]) => ({
        country,
        count,
      })
    );

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Geographic Distribution
        </CardTitle>
      </CardHeader>

      <CardContent className="h-[350px]">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={grouped}
              dataKey="count"
              nameKey="country"
              outerRadius={120}
              label
            >
              {grouped.map(
                (_, index) => (
                  <Cell
                    key={index}
                  />
                )
              )}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}