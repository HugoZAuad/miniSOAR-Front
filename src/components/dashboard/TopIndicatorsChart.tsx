"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface TopIndicatorData {
  indicator: string;
  count: number;
}

interface TopIndicatorsChartProps {
  data: TopIndicatorData[];
}

export function TopIndicatorsChart({ data }: TopIndicatorsChartProps) {
  const topFive = data.slice(0, 5);

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="text-base font-semibold">Top Indicadores Recorrentes</CardTitle>
        <CardDescription>IoCs com maior frequência de detecção no perímetro.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={topFive}
              margin={{ top: 10, right: 10, left: 20, bottom: 10 }}
            >
              <XAxis type="number" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis
                type="category"
                dataKey="indicator"
                stroke="#888888"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                width={100}
                tickFormatter={(value) => value.length > 15 ? `${value.substring(0, 12)}...` : value}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm text-xs break-all max-w-[240px]">
                        <p className="font-semibold">{payload[0].payload.indicator}</p>
                        <p className="text-primary">{`Ocorrências: ${payload[0].value}`}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar
                dataKey="count"
                fill="rgb(var(--primary, 59 130 246))"
                className="fill-primary"
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}