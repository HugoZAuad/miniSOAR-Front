"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  io,
  Socket,
} from "socket.io-client";

import {
  SocketContext,
} from "@/contexts/socket-context";

import {
  useSettings,
} from "@/contexts/settings-context";

export function SocketProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    settings,
  } = useSettings();

  const [socket, setSocket] =
    useState<Socket | null>(
      null,
    );

  useEffect(() => {
    if (
      !settings.realtimeEnabled
    ) {
      socket?.disconnect();

      setSocket(null);

      return;
    }

    const socketUrl =
      settings.apiUrl.replace(
        "/api/v1",
        "",
      );

    const instance = io(
      socketUrl,
      {
        transports: [
          "websocket",
        ],

        reconnection: true,

        reconnectionAttempts:
          Infinity,

        reconnectionDelay: 1000,

        reconnectionDelayMax:
          5000,

        timeout: 10000,
      },
    );

    instance.on(
      "connect",
      () => {
        console.log(
          "[Socket] Connected:",
          instance.id,
        );
      },
    );

    instance.on(
      "disconnect",
      (reason) => {
        console.log(
          "[Socket] Disconnected:",
          reason,
        );
      },
    );

    instance.on(
      "connect_error",
      (error) => {
        console.error(
          "[Socket] Connect error:",
          error.message,
        );
      },
    );

    setSocket(
      instance,
    );

    return () => {
      instance.removeAllListeners();

      instance.disconnect();

      setSocket(null);
    };
  }, [
    settings.apiUrl,
    settings.realtimeEnabled,
  ]);

  const value =
    useMemo(
      () => socket,
      [socket],
    );

  return (
    <SocketContext.Provider
      value={value}
    >
      {children}
    </SocketContext.Provider>
  );
}