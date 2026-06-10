import { api } from "./api";

export interface Analytics {
  totalThreats: number;
  bySeverity: {
    level: number;
    count: number;
  }[];
  topIndicators: {
    indicator: string;
    count: number;
  }[];
}

export class AnalyticsService {
  static async getAnalytics(): Promise<Analytics> {
    const { data } = await api.get<Analytics>("/analytics");

    return data;
  }
}