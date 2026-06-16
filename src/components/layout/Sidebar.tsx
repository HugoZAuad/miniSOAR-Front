"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

import {
  Activity,
  AlertTriangle,
  Radar,
  Settings,
  Shield,
  Upload,
} from "lucide-react";

import {
  useSidebarStats,
} from "@/hooks/use-sidebar-stats";

export function Sidebar() {
  const pathname =
    usePathname();

  const stats =
    useSidebarStats();

  const items = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: Activity,
    },
    {
      title: "Threats",
      href: "/dashboard/threats",
      icon: AlertTriangle,
    },
    {
      title: "Batch Ingestion",
      href: "/dashboard/ingestion",
      icon: Upload,
    },
    {
      title: "Threat Intelligence",
      href: "/dashboard/intelligence",
      icon: Radar,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    }
  ];

  return (
    <aside
      className="
    fixed
    left-0
    top-0
    z-40

    h-screen
    w-72

    border-r
    bg-background
  "
    >
      <div className="p-6 border-b">
        <div className="flex items-center gap-3">
          <Shield className="h-6 w-6" />

          <div>
            <h2 className="font-bold">
              MiniSOAR
            </h2>

            <p className="text-xs text-muted-foreground">
              SOC Platform
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-3">
        {items.map((item) => {
          const Icon =
            item.icon;

          const active =
            pathname ===
            item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex
                items-center
                gap-3
                rounded-lg
                px-3
                py-2
                mb-1
                transition-colors
                ${active
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
                }
              `}
            >
              <Icon className="h-4 w-4" />

              {item.title}
            </Link>
          );
        })}
      </nav>

      <div className="border-t p-4">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>
              Threats
            </span>

            <span>
              {stats.totalThreats}
            </span>
          </div>

          <div className="flex justify-between">
            <span>
              Critical
            </span>

            <span>
              {stats.criticalThreats}
            </span>
          </div>

          <div className="flex justify-between">
            <span>
              Contained
            </span>

            <span>
              {stats.containedThreats}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}