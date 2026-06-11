import { Threat } from "@/types/threat";
import { api } from "./api";

export interface ThreatsResponse {
  data: Threat[];

  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export async function getThreats(params?: {
  indicator?: string;
  severity?: number;
}): Promise<ThreatsResponse> {
  const { data } =
    await api.get<ThreatsResponse>(
      "/threats",
      {
        params,
      }
    );

  return data;
}

export async function createThreat(
  payload: {
    indicator: string;
    type: string;
    severity: number;
  }
) {
  const { data } =
    await api.post(
      "/threats",
      payload
    );

  return data;
}