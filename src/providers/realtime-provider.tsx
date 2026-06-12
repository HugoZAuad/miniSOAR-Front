"use client";

import {
  useThreatRealtime,
} from "@/hooks/use-threat-realtime";

export function RealtimeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useThreatRealtime();

  return <>{children}</>;
}