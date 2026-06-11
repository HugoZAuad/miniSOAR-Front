"use client";

import { Threat } from "@/types/threat";
import { useState } from "react";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetDescription 
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { 
  ShieldAlert, 
  ShieldCheck, 
  ServerOff, 
  Ban, 
  Activity,
  CheckCircle2,
  Loader2
} from "lucide-react";

interface ThreatDetailsProps {
  threat: Threat | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ThreatDetails({ threat, isOpen, onClose }: ThreatDetailsProps) {
  const [isProcessing, setIsProcessing] = useState<string | null>(null);

  if (!threat) return null;

  // Simulador de disparo de Playbook/Ação
  const handleAction = async (actionId: string, actionName: string) => {
    setIsProcessing(actionId);
    
    // Aqui no futuro chamaremos o useMutation ou emitiremos via WebSocket
    await new Promise((resolve) => setTimeout(resolve, 1500)); 
    
    // Dispara um toast de sucesso nativo usando a nossa arquitetura da Sprint 2
    window.dispatchEvent(
      new CustomEvent("toast:notification", {
        detail: {
          title: "Playbook Executado",
          description: `Ação "${actionName}" aplicada ao IoC ${threat.indicator}.`,
          type: "success",
        },
      })
    );
    
    setIsProcessing(null);
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-full sm:max-w-md md:max-w-lg overflow-y-auto border-l-border/50 bg-card p-0 flex flex-col">
        
        {/* Cabeçalho de Contexto */}
        <div className="p-6 border-b border-border/50 bg-muted/20">
          <SheetHeader className="text-left space-y-1">
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                threat.severity >= 8 ? "bg-destructive/15 text-destructive" : 
                threat.severity >= 5 ? "bg-orange-500/15 text-orange-500" : 
                "bg-emerald-500/15 text-emerald-500"
              }`}>
                Nível {threat.severity}
              </span>
              <span className="px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground text-[10px] font-bold uppercase tracking-wider">
                {threat.type}
              </span>
            </div>
            <SheetTitle className="text-xl font-mono break-all">{threat.indicator}</SheetTitle>
            <SheetDescription className="text-sm font-medium">
              Detectado em: {new Date(threat.createdAt || Date.now()).toLocaleString("pt-BR")}
            </SheetDescription>
          </SheetHeader>
        </div>

        {/* Corpo: Detalhes Técnicos */}
        <div className="p-6 flex-1 space-y-6">
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <Activity className="h-4 w-4 text-primary" />
              Telemetria da Ameaça
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-lg border border-border/50 bg-muted/10 space-y-1">
                <p className="text-xs text-muted-foreground font-medium">Hybrid Score</p>
                <p className="text-lg font-semibold">{threat.hybridScore ?? "N/A"}</p>
              </div>
              <div className="p-3 rounded-lg border border-border/50 bg-muted/10 space-y-1">
                <p className="text-xs text-muted-foreground font-medium">Origem</p>
                <p className="text-lg font-semibold">{threat.country || "Desconhecida"}</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Contexto (Tags)</h4>
            <div className="flex flex-wrap gap-2">
              {threat.tags?.length ? (
                threat.tags.map((tag) => (
                  <span key={tag} className="px-2 py-1 bg-secondary border border-border/50 rounded text-xs text-muted-foreground">
                    {tag}
                  </span>
                ))
              ) : (
                <span className="text-sm text-muted-foreground italic">Nenhuma tag enriquecida.</span>
              )}
            </div>
          </div>
        </div>

        {/* Rodapé: Motor de Ações (Playbooks) */}
        <div className="p-6 border-t border-border/50 bg-muted/10 space-y-3 sticky bottom-0">
          <h4 className="text-sm font-semibold text-foreground">Ações de Resposta</h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <Button 
              variant="destructive" 
              className="w-full justify-start gap-2 shadow-sm"
              disabled={isProcessing !== null}
              onClick={() => handleAction("block_firewall", "Bloqueio no Firewall")}
            >
              {isProcessing === "block_firewall" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Ban className="h-4 w-4" />}
              Bloquear IP / Domínio
            </Button>

            <Button 
              variant="outline" 
              className="w-full justify-start gap-2 border-orange-500/20 hover:bg-orange-500/10 hover:text-orange-500"
              disabled={isProcessing !== null}
              onClick={() => handleAction("isolate_host", "Isolamento de Host")}
            >
              {isProcessing === "isolate_host" ? <Loader2 className="h-4 w-4 animate-spin" /> : <ServerOff className="h-4 w-4" />}
              Isolar Endpoint
            </Button>

            <Button 
              variant="outline" 
              className="w-full justify-start gap-2"
              disabled={isProcessing !== null}
              onClick={() => handleAction("mark_false_positive", "Classificado como Falso Positivo")}
            >
              {isProcessing === "mark_false_positive" ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShieldCheck className="h-4 w-4" />}
              Falso Positivo
            </Button>
            
            <Button 
              variant="secondary" 
              className="w-full justify-start gap-2"
              disabled={isProcessing !== null}
              onClick={() => handleAction("close_incident", "Incidente Encerrado")}
            >
              {isProcessing === "close_incident" ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
              Encerrar Alerta
            </Button>
          </div>
        </div>

      </SheetContent>
    </Sheet>
  );
}