"use client";

import { useEffect, useState } from "react";
import { X, ShieldAlert, Bell } from "lucide-react";

interface ToastMessage {
  id: string;
  title: string;
  description: string;
  type: "critical" | "warning" | "success";
}

export function ToastContainer() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    const handleToastEvent = (event: Event) => {
      const customEvent = event as CustomEvent;
      const { title, description, type } = customEvent.detail;

      const newToast: ToastMessage = {
        id: Math.random().toString(36).substring(2, 9),
        title,
        description,
        type,
      };

      setToasts((prev) => [...prev, newToast]);

      // Remove automaticamente após 5 segundos
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
      }, 5000);
    };

    window.addEventListener("toast:notification", handleToastEvent);
    return () => window.removeEventListener("toast:notification", handleToastEvent);
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 w-full max-w-sm pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`p-4 rounded-xl border bg-card shadow-lg flex gap-3 pointer-events-auto animate-in fade-in slide-in-from-bottom-5 duration-300 ${
            toast.type === "critical"
              ? "border-destructive/30"
              : "border-border"
          }`}
        >
          <div className="mt-0.5">
            {toast.type === "critical" ? (
              <ShieldAlert className="h-5 w-5 text-destructive animate-pulse" />
            ) : (
              <Bell className="h-5 w-5 text-primary" />
            )}
          </div>
          
          <div className="flex-1 space-y-1">
            <h4 className="text-sm font-semibold tracking-tight text-foreground">
              {toast.title}
            </h4>
            <p className="text-xs text-muted-foreground font-mono leading-relaxed">
              {toast.description}
            </p>
          </div>

          <button
            onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
            className="text-muted-foreground hover:text-foreground p-1 h-fit rounded-md transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
}