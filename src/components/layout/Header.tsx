"use client";

import { Shield } from "lucide-react";

import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b px-6">
      <div className="flex items-center gap-3">
        <Shield className="h-5 w-5" />

        <div>
          <h1 className="font-semibold">
            MiniSOAR
          </h1>

          <p className="text-xs text-muted-foreground">
            Threat Intelligence Dashboard
          </p>
        </div>
      </div>

      <ThemeToggle />
    </header>
  );
}