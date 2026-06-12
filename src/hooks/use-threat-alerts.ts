"use client";

import { SocketContext } from "@/contexts/socket-context";
import { Threat } from "@/types/threat";
import { useQueryClient } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { toast } from "sonner";

export function useThreatAlerts() {
  const socket = useContext(SocketContext);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!socket) return;

    const handler = (threat: Threat) => {
      console.log("[SOAR ALERT]", threat);

      if (threat.riskScore >= 80) {
        toast.error(
          `Critical threat detected: ${threat.indicator}`
        );
      }

      queryClient.invalidateQueries({
        queryKey: ["analytics"],
      });

      queryClient.invalidateQueries({
        queryKey: ["threats"],
      });
    };

    socket.on("threat-alert", handler);

    return () => {
      socket.off("threat-alert", handler);
    };
  }, [socket, queryClient]);
}