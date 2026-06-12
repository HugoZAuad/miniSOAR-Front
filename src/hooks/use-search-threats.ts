"use client";

import { useQuery } from "@tanstack/react-query";

import { api } from "@/services/api";

import { Threat } from "@/types/threat";

export function useSearchThreats(
  indicator: string
) {
  return useQuery({
    queryKey: [
      "threat-search",
      indicator,
    ],

    enabled:
      indicator.trim().length > 0,

    queryFn: async () => {
      const response =
        await api.get(
          "/threats",
          {
            params: {
              indicator,
              page: 1,
              limit: 20,
            },
          }
        );

      return response
        .data
        .data as Threat[];
    },
  });
}