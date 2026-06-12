"use client";

import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface Props {
  data: {
    date: string;
    count: number;
  }[];
}

export function ActivityChart({
  data,
}: Props) {
  return (
    <div className="rounded-xl border p-4">
      <h3 className="font-semibold mb-4">
        Activity Timeline
      </h3>

      <div className="h-[320px]">
        <ResponsiveContainer>
          <LineChart data={data}>
            <XAxis dataKey="date" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="count"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}