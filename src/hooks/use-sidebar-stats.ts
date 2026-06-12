"use client";

import { useAnalytics } from "./use-analytics";

export function useSidebarStats() {
  const { data, isLoading } = useAnalytics();

  return {
    isLoading,

    totalThreats: data?.totalThreats ?? 0,

    criticalThreats: data?.criticalThreats ?? 0,

    containedThreats: data?.containedThreats ?? 0,
  };
}
