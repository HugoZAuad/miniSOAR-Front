"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface Props {
  data: Record<string, number>;
}

export function SeverityChart({
  data,
}: Props) {
  const chartData =
    Object.entries(data).map(
      ([severity, total]) => ({
        severity,
        total,
      })
    );

  return (
    <div className="rounded-xl border p-4">
      <h3 className="font-semibold mb-4">
        Severity Distribution
      </h3>

      <div className="h-[320px]">
        <ResponsiveContainer>
          <BarChart data={chartData}>
            <XAxis
              dataKey="severity"
            />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="total"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}