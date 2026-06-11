import { useQuery } from "@tanstack/react-query";

import { getThreats } from "@/services/threat.service";

interface ThreatFilters {
  indicator?: string;
  severity?: number;
}

export function useThreats(
  filters?: ThreatFilters
) {
  return useQuery({
    queryKey: ["threats", filters],

    queryFn: () =>
      getThreats(filters),
  });
}