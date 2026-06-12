"use client";

import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
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

export function ContainmentPanel() {
  const {
    data = [],
  } =
    useThreatIntelligence();

  const contained =
    data.filter(
      (t) =>
        t.containment
    ).length;

  const notContained =
    data.length -
    contained;

  const chartData = [
    {
      name:
        "Contained",
      value:
        contained,
    },
    {
      name:
        "Open",
      value:
        notContained,
    },
  ];

  const rate =
    data.length === 0
      ? 0
      : Math.round(
          (contained /
            data.length) *
            100
        );

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Containment Status
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="mb-4 text-center">
          <div className="text-4xl font-bold">
            {rate}%
          </div>

          <div className="text-muted-foreground">
            Containment Rate
          </div>
        </div>

        <div className="h-[250px]">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={
                  chartData
                }
                dataKey="value"
                label
              >
                {chartData.map(
                  (
                    _,
                    index
                  ) => (
                    <Cell
                      key={
                        index
                      }
                    />
                  )
                )}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}