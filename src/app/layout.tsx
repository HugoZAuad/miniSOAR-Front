import {
  Toaster,
} from "@/components/ui/sonner";
import { SettingsProvider } from "@/contexts/settings-context";
import { cn } from "@/lib/utils";
import { QueryProvider } from "@/providers/query-provider";
import { RealtimeProvider } from "@/providers/realtime-provider";
import { SocketProvider } from "@/providers/socket-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning className={cn("font-sans", inter.variable)}
    >
      <body>
        <ThemeProvider>
          <QueryProvider>
            <SocketProvider>
              <RealtimeProvider>
                <SettingsProvider>
                  {children}
                </SettingsProvider>
              </RealtimeProvider>
            </SocketProvider>
          </QueryProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}