"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { io, Socket } from "socket.io-client";

const SOCKET_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

let socket: Socket | null = null;

export function useWebSocket() {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!socket) {
      socket = io(SOCKET_URL, {
        reconnectionAttempts: 5,
        reconnectionDelay: 3000,
        autoConnect: true,
      });
    }

    socket.on("connect", () => {
      console.log("▲ SOAR WebBar: Canal WebSocket estabelecido com sucesso.");
    });

    socket.on("threat:new", (newThreat) => {
      queryClient.invalidateQueries({ queryKey: ["threats"] });
      queryClient.invalidateQueries({ queryKey: ["analytics"] });

      window.dispatchEvent(
        new CustomEvent("toast:notification", {
          detail: {
            title: "Nova Ameaça Detectada",
            description: `IoC: ${newThreat.indicator} [Nível ${newThreat.severity}]`,
            type: newThreat.severity >= 8 ? "critical" : "warning",
          },
        })
      )
    });

    socket.on("threat:batch_processed", () => {
      queryClient.invalidateQueries({ queryKey: ["threats"] });
      queryClient.invalidateQueries({ queryKey: ["analytics"] });
    });

    return () => {
      socket?.off("connect");
      socket?.off("threat:new");
      socket?.off("threat:batch_processed");
    };
  }, [queryClient]);

  const emitEvent = (event: string, data: any) => {
    if (socket?.connected) {
      socket.emit(event, data);
    }
  };

  return { emitEvent, isConnected: socket?.connected ?? false };
}