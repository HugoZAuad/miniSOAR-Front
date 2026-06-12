"use client";

import { useQuery } from "@tanstack/react-query";

import { api } from "@/services/api";

import type {
  PaginatedThreats,
  Threat,
} from "@/types/threat";

export interface ThreatFilters {
  page?: number;
  limit?: number;
  indicator?: string;
  severity?: number;
}

export function useThreats(
  filters: ThreatFilters
) {
  return useQuery({
    queryKey: [
      "threats",
      filters,
    ],

    queryFn: async () => {
      const response =
        await api.get<PaginatedThreats>(
          "/threats",
          {
            params: {
              page: filters.page,
              limit: filters.limit,
              indicator:
                filters.indicator ||
                undefined,
              severity:
                filters.severity ||
                undefined,
            },
          }
        );

      return response.data;
    },
  });
}

export function useThreat(
  threatId?: string
) {
  return useQuery({
    enabled: !!threatId,

    queryKey: [
      "threat",
      threatId,
    ],

    queryFn: async () => {
      const response =
        await api.get<Threat>(
          `/threats/${threatId}`
        );

      return response.data;
    },
  });
}

export function useThreatHistory(
  threatId?: string
) {
  return useQuery({
    enabled: !!threatId,

    queryKey: [
      "threat-history",
      threatId,
    ],

    queryFn: async () => {
      const response =
        await api.get(
          `/threats/${threatId}/history`
        );

      return response.data;
    },
  });
}