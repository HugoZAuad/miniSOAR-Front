"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

interface SidebarItemProps {
  href: string;
  label: string;
  icon: React.ReactNode;
}

export function SidebarItem({
  href,
  label,
  icon,
}: SidebarItemProps) {
  const pathname = usePathname();

  const active =
    pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
        active
          ? "bg-primary text-primary-foreground"
          : "hover:bg-muted"
      )}
    >
      {icon}
      {label}
    </Link>
  );
}