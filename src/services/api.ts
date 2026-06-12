import axios from "axios";

export const api = axios.create();

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const apiUrl = localStorage.getItem("api-url");
    const apiKey = localStorage.getItem("api-key");

    config.baseURL = apiUrl ?? process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api/v1";
    config.headers["x-api-key"] = apiKey ?? process.env.NEXT_PUBLIC_API_KEY ?? "";
  }

  return config;
});