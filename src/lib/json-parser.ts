import {
  BatchThreat,
} from "@/types/batch-threat";

export function parseJson(
  content: string
): BatchThreat[] {
  return JSON.parse(
    content
  );
}