export interface Threat {
  id: string;
  indicator: string;
  type: string;
  severity: number;
  hybridScore: number;
  country?: string;
  reputationScore?: number;
  recurrencyCount: number;
  tags?: string[];
  createdAt: string;
}