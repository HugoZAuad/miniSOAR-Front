"use client";

import {
  useContext,
  useEffect,
  useState,
} from "react";

import {
  SocketContext,
} from "@/contexts/socket-context";

export function LiveStatus() {
  const socket =
    useContext(
      SocketContext
    );

  const [connected,
    setConnected] =
    useState(false);

  useEffect(() => {
    if (!socket) return;

    const onConnect =
      () =>
        setConnected(
          true
        );

    const onDisconnect =
      () =>
        setConnected(
          false
        );

    socket.on(
      "connect",
      onConnect
    );

    socket.on(
      "disconnect",
      onDisconnect
    );

    setConnected(
      socket.connected
    );

    return () => {
      socket.off(
        "connect",
        onConnect
      );

      socket.off(
        "disconnect",
        onDisconnect
      );
    };
  }, [socket]);

  return (
    <div className="flex items-center gap-2">
      <div
        className={`h-2 w-2 rounded-full ${
          connected
            ? "bg-green-500"
            : "bg-red-500"
        }`}
      />

      <span className="text-sm">
        {connected
          ? "Realtime Active"
          : "Disconnected"}
      </span>
    </div>
  );
}