export interface AppSettings {
  apiUrl: string;
  apiKey: string;

  realtimeEnabled: boolean;

  theme:
    | "light"
    | "dark"
    | "system";
}

export const DEFAULT_SETTINGS: AppSettings =
{
  apiUrl:
    "http://localhost:3001/api/v1",

  apiKey: "",

  realtimeEnabled: true,

  theme: "dark",
};