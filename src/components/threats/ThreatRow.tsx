"use client";

import { Threat } from "@/types/threat";

interface Props {
  threat: Threat;
  onClick: () => void;
}

export function ThreatRow({ threat, onClick }: Props) {
  const getSeverityStyle = (score: number) => {
    if (score >= 8) return "text-destructive font-bold";
    if (score >= 5) return "text-orange-500 font-semibold";
    return "text-emerald-500 font-medium";
  };

  return (
    <tr
      onClick={onClick}
      className="hover:bg-muted/40 transition-colors cursor-pointer text-foreground border-b border-border/60"
    >
      <td className="px-6 py-3.5 font-mono font-medium max-w-[240px] truncate">
        {threat.indicator}
      </td>
      <td className="px-6 py-3.5">
        <span className="inline-flex items-center gap-1 text-xs font-semibold bg-secondary px-2 py-0.5 rounded border border-border">
          {threat.type}
        </span>
      </td>
      <td className={`px-6 py-3.5 ${getSeverityStyle(threat.severity)}`}>
        Nível {threat.severity}
      </td>
      <td className="px-6 py-3.5 font-semibold text-foreground/90">
        {threat.hybridScore ?? "—"}
      </td>
      <td className="px-6 py-3.5 font-medium text-muted-foreground">
        {threat.country || "Global / Cloud"}
      </td>
    </tr>
  );
}