import { Shield } from "lucide-react";

export function MiniSoarLogo() {
  return (
    <div className="flex items-center gap-3">
      <div
        className="
          h-12
          w-12
          rounded-xl
          bg-primary
          flex
          items-center
          justify-center
        "
      >
        <Shield />
      </div>

      <div>
        <p className="font-bold">
          MiniSOAR
        </p>

        <p className="text-xs text-muted-foreground">
          Security Platform
        </p>
      </div>
    </div>
  );
}