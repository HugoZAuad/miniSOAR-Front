"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  threatsService,
} from "@/services/threats.service";

export function useCreateThreat() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn:
      threatsService.create,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["threats"],
      });

      queryClient.invalidateQueries({
        queryKey: ["analytics"],
      });
    },
  });
}