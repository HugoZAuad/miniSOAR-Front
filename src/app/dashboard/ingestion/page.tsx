"use client";

import {
  IngestionUpload,
} from "@/components/ingestion/ingestion-upload";

export default function IngestionPage() {
  return (
    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold">
          Batch Ingestion
        </h1>

        <p className="text-muted-foreground">
          Import IOC feeds, CSV files and
          bulk threat intelligence records.
        </p>

      </div>

      <div className="grid gap-4 md:grid-cols-3">

        <div className="rounded-xl border p-5">
          <div className="text-sm text-muted-foreground">
            Supported Types
          </div>

          <div className="mt-2 text-2xl font-bold">
            IP / DOMAIN / HASH
          </div>
        </div>

        <div className="rounded-xl border p-5">
          <div className="text-sm text-muted-foreground">
            Severity Range
          </div>

          <div className="mt-2 text-2xl font-bold">
            1 - 10
          </div>
        </div>

        <div className="rounded-xl border p-5">
          <div className="text-sm text-muted-foreground">
            Processing
          </div>

          <div className="mt-2 text-2xl font-bold">
            Real-Time
          </div>
        </div>

      </div>

      <IngestionUpload />

    </div>
  );
}