export type ThreatType =
  | "IP"
  | "DOMAIN"
  | "HASH";

export interface Threat {
  id: string;

  indicator: string;

  type: ThreatType;

  severity: number;

  country?: string;

  reputationScore?: number;

  recurrencyCount: number;

  hybridScore: number;

  riskScore: number;

  containment: boolean;

  createdAt: string;
}

export interface PaginatedThreats {
  data: Threat[];

  total: number;

  page: number;

  limit: number;
}

export interface ThreatFilters {
  page?: number;
  limit?: number;
  indicator?: string;
  severity?: number;
}

export interface CreateThreatInput {
  indicator: string;
  type: ThreatType;
  severity: number;
}

export interface ThreatHistoryEvent {
  id: string;

  threatId: string;

  title: string;

  description: string;

  type:
    | "created"
    | "enriched"
    | "risk"
    | "contained";

  createdAt: string;
}