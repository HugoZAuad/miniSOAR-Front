"use client";

import {
  useContext,
  useEffect,
  useState,
} from "react";

import {
  SocketContext,
} from "@/contexts/socket-context";

import {
  Threat,
} from "@/types/threat";

export function RealtimeFeed() {
  const socket =
    useContext(
      SocketContext
    );

  const [events,
    setEvents] =
    useState<Threat[]>([]);

  useEffect(() => {
    if (!socket) return;

    const handler = (
      threat: Threat
    ) => {
      setEvents(
        (prev) => [
          threat,
          ...prev,
        ].slice(0, 15)
      );
    };

    socket.on(
      "threat-alert",
      handler
    );

    return () => {
      socket.off(
        "threat-alert",
        handler
      );
    };
  }, [socket]);

  return (
    <div className="rounded-xl border p-4">
      <h3 className="font-semibold mb-4">
        Live Threat Feed
      </h3>

      <div className="space-y-3">
        {events.length === 0 && (
          <div className="text-sm text-muted-foreground">
            Waiting for
            events...
          </div>
        )}

        {events.map(
          (event) => (
            <div
              key={event.id}
              className="border rounded-lg p-3"
            >
              <div className="font-medium">
                {
                  event.indicator
                }
              </div>

              <div className="text-sm text-muted-foreground">
                {
                  event.type
                }
                {" • "}
                Severity:
                {
                  event.severity
                }
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}