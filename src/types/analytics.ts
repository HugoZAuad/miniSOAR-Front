export interface ThreatAnalytics {
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