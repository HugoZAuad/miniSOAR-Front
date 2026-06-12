"use client";

import { useMutation } from "@tanstack/react-query";

import { api } from "@/services/api";

import { BatchThreat } from "@/types/batch-threat";

export function useIngestion() {
  return useMutation({
    mutationFn: async (
      threats: BatchThreat[]
    ) => {
      await api.post(
        "/ingestion",
        {
          threats,
        }
      );
    },
  });
}