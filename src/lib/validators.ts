import {
  BatchThreat,
} from "@/types/batch-threat";

export function validateThreat(
  threat: BatchThreat
): string | null {
  if (!threat.indicator) {
    return "Missing indicator";
  }

  if (
    ![
      "IP",
      "DOMAIN",
      "HASH",
    ].includes(threat.type)
  ) {
    return "Invalid type";
  }

  if (
    threat.severity < 1 ||
    threat.severity > 10
  ) {
    return "Severity must be between 1 and 10";
  }

  return null;
}