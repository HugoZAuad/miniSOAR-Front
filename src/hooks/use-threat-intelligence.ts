"use client";

import { useQuery } from "@tanstack/react-query";

import { api } from "@/services/api";

import {
  Threat,
} from "@/types/threat";

export function useThreatIntelligence() {
  return useQuery({
    queryKey: [
      "threat-intelligence",
    ],

    queryFn: async () => {
      const response =
        await api.get(
          "/threats",
          {
            params: {
              page: 1,
              limit: 1000,
            },
          }
        );

      return response.data.data as Threat[];
    },
  });
}