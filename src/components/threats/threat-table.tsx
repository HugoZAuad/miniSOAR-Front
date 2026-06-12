"use client";

import { useState } from "react";

import { Threat } from "@/types/threat";

import { ContainmentBadge } from "./containment-badge";
import { RiskBadge } from "./risk-badge";
import { ThreatDetailsSheet } from "./threat-details-sheet";

interface Props {
  threats: Threat[];
}

export function ThreatTable({
  threats,
}: Props) {
  const [selectedThreat, setSelectedThreat] =
    useState<Threat | null>(null);

  return (
    <>
      <div
        className="
          rounded-xl
          border
          overflow-hidden
          bg-card
        "
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr
                className="
                  border-b
                  bg-muted/50
                "
              >
                <th className="p-4 text-left font-medium">
                  Indicator
                </th>

                <th className="text-left font-medium">
                  Type
                </th>

                <th className="text-left font-medium">
                  Severity
                </th>

                <th className="text-left font-medium">
                  Hybrid
                </th>

                <th className="text-left font-medium">
                  Risk
                </th>

                <th className="text-left font-medium">
                  Country
                </th>

                <th className="text-left font-medium">
                  Reputation
                </th>

                <th className="text-left font-medium">
                  Recurrency
                </th>

                <th className="text-left font-medium">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {threats.length === 0 ? (
                <tr>
                  <td
                    colSpan={9}
                    className="
                      h-32
                      text-center
                      text-muted-foreground
                    "
                  >
                    No threats found
                  </td>
                </tr>
              ) : (
                threats.map((threat) => (
                  <tr
                    key={threat.id}
                    onClick={() =>
                      setSelectedThreat(threat)
                    }
                    className="
                      border-b
                      cursor-pointer
                      transition-colors
                      hover:bg-muted/50
                    "
                  >
                    <td className="p-4 font-medium">
                      {threat.indicator}
                    </td>

                    <td>
                      {threat.type}
                    </td>

                    <td>
                      {threat.severity}
                    </td>

                    <td>
                      {threat.hybridScore}
                    </td>

                    <td>
                      <RiskBadge
                        score={
                          threat.riskScore ?? 0
                        }
                      />
                    </td>

                    <td>
                      {threat.country ?? "-"}
                    </td>

                    <td>
                      {threat.reputationScore ??
                        "-"}
                    </td>

                    <td>
                      {threat.recurrencyCount ??
                        0}
                    </td>

                    <td>
                      <ContainmentBadge
                        value={
                          threat.containment ??
                          false
                        }
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ThreatDetailsSheet
        threat={selectedThreat}
        open={!!selectedThreat}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedThreat(null);
          }
        }}
      />
    </>
  );
}