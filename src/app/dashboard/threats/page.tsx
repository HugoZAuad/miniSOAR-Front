"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

import { useThreats } from "@/hooks/use-threats";

import { CreateThreatDialog } from "@/components/threats/create-threat-dialog";
import { ThreatFilters } from "@/components/threats/threat-filters";
import { ThreatTable } from "@/components/threats/threat-table";

export default function ThreatsPage() {
  const [page, setPage] = useState(1);

  const [indicator, setIndicator] =
    useState("");

  const [severity, setSeverity] =
    useState<number | undefined>();

  const {
    data,
    isLoading,
  } = useThreats({
    page,
    limit: 15,
    indicator,
    severity,
  });

  const totalPages = Math.max(
    1,
    Math.ceil(
      (data?.total ?? 0) /
      (data?.limit ?? 15)
    )
  );

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold">
            Threat Intelligence
          </h1>

          <p className="text-muted-foreground">
            Monitor and manage threat indicators.
          </p>
        </div>

        <CreateThreatDialog />

      </div>

      <ThreatFilters
        indicator={indicator}
        setIndicator={setIndicator}
        severity={severity}
        setSeverity={setSeverity}
      />

      <div className="text-sm text-muted-foreground">
        Showing{" "}
        {data?.data.length ?? 0}
        {" "}of{" "}
        {data?.total ?? 0}
        {" "}threats
      </div>

      {isLoading ? (
        <div className="rounded-lg border p-10 text-center">
          Loading threats...
        </div>
      ) : (
        <ThreatTable
          threats={data?.data ?? []}
        />
      )}

      <div className="flex items-center justify-between">

        <div className="text-sm text-muted-foreground">
          Page {page} of {totalPages}
        </div>

        <div className="flex gap-2">

          <Button
            variant="outline"
            disabled={page === 1}
            onClick={() =>
              setPage(
                (prev) => prev - 1
              )
            }
          >
            Previous
          </Button>

          <Button
            variant="outline"
            disabled={
              page >= totalPages
            }
            onClick={() =>
              setPage(
                (prev) => prev + 1
              )
            }
          >
            Next
          </Button>

        </div>

      </div>

    </div>
  );
}