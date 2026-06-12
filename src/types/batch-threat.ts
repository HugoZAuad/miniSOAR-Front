export interface BatchThreat {
  indicator: string;
  type: "IP" | "DOMAIN" | "HASH";
  severity: number;
}

export interface BatchError {
  row: number;
  message: string;
}