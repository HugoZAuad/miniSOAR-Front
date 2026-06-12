"use client";

import { Threat } from "@/types/threat";

interface Props {
  threat: Threat;
}

export function ThreatTimeline({
  threat,
}: Props) {
  return (
    <div className="border rounded-xl p-5">
      <h3 className="font-semibold mb-4">
        Timeline
      </h3>

      <div className="space-y-4">

        <TimelineItem
          title="IOC Created"
          date={
            threat.createdAt
          }
        />

        <TimelineItem
          title="Risk Calculated"
          date={
            threat.createdAt
          }
        />

        <TimelineItem
          title="Threat Enriched"
          date={
            threat.createdAt
          }
        />

      </div>
    </div>
  );
}

function TimelineItem({
  title,
  date,
}: {
  title: string;
  date: string;
}) {
  return (
    <div className="flex gap-4">
      <div
        className="
          h-3
          w-3
          rounded-full
          bg-primary
          mt-2
        "
      />

      <div>
        <div className="font-medium">
          {title}
        </div>

        <div className="text-sm text-muted-foreground">
          {new Date(
            date
          ).toLocaleString()}
        </div>
      </div>
    </div>
  );
}