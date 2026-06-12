"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  threatsService,
} from "@/services/threats.service";

export function useContainThreat() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn:
      threatsService.contain,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["threats"],
      });

      queryClient.invalidateQueries({
        queryKey: [
          "threat-intelligence",
        ],
      });
    },
  });
}