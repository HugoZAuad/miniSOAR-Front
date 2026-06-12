"use client";

import {
  AreaChart,
  Area,
  Tooltip,
  XAxis,
  YAxis,
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

export function ThreatTimeline() {
  const {
    data = [],
  } =
    useThreatIntelligence();

  const grouped =
    Object.values(
      data.reduce(
        (acc, threat) => {
          const day =
            new Date(
              threat.createdAt
            )
              .toISOString()
              .split(
                "T"
              )[0];

          if (
            !acc[day]
          ) {
            acc[day] = {
              date: day,
              count: 0,
            };
          }

          acc[
            day
          ].count++;

          return acc;
        },
        {} as Record<
          string,
          {
            date: string;
            count: number;
          }
        >
      )
    );

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Threat Timeline
        </CardTitle>
      </CardHeader>

      <CardContent className="h-[350px]">
        <ResponsiveContainer>
          <AreaChart
            data={
              grouped
            }
          >
            <XAxis
              dataKey="date"
            />

            <YAxis />

            <Tooltip />

            <Area
              dataKey="count"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}