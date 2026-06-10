"use client";

import { QueryProvider } from "./QueryProvider";
import { ThemeProvider } from "./ThemeProvider";

import { ThemeContextProvider } from "@/contexts/ThemeContext";

export function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <ThemeContextProvider>
        <QueryProvider>
          {children}
        </QueryProvider>
      </ThemeContextProvider>
    </ThemeProvider>
  );
}