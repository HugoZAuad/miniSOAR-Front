import { api } from "./api";

import {
  CreateThreatInput,
  PaginatedThreats,
  Threat,
  ThreatFilters,
} from "@/types/threat";

export const threatsService = {
  async list(
    filters: ThreatFilters
  ) {
    const response =
      await api.get<PaginatedThreats>(
        "/threats",
        {
          params: filters,
        }
      );

    return response.data;
  },

  async create(
    payload: CreateThreatInput
  ) {
    const response =
      await api.post<Threat>(
        "/threats",
        payload
      );

    return response.data;
  },
};