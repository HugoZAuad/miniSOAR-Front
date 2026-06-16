import {
  Toaster,
} from "@/components/ui/sonner";

import { cn } from "@/lib/utils";

import { Inter } from "next/font/google";

import "./globals.css";

import { ThemeProvider } from "@/providers/theme-provider";
import { QueryProvider } from "@/providers/query-provider";
import { SocketProvider } from "@/providers/socket-provider";
import { RealtimeProvider } from "@/providers/realtime-provider";

import { SettingsProvider } from "@/contexts/settings-context";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={cn(
        "font-sans",
        inter.variable,
      )}
    >
      <body>
        <ThemeProvider>
          <QueryProvider>

            <SettingsProvider>

              <SocketProvider>
                <RealtimeProvider>
                  {children}
                </RealtimeProvider>
              </SocketProvider>

            </SettingsProvider>

          </QueryProvider>

          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}