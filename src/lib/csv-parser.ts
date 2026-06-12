import { BatchThreat } from "@/types/batch-threat";

export function parseCsv(
  content: string
): BatchThreat[] {
  const lines = content
    .split("\n")
    .filter(Boolean);

  return lines
    .slice(1)
    .map((line) => {
      const [
        indicator,
        type,
        severity,
      ] = line.split(",");

      return {
        indicator:
          indicator?.trim(),

        type:
          type?.trim()
            .toUpperCase() as BatchThreat["type"],

        severity:
          Number(severity),
      };
    });
}