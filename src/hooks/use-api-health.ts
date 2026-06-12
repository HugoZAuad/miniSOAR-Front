"use client";

import { useQuery } from "@tanstack/react-query";

import { api } from "@/services/api";

export function useApiHealth() {
  return useQuery({
    queryKey: ["health"],

    queryFn: async () => {
      await api.get("/analytics");

      return true;
    },

    retry: false,

    refetchInterval: 30000,
  });
}