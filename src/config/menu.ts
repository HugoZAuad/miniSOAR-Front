import {
  Activity,
  Database,
  Settings,
  Shield,
} from "lucide-react";

export const menuItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: Activity,
  },
  {
    label: "Threat Intelligence",
    href: "/threats",
    icon: Shield,
  },
  {
    label: "Batch Ingestion",
    href: "/ingestion",
    icon: Database,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
];