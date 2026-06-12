"use client";

import { useState } from "react";

import { api } from "@/services/api";

import { BatchThreat } from "@/types/batch-threat";

import {
  chunkArray,
} from "@/lib/chunk-array";

export function useBatchIngestion() {
  const [progress,
    setProgress] =
    useState(0);

  const [loading,
    setLoading] =
    useState(false);

  async function upload(
    threats: BatchThreat[]
  ) {
    setLoading(true);

    const chunks =
      chunkArray(
        threats,
        100
      );

    for (
      let i = 0;
      i < chunks.length;
      i++
    ) {
      await api.post(
        "/ingestion",
        {
          threats:
            chunks[i],
        }
      );

      setProgress(
        Math.round(
          ((i + 1) /
            chunks.length) *
            100
        )
      );
    }

    setLoading(false);
  }

  return {
    upload,
    progress,
    loading,
  };
}