"use client";

import {
  useMemo,
  useState,
} from "react";

import { Button } from "@/components/ui/button";

import {
  parseCsv,
} from "@/lib/csv-parser";

import {
  validateThreat,
} from "@/lib/validators";

import {
  BatchError,
  BatchThreat,
} from "@/types/batch-threat";

import {
  IngestionStats,
} from "./ingestion-stats";

import {
  IngestionPreview,
} from "./ingestion-preview";

import {
  IngestionErrors,
} from "./ingestion-errors";

import {
  useIngestion,
} from "@/hooks/use-ingestion";

export function IngestionUpload() {
  const [threats,
    setThreats] =
    useState<BatchThreat[]>([]);

  const [errors,
    setErrors] =
    useState<BatchError[]>([]);

  const ingestion =
    useIngestion();

  const validThreats =
    useMemo(
      () =>
        threats.filter(
          (threat) =>
            !validateThreat(
              threat
            )
        ),
      [threats]
    );

  async function handleFile(
    file: File
  ) {
    const content =
      await file.text();

    const parsed =
      parseCsv(content);

    const foundErrors:
      BatchError[] = [];

    parsed.forEach(
      (
        threat,
        index
      ) => {
        const error =
          validateThreat(
            threat
          );

        if (error) {
          foundErrors.push({
            row:
              index + 2,
            message:
              error,
          });
        }
      }
    );

    setThreats(parsed);
    setErrors(
      foundErrors
    );
  }

  async function submit() {
    await ingestion.mutateAsync(
      validThreats
    );
  }

  return (
    <div className="space-y-6">

      <input
        type="file"
        accept=".csv"
        onChange={(e) => {
          const file =
            e.target
              .files?.[0];

          if (file)
            handleFile(
              file
            );
        }}
      />

      <IngestionStats
        total={threats.length}
        valid={
          validThreats.length
        }
        invalid={
          errors.length
        }
      />

      <IngestionErrors
        errors={errors}
      />

      {threats.length > 0 && (
        <IngestionPreview
          threats={threats}
        />
      )}

      <Button
        disabled={
          ingestion.isPending ||
          !validThreats.length
        }
        onClick={submit}
      >
        {ingestion.isPending
          ? "Importing..."
          : `Import ${validThreats.length} Threats`}
      </Button>

    </div>
  );
}