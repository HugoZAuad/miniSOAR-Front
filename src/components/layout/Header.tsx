"use client";

import { Bell } from "lucide-react";

import { Button } from "@/components/ui/button";

import { ThemeToggle } from "./theme-toggle";

import { ApiStatus } from "./api-status";

import { MobileSidebar } from "./mobile-sidebar";

import {
  useRealtimeAlert,
} from "@/contexts/realtime-alert-context";

export function Header() {
  const {
    unreadCount,
  } = useRealtimeAlert();

  return (
    <header className="h-16 border-b bg-background px-6">
      <div className="flex h-full items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="md:hidden">
            <MobileSidebar />
          </div>

          <div>
            <h2 className="font-semibold">
              Security Operations Center
            </h2>

            <p className="text-xs text-muted-foreground">
              MiniSOAR Dashboard
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <ApiStatus />

          <Button
            variant="outline"
            size="icon"
            className="relative"
          >
            <Bell className="h-4 w-4" />

            {unreadCount > 0 && (
              <span
                className="
                absolute
                -top-1
                -right-1
                h-4
                min-w-4
                rounded-full
                bg-red-500
                text-[10px]
                text-white
                flex
                items-center
                justify-center
              "
              >
                {unreadCount}
              </span>
            )}
          </Button>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}