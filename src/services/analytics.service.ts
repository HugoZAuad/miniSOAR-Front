import { ThreatAnalytics } from "@/types/analytics";
import { api } from "./api";

export const analyticsService = {
  async getAnalytics() {
    const response =
      await api.get<ThreatAnalytics>(
        "/analytics"
      );

    return response.data;
  },
};