"use client";

import {
  createContext,
  useContext,
  useState,
} from "react";

interface RealtimeAlertContextData {
  unreadCount: number;

  setUnreadCount: (
    count: number
  ) => void;
}

const RealtimeAlertContext =
  createContext<
    RealtimeAlertContextData
  >({
    unreadCount: 0,
    setUnreadCount: () => {},
  });

export function RealtimeAlertProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [
    unreadCount,
    setUnreadCount,
  ] = useState(0);

  return (
    <RealtimeAlertContext.Provider
      value={{
        unreadCount,
        setUnreadCount,
      }}
    >
      {children}
    </RealtimeAlertContext.Provider>
  );
}

export function useRealtimeAlert() {
  return useContext(
    RealtimeAlertContext
  );
}