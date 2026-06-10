"use client";

import {
  BarChart3,
  Database,
  Settings,
  ShieldAlert,
} from "lucide-react";

import { SidebarItem } from "./SidebarItem";

export function Sidebar() {
  return (
    <aside className="hidden w-64 border-r bg-card lg:flex lg:flex-col">
      <div className="border-b p-6">
        <h2 className="text-xl font-bold">
          MiniSOAR
        </h2>

        <p className="text-sm text-muted-foreground">
          Security Operations
        </p>
      </div>

      <nav className="flex flex-1 flex-col gap-2 p-4">
        <SidebarItem
          href="/"
          label="Dashboard"
          icon={<BarChart3 size={18} />}
        />

        <SidebarItem
          href="/threats"
          label="Threats"
          icon={<ShieldAlert size={18} />}
        />

        <SidebarItem
          href="/analytics"
          label="Analytics"
          icon={<Database size={18} />}
        />

        <SidebarItem
          href="/settings"
          label="Settings"
          icon={<Settings size={18} />}
        />
      </nav>
    </aside>
  );
}