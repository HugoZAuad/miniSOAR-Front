import { ThreatService } from "@/services/threat.service";
import { useQuery } from "@tanstack/react-query";

export function useThreats() {
  return useQuery({
    queryKey: ["threats"],

    queryFn: () =>
      ThreatService.list(),
  });
}