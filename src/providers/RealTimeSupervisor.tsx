"use client";

import { ToastContainer } from "@/components/shared/ToastContainer";
import { useWebSocket } from "@/hooks/useWebSocket";

export function RealTimeSupervisor({ children }: { children: React.ReactNode }) {
  useWebSocket();

  return (
    <>
      {children}
      <ToastContainer />
    </>
  );
}