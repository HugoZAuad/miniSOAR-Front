import { AnalyticsService } from "@/services/analytics.service";
import { useQuery } from "@tanstack/react-query";

export function useAnalytics() {
  return useQuery({
    queryKey: ["analytics"],
    queryFn: AnalyticsService.getAnalytics,
  });
}