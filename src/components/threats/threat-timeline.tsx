"use client";

import {
  AlertTriangle,
  CheckCircle2,
  Radar,
  Shield,
} from "lucide-react";

interface TimelineEvent {
  title: string;
  description: string;
  createdAt: string;
  type:
    | "created"
    | "enriched"
    | "risk"
    | "contained";
}

interface Props {
  events: TimelineEvent[];
}

export function ThreatTimeline({
  events,
}: Props) {
  if (!events.length) {
    return (
      <div className="rounded-xl border p-6">
        Nenhum evento encontrado.
      </div>
    );
  }

  return (
    <div className="rounded-xl border p-5">
      <h3 className="font-semibold mb-6">
        Threat Timeline
      </h3>

      <div className="space-y-6">
        {events.map(
          (event, index) => (
            <TimelineItem
              key={index}
              event={event}
            />
          )
        )}
      </div>
    </div>
  );
}

function TimelineItem({
  event,
}: {
  event: TimelineEvent;
}) {
  const Icon =
    event.type === "created"
      ? Shield
      : event.type === "enriched"
      ? Radar
      : event.type === "risk"
      ? AlertTriangle
      : CheckCircle2;

  return (
    <div className="flex gap-4">
      <div
        className="
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-full
          border
          bg-muted
        "
      >
        <Icon className="h-4 w-4" />
      </div>

      <div className="flex-1">
        <div className="font-medium">
          {event.title}
        </div>

        <div
          className="
            text-sm
            text-muted-foreground
          "
        >
          {event.description}
        </div>

        <div
          className="
            mt-1
            text-xs
            text-muted-foreground
          "
        >
          {new Date(
            event.createdAt
          ).toLocaleString(
            "pt-BR"
          )}
        </div>
      </div>
    </div>
  );
}