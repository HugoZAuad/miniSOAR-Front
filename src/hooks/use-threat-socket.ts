"use client";

import { useEffect } from "react";

import { io } from "socket.io-client";

import { useQueryClient } from "@tanstack/react-query";

export function useThreatSocket() {
  const queryClient =
    useQueryClient();

  useEffect(() => {
    const apiUrl =
      localStorage.getItem("api-url");

    if (!apiUrl) return;

    const socket = io(apiUrl.replace("/api/v1", ""), {
      transports: ["websocket"],
    });

    socket.on(
      "threat-alert",
      () => {
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
      }
    );

    return () => {
      socket.disconnect();
    };
  }, [queryClient]);
}