"use client";

interface Props {
  indicator: string;
  severity: string;
  onIndicatorChange: (v: string) => void;
  onSeverityChange: (v: string) => void;
}

export function ThreatFilters({
  indicator,
  severity,
  onIndicatorChange,
  onSeverityChange,
}: Props) {
  return (
    <div>
      <input
        placeholder="Indicator"
        value={indicator}
        onChange={(e) =>
          onIndicatorChange(e.target.value)
        }
      />

      <input
        placeholder="Severity"
        value={severity}
        onChange={(e) =>
          onSeverityChange(e.target.value)
        }
      />
    </div>
  );
}