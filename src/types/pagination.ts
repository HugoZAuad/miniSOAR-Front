import { Threat } from "./threat";

export interface PaginatedThreats {
  data: Threat[];

  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}