import { api } from "./api";

import {
  CreateThreatInput,
} from "@/types/threat";

export const ingestionService = {
  async ingest(
    threats: CreateThreatInput[]
  ) {
    await api.post(
      "/ingestion",
      {
        threats,
      }
    );
  },
};