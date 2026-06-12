"use client";

import { AlertTriangle } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { Badge } from "@/components/ui/badge";

import { Threat } from "@/types/threat";

import { ThreatActions } from "./threat-actions";
import { ThreatGeoCard } from "./threat-geo-card";
import { ThreatScoreGauge } from "./threat-score-gauge";
import { ThreatSummary } from "./threat-summary";
import { ThreatTimeline } from "./threat-timeline";

interface Props {
  threat: Threat | null;
  open: boolean;
  onOpenChange: (
    open: boolean
  ) => void;
}

export function ThreatDetailsSheet({
  threat,
  open,
  onOpenChange,
}: Props) {
  if (!threat) return null;

  return (
    <Sheet
      open={open}
      onOpenChange={onOpenChange}
    >
      <SheetContent
        side="right"
        className="
          w-[75vw]
          max-w-[1200px]
          overflow-y-auto
          p-0
        "
      >
        <div className="p-8">
          <SheetHeader>
            <div className="flex items-center gap-4">
              <div
                className="
                  h-14
                  w-14
                  rounded-xl
                  bg-destructive/10
                  flex
                  items-center
                  justify-center
                "
              >
                <AlertTriangle
                  className="
                    h-7
                    w-7
                    text-destructive
                  "
                />
              </div>

              <div>
                <SheetTitle className="text-3xl">
                  {threat.indicator}
                </SheetTitle>

                <div className="flex gap-2 mt-2">
                  <Badge>
                    {threat.type}
                  </Badge>

                  <Badge
                    variant="secondary"
                  >
                    Severity {threat.severity}
                  </Badge>

                  {threat.containment ? (
                    <Badge>
                      Contained
                    </Badge>
                  ) : (
                    <Badge
                      variant="destructive"
                    >
                      Active
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </SheetHeader>

          <div className="mt-8 space-y-6">

            <ThreatScoreGauge
              threat={threat}
            />

            <ThreatGeoCard
              threat={threat}
            />

            <ThreatSummary
              threat={threat}
            />

            <ThreatTimeline
              threat={threat}
            />

            <ThreatActions
              threat={threat}
            />

          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}