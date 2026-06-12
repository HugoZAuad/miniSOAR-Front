"use client";

import {
  useEffect,
  useMemo,
  useState
} from "react";

import { io, Socket } from "socket.io-client";

import {
  SocketContext,
} from "@/contexts/socket-context";

export function SocketProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [socket, setSocket] =
    useState<Socket | null>(
      null
    );

  useEffect(() => {
    const instance = io(
      process.env
        .NEXT_PUBLIC_API_URL!
        .replace("/api/v1", ""),
      {
        transports: [
          "websocket",
        ],
      }
    );

    instance.on(
      "connect",
      () => {
        console.log(
          "Socket connected:",
          instance.id
        );
      }
    );

    setSocket(instance);

    return () => {
      instance.disconnect();
    };
  }, []);

  const value =
    useMemo(
      () => socket,
      [socket]
    );

  return (
    <SocketContext.Provider
      value={value}
    >
      {children}
    </SocketContext.Provider>
  );
}