export const queryKeys = {
  analytics: ["analytics"],

  threats: (
    page: number,
    limit: number,
    severity?: number,
    indicator?: string
  ) => [
    "threats",
    page,
    limit,
    severity,
    indicator,
  ],
};