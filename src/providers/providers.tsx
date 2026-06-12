"use client";

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import {
  ThemeProvider,
} from "next-themes";

import { Toaster } from "@/components/ui/sonner";
import {
  SocketProvider,
} from "./socket-provider";

const queryClient =
  new QueryClient();

export function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
    >
      <QueryClientProvider
        client={queryClient}
      >
        <SocketProvider>
          {children}
          <Toaster />
        </SocketProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}