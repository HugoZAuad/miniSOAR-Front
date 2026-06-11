"use client";

import { ThemeContextProvider } from "@/contexts/ThemeContext";
import { QueryProvider } from "./QueryProvider";
import { RealTimeSupervisor } from "./RealTimeSupervisor";
import { ThemeProvider } from "./ThemeProvider";

export function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <ThemeContextProvider>
        <QueryProvider>
          <RealTimeSupervisor>
            {children}
          </RealTimeSupervisor>
        </QueryProvider>
      </ThemeContextProvider>
    </ThemeProvider>
  );
}