import { Badge } from "@/components/ui/badge";

export function ContainmentBadge({
  value,
}: {
  value: boolean;
}) {
  return value ? (
    <Badge>
      Contained
    </Badge>
  ) : (
    <Badge
      variant="destructive"
    >
      Pending
    </Badge>
  );
}