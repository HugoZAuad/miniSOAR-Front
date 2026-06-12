"use client";

import { Header } from "./header";
import { Sidebar } from "./sidebar";

export function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen overflow-hidden bg-background">
      <Sidebar />

      <div className="ml-72 h-screen flex flex-col">
        <Header />

        <main
          className="
            flex-1
            overflow-y-auto
            p-6
          "
        >
          {children}
        </main>
      </div>
    </div>
  );
}