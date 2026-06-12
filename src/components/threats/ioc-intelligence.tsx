"use client";

import {
  Threat,
} from "@/types/threat";

interface Props {
  threat: Threat;
}

export function IOCIntelligence({
  threat,
}: Props) {
  return (
    <div className="rounded-xl border p-4">
      <h3 className="font-semibold mb-4">
        IOC Intelligence
      </h3>

      <div className="grid gap-3">

        <div>
          <div className="text-xs text-muted-foreground">
            Indicator
          </div>

          <div className="font-mono">
            {threat.indicator}
          </div>
        </div>

        <div>
          <div className="text-xs text-muted-foreground">
            Country
          </div>

          <div>
            {threat.country ??
              "Unknown"}
          </div>
        </div>

        <div>
          <div className="text-xs text-muted-foreground">
            Reputation
          </div>

          <div>
            {threat.reputationScore ??
              0}
          </div>
        </div>

        <div>
          <div className="text-xs text-muted-foreground">
            Recurrency
          </div>

          <div>
            {
              threat.recurrencyCount
            }
          </div>
        </div>

      </div>
    </div>
  );
}