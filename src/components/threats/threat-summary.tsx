"use client";

import { Threat } from "@/types/threat";

interface Props {
  threat: Threat;
}

export function ThreatSummary({
  threat,
}: Props) {
  return (
    <div className="border rounded-xl p-5">
      <h3 className="font-semibold mb-3">
        Threat Intelligence Summary
      </h3>

      <p className="text-muted-foreground leading-relaxed">
        IOC {threat.indicator}
        {" "}was classified as
        {" "}severity {threat.severity}
        {" "}with risk score
        {" "}of {threat.riskScore}.
        {" "}Observed
        {" "}
        {
          threat.recurrencyCount
        }
        {" "}times.
      </p>
    </div>
  );
}