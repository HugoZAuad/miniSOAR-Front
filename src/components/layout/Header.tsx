"use client";

import { Button } from "@/components/ui/button";
import { useThemeContext } from "@/contexts/ThemeContext"; // Importando seu contexto nativo
import { Bell, Radio, Shield, ShieldAlert, Trash2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

interface NotificationItem {
  id: string;
  title: string;
  description: string;
  type: "critical" | "warning";
  timestamp: Date;
}

export function Header() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Consumindo o tema ativo do seu context global
  const { theme } = useThemeContext();

  // Escuta os disparos em tempo real vindos do hook de WebSocket
  useEffect(() => {
    const handleNewNotification = (event: Event) => {
      const customEvent = event as CustomEvent;
      const { title, description, type } = customEvent.detail;

      const newAlert: NotificationItem = {
        id: Math.random().toString(36).substring(2, 9),
        title,
        description,
        type,
        timestamp: new Date(),
      };

      setNotifications((prev) => [newAlert, ...prev]);
    };

    window.addEventListener("toast:notification", handleNewNotification);
    return () => window.removeEventListener("toast:notification", handleNewNotification);
  }, []);

  // Fecha a central de notificações se o usuário clicar fora dela
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const criticalCount = notifications.filter((n) => n.type === "critical").length;

  const removeNotification = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Evita fechar o menu ao clicar para excluir
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // Define dinamicamente o fundo baseado no estado real do context
  const isDark = theme === "dark";
  const modalBgClass = isDark ? "bg-[#09090b] text-white" : "bg-white text-black";

  return (
    <header className="flex h-16 items-center justify-between border-b px-6 bg-card/50 backdrop-blur-sm sticky top-0 z-40">
      {/* Branding */}
      <div className="flex items-center gap-3">
        <Shield className="h-5 w-5 text-primary" />
        <div>
          <h1 className="font-semibold text-sm sm:text-base tracking-tight">MiniSOAR</h1>
          <p className="text-[10px] sm:text-xs text-muted-foreground font-medium">
            Threat Intelligence Dashboard
          </p>
        </div>
      </div>

      {/* Ações Globais */}
      <div className="flex items-center gap-3">
        
        {/* Container da Central de Notificações */}
        <div className="relative" ref={dropdownRef}>
          <Button
            variant="outline"
            size="icon"
            className="relative"
            onClick={() => setIsOpen(!isOpen)}
          >
            {criticalCount > 0 ? (
              <ShieldAlert className="h-4 w-4 text-destructive animate-pulse" />
            ) : (
              <Bell className="h-4 w-4 text-muted-foreground" />
            )}

            {/* Badge Acumulador */}
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className={`absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping ${
                  criticalCount > 0 ? "bg-destructive" : "bg-primary"
                }`} />
                <span className={`relative inline-flex rounded-full h-3 w-3 ${
                  criticalCount > 0 ? "bg-destructive" : "bg-primary"
                }`} />
              </span>
            )}
          </Button>

          {/* Dropdown/Modal Flutuante Totalmente Opaco e Reativo ao Context */}
          {isOpen && (
            <div className={`absolute right-0 mt-2 w-80 sm:w-96 rounded-xl border border-border p-4 shadow-2xl animate-in fade-in-50 zoom-in-95 duration-150 origin-top-right z-50 mix-blend-normal ${modalBgClass}`}>
              
              {/* Header da Central */}
              <div className="flex items-center justify-between border-b border-border pb-2.5 mb-3">
                <div className="flex items-center gap-2">
                  <Radio className="h-4 w-4 text-emerald-500 animate-pulse" />
                  <h3 className="font-semibold text-sm">Fila de Triagem Real-Time</h3>
                </div>
                {notifications.length > 0 && (
                  <button
                    onClick={() => setNotifications([])}
                    className="text-xs text-muted-foreground hover:text-destructive flex items-center gap-1 transition-colors"
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Limpar Tudo
                  </button>
                )}
              </div>

              {/* Lista de Eventos Ingeridos */}
              <div className="max-h-64 overflow-y-auto space-y-2 pr-1 scrollbar-thin">
                {notifications.length === 0 ? (
                  <div className="py-8 text-center text-xs text-muted-foreground">
                    Nenhum indicador pendente de análise na fila.
                  </div>
                ) : (
                  notifications.map((item) => (
                    <div
                      key={item.id}
                      className={`group relative p-3 rounded-lg border transition-colors flex gap-2.5 items-start ${
                        item.type === "critical"
                          ? "bg-destructive/10 border-destructive/20 hover:bg-destructive/15"
                          : isDark ? "bg-zinc-900/50 border-zinc-800 hover:bg-zinc-900" : "bg-slate-50 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      <div className="mt-0.5">
                        {item.type === "critical" ? (
                          <ShieldAlert className="h-4 w-4 text-destructive" />
                        ) : (
                          <Bell className="h-4 w-4 text-primary" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0 pr-4">
                        <h4 className="text-xs font-semibold truncate">
                          {item.title}
                        </h4>
                        <p className="text-[11px] text-muted-foreground font-mono break-all mt-0.5">
                          {item.description}
                        </p>
                        <span className="text-[9px] text-muted-foreground/70 block mt-1">
                          {item.timestamp.toLocaleTimeString("pt-BR", {
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                          })}
                        </span>
                      </div>

                      {/* Botão de descarte individual */}
                      <button
                        onClick={(e) => removeNotification(item.id, e)}
                        className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 p-0.5 rounded text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
                        title="Descartar da fila"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        <ThemeToggle />
      </div>
    </header>
  );
}