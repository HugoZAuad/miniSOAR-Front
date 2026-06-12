"use client";

import {
  Activity,
  AlertTriangle,
  Calendar,
  Globe,
  Radar,
  Shield,
  ShieldCheck,
} from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import {
  Button,
} from "@/components/ui/button";

import {
  Threat,
} from "@/types/threat";

import {
  RiskBadge,
} from "./risk-badge";

import {
  ContainmentBadge,
} from "./containment-badge";

import {
  ThreatTimeline,
} from "./threat-timeline";

import {
  useContainThreat,
} from "@/hooks/use-contain-threat";

import {
  useReleaseThreat,
} from "@/hooks/use-release-threat";

import {
  useThreatHistory,
} from "@/hooks/use-threats";

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
  const containMutation =
    useContainThreat();

  const releaseMutation =
    useReleaseThreat();

  if (!threat) {
    return null;
  }

  const {
    data: history = [],
  } = useThreatHistory(
    threat.id
  );

  return (
    <Sheet
      open={open}
      onOpenChange={
        onOpenChange
      }
    >
      <SheetContent
        side="right"
        className="
          w-full
          sm:max-w-4xl
          overflow-hidden
          p-0
        "
      >
        <div className="flex h-full flex-col">

          <SheetHeader className="border-b p-6">
            <SheetTitle className="flex items-center gap-2 text-xl">
              <AlertTriangle className="h-5 w-5 text-orange-500" />

              Threat Intelligence
            </SheetTitle>
          </SheetHeader>

          <div
            className="
              flex-1
              overflow-y-auto
              p-6
              space-y-6
            "
          >
            <div className="rounded-xl border p-5">
              <div className="text-sm text-muted-foreground">
                Indicator
              </div>

              <div className="font-mono text-lg mt-2 break-all">
                {threat.indicator}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">

              <MetricCard
                title="Type"
                value={threat.type}
              />

              <MetricCard
                title="Severity"
                value={`${threat.severity}/10`}
              />

              <MetricCard
                title="Hybrid Score"
                value={`${threat.hybridScore}/10`}
                icon={<Radar className="h-4 w-4" />}
              />

              <div className="rounded-xl border p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="h-4 w-4" />
                  Risk Score
                </div>

                <RiskBadge
                  score={
                    threat.riskScore ??
                    0
                  }
                />
              </div>

              <MetricCard
                title="Country"
                value={
                  threat.country ??
                  "Unknown"
                }
                icon={<Globe className="h-4 w-4" />}
              />

              <MetricCard
                title="Reputation"
                value={String(
                  threat.reputationScore ??
                    0
                )}
              />

              <MetricCard
                title="Recurrency"
                value={String(
                  threat.recurrencyCount
                )}
              />

              <div className="rounded-xl border p-5">
                <div className="text-sm text-muted-foreground">
                  Containment
                </div>

                <div className="mt-3">
                  <ContainmentBadge
                    value={
                      threat.containment ??
                      false
                    }
                  />
                </div>
              </div>

            </div>

            <div className="rounded-xl border p-5">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-4 w-4" />

                Created At
              </div>

              <div>
                {new Date(
                  threat.createdAt
                ).toLocaleString(
                  "pt-BR"
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-3">

              {!threat.containment && (
                <Button
                  size="lg"
                  onClick={() =>
                    containMutation.mutate(
                      threat.id
                    )
                  }
                  disabled={
                    containMutation.isPending
                  }
                >
                  <Shield className="mr-2 h-4 w-4" />

                  Contain Threat
                </Button>
              )}

              {threat.containment && (
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() =>
                    releaseMutation.mutate(
                      threat.id
                    )
                  }
                  disabled={
                    releaseMutation.isPending
                  }
                >
                  <ShieldCheck className="mr-2 h-4 w-4" />

                  Release Threat
                </Button>
              )}

            </div>

            <ThreatTimeline
              events={history}
            />

          </div>

        </div>
      </SheetContent>
    </Sheet>
  );
}

function MetricCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border p-5">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        {icon}
        {title}
      </div>

      <div className="mt-2 text-2xl font-bold">
        {value}
      </div>
    </div>
  );
}