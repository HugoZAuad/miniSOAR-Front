"use client";

import {
  useContext,
  useEffect,
} from "react";

import {
  useQueryClient,
} from "@tanstack/react-query";

import { toast } from "sonner";

import {
  SocketContext,
} from "@/contexts/socket-context";

export function useThreatRealtime() {
  const socket =
    useContext(
      SocketContext
    );

  const queryClient =
    useQueryClient();

  useEffect(() => {
    if (!socket) return;

    const handler = (
      threat: any
    ) => {

      console.log(
        "Threat received",
        threat
      );

      toast.error(
        `Threat detected: ${threat.indicator}`,
        {
          description:
            `${threat.type} • Severity ${threat.severity}`,
        }
      );

      queryClient.invalidateQueries({
        queryKey: ["threats"],
      });

      queryClient.invalidateQueries({
        queryKey: ["analytics"],
      });

      queryClient.invalidateQueries({
        queryKey: [
          "threat-intelligence",
        ],
      });
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
  }, [
    socket,
    queryClient,
  ]);
}