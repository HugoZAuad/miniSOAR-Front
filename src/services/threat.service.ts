import { api } from "@/services/api";

export interface Threat {
  id: string;
  indicator: string;
  type: string;
  severity: number;
  hybridScore: number;
  country?: string;
  reputationScore?: number;
  recurrencyCount: number;
  createdAt: string;
}

export interface ThreatsResponse {
  data: Threat[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface CreateThreatInput {
  indicator: string;
  type: string;
  severity: number;
}

export async function getThreats() {
  const response = await api.get<ThreatsResponse>("/threats");
  return response.data;
}

export async function createThreat(input: CreateThreatInput) {
  const response = await api.post<Threat>("/threats", input);
  return response.data;
}