import { createThreat } from "@/services/threat.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateThreat() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createThreat,

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