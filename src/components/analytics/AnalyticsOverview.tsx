"use client";

import { useAnalytics } from "@/hooks/useAnalytics";

export function AnalyticsOverview() {
  const { data } = useAnalytics();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">
        Analytics
      </h1>

      <pre>
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}