"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface SeverityData {
  level: number;
  count: number;
}

interface SeverityChartProps {
  data: SeverityData[];
}

const getSeverityColor = (level: number) => {
  if (level >= 5) return "rgb(239, 68, 68)";
  if (level === 4) return "rgb(249, 115, 22)";
  if (level === 3) return "rgb(234, 179, 8)";
  return "rgb(59, 130, 246)";
};

export function SeverityChart({ data }: SeverityChartProps) {
  const sortedData = [...data].sort((a, b) => a.level - b.level);

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="text-base font-semibold">Distribuição por Severidade</CardTitle>
        <CardDescription>Volume de ameaças classificadas por nível crítico.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sortedData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis
                dataKey="level"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `Nível ${value}`}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm text-xs">
                        <p className="font-semibold">{`Nível ${payload[0].payload.level}`}</p>
                        <p className="text-muted-foreground">{`Ameaças: ${payload[0].value}`}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {sortedData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getSeverityColor(entry.level)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}