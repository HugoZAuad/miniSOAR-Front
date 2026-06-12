"use client";

import {
  useThreatAlerts,
} from "@/hooks/use-threat-alerts";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useThreatAlerts();

  return children;
}