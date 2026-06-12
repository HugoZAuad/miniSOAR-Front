"use client";

import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface Props {
  data: Record<string, number>;
}

export function ThreatTypeChart({
  data,
}: Props) {
  const chartData =
    Object.entries(data).map(
      ([name, value]) => ({
        name,
        value,
      })
    );

  const colors = [
    "#ef4444",
    "#3b82f6",
    "#22c55e",
  ];

  return (
    <div className="rounded-xl border p-4">
      <h3 className="font-semibold mb-4">
        Threat Types
      </h3>

      <div className="h-[320px]">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              outerRadius={110}
            >
              {chartData.map(
                (_, index) => (
                  <Cell
                    key={index}
                    fill={
                      colors[
                        index %
                          colors.length
                      ]
                    }
                  />
                )
              )}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}