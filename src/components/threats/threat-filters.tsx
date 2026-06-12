"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface ThreatFiltersProps {
  indicator: string;

  setIndicator: (
    value: string
  ) => void;

  severity?: number;

  setSeverity: (
    value?: number
  ) => void;
}

export function ThreatFilters({
  indicator,
  setIndicator,
  severity,
  setSeverity,
}: ThreatFiltersProps) {
  return (
    <div className="flex gap-4">
      <Select
        value={
          severity
            ? String(severity)
            : "all"
        }
        onValueChange={(value) =>
          setSeverity(
            value === "all"
              ? undefined
              : Number(value)
          )
        }
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue />
        </SelectTrigger>

        <SelectContent>

          <SelectItem value="all">
            All Severities
          </SelectItem>

          {Array.from(
            { length: 10 },
            (_, i) => (
              <SelectItem
                key={i + 1}
                value={String(i + 1)}
              >
                Severity {i + 1}
              </SelectItem>
            )
          )}

        </SelectContent>
      </Select>
    </div>
  );
}