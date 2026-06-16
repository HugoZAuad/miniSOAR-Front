import axios from "axios";

export const api =
  axios.create();

api.interceptors.request.use(
  (config) => {
    if (
      typeof window ===
      "undefined"
    ) {
      return config;
    }

    const stored =
      localStorage.getItem(
        "minisoar-settings",
      );

    let settings: any = {};

    try {
      settings = stored
        ? JSON.parse(stored)
        : {};
    } catch {}

    config.baseURL =
      settings.apiUrl ||
      process.env
        .NEXT_PUBLIC_API_URL ||
      "http://localhost:3001/api/v1";

    config.headers[
      "x-api-key"
    ] =
      settings.apiKey ||
      process.env
        .NEXT_PUBLIC_API_KEY ||
      "";

    return config;
  },
);