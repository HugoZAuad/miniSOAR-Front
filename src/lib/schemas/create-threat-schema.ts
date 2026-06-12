import { z } from "zod";

export const createThreatSchema = z.object({
  indicator: z.string().min(1),

  type: z.enum([
    "IP",
    "DOMAIN",
    "HASH",
  ]),

  severity: z.coerce
    .number()
    .min(1)
    .max(10),
});

export type CreateThreatSchema =
  z.infer<
    typeof createThreatSchema
  >;