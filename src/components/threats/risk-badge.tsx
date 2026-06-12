import { Badge } from "@/components/ui/badge";

export function RiskBadge({
  score,
}: {
  score: number;
}) {
  if (score >= 80) {
    return (
      <Badge variant="destructive">
        Critical
      </Badge>
    );
  }

  if (score >= 50) {
    return (
      <Badge>
        Warning
      </Badge>
    );
  }

  return (
    <Badge variant="secondary">
      Low
    </Badge>
  );
}