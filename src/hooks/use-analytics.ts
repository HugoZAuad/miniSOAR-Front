"use client";

import { useQuery } from "@tanstack/react-query";

import { analyticsService } from "@/services/analytics.service";

import { queryKeys } from "@/lib/query-keys";

export function useAnalytics() {
  return useQuery({
    queryKey:
      queryKeys.analytics,

    queryFn:
      analyticsService.getAnalytics,
  });
}