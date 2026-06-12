"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
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

export function TopIndicators() {
  const {
    data = [],
  } =
    useThreatIntelligence();

  const topIndicators =
    [...data]
      .sort(
        (a, b) =>
          b.recurrencyCount -
          a.recurrencyCount
      )
      .slice(0, 10)
      .map((item) => ({
        indicator:
          item.indicator,
        count:
          item.recurrencyCount,
      }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Top Indicators
        </CardTitle>
      </CardHeader>

      <CardContent className="h-[350px]">
        <ResponsiveContainer>
          <BarChart
            data={
              topIndicators
            }
          >
            <XAxis
              dataKey="indicator"
            />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="count"
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}