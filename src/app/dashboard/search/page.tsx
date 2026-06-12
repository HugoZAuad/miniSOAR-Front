"use client";

import {
  useSearchParams,
} from "next/navigation";

import {
  useSearchThreats,
} from "@/hooks/use-search-threats";

import {
  ThreatTable,
} from "@/components/threats/threat-table";

export default function SearchPage() {
  const params =
    useSearchParams();

  const query =
    params.get("q") ?? "";

  const {
    data = [],
  } =
    useSearchThreats(query);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Search Results
        </h1>

        <p className="text-muted-foreground">
          {query}
        </p>
      </div>

      <ThreatTable
        threats={data}
      />
    </div>
  );
}