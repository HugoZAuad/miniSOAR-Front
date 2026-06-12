import { api } from "./api";

import {
  CreateThreatInput,
  PaginatedThreats,
  Threat,
  ThreatFilters,
} from "@/types/threat";

export const threatsService = {
  async list(filters: ThreatFilters) {
    const response = await api.get<PaginatedThreats>("/threats", {
      params: filters,
    });

    return response.data;
  },

  async create(payload: CreateThreatInput) {
    const response = await api.post<Threat>("/threats", payload);

    return response.data;
  },

  contain: async (id: string) => {
    const response = await api.patch(`/threats/${id}/contain`);

    return response.data;
  },

  release: async (id: string) => {
    const response = await api.patch(`/threats/${id}/release`);

    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get(`/threats/${id}`);

    return response.data;
  },
};
